// src/pages/Calendar.tsx
import { useEffect, useState } from "react"
import { fetchEvents } from "@/api/event"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Event } from "@/types/types"
import EventCard from "./EventCard"


export default function Calendar() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error)
  }, [])

  if (events.length === 0)
    return <div className="p-8 text-center text-gray-500">No hay eventos próximos</div>

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Calendario de Eventos</h1>
      {events.map((event) => (
        <EventCard 
          id={event.id} 
          name={event.name} 
          location={""} 
          start_date={event.start_date} 
          end_date={event.end_date} 
          year={2020} 
          status={"upcoming"}
          // organization={null}
        />
      ))}
    </div>
  )
}
