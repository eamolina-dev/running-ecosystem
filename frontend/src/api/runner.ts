import api from "./client"

const url = 'runners'

export const fetchRegistrationsByRunner = async (runnerId: number) => {
  try {
    const res = await api.get(`${url + '/' + runnerId}/registrations`)
    return res.data
  } catch (error) {
    console.error("Error al obtener los resultados de la carrera:", error)
    throw error
  }
}
