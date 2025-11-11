import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-md mx-auto"
      >
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 p-4 rounded-full">
            <AlertTriangle className="text-red-500 w-10 h-10" />
          </div>
        </div>

        <h1 className="text-4xl font-bold mb-2 text-gray-800">404</h1>
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Página no encontrada
        </h2>
        <p className="text-gray-500 mb-8">
          La página que buscás no existe o fue movida.  
          Verificá la dirección o volvé al inicio.
        </p>

        <Button
          onClick={() => navigate("/")}
          className="px-6 py-2 rounded-xl"
        >
          Volver al inicio
        </Button>
      </motion.div>
    </div>
  )
}
