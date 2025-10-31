import { useAuth } from "../hooks/useAuth"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function Profile() {
  const { user, loading, logout } = useAuth()

  if (loading) return <p>Cargando perfil...</p>
  if (!user) return <p>No hay usuario</p>

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT PANEL */}
        <Card className="p-4">
          <div className="flex flex-col items-center text-center space-y-4">
            
            {/* Avatar */}
            <Avatar className="h-32 w-32 border-2">
              {/* <AvatarImage src={user.avatar || ""} /> */}
              {/* https://resources.premierleague.com/premierleague25/photos/players/110x140/448047.png */}
              <AvatarImage src={"https://resources.premierleague.com/premierleague25/photos/players/110x140/448047.png"} />
              <AvatarFallback className="text-3xl">
                {user.username?.[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h1 className="text-2xl font-bold">{user.username}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <Separator />

            {/* Personal Info */}
            <div className="w-full text-sm space-y-2">
              <p><span className="font-semibold">Nacionalidad:</span> Argentina 🇦🇷</p>
              <p><span className="font-semibold">Edad:</span> 28 años</p>
              <p><span className="font-semibold">Distancia favorita:</span> 10K</p>
              <p><span className="font-semibold">Carreras:</span> 12</p>
              <p><span className="font-semibold">Mejor tiempo 10K:</span> 42m 15s</p>
            </div>

            <Separator />

            <Button onClick={logout} variant="destructive" className="w-full">
              Cerrar sesión
            </Button>
          </div>
        </Card>

        {/* RIGHT PANEL TABS */}
        <div className="md:col-span-2">
          <Tabs defaultValue="stats" className="w-full">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="stats">Estadísticas</TabsTrigger>
              <TabsTrigger value="media">Fotos & Videos</TabsTrigger>
              <TabsTrigger value="races">Próximas Carreras</TabsTrigger>
              <TabsTrigger value="social">Redes</TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Gráficas y tiempos pronto 🤓📊</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="media">
              <Card>
                <CardHeader><CardTitle>Fotos y Videos</CardTitle></CardHeader>
                <CardContent>El usuario aún no subió media 📸</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="races">
              <Card>
                <CardHeader><CardTitle>Próximas Carreras</CardTitle></CardHeader>
                <CardContent>No hay carreras registradas 🏁</CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social">
              <Card>
                <CardHeader><CardTitle>Redes Sociales</CardTitle></CardHeader>
                <CardContent>IG / Strava / YouTube pronto 🔗</CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
