type WatchCardLike = {
  id: string
  watchId?: string | null
  type?: string | null
}

export function buildWatchHref(card: WatchCardLike) {
  const targetId = card.watchId ?? card.id
  return card.type === "live" || card.type === "scheduled"
    ? `/tv/watch/event/${targetId}`
    : `/tv/watch/folder/${targetId}`
}
