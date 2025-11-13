// src/pages/LoginPage.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { login } from "@/api/auth"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LoginPage() {
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
      setAuth(res.access_token)
      navigate("/dashboard")
    } catch {
      setError("Email o contraseña incorrectos.")
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <Card className="w-[380px] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Iniciar sesión</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
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
              Entrar
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-sm text-gray-500 justify-center">
          ¿No tenés cuenta?
          <Button
            variant="link"
            className="pl-1"
            onClick={() => navigate("/register")}
          >
            Registrate
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
