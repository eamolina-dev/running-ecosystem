import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById, fetchRacesByEvent } from "../api/event"
import RaceCard from "./RaceCard"

const EventDetail = () => {
  const { id } = useParams()
  const [event, setEvent] = useState<any>(null)
  const [races, setRaces] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      if (!id) return
      const [eventData, raceData] = await Promise.all([
        fetchEventById(Number(id)),
        fetchRacesByEvent(Number(id))
      ])
      setEvent(eventData)
      setRaces(raceData)
    }
    load()
  }, [id])

  const handleRegister = (raceId: number) => {
    alert(`Inscripción simulada para carrera ID ${raceId}`)
  }

  if (!event) return <p className="p-6">Cargando...</p>

  return (
    <div className="p-6">
      <div className="mb-6 border-b pb-4">
        <h1 className="text-3xl font-bold">{event.name}</h1>
        <p className="text-gray-600">{event.location}</p>
        <p className="text-gray-600">{event.date}</p>
        <p className="mt-2">{event.description}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Carreras disponibles</h2>
        {races.length === 0 ? (
          <p>No hay carreras registradas.</p>
        ) : (
          races.map((race) => (
            <RaceCard key={race.id} race={race} onRegister={handleRegister} />
          ))
        )}
      </div>
    </div>
  )
}

export default EventDetail
