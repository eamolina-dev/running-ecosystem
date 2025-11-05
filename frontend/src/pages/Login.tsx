import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../api/auth"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const { login: setAuth } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await login({ email, password })
      setAuth(res.access_token) // guarda token y user en contexto
      navigate("/profile")
    } catch {
      setError("Email o contraseña incorrectos.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-semibold mb-4 text-center">Iniciar sesión</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <label className="block mb-2 text-sm font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <label className="block mb-2 text-sm font-medium">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-md px-3 py-2 mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Iniciar sesión
        </button>
      </form>
    </div>
  )
}

export default Login
