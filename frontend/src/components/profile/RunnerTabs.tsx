// src/components/profile/RunnerTabs.tsx

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function RunnerTabs() {
  return (
    <Tabs defaultValue="stats" className="w-full">
      <TabsList className="grid grid-cols-4 w-full">
        <TabsTrigger value="stats">Estadísticas</TabsTrigger>
        <TabsTrigger value="media">Fotos & Videos</TabsTrigger>
        <TabsTrigger value="races">Próximas Carreras</TabsTrigger>
        <TabsTrigger value="social">Redes</TabsTrigger>
      </TabsList>

      {/* Stats */}
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

      {/* Media */}
      <TabsContent value="media">
        <Card>
          <CardHeader>
            <CardTitle>Fotos y Videos</CardTitle>
          </CardHeader>
          <CardContent>
            El usuario aún no subió media 📸
          </CardContent>
        </Card>
      </TabsContent>

      {/* Upcoming Races */}
      <TabsContent value="races">
        <Card>
          <CardHeader>
            <CardTitle>Próximas Carreras</CardTitle>
          </CardHeader>
          <CardContent>
            No hay carreras registradas 🏁
          </CardContent>
        </Card>
      </TabsContent>

      {/* Social */}
      <TabsContent value="social">
        <Card>
          <CardHeader>
            <CardTitle>Redes Sociales</CardTitle>
          </CardHeader>
          <CardContent>
            IG / Strava / YouTube pronto 🔗
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
