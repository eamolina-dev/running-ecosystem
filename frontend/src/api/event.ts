import api from "./client"

// export const get_events = async () => {
//   const res = await api.get("/events")
//   return res.data
// }


export async function fetchEvents() {
  try {
    const res = await api.get("/events")
    return res.data
  } catch (error) {
    console.error("Error al obtener los eventos:", error)
    throw error
  }
}

export const fetchOrgEvents = async (orgId: number) => {
  const res = await api.get(`/events/org/${orgId}/events`)
  return res.data
}

export const fetchEventById = async (id: number) => {
  const res = await fetch(`/events/${id}`)
  if (!res.ok) throw new Error("Error fetching event")
  return res.json()
}
