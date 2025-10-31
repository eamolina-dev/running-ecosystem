import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById } from "../api/event"
// import { Event, Race } from "@/types/event"

const Event = () => {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<any>(null)
  // const [races, setRaces] = useState<Race[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const data = await fetchEventById(Number(id))
        if (data) {
          setEvent(data.event)
          // setRaces(data.races)
        }
      } catch (error) {
        console.error("Error fetching event:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <p className="p-6">Cargando evento...</p>
  if (!event) return <p className="p-6">Evento no encontrado</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      <p className="text-gray-600 mb-4">{event.description}</p>
      <p className="text-sm text-gray-500">
        {event.start_date} - {event.end_date} | {event.location}
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Carreras / Distancias</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {races.map(race => (
          <div key={race.id} className="p-4 border rounded shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold">{race.name}</h3>
            <p>Distancia: {race.distance_km}K | Terreno: {race.terrain_type}</p>
            <p>Elevación: {race.elevation_gain} m | Precio: ${race.price}</p>
            <p>Hora de inicio: {new Date(race.start_datetime).toLocaleTimeString()}</p>
            <p>Máx participantes: {race.max_participants}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Event
