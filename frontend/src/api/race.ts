import api from "./client"

const url = 'races'

export const fetchRaceById = async (id: number) => {
  try {
    const res = await api.get(`${url + '/' + id}`)
    return res.data
  } catch (error) {
    console.error("Error al obtener la carrera:", error)
    throw error
  }
}

export const fetchResultsByRace = async (raceId: number) => {
  try {
    const res = await api.get(`${url + '/' + raceId}/results`)
    return res.data
  } catch (error) {
    console.error("Error al obtener los resultados de la carrera:", error)
    throw error
  }
}
