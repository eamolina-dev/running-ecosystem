import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { updateEvent, fetchEventById } from "@/api/event"
import { useAuth } from "@/hooks/useAuth"

// --- Esquema de validación con Zod ---
const eventSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  start_date: z.string().min(1, "La fecha de inicio es obligatoria."),
  end_date: z.string().min(1, "La fecha de finalización es obligatoria."),
  location: z.string().min(2, "La ubicación es obligatoria."),
  description: z.string().optional(),
  year: z.string().min(4, "Debe tener un año válido."),
})

type EventFormValues = z.infer<typeof eventSchema>

interface EditEventFormProps {
  eventId: number
  onSuccess?: () => void
}

export default function EditEventForm({ eventId, onSuccess }: EditEventFormProps) {
  const { token } = useAuth()

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: "",
      start_date: "",
      end_date: "",
      location: "",
      description: "",
      year: new Date().getFullYear().toString(),
    },
  })

  // Cargar datos del evento al montar
  useEffect(() => {
    async function loadEvent() {
      try {
        const event = await fetchEventById(eventId)
        form.reset({
          name: event.name,
          start_date: event.start_date?.split("T")[0] || "",
          end_date: event.end_date?.split("T")[0] || "",
          location: event.location,
          description: event.description,
          year: event.year?.toString(),
        })
      } catch (error) {
        console.error("Error cargando evento:", error)
      }
    }
    loadEvent()
  }, [eventId])

  const onSubmit = async (values: EventFormValues) => {
    if (!token) return alert("Usuario no autenticado")
    try {
      await updateEvent(eventId, values, token)
      alert("Evento actualizado correctamente ✅")
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error(error)
      alert("Error al actualizar el evento ❌")
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 border rounded-xl shadow-sm bg-white"
      >
        <h2 className="text-xl font-semibold">Editar Evento</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de inicio</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fecha de finalización</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ubicación</FormLabel>
              <FormControl>
                <Input placeholder="Ej. Buenos Aires" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Breve descripción del evento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año</FormLabel>
              <FormControl>
                <Input placeholder="2025" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Guardar Cambios
        </Button>
      </form>
    </Form>
  )
}
