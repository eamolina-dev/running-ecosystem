import api from "./client"

const url = "/organizations"

// 🟢 Obtener todas las organizaciones
export async function fetchOrganizations() {
  try {
    const res = await api.get(url)
    return res.data
  } catch (error) {
    console.error("Error al obtener las organizaciones:", error)
    throw error
  }
}

// 🟢 Obtener organización por ID
export async function fetchOrganizationById(id: number) {
  try {
    const res = await api.get(`${url}/${id}`)
    return res.data
  } catch (error) {
    console.error("Error al obtener la organización:", error)
    throw error
  }
}

// 🟢 Obtener los eventos de una organización
export async function fetchEventsByOrg(orgId: number) {
  try {
    const res = await api.get(`${url}/${orgId}/events`)
    return res.data
  } catch (error) {
    console.error("Error al obtener los eventos de la organización:", error)
    throw error
  }
}

// 🟡 Crear organización
export async function createOrganization(data: any, token: string) {
  try {
    const res = await api.post(url, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Error al crear la organización:", error)
    throw error
  }
}

// 🟡 Actualizar organización
export async function updateOrganization(id: number, data: any, token: string) {
  try {
    const res = await api.put(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return res.data
  } catch (error) {
    console.error("Error al actualizar la organización:", error)
    throw error
  }
}

// 🔴 Eliminar organización
export async function deleteOrganization(id: number, token?: string) {
  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined
    const res = await api.delete(`${url}/${id}`, { headers })
    return res.data
  } catch (error) {
    console.error("Error al eliminar la organización:", error)
    throw error
  }
}
