// src/pages/Calendar.tsx
import { useEffect, useState } from "react"
import { fetchEvents } from "@/api/event"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Event {
  id: number
  name: string
  location: string
  date: string
  organization_name: string
}

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
        <Card key={event.id}>
          <CardHeader>
            <CardTitle>{event.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Ubicación:</strong> {event.location}</p>
            <p><strong>Organiza:</strong> {event.organization_name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
