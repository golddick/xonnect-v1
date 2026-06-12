

import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { auth } from "@/lib/auth/auth";
import { Role } from "@/lib/generated/prisma";
import { prisma } from "@/lib/db/prisma";

const f = createUploadthing();

// NOTE: This project uses DropAphi for thumbnails.
// UploadThing is used only for video files.
export const ourFileRouter = {
  // Image uploader for other use cases
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const user = await auth();
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.ufsUrl);
      return { uploadedBy: metadata.userId };
    }),

  // Creator video uploader
  creatorVideoUploader: f({
    video: {
      maxFileSize: "2GB",
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      const session = await auth();

      const email = session?.user?.email;
      if (!email) throw new UploadThingError("Unauthorized");

      const role = session?.user?.role;
      if (role !== Role.CREATOR) {
        // Fallback: if role isn't present in session, check profile
        const profile = await prisma.profile.findUnique({
          where: { email: email.toLowerCase() },
          select: { role: true },
        });
        if (profile?.role !== Role.CREATOR) throw new UploadThingError("Unauthorized");
      }

      return { email: email.toLowerCase() };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      return {
        uploadedBy: metadata.email,
        videoUrl: file.ufsUrl,
        fileUrl: file.url,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;