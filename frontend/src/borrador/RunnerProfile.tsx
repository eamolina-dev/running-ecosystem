import { useAuth } from "@/hooks/useAuth"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { EditProfileDialog } from "./EditProfileDialog"
import type { RunnerProfile } from "@/types/profile"

const defaultProfile: RunnerProfile = {
  nationality: "Argentina",
  age: 28,
  totalRaces: 12,
  favoriteDistance: "10K",
  bestTime: "40:21"
}

export default function ProfileRunner() {
  const { user, loading } = useAuth()
  if (loading) return <p>Cargando...</p>
  if (!user) return <p>No hay usuario</p>

  const profile = defaultProfile 

  return (
    <div className="p-6 grid grid-cols-3 gap-6">
      {/* Izquierda */}
      <Card className="col-span-1">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <Avatar className="w-32 h-32">
            {/* <AvatarImage src={user.avatarUrl ?? ""} /> */}
            <AvatarImage src={"https://resources.premierleague.com/premierleague25/photos/players/110x140/448047.png"} />
          </Avatar>

          <h2 className="text-xl font-bold">{user.username}</h2>
          <p className="text-sm text-muted-foreground">{profile.nationality}</p>

          <p>Edad: {profile.age}</p>
          <p>Carreras: {profile.totalRaces}</p>
          <p>Distancia fav: {profile.favoriteDistance}</p>
          <p>Mejor tiempo: {profile.bestTime}</p>

          <EditProfileDialog
            profile={profile}
            onSave={(data) => console.log("Guardar cambios", data)}
          />
        </CardContent>
      </Card>

      {/* Derecha */}
      <Card className="col-span-2 p-4">
        <Tabs defaultValue="stats">
          <TabsList>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
            <TabsTrigger value="media">Fotos & Videos</TabsTrigger>
            <TabsTrigger value="races">Próximas carreras</TabsTrigger>
          </TabsList>

          <TabsContent value="stats">📊 Pronto stats</TabsContent>
          <TabsContent value="media">📸 Pronto media</TabsContent>
          <TabsContent value="races">🏃‍♂️ Pronto carreras</TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
