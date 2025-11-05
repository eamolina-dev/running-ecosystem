// src/components/profile/OrganizationTabs.tsx
import { useEffect, useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import EventCard from "@/components/EventCard"
import { useNavigate } from "react-router-dom"
import { fetchEventsByOrg } from "@/api/organization"

// Definimos las props que realmente necesita este componente
interface OrganizationTabsProps {
  id: number
  role: "organization" | "runner"
}

const OrganizationTabs = ({ id, role }: OrganizationTabsProps) => {
  const navigate = useNavigate()
  const [events, setEvents] = useState<any[]>([])

  useEffect(() => {
    if (role !== "organization") return
    if (!id) return

    const fetchData = async () => {
      try {
        const orgEvents = await fetchEventsByOrg(id)
        setEvents(orgEvents)
      } catch (error) {
        console.error("Error fetching org events:", error)
      }
    }

    fetchData()
  }, [id, role])

  return (
    <Tabs defaultValue="events" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="events">Eventos</TabsTrigger>
        <TabsTrigger value="media">Fotos & Videos</TabsTrigger>
        <TabsTrigger value="future">Próximos</TabsTrigger>
        <TabsTrigger value="social">Redes</TabsTrigger>
      </TabsList>

      {/* Events */}
      <TabsContent value="events">
        <Card>
          <CardHeader>
            <CardTitle>Eventos organizados</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            {events.length === 0 && <p>No hay eventos todavía</p>}

            {events.map(ev => (
              <EventCard
                key={ev.id}
                id={ev.id}
                name={ev.name}
                location={ev.location}
                start_date={ev.start_date}
                end_date={ev.end_date}
                year={ev.year}
                status={ev.status}
                onClick={() => navigate(`/events/${ev.id}`)}
              />
            ))}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="media">
        <Card><CardHeader><CardTitle>Fotos & Videos</CardTitle></CardHeader>
        <CardContent>Aún no hay contenido 📸</CardContent></Card>
      </TabsContent>

      <TabsContent value="future">
        <Card><CardHeader><CardTitle>Próximos Eventos</CardTitle></CardHeader>
        <CardContent>No hay próximos eventos 🏁</CardContent></Card>
      </TabsContent>

      <TabsContent value="social">
        <Card><CardHeader><CardTitle>Redes Sociales</CardTitle></CardHeader>
        <CardContent>IG / Web / YouTube pronto 🔗</CardContent></Card>
      </TabsContent>
    </Tabs>
  )
}

export default OrganizationTabs
