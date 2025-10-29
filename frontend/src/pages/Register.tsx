import React, { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { register } from "../api/auth"
import { useNavigate } from "react-router-dom"

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login: setToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await register({ email, username, password })
      setToken(res.access_token)
      navigate("/dashboard")
    } catch {
      setError("Credenciales inválidas")
    }
  }

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-bold mb-4">Registrate</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-64">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" />
        <button type="submit">Confirmar</button>
      </form>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  )
}

export default RegisterPage
