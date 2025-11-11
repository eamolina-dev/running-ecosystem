import api from "./client"

const url = "/events"

// 🟢 Obtener todos los eventos
export async function fetchEvents() {
  try {
    const res = await api.get(url)
    return res.data
  } catch (error) {
    console.error("Error al obtener los eventos:", error)
    throw error
  }
}

// 🟢 Obtener un evento por ID
export async function fetchEventById(eventId: number) {
  try {
    const res = await api.get(`${url}/${eventId}`)
    return res.data
  } catch (error) {
    console.error("Error al obtener el evento:", error)
    throw error
  }
}

// 🟢 Obtener la organización del evento
export async function fetchOrgByEvent(eventId: number) {
  try {
    const res = await api.get(`${url}/${eventId}/organization`)
    return res.data
  } catch (error) {
    console.error("Error al obtener la organización del evento:", error)
    throw error
  }
}

// 🟢 Obtener las carreras asociadas al evento
export async function fetchRacesByEvent(eventId: number) {
  try {
    const res = await api.get(`${url}/${eventId}/races`)
    return res.data
  } catch (error) {
    console.error("Error al obtener las carreras del evento:", error)
    throw error
  }
}

// 🟡 Crear un nuevo evento
export async function createEvent(data: any, token: string) {
  try {
    const res = await api.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Error al crear el evento:", error)
    throw error
  }
}

// 🟡 Actualizar un evento
export async function updateEvent(id: number, data: any, token: string) {
  try {
    const res = await api.put(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Error al actualizar el evento:", error)
    throw error
  }
}

// 🔴 Eliminar un evento
export async function deleteEvent(id: number, token?: string) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const res = await api.delete(`${url}/${id}`, { headers })
    return res.data
  } catch (error) {
    console.error("Error al eliminar el evento:", error)
    throw error
  }
}
