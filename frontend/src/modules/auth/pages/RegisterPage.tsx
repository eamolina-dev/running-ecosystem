// src/pages/RegisterPage.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { register } from "@/api/auth"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RegisterPage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login: setToken } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const res = await register({ email, username, password })
      setToken(res.access_token)
      navigate("/dashboard")
    } catch {
      setError("Error al registrarse. Verificá los datos.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-[380px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Registrate</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="username">Nombre de usuario</Label>
              <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full">
              Confirmar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-gray-500 justify-center">
          ¿Ya tenés cuenta?
          <Button
            variant="link"
            className="pl-1"
            onClick={() => navigate("/login")}
          >
            Iniciá sesión
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
