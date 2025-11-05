import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchEvents } from "../api/event"

const EventsList = () => {
  const [events, setEvents] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      const data = await fetchEvents()
      setEvents(data)
    }
    load()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Eventos Disponibles</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => navigate(`/events/${event.id}`)}
            className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
          >
            <h2 className="text-xl font-semibold">{event.name}</h2>
            <p className="text-sm text-gray-600">{event.location}</p>
            <p className="text-sm text-gray-600">{event.date}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EventsList
