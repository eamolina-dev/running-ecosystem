import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchEventsByOrg } from "@/api/organization"
import { useAuth } from "@/hooks/useAuth"
import EventCard from "@/components/EventCard"
import { Button } from "@/components/ui/button"
import type { Event } from "@/types/types"
import EventItem from "./EventItem"

export default function EventList() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (!user?.organization_id) return
    fetchEventsByOrg(user.organization_id).then(setEvents).catch(console.error)
  }, [user])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mis Eventos</h1>
        <Button onClick={() => navigate("/events/create")}>Crear Evento</Button>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-center">No hay eventos creados.</p>
      ) : (
        <div className="space-y-4">
          {events.map((ev) => (
            <EventItem 
              event={ev}
              onEdit={() => navigate(`/events/${ev.id}/edit`)}
              onDelete={() => console.log("EVENTO BORRADO!!!")}
            />
            // <EventCard
            //   key={ev.id}
            //   id={ev.id}
            //   name={ev.name}
            //   location={ev.location}
            //   start_date={ev.start_date}
            //   end_date={ev.end_date}
            //   year={ev.year}
            //   status={ev.status as any}
            //   onClick={() => navigate(`/events/${ev.id}`)}
            // />
          ))}
        </div>
      )}
    </div>
  )
}
