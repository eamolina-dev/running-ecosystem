import api from "./client"

const url = "/organizations"

// export const fetchOrganizationById = async (id: number) => {
//   try {
//     const res = await api.get(`${url + '/' + id}`)
//     return res.data
//   } catch (error) {
//     console.error("Error al obtener la organizacion:", error)
//     throw error
//   }
// }

export const fetchEventsByOrg = async (orgId: number) => {
  const res = await api.get(`/${url + '/' + orgId}/events`)
  return res.data
}
