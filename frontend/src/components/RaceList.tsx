import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchEventsByOrg } from "@/api/organization"
import { useAuth } from "@/hooks/useAuth"
import EventCard from "@/components/EventCard"
import { Button } from "@/components/ui/button"
import type { Event, Race } from "@/types/types"
import EventItem from "./EventItem"
import RaceItem from "./RaceItem"

interface RaceListProps {
  races: Race[]
  // onEdit?: (id: number) => void
  // onDelete?: (id: number) => void
}


const RaceList: React.FC<RaceListProps> = ({races}) => {
  // const { user } = useAuth()
  const navigate = useNavigate()
  // const [races, setRaces] = useState<Event[]>([])

  // useEffect(() => {
  //   if (!eventId) return
  //   fetchEventsByOrg(eventId.organization_id).then(setRaces).catch(console.error)
  // }, [eventId])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mis Carreras</h1>
        <Button
          onClick={() =>
            navigate("/races/create", {
              // state: { eventId: eventId },
            })
          }
        >
          Crear Carrera
        </Button>
      </div>

      {races.length === 0 ? (
        <p className="text-gray-500 text-center">No hay carreras creadas.</p>
      ) : (
        <div className="space-y-4">
          {races.map((r) => (
            <RaceItem 
              race={r}
              onEdit={() => navigate(`/races/${r.id}/edit`)}
              onDelete={() => console.log("CARRERA BORRADA!!!")}
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

export default RaceList