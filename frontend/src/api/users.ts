import api from "./client"

const url = "/users"

export const fetchUserById = async (id: number) => {
  try {
    const res = await api.get(`${url + '/' + id}`)
    console.log("USERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
    console.log(res.data);
    return res.data
  } catch (error) {
    console.error("Error al obtener el usuario:", error)
    throw error
  }
}
