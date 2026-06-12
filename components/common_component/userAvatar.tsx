import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  name?: string | null;
  image?: string;
}

export default function UserAvatar({ name, image }: UserAvatarProps) {
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U"; // Default if no name

  return (
    <Avatar className="w-8 h-8 rounded-lg">
      <AvatarImage src={image || ""} alt={initials}  className=" object-cover"/>
      <AvatarFallback className=" text-white bg-red-700">{initials}</AvatarFallback>
    </Avatar>
  );
}
