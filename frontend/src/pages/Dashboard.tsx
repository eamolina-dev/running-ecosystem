import { useEffect, useState } from "react"
import { useAuth } from "@/hooks/useAuth"
import EventForm from "../components/forms/EventForm"
import { fetchEventsByOrg } from "@/api/organization"
// import { fetchEventsByOrg, deleteEvent } from "@/api/organization"
import EventList from "@/components/EventList"
import type { Event } from "@/types/types"

const Dashboard = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    if (user?.organization_id) {
      fetchEventsByOrg(user.organization_id).then(setEvents).catch(console.error)
    }
  }, [user])

  const handleEdit = (id: number) => {
    console.log("Editar evento", id)
    // Redirigir a página de edición o abrir modal
  }

  const handleDelete = async (id: number) => {
    if (confirm("¿Seguro que querés eliminar este evento?")) {
      await {}
      // await deleteEvent(id)
      setEvents((prev) => prev.filter((e) => e.id !== id))
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-6">
        Bienvenido, {user?.username}
      </h1>

      <EventList
        title="Mis eventos"
        events={events}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Dashboard
