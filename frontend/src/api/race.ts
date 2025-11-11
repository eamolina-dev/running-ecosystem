import api from "./client"

const url = "/races"

// 🟢 Obtener todas las carreras
export async function fetchRaces() {
  try {
    const res = await api.get(url)
    return res.data
  } catch (error) {
    console.error("Error al obtener las carreras:", error)
    throw error
  }
}

// 🟢 Obtener una carrera por ID
export async function fetchRaceById(id: number) {
  try {
    const res = await api.get(`${url}/${id}`)
    return res.data
  } catch (error) {
    console.error("Error al obtener la carrera:", error)
    throw error
  }
}

// 🟢 Obtener resultados de una carrera
export async function fetchResultsByRace(raceId: number) {
  try {
    const res = await api.get(`${url}/${raceId}/results`)
    return res.data
  } catch (error) {
    console.error("Error al obtener los resultados de la carrera:", error)
    throw error
  }
}

// 🟡 Crear carrera
export async function createRace(data: any, token: string) {
  try {
    const res = await api.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Error al crear la carrera:", error)
    throw error
  }
}

// 🟡 Actualizar carrera
export async function updateRace(id: number, data: any, token: string) {
  try {
    const res = await api.put(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Error al actualizar la carrera:", error)
    throw error
  }
}

// 🔴 Eliminar carrera
export async function deleteRace(id: number, token?: string) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const res = await api.delete(`${url}/${id}`, { headers })
    return res.data
  } catch (error) {
    console.error("Error al eliminar la carrera:", error)
    throw error
  }
}
