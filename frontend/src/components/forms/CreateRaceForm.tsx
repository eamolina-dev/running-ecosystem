// src/components/forms/RaceForm.tsx
import { z } from "zod"
import { BaseForm } from "./BaseForm"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { createRace, updateRace } from "@/api/race"
import { useAuth } from "@/modules/auth/hooks/useAuth"

const raceSchema = z.object({
  name: z.string().min(2, "El nombre es obligatorio"),
  distance_km: z.string().min(1, "La distancia es requerida"),
  date: z.string(),
  event_id: z.number(),
})

interface RaceFormProps {
  mode: "create" | "edit"
  defaultValues?: z.infer<typeof raceSchema>
  raceId?: number
  onSuccess?: () => void
}

export default function RaceForm({
  mode,
  defaultValues,
  raceId,
  onSuccess,
}: RaceFormProps) {
  const { token } = useAuth()

  const handleSubmit = async (values: z.infer<typeof raceSchema>) => {
    if (!token) return alert("No autenticado")

    try {
      if (mode === "create") {
        await createRace(values, token)
        alert("Carrera creada exitosamente")
      } else if (mode === "edit" && raceId) {
        await updateRace(raceId, values, token)
        alert("Carrera actualizada exitosamente")
      }
      onSuccess?.()
    } catch (err) {
      console.error("Error al guardar carrera", err)
      alert("Error al guardar la carrera")
    }
  }

  return (
    <BaseForm
      schema={raceSchema}
      defaultValues={
        defaultValues || { name: "", distance_km: "", date: "", event_id: 0 }
      }
      onSubmit={handleSubmit}
      className="space-y-6 max-w-lg mx-auto"
    >
      {(form) => (
        <>
          <h2 className="text-2xl font-semibold">
            {mode === "create" ? "Crear nueva carrera" : "Editar carrera"}
          </h2>

          {Object.keys(raceSchema.shape).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as keyof z.infer<typeof raceSchema>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name}</FormLabel>
                  <FormControl>
                    <Input {...field} type={field.name === "date" ? "date" : "text"} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button type="submit" className="w-full">
            {mode === "create" ? "Crear carrera" : "Guardar cambios"}
          </Button>
        </>
      )}
    </BaseForm>
  )
}
