import { Button } from "@/components/ui/button"

export interface EventDetailCardProps {
  id: number
  name: string
  location: string
  startDate: string
  endDate: string
  year: number
  status: "upcoming" | "finished" | "cancelled"
  onClick?: (id: number) => void
}

const EventDetailCard: React.FC<EventDetailCardProps> = ({
  id,
  name,
  location,
  startDate,
  endDate,
  year,
  status,
  onClick,
}) => {
  const statusColor = {
    upcoming: "text-green-600",
    finished: "text-gray-500",
    cancelled: "text-red-600",
  }

  return (
    <div className="border rounded-xl shadow-sm p-4 hover:shadow-md transition cursor-pointer">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="text-sm text-gray-600">{location}</p>
          <p className="text-sm text-gray-500">
            {new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()} | {year}
          </p>
        </div>
        <span className={`font-semibold ${statusColor[status]}`}>{status.toUpperCase()}</span>
      </div>
      {onClick && (
        <div className="mt-4">
          <Button size="sm" onClick={() => onClick(id)}>
            Ver detalle
          </Button>
        </div>
      )}
    </div>
  )
}

export default EventDetailCard
