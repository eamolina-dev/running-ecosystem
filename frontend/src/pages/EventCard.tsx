// src/components/EventCard.tsx
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import type { Event, Organization } from "@/types/types"
import { fetchOrgByEvent } from "@/api/event"

interface EventCardProps extends Partial<Event> {
  onClick?: (id: number) => void
}

const EventCard: React.FC<EventCardProps> = ({
  id = 0,
  name = "",
  location = "",
  start_date = "",
  end_date = "",
  status = "upcoming",
  // organization,
  onClick,
}) => {
  const [organization, setOrganization] = useState<Organization | null>(null)
  const navigate = useNavigate()
  
    useEffect(() => {
      if (!id) return
      const eventId = Number(id)
  
      const fetchData = async () => {
        try {
          const orgData = await fetchOrgByEvent(eventId)
          setOrganization(orgData)
        } catch (error) {
          console.error("Error cargando evento:", error)
        } finally {
          // setLoading(false)
        }
      }
  
      fetchData()
    }, [id])

  const statusColor = {
    upcoming: "text-green-600",
    finished: "text-gray-500",
    cancelled: "text-red-600",
  }

  const handleClick = () => {
    if (onClick) onClick(id)
    else navigate(`/events/${id}`)
  }

  return (
    <Card
      key={id}
      className="cursor-pointer hover:shadow-md transition"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Fecha:</strong> {new Date(start_date).toLocaleDateString()} - {new Date(end_date).toLocaleDateString()}</p>
        {location && <p><strong>Ubicación:</strong> {location}</p>}
        {organization && (
          <p className="text-sm text-gray-600">
            <strong>Organiza:</strong>{" "}
            <span
              onClick={(e) => {
                e.stopPropagation()
                navigate(`/users/${organization.user_id}`)
              }}
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {organization.name}
            </span>
          </p>
        )}
        <p className={`text-sm font-medium ${statusColor[status]}`}>{status.toUpperCase()}</p>
      </CardContent>
    </Card>
  )
}

export default EventCard
