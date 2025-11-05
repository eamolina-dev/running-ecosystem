import { useAuth } from "@/hooks/useAuth"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import ProfileLayout from "@/components/profile/ProfileLayout"
import RunnerTabs from "@/components/profile/RunnerTabs"
import OrganizationTabs from "@/components/profile/OrganizationTabs"
import ProfileSidebar from "@/components/profile/ProfileSidebar"

import { fetchUserById } from "@/api/users"

export default function ProfilePage() {
  const { user: loggedUser } = useAuth()
  const { id } = useParams()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const userId = id ? Number(id) : loggedUser?.id
    if (!userId) return
  
    fetchUserById(userId).then(setProfile)
  }, [id, loggedUser])  

  if (!profile) return <p>Cargando...</p>

  const isOwner = loggedUser && loggedUser.id === profile.id

  return (
    <ProfileLayout
      sidebar={
        <ProfileSidebar name={profile?.username || ""} email={profile?.email || ""} />
        // <ProfileSidebar user={profile} isOwner={isOwner} />
      }
      tabs={
        profile.role === "runner" 
          ? <RunnerTabs />
          : <OrganizationTabs id={profile.id} role={profile.role} />
          // ? <RunnerTabs userId={profile.id} isOwner={isOwner} />
          // : <OrganizationTabs userId={profile.id} isOwner={isOwner} />
      }
    />
  )
}
