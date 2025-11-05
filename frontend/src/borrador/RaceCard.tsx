type RaceCardProps = {
  race: any
  onRegister?: (raceId: number) => void
}

const RaceCard = ({ race, onRegister }: RaceCardProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition mb-2">
      <h3 className="text-lg font-semibold">{race.name}</h3>
      <p className="text-sm text-gray-600">Distancia: {race.distance} km</p>
      <p className="text-sm text-gray-600">Precio: ${race.price}</p>
      <button
        onClick={() => onRegister?.(race.id)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Inscribirme
      </button>
    </div>
  )
}

export default RaceCard
