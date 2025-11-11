"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useAuth } from "@/hooks/useAuth"
import { createEvent } from "@/api/event"
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

// 1️⃣ Esquema de validación con Zod
const formSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  date: z.string().min(1, { message: "La fecha es requerida" }),
  location: z.string().min(2, { message: "La ubicación es requerida" }),
  description: z.string().min(5, { message: "La descripción debe tener al menos 5 caracteres" }),
  year: z.string().regex(/^\d{4}$/, { message: "Debe ser un año válido (ej: 2025)" }),
})

export default function CreateEvent() {
  const { token } = useAuth()

  // 2️⃣ Hook del formulario
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      date: "",
      location: "",
      description: "",
      year: "",
    },
  })

  // 3️⃣ Envío del formulario
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!token) return alert("No autenticado")

    try {
      const eventData = {
        ...values,
        organization_id: 1,
      }

      await createEvent(eventData, token)
      alert("Evento creado exitosamente")
      form.reset()
    } catch (err) {
      alert("Error al crear evento")
      console.error(err)
    }
  }

  // 4️⃣ UI del formulario con componentes ShadCN
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Crear nuevo evento</h2>

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre del evento</FormLabel>
              <FormControl>
                <Input placeholder="Ej: Maratón de Buenos Aires" {...field} />
              </FormControl>
              <FormDescription>Nombre con el que se mostrará el evento.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="w-full">Crear evento</Button>
      </form>
    </Form>
  )
}
