"use client"

import { useState } from "react"
import ScheduleStreamComponent from "../_component/schedule-stream-component"

export default function NewEventPage() {
  const [showScheduler, setShowScheduler] = useState(true)

  const handleSchedule = (eventData: any) => {
    console.log("Event scheduled:", eventData)
    // Handle the scheduled event data
  }

  const handleClose = () => {
    setShowScheduler(false)
    // Redirect back to events page
    window.history.back()
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showScheduler && <ScheduleStreamComponent onClose={handleClose} onSchedule={handleSchedule} />}
    </div>
  )
}
