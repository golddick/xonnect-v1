"use client"

import { useMemo, useState } from "react"
import type { LocationData } from "@/lib/type/location"

const NOMINATIM_API =
  "https://nominatim.openstreetmap.org/search"

type NominatimItem = {
  display_name: string
  lat: string
  lon: string
  type?: string
  class?: string
  address?: {
    country?: string
    state?: string
    city?: string
    town?: string
    village?: string
    hamlet?: string
    county?: string
    road?: string
    postcode?: string
    [key: string]: string | undefined
  }
}

export default function ProfileAddressSearchModal({
  isOpen,
  onClose,
  onSelectSingleLocation,
}: {
  isOpen: boolean
  onClose: () => void
  onSelectSingleLocation: (location: LocationData) => void
}) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<NominatimItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const selectedPreview = useMemo(() => {
    if (!results.length) return null
    return results[0]
  }, [results])

  async function search() {
    const q = query.trim()
    if (!q) return
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch(
        `${NOMINATIM_API}?q=${encodeURIComponent(
          q
        )}&format=json&addressdetails=1&limit=8&accept-language=en`,
        {
          headers: {
            "User-Agent": "XonnectApp/1.0",
          },
        }
      )

      const data = (await res.json()) as NominatimItem[] | { message?: string }
      if (!res.ok) {
        const msg = typeof data === "object" && !Array.isArray(data) ? data.message : undefined
        throw new Error(msg || "Search failed")
      }

      setResults(Array.isArray(data) ? data : [])
    } catch (e) {
      setError(e instanceof Error ? e.message : "Search failed")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl rounded-3xl border border-border bg-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">Select address</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Type your location, pick from results.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-border px-3 py-2 text-sm font-semibold hover:bg-muted"
          >
            Close
          </button>
        </div>

        <div className="mt-4 space-y-3">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") search()
            }}
            placeholder="Search address (city, street, landmark...)"
            className="w-full rounded-xl border border-border bg-background px-4 py-2 text-sm outline-none focus:border-primary"
          />

          <div className="flex gap-2">
            <button
              type="button"
              onClick={search}
              disabled={isLoading || !query.trim()}
              className="flex-1 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground disabled:opacity-50"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>

          {error ? (
            <p className="text-sm text-red-500">{error}</p>
          ) : null}

          <div className="max-h-72 overflow-auto rounded-2xl border border-border bg-background">
            {results.length ? (
              <ul className="divide-y divide-border">
                {results.map((r, idx) => {
                  const country = r.address?.country ?? ""
                  const state = r.address?.state
                  const name =
                    r.address?.city ??
                    r.address?.town ??
                    r.address?.village ??
                    r.address?.hamlet ??
                    r.address?.county ??
                    r.address?.road ??
                    r.display_name

                  const locationType = (r.type as LocationData["type"] | undefined) ?? "city"

                  return (
                    <li key={`${r.lat}-${r.lon}-${idx}`}>
                      <button
                        type="button"
                        className="w-full px-4 py-3 text-left hover:bg-muted"
                        onClick={() => {
                          const location: LocationData = {
                            name,
                            country,
                            state: state ?? undefined,
                            lat: Number(r.lat),
                            lon: Number(r.lon),
                            type: locationType,
                            fullAddress: r.display_name,
                          }
                          onSelectSingleLocation(location)
                        }}
                      >
                        <div className="text-sm font-semibold">
                          {name}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {r.display_name}
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <div className="p-4 text-sm text-muted-foreground">
                {query.trim()
                  ? selectedPreview
                    ? "No results yet..."
                    : "No results found."
                  : "Start typing to search."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
