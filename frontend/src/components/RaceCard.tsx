import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/modules/auth/hooks/useAuth"
import { createPreference } from "@/api/payments"
import type { Race } from "@/types/types"
import { Pencil, Trash2 } from "lucide-react"

interface RaceCardProps extends Partial<Race> {
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const RaceCard: React.FC<RaceCardProps> = ({
  id = 0,
  name = "",
  distance_km = 0,
  terrain_type = "",
  elevation_gain = 0,
  price = 0,
  start_datetime = "",
  max_participants,
  onEdit,
  onDelete,
}) => {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!user) {
      alert("Debes iniciar sesión para inscribirte")
      return
    }

    const effectiveUserId = (user as any).runner_id ?? user.id
    if (!effectiveUserId) return alert("No se pudo obtener tu ID de usuario")

    setLoading(true)
    try {
      const preference = await createPreference({
        raceId: id,
        userId: effectiveUserId,
        title: `${name} - ${distance_km}K`,
        price: price ?? 0,
      })
      if (preference?.init_point) window.location.href = preference.init_point
    } catch (err: any) {
      console.error("Error creando preference:", err)
      alert("Error al iniciar el pago")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card
      key={id}
      className="flex flex-row justify-between items-start px-4 py-3 hover:shadow-md transition cursor-pointer"
    >
      {/* 📋 Info principal */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">
          🏃 {distance_km}K — {terrain_type || "Terreno no especificado"}
        </p>
        <p className="text-sm text-gray-600">
          ⛰️ Desnivel: {elevation_gain} m — 💵 ${price}
        </p>
        <p className="text-sm text-gray-500">
          🕒 {start_datetime ? new Date(start_datetime).toLocaleString() : "Sin fecha definida"}
        </p>
        {max_participants && (
          <p className="text-xs text-gray-500">
            👥 Máx participantes: {max_participants}
          </p>
        )}
      </div>

      {/* 🧭 Botones a la derecha */}
      <div className="flex flex-col gap-2">
        {user?.role === "runner" && (
          <Button size="sm" onClick={handleRegister} disabled={loading}>
            {loading ? "Redirigiendo..." : "Inscribirme"}
          </Button>
        )}

        {/* {user?.role === "organizer" && ( */}
          <>
            <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); onEdit?.(id) }}>
              <Pencil className="h-4 w-4 mr-1" /> Editar
            </Button>
            <Button variant="destructive" size="sm" onClick={(e) => { e.stopPropagation(); onDelete?.(id) }}>
              <Trash2 className="h-4 w-4 mr-1" /> Eliminar
            </Button>
          </>
        {/* )} */}
      </div>
    </Card>
  )
}

export default RaceCard
