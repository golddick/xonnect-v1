"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from "lucide-react"

type TicketState = {
  ticketType: string
  access: "STREAM" | "VENUE"
  price: number
  quantity: number
  description: string
  benefits: string[]
  eventTitle: string
  eventStatus: string
  scheduledAt: string | null
  soldCount: number
}

const emptyState: TicketState = {
  ticketType: "",
  access: "STREAM",
  price: 0,
  quantity: 0,
  description: "",
  benefits: [],
  eventTitle: "",
  eventStatus: "",
  scheduledAt: null,
  soldCount: 0,
}

export default function EditTicketPage() {
  const router = useRouter()
  const params = useParams<{ id: string }>()
  const ticketId = params.id

  const [state, setState] = useState<TicketState>(emptyState)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [currentBenefit, setCurrentBenefit] = useState("")

  useEffect(() => {
    let active = true

    const loadTicket = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/creator/tickets/${ticketId}`, { cache: "no-store" })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data?.message ?? "Failed to load ticket")
        }

        if (!active) return

        const ticket = data.ticket
        setState({
          ticketType: ticket.ticketType ?? "",
          access: ticket.access === "VENUE" ? "VENUE" : "STREAM",
          price: ticket.price ?? 0,
          quantity: ticket.quantity ?? 0,
          description: ticket.description ?? "",
          benefits: ticket.benefits ?? [],
          eventTitle: ticket.event?.title ?? "",
          eventStatus: ticket.event?.status ?? "",
          scheduledAt: ticket.event?.scheduledAt ?? null,
          soldCount: ticket.soldCount ?? 0,
        })
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Failed to load ticket")
      } finally {
        if (active) setLoading(false)
      }
    }

    void loadTicket()

    return () => {
      active = false
    }
  }, [ticketId])

  const canEdit = useMemo(() => {
    const scheduledAt = state.scheduledAt ? new Date(state.scheduledAt) : null
    const passed = scheduledAt ? scheduledAt <= new Date() : false
    return state.eventStatus !== "LIVE" && state.eventStatus !== "ENDED" && !passed
  }, [state.eventStatus, state.scheduledAt])

  const update = <K extends keyof TicketState>(key: K, value: TicketState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }

  const addBenefit = () => {
    const next = currentBenefit.trim()
    if (!next || state.benefits.includes(next)) return
    setState((prev) => ({ ...prev, benefits: [...prev.benefits, next] }))
    setCurrentBenefit("")
  }

  const removeBenefit = (benefit: string) => {
    setState((prev) => ({ ...prev, benefits: prev.benefits.filter((item) => item !== benefit) }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!canEdit) {
      setError("This ticket can no longer be edited.")
      return
    }

    try {
      setSaving(true)
      const response = await fetch(`/api/creator/tickets/${ticketId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketType: state.ticketType,
          access: state.access,
          price: state.price,
          quantity: state.quantity,
          description: state.description,
          benefits: state.benefits,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message ?? "Failed to save ticket")
      }

      router.push("/creator/tickets")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save ticket")
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Delete this ticket?")) return

    try {
      setSaving(true)
      const response = await fetch(`/api/creator/tickets/${ticketId}`, {
        method: "DELETE",
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data?.message ?? "Failed to delete ticket")
      }

      router.push("/creator/tickets")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete ticket")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-6 text-foreground">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-red-500" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background p-4 text-foreground md:p-6">
      <div className="mx-auto max-w-3xl space-y-6">
        <button type="button" onClick={() => router.back()} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div>
          <h1 className="text-3xl font-bold">Edit Ticket</h1>
          <p className="mt-1 text-sm text-muted-foreground">{state.eventTitle}</p>
        </div>

        {!canEdit && (
          <div className="rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
            This ticket is attached to an event that is live or has already passed.
          </div>
        )}

        {error && <div className="rounded-2xl border border-red-600/30 bg-red-600/10 px-4 py-3 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Ticket Type</label>
              <input
                type="text"
                value={state.ticketType}
                onChange={(e) => update("ticketType", e.target.value)}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Access</label>
              <select
                value={state.access}
                onChange={(e) => update("access", e.target.value === "VENUE" ? "VENUE" : "STREAM")}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              >
                <option value="STREAM">Stream</option>
                <option value="VENUE">Venue</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Price</label>
              <input
                type="number"
                min={0}
                value={state.price}
                onChange={(e) => update("price", Number(e.target.value))}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">Quantity</label>
              <input
                type="number"
                min={state.soldCount}
                value={state.quantity}
                onChange={(e) => update("quantity", Number(e.target.value))}
                disabled={!canEdit}
                className="w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">Description</label>
              <textarea
                value={state.description}
                onChange={(e) => update("description", e.target.value)}
                disabled={!canEdit}
                className="min-h-24 w-full rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium">Benefits</label>
              <button type="button" onClick={addBenefit} disabled={!canEdit} className="text-sm text-red-400 disabled:opacity-50">
                Add benefit
              </button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={currentBenefit}
                onChange={(e) => setCurrentBenefit(e.target.value)}
                disabled={!canEdit}
                className="flex-1 rounded-xl border border-border bg-transparent px-4 py-3 disabled:opacity-50"
                placeholder="Front row seat, merch, etc."
              />
              <button type="button" onClick={addBenefit} disabled={!canEdit} className="rounded-xl bg-red-600 px-4 py-3 text-white disabled:opacity-50">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {state.benefits.map((benefit) => (
                <span key={benefit} className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm">
                  {benefit}
                  <button type="button" onClick={() => removeBenefit(benefit)} disabled={!canEdit}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-background/50 p-4 text-sm text-muted-foreground">
            Sold tickets are locked into the current quantity: {state.soldCount}
          </div>

          <div className="flex gap-3">
            <button type="button" onClick={() => router.back()} className="flex-1 rounded-xl border border-border px-4 py-3">
              Cancel
            </button>
            <button type="button" onClick={handleDelete} disabled={saving} className="rounded-xl border border-red-600/40 px-4 py-3 text-red-400 disabled:opacity-50">
              Delete
            </button>
            <button type="submit" disabled={!canEdit || saving} className="flex-1 rounded-xl bg-red-600 px-4 py-3 text-white disabled:opacity-50">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
