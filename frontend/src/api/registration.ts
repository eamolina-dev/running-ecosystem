import api from "./client"

export const fetchRunnerRegistrations = async (runnerId: number) => {
  const res = await api.get(`/registration/runner/${runnerId}/registrations`)
  return res.data
}

