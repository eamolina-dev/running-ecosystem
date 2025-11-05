// src/components/RaceCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import type { Race } from "@/types/types"

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

  const handleRegister = () => {
    console.log(`Runner ${user?.id} quiere inscribirse a la carrera ${id}`)
    // TODO: implementar fetch a POST /registrations
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
          <Button size="sm" onClick={handleRegister}>
            Inscribirme
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default RaceCard
