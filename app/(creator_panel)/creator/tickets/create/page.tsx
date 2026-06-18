"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { AlertCircle, Crown, DollarSign, Plus, Ticket, Trash2, X } from "lucide-react"

type EventOption = {
  id: string
  title: string
  status: string
}

export default function CreateTicketPage() {
  const router = useRouter()
  const [ticketData, setTicketData] = useState({
    eventId: "",
    ticketType: "",
    access: "STREAM",
    price: 0,
    benefits: [] as string[],
    quantity: 100,
    description: "",
  })
  const [currentBenefit, setCurrentBenefit] = useState("")
  const [events, setEvents] = useState<EventOption[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/creator/events", { cache: "no-store" })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message ?? "Failed to load events")
        }

        setEvents((data.events ?? []).map((event: { id: string; title: string; status: string }) => ({
          id: event.id,
          title: event.title,
          status: event.status,
        })))

        if (data.events?.length) {
          setTicketData((prev) => ({ ...prev, eventId: data.events[0].id }))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setTicketData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }))
  }

  const addBenefit = () => {
    if (currentBenefit.trim() && !ticketData.benefits.includes(currentBenefit.trim())) {
      setTicketData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, currentBenefit.trim()],
      }))
      setCurrentBenefit("")
    }
  }

  const removeBenefit = (index: number) => {
    setTicketData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSubmitting(true)
      setError("")

      const response = await fetch(`/api/creator/events/${ticketData.eventId}/tickets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ticketData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message ?? "Failed to create ticket")
      }

      router.push("/creator/tickets")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create ticket")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-t-2 border-red-600 border-solid rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Create New Ticket</h1>
            <p className="text-muted-foreground text-sm mt-1">Set up a new ticket type for a creator event</p>
          </div>
          <button
            onClick={() => router.back()}
            className="bg-muted hover:bg-muted-foreground rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && <div className="mb-4 text-sm text-red-400">{error}</div>}

        <form onSubmit={handleSubmit} className="border border-border rounded-2xl p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Ticket className="w-4 h-4 inline mr-2" />
              Select Event *
            </label>
            <select
              name="eventId"
              value={ticketData.eventId}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Choose an event</option>
              {events.map((event) => (
                <option key={event.id} value={event.id}>
                  {event.title} ({event.status})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Ticket className="w-4 h-4 inline mr-2" />
                Ticket Access *
              </label>
              <select
                name="access"
                value={ticketData.access}
                onChange={handleInputChange}
                required
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              >
                <option value="STREAM">Stream Access</option>
                <option value="VENUE">Venue Access</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <Crown className="w-4 h-4 inline mr-2" />
                Ticket Type *
              </label>
              <input
                type="text"
                name="ticketType"
                value={ticketData.ticketType}
                onChange={handleInputChange}
                placeholder="e.g., VIP Pass, Standard, Premium"
                required
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Price (NGN) *
              </label>
              <input
                type="number"
                name="price"
                value={ticketData.price}
                onChange={handleInputChange}
                min="0"
                required
                placeholder="0"
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Quantity Available *</label>
              <input
                type="number"
                name="quantity"
                value={ticketData.quantity}
                onChange={handleInputChange}
                min="1"
                required
                className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Description</label>
            <textarea
              name="description"
              value={ticketData.description}
              onChange={handleInputChange}
              placeholder="Describe what this ticket includes"
              rows={3}
              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Ticket Benefits</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentBenefit}
                onChange={(e) => setCurrentBenefit(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
                placeholder="e.g., Front row seat, Exclusive merchandise"
                className="flex-1 w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button
                type="button"
                onClick={addBenefit}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>

            {ticketData.benefits.length > 0 && (
              <div className="space-y-2">
                {ticketData.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="bg-muted border border-border rounded-lg px-4 py-2 flex items-center justify-between"
                  >
                    <span className="text-muted-foreground">+ {benefit}</span>
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-yellow-300 text-sm space-y-1">
              <p className="font-medium">Ticket Information</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Ensure the event exists before creating tickets</li>
                <li>Set competitive prices to attract more buyers</li>
                <li>Clearly describe all ticket benefits</li>
              </ul>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 bg-muted hover:bg-muted-foreground text-foreground px-6 py-3 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white px-6 py-3 rounded-lg transition-colors"
            >
              {submitting ? "Creating..." : "Create Ticket"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
