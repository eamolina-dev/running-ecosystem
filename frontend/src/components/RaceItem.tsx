import { Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle
} from "@/components/ui/item"
import type { Race } from "@/types/types"

interface RaceItemProps {
  race: Race
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
}

const RaceItem: React.FC<RaceItemProps> = ({ race, onEdit, onDelete }) => {
  return (
    <Item>
      <ItemContent>
        <ItemTitle>
          {race.distance_km}
        </ItemTitle>
        <ItemDescription>
          {race.name || "Sin nombre"}
        </ItemDescription>
      </ItemContent>
      <ItemActions>
      <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit?.(race.id)}
        >
          <Pencil className="h-4 w-4 mr-1" /> Editar
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => onDelete?.(race.id)}
        >
          <Trash2 className="h-4 w-4 mr-1" /> Eliminar
        </Button>
      </ItemActions>
    </Item>
  )
}

export default RaceItem
