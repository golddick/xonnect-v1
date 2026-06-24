"use client"

import { Skeleton } from "@/components/ui/skeleton"

type TvLoadingStateProps = {
  variant?: "landing" | "section"
}

function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-3 space-y-3">
      <Skeleton className="aspect-video w-full rounded-xl" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-3 w-2/3" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-4 w-10" />
      </div>
    </div>
  )
}

export default function TvLoadingState({ variant = "landing" }: TvLoadingStateProps) {
  if (variant === "section") {
    return (
      <div className="flex-1 p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-9 w-32 rounded-lg" />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col gap-6 p-4 md:p-6">
      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-7 w-36" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-72 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>

      <Skeleton className="aspect-video w-full rounded-2xl" />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <Skeleton className="h-6 w-28" />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Skeleton className="h-6 w-24" />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
