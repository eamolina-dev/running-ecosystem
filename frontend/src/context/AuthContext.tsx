import React, { createContext, useState, useEffect } from "react"
import type { ReactNode } from "react" // 👈 esta línea es la clave
import { getCurrentUser } from "../api/auth"

// --- Tipado de usuario
// interface User {
//   id: number
//   email: string
//   username: string
//   role: string
// }

type User = {
  id: number
  email: string
  username: string
  role: "runner" | "organization"
  runner_id?: number
  organization_id?: number
}


// --- Tipado del contexto
interface AuthContextType {
  user: User | null
  token: string | null
  loading: boolean
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setLoading(false)
        return
      }

      try {
        const data = await getCurrentUser(token)
        if (data) setUser(data)
        else logout()
      } catch (error) {
        console.error("Error obteniendo usuario:", error)
        logout()
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [token])

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    setToken(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
