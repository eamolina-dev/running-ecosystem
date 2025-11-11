"use client"

import { useEffect } from "react"
// import { useRouter } from "next/navigation"
import { useNavigate, useParams, useLocation } from "react-router-dom"
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

import { createEvent, updateEvent, fetchEventById } from "@/api/event"
import { useAuth } from "@/hooks/useAuth"

interface EventFormProps {
  eventId?: number // si está presente, es edición
  onSuccess?: () => void
}

// 🔹 Esquema base, se ajusta dinámicamente
const baseSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres."),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  location: z.string().optional(),
  description: z.string().optional(),
  year: z.string().regex(/^\d{4}$/, "Debe ser un año válido.").optional(),
})

type EventFormValues = z.infer<typeof baseSchema>

export default function EventForm({ onSuccess }: { onSuccess?: () => void }) {
  const { token } = useAuth()
  const navigate = useNavigate()
  const { id } = useParams() // ← recupera el id de la URL
  const eventId = id ? Number(id) : undefined
  const location = useLocation()
  const orgId = location.state?.organization_id 

  const form = useForm<EventFormValues>({
    resolver: zodResolver(baseSchema),
    defaultValues: {
      name: "",
      start_date: undefined,
      end_date: undefined,
      location: "",
      description: "",
      year: new Date().getFullYear().toString(),
    },
  })

  // 🟢 Si hay eventId, es edición → Cargamos los datos
  useEffect(() => {
    if (!eventId) return
    async function loadEvent() {
      try {
        const event = await fetchEventById(Number(eventId))
        form.reset({
          name: event.name || "",
          start_date: event.start_date?.split("T")[0] || "",
          end_date: event.end_date?.split("T")[0] || "",
          location: event.location || "",
          description: event.description || "",
          year: event.year?.toString() || "",
          // year: event.year?.toString() || new Date().getFullYear().toString(),
        })
      } catch (error) {
        console.error("Error cargando evento:", error)
      }
    }
    loadEvent()
  }, [eventId])  

  // 🧠 Envío del formulario (crear o editar)
  const onSubmit = async (values: EventFormValues) => {
    if (!token) return alert("Usuario no autenticado")

    try {
      if (eventId) {
        // Actualizar
        await updateEvent(eventId, values, token)
        alert("Evento actualizado correctamente ✅")
      } else {
        // Crear
        const eventData = { ...values, organization_id: orgId }
        const created = await createEvent(eventData, token)
        alert("Evento creado exitosamente 🎉")
        // router.push(`/events/${created.id}`)
        navigate(`/events/${created.id}`)
      }

      if (onSuccess) onSuccess()
      // else router.refresh()
    } catch (error) {
      console.error(error)
      alert("Error al guardar el evento ❌")
    }
  }

  // 🧱 UI común
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 p-4 border rounded-xl shadow-sm bg-white max-w-lg mx-auto"
      >
        <h2 className="text-2xl font-semibold">
          {eventId ? "Editar evento" : "Crear nuevo evento"}
        </h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ej: Maratón de Buenos Aires"
                  {...field}
                />
              </FormControl>
              {!eventId && (
                <FormDescription>Nombre con el que se mostrará el evento.</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Fechas (solo para editar o si querés tenerlas siempre visibles) */}
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
                <Input placeholder="Ej: Córdoba, Argentina" {...field} />
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
                <Input placeholder="Ej: Carrera de montaña 10K" {...field} />
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
          {eventId ? "Guardar cambios" : "Crear evento"}
        </Button>
      </form>
    </Form>
  )
}
