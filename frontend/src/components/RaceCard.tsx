import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import type { Race } from "@/types/types"
import { createPreference } from "@/api/payments"

const RaceCard: React.FC<Race> = ({
  id,
  name,
  distance_km,
  terrain_type,
  elevation_gain,
  price,
  start_datetime,
  max_participants,
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!user) {
      alert("Debes iniciar sesión para inscribirte");
      return;
    }

    // Si usás runner_id separado (asegurate cuál espera tu backend)
    const effectiveUserId = (user as any).runner_id ?? user.id

    if (!effectiveUserId) {
      console.error("No se encontró user id válido en user:", user)
      alert("No se pudo obtener tu identificador. Contactá al soporte.")
      return
    }

    setLoading(true)
    try {
      const preference = await createPreference({
        raceId: id,
        userId: effectiveUserId,
        title: `${name} - ${distance_km}K`,
        price: price ?? 0,
      })

      if (preference?.init_point) {
        window.location.href = preference.init_point
      } else {
        console.error("Respuesta inválida de createPreference:", preference)
        alert("No se pudo iniciar el pago. Intentá nuevamente.")
      }
    } catch (err: any) {
      console.error("Error creando preference:", err)
      alert("Error al iniciar el pago: " + (err.message ?? err))
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>Distancia: {distance_km}K | Terreno: {terrain_type || "N/A"}</p>
        <p>Elevación: {elevation_gain || 0} m | Precio: ${price || 0}</p>
        <p>Hora: {new Date(start_datetime).toLocaleTimeString()}</p>
        <p>Máx participantes: {max_participants || "No especificado"}</p>

        {user?.role === "runner" && (
          <Button size="sm" onClick={handleRegister} disabled={loading}>
            {loading ? "Redirigiendo..." : "Inscribirme"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default RaceCard
