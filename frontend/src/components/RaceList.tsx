import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { Button } from "@/components/ui/button"
import type { Race } from "@/types/types"
import RaceCard from "@/components/RaceCard"
import { fetchRacesByEvent } from "@/api/event" // si ya tenés este endpoint

interface RaceListProps {
  eventId?: number
}

const RaceList: React.FC<RaceListProps> = ({ eventId }) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [races, setRaces] = useState<Race[]>([])

  useEffect(() => {
    if (!eventId) return
    fetchRacesByEvent(eventId).then(setRaces).catch(console.error)
  }, [eventId])

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mis Carreras</h1>
        <Button
          onClick={() =>
            navigate("/races/create", {
              state: { eventId },
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
          {races.map((race) => (
            <RaceCard
              key={race.id}
              id={race.id}
              name={race.name}
              distance_km={race.distance_km}
              terrain_type={race.terrain_type}
              elevation_gain={race.elevation_gain}
              price={race.price}
              start_datetime={race.start_datetime}
              max_participants={race.max_participants}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default RaceList
