import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-semibold">🏃‍♂️ RunConnect</Link>

      <div className="space-x-4">
        {!user ? (
          <>
            <Link to="/login" className="text-blue-600 hover:underline">Iniciar sesión</Link>
            <Link to="/register" className="text-blue-600 hover:underline">Registrarse</Link>
          </>
        ) : (
          <>
            <Link to="/profile" className="text-gray-800 hover:underline">Mi perfil</Link>
            <button
              onClick={logout}
              className="text-red-600 hover:underline"
            >
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
