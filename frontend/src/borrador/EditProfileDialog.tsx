import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RunnerProfile } from "@/types/profile"

interface Props {
  profile: RunnerProfile
  onSave: (data: RunnerProfile) => void
}

export function EditProfileDialog({ profile, onSave }: Props) {
  const [form, setForm] = useState(profile)

  function handleSave() {
    onSave(form)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Nacionalidad"
            value={form.nationality ?? ""}
            onChange={(e) => setForm({ ...form, nationality: e.target.value })}
          />

          <Input
            placeholder="Edad"
            type="number"
            value={form.age ?? ""}
            onChange={(e) => setForm({ ...form, age: Number(e.target.value) })}
          />

          <Button onClick={handleSave}>Guardar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
