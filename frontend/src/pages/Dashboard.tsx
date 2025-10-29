import { useAuth } from "../hooks/useAuth"

const Dashboard = () => {
  const { user, logout } = useAuth()
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">Bienvenido, {user?.username}</h1>
      <p>Tu rol: {user?.role}</p>
      <button onClick={logout} className="mt-4">Cerrar sesión</button>
    </div>
  )
}

export default Dashboard
