"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { X, Save, Plus, Trash2, AlertCircle, DollarSign, Crown, Ticket } from "lucide-react"

export default function CreateTicketPage() {
  const router = useRouter()
  const [ticketData, setTicketData] = useState({
    streamId: "",
    ticketType: "",
    access: "",
    price: 0,
    benefits: [] as string[],
    quantity: 100,
    description: "",
  })
  const [currentBenefit, setCurrentBenefit] = useState("")
  const [streams, setStreams] = useState([
    { id: 1, title: "Music Production Masterclass", status: "scheduled" },
    { id: 2, title: "Q&A Session with Fans", status: "scheduled" },
  ])
  const [access, setAccess] = useState([
    { id: 'STREAM', title: "Stream Access", status: "scheduled" },
    { id: 'VENUE', title: "Venue Access", status: "scheduled" },
  ])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Submit ticket data
    console.log("Ticket created:", ticketData)
    router.push("/creator/tickets")
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Create New Ticket
            </h1>
            <p className="text-gray-400 text-sm mt-1">Set up a new ticket type for your stream</p>
          </div>
          <button
            onClick={() => router.back()}
            className="bg-muted hover:bg-muted-foreground rounded-lg p-2 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className=" border border-border hover:border-red-600/50 hover:shadow-lg hover:shadow-red-600/5 rounded-2xl p-8 space-y-6">
          {/* Select Stream */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              <Ticket className="w-4 h-4 inline mr-2" />
              Select Stream *
            </label>
            <select
              name="streamId"
              value={ticketData.streamId}
              onChange={handleInputChange}
              required
              className="w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Choose a stream</option>
              {streams.map((stream) => (
                <option key={stream.id} value={stream.id}>
                  {stream.title}
                </option>
              ))}
            </select>
          </div>

            <div className=" grid grid-cols-1 md:grid-cols-2 w-full justify-between gap-8">
              
            {/* Ticket Access */}
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
              className=" w-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">Choose a ticket access level</option>
              {access.map((access) => (
                <option key={access.id} value={access.id}>
                  {access.title}
                </option>
              ))}
            </select>
          </div>

            
           {/* Ticket Type */}
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

          {/* Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                <DollarSign className="w-4 h-4 inline mr-2" />
                Price (₦) *
              </label>
              <input
                type="number"
                name="price"
                value={ticketData.price}
                onChange={handleInputChange}
                min="0"
                required
                placeholder="0"
                className="ww-full bg-transparent border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-red-600"
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

          {/* Description */}
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

          {/* Benefits */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Ticket Benefits</label>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={currentBenefit}
                onChange={(e) => setCurrentBenefit(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addBenefit())}
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
                    <span className="text-gray-400">✓ {benefit}</span>
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

          {/* Info Box */}
          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div className="text-yellow-300 text-sm space-y-1">
              <p className="font-medium">Ticket Information</p>
              <ul className="list-disc list-inside space-y-0.5">
                <li>Ensure your stream is scheduled before creating tickets</li>
                <li>Set competitive prices to attract more buyers</li>
                <li>Clearly describe all ticket benefits</li>
              </ul>
            </div>
          </div>

          {/* Submit Buttons */}
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
              className="flex-1 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
