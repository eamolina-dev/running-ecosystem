import React, { createContext, useState, useEffect } from "react"
import { getCurrentUser } from "../api/auth"

interface User {
  id: number
  email: string
  username: string
  role: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (token: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"))

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const data = await getCurrentUser(token)
          setUser(data)
        } catch {
          logout()
        }
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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
