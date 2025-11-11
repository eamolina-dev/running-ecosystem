import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle
} from "@/components/ui/item"
import type { Event } from "@/types/types"

interface EventItemProps {
  event: Event
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const EventItem: React.FC<EventItemProps> = ({ event, onEdit, onDelete }) => {
  return (
    <Item>
      <ItemContent>
        <ItemTitle>
          {event.name}
        </ItemTitle>
        <ItemDescription>
          📍 {event.location || "Sin ubicación"} — 🗓️ {event.start_date} → {event.end_date}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
      <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit?.(event.id)}
        >
          <Pencil className="h-4 w-4 mr-1" /> Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete?.(event.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Eliminar
        </Button>
      </ItemActions>
    </Item>
  )
}

export default EventItem
