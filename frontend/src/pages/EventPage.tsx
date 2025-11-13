// src/pages/EventPage.tsx
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { fetchEventById, fetchOrgByEvent, fetchRacesByEvent } from "@/api/event"
import { createRace } from "@/api/race" // 🔹 Nuevo: endpoint para crear carrera
import type { Event, Race, Organization } from "@/types/types"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import RaceCard from "@/components/RaceCard"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import RaceList from "@/components/RaceList"

export default function EventPage() {
  const { id } = useParams<{ id: string }>()
  const [event, setEvent] = useState<Event | null>(null)
  const [races, setRaces] = useState<Race[]>([])
  const [organization, setOrganization] = useState<Organization | null>(null)
  const [loading, setLoading] = useState(true)
  const [addingCustom, setAddingCustom] = useState(false)
  const [customDistance, setCustomDistance] = useState("")
  const [creating, setCreating] = useState(false)
  const { user, token } = useAuth()
  const navigate = useNavigate()

  const isOrganizer = user?.organization_id === event?.organization_id

  useEffect(() => {
    if (!id) return
    const eventId = Number(id)

    const fetchData = async () => {
      try {
        const [eventData, raceData, orgData] = await Promise.all([
          fetchEventById(eventId),
          fetchRacesByEvent(eventId),
          fetchOrgByEvent(eventId),
        ])
        setEvent(eventData)
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

  const handleAddRace = async (distance: string) => {
    if (!event || !token) return
    setCreating(true)
    try {
      const newRace = await createRace(
        { event_id: event.id, distance_km: distance },
        token
      )
      setRaces([...races, newRace])
    } catch (error) {
      console.error("Error al crear carrera:", error)
      alert("No se pudo crear la carrera ❌")
    } finally {
      setCreating(false)
      setAddingCustom(false)
      setCustomDistance("")
    }
  }

  if (loading) return <p className="p-6">Cargando evento...</p>
  if (!event) return <p className="p-6">Evento no encontrado</p>

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{event.name}</h1>
          {event.description && (
            <p className="text-gray-600 mb-3">{event.description}</p>
          )}
          <p className="text-sm text-gray-500">
            {event.start_date} - {event.end_date} | {event.location}
          </p>
          {organization && (
            <p className="text-sm text-gray-600 mt-2">
              <strong>Organiza:</strong>{" "}
              <span
                onClick={() => navigate(`/organization/${organization.id}`)}
                className="text-blue-600 hover:underline cursor-pointer"
              >
                {organization.name}
              </span>
            </p>
          )}
        </div>

        {/* 🟢 Solo visible para organizador */}
        {isOrganizer && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={creating}>
                {creating ? "Creando..." : "Agregar Carrera"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Seleccionar distancia</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {["5", "10", "21", "42"].map((dist) => (
                <DropdownMenuItem
                  key={dist}
                  onClick={() => handleAddRace(dist)}
                >
                  {dist}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setAddingCustom(true)}>
                Otra distancia...
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* 🔹 Campo de distancia personalizada */}
      {addingCustom && (
        <div className="flex items-center gap-2 mb-4">
          <Input
            value={customDistance}
            onChange={(e) => setCustomDistance(e.target.value)}
            placeholder="Ej: 15K Trail"
          />
          <Button
            onClick={() => handleAddRace(customDistance)}
            disabled={!customDistance || creating}
          >
            Agregar
          </Button>
          <Button
            variant="ghost"
            onClick={() => setAddingCustom(false)}
            className="text-gray-500"
          >
            Cancelar
          </Button>
        </div>
      )}

      <h2 className="text-2xl font-semibold mt-8 mb-4">Carreras / Distancias</h2>
      {races.length === 0 ? (
        <p className="text-gray-500">No hay carreras asociadas.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {/* {races.map((race) => (
            <RaceCard key={race.id} {...race} />
          ))} */}
          <RaceList 
            eventId={event?.id}
          />
        </div>
      )}
    </div>
  )
}
