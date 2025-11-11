// import { useAuth } from "../hooks/useAuth"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import type { ReactNode } from "react"
import CreateEvent from "@/components/forms/EventForm"

interface ProfileLayoutProps {
  sidebar: ReactNode,
  tabs: ReactNode
}

const ProfileLayout: React.FC<ProfileLayoutProps> = ({ sidebar, tabs }) => {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT PANEL */}
        <Card className="p-4">
          {sidebar}
        </Card>

        {/* RIGHT PANEL */}
        <div className="md:col-span-2">
          {tabs}
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
