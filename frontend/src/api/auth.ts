import api from "./client"

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  username: string
  password: string
}

export const login = async (data: LoginData) => {
  const res = await api.post("/auth/login", data)
  return res.data
}

export const register = async (data: RegisterData) => {
  const res = await api.post("/auth/register", data)
  return res.data
}

export const getCurrentUser = async (token: string) => {
  const res = await api.get("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}
