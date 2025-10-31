import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUser, logout } from "../utils/auth";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getUser());
  }, []);

  const handleLogout = () => {
    logout();
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        RunHub
      </Link>

      <div className="flex items-center space-x-4">
        <Link to="/calendar" className="hover:text-blue-500">
          Calendario
        </Link>
        {user ? (
          <>
            <Link to="/profile" className="hover:text-blue-500">
              Perfil
            </Link>
            {user.role === "organization" && (
              <Link to="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
            )}
            <button onClick={handleLogout} className="text-red-500">
              Cerrar sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-blue-500">
              Iniciar sesión
            </Link>
            <Link to="/register" className="hover:text-blue-500">
              Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
