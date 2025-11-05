// src/pages/EventPage.tsx
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchEventById, fetchOrgByEvent, fetchRacesByEvent } from "@/api/event"
import type { Event, Race, Organization } from "@/types/types"
import RaceCard from "./RaceCard"
import { useNavigate } from "react-router-dom"

export default function EventPage() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [races, setRaces] = useState<Race[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return
    const eventId = Number(id)

    const fetchData = async () => {
      try {
        const eventData = await fetchEventById(eventId)
        const raceData = await fetchRacesByEvent(eventId)
        const orgData = await fetchOrgByEvent(eventId)
        setEvent(eventData.event || eventData)
        setRaces(raceData || [])
        setOrganization(orgData)
      } catch (error) {
        console.error("Error cargando evento:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  if (loading) return <p className="p-6">Cargando evento...</p>
  if (!event) return <p className="p-6">Evento no encontrado</p>

  console.log(organization);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
      {event.description && <p className="text-gray-600 mb-4">{event.description}</p>}
      <p className="text-sm text-gray-500">
        {event.start_date} - {event.end_date} | {event.location}
      </p>

      
        <p className="text-sm text-gray-600 mt-2">
          <strong>Organiza:</strong>{organization?.name}
          <span
            onClick={() => navigate(`/organization/${event.organization?.id}`)}
            className="text-blue-600 hover:underline cursor-pointer"
          >
            {organization?.name}
          </span>
        </p>
      

      <h2 className="text-2xl font-semibold mt-6 mb-2">Carreras / Distancias</h2>
      {races.length === 0 && <p className="text-gray-500">No hay carreras asociadas.</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        {races.map((race) => (
          <RaceCard key={race.id} {...race} />
        ))}
      </div>
    </div>
  )
}
