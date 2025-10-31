import api from "./client"

export const fetchRaceResults = async (raceId: number) => {
  const res = await api.get(`/results/race/${raceId}/results`)
  return res.data
}
