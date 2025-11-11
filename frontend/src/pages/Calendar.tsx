// src/pages/Calendar.tsx
import { useEffect, useState } from "react"
import { fetchEvents } from "@/api/event"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Event } from "@/types/types"
import EventCard from "../components/EventCard"
import EventList from "@/components/EventList"


export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error)
  }, [])

  if (events.length === 0)
    return <div className="p-8 text-center text-gray-500">No hay eventos próximos</div>

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <EventList
        events={events}
        title="Calendario de Eventos"
        onClickEvent={(id) => console.log("click en evento", id)}
      />
    </div>
  )
}
