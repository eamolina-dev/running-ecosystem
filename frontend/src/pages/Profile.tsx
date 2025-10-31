import { useEffect, useState } from "react"
import { fetchEventById, fetchOrgEvents } from "../api/event"
import { fetchRunnerRegistrations } from "../api/registration"
import { useAuth } from "@/hooks/useAuth"
import EventDetailCard from "./EventDetail"
// import { Event } from "@/types/event"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const { user, loading } = useAuth()

  if (loading) return <p>Cargando...</p>
  if (!user) return <p>No hay usuario</p>
  
  const [events, setEvents] = useState<any[]>([])
  const [registrations, setRegistrations] = useState<any[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return

      if (user.role === "organization") {
        const orgEvents = await fetchOrgEvents(user.organization_id || 0)
        setEvents(orgEvents)
      }
      if (user.role === "runner") {
        const runnerRegs = await fetchRunnerRegistrations(user.runner_id || 0)
        setRegistrations(runnerRegs)
      }
    }
    fetchData()
  }, [user])

  if (!user) return <p>Cargando...</p>

  console.log("==========");
  console.log("==========");
  console.log(events);
  console.log("==========");
  console.log("==========");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">{user.username}</h1>
      <p><strong>Email:</strong> {user.email}</p>

      {/* {user.role === "organization" && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Mis Eventos</h2>
          {events.map(ev => (
            <div key={ev.id} className="p-2 border rounded mb-2">{ev.name}</div>
          ))}
        </div>
      )} */}

      {user.role === "organization" && (
        <div className="mt-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map(ev => (
            <EventDetailCard
              key={ev.id}
              id={ev.id}
              name={ev.name}
              location={ev.location}
              startDate={ev.start_date}
              endDate={ev.end_date}
              year={ev.year}
              status={ev.status}
              onClick={(id) => navigate(`/event/${id}`)}
            />
          ))}
        </div>
      )}

      {user.role === "runner" && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Mis Inscripciones</h2>
          {registrations.map(r => (
            <div key={r.id} className="p-2 border rounded mb-2">
              Race ID: {r.race_id} - Estado: {r.status}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Profile
