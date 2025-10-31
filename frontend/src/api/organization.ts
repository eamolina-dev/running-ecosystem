import api from "./client"

export const getOrgEvents = async (orgId: number) => {
  const res = await api.get(`/organizations/${orgId}/events`)
  return res.data
}
