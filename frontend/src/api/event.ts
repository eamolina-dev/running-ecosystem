import api from "./client"

const url = "/events"

export async function fetchEvents() {
  try {
    const res = await api.get(url)
    return res.data
  } catch (error) {
    console.error("Error al obtener los eventos:", error)
    throw error
  }
}

export const fetchEventById = async (id: number) => {
  try {
    const res = await api.get(`${url + '/' + id}`)
    return res.data
  } catch (error) {
    console.error("Error al obtener el evento:", error)
    throw error
  }
}

export const fetchOrgByEvent = async (eventId: number) => {
  try {
    const res = await api.get(`${url + '/' + eventId}/organization`)
    console.log(res.data);
    return res.data
  } catch (error) {
    console.error("Error al obtener la organización del evento:", error)
    throw error
  }
}

export const fetchRacesByEvent = async (eventId: number) =>  {
  try {
    const res = await api.get(`${url + '/' + eventId}/races`)
    console.log("RACESSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log("RACESSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log("RACESSSSSSSSSSSSSSSSSSSSSSSSSS");

    console.log(res.data);

    console.log("RACESSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log("RACESSSSSSSSSSSSSSSSSSSSSSSSSS");
    console.log("RACESSSSSSSSSSSSSSSSSSSSSSSSSS");

    return res.data
  } catch (error) {
    console.error("Error al obtener las carreras:", error)
    throw error
  }
}
