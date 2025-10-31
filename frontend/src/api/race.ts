import api from "./client"

export const fetchEventRaces = async (eventId: number) => {
  const res = await api.get(`/races/event/${eventId}/races`)
  return res.data
}
