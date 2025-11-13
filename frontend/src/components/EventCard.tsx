import { useState, useEffect } from "react"
import { Card, CardAction, CardDescription, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { useNavigate } from "react-router-dom"
import type { Event, Organization } from "@/types/types"
import { fetchOrgByEvent } from "@/api/event"

interface EventCardProps extends Partial<Event> {
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onClick?: (id: number) => void
}

const EventCard: React.FC<EventCardProps> = ({
  id = 0,
  name = "",
  location = "",
  start_date = "",
  end_date = "",
  status = "upcoming",
  onEdit,
  onDelete,
  onClick,
}) => {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!id) return

    const fetchData = async () => {
      try {
        const orgData = await fetchOrgByEvent(Number(id))
        setOrganization(orgData)
      } catch (error) {
        console.error("Error cargando evento:", error)
      }
    }

    fetchData()
  }, [id])

  const statusColor = {
    upcoming: "text-green-600",
    finished: "text-gray-500",
    cancelled: "text-red-600",
  }

  const handleNavigate = () => {
    if (onClick) onClick(id)
    else navigate(`/events/${id}`)
  }

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation()
    onEdit ? onEdit(id) : navigate(`/events/${id}/edit`)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete?.(id)
  }

  return (
    <Card
      key={id}
      onClick={handleNavigate}
      className="flex flex-row justify-between px-4 py-3 hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          📍 {location || "Sin ubicación"} — 🗓️{" "}
          {start_date && new Date(start_date).toLocaleDateString()} →{" "}
          {end_date && new Date(end_date).toLocaleDateString()}
        </p>
        {organization && (
          <p className="text-sm text-gray-500">
            <strong>Organiza:</strong>{" "}
            <span
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/users/${organization.user_id}`)
              }}
              className="text-blue-600 hover:underline"
            >
              {organization.name}
            </span>
          </p>
        )}
        <p className={`text-xs font-medium ${statusColor[status]}`}>
          {status.toUpperCase()}
        </p>
      </div>


      <div className="flex flex-col gap-2">
        <Button variant="outline" size="sm" onClick={handleEdit}>
          <Pencil className="h-4 w-4 mr-1" /> Editar
        </Button>
        <Button variant="destructive" size="sm" onClick={handleDelete}>
          <Trash2 className="h-4 w-4 mr-1" /> Eliminar
        </Button>
      </div>
    </Card>
  )
}

export default EventCard
