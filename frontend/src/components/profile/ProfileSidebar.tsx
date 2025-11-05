// src/components/profile/ProfileSidebar.tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  name: string
  email: string
  extraInfo?: React.ReactNode
  avatarUrl?: string
  onLogout?: () => void // si existe => mostrar botón logout
}

export default function ProfileSidebar({
  name,
  email,
  avatarUrl,
  extraInfo,
  onLogout
}: SidebarProps) {
  return (
    <div className="p-4 rounded-xl border shadow-sm">
      <div className="flex flex-col items-center text-center space-y-4">

        {/* Avatar */}
        <Avatar className="h-32 w-32 border-2">
          <AvatarImage src={avatarUrl || ""} />
          <AvatarFallback className="text-3xl">
            {name?.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        {/* Name */}
        <div>
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-muted-foreground">{email}</p>
        </div>

        <Separator />

        {/* Extra info */}
        <div className="w-full text-sm space-y-2">
          {extraInfo}
        </div>

        {onLogout && (
          <>
            <Separator />
            <Button onClick={onLogout} variant="destructive" className="w-full">
              Cerrar sesión
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
