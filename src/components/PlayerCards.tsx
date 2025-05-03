import { Player } from "@/hooks/getAllPlayers";

const PlayerCard = ({
  player,
  isSelected,
  onSelect,
}: {
  player: Player;
  isSelected: boolean;
  onSelect: (playerId: string) => void;
}) => {
  const handleCheckboxChange = () => {
    onSelect(player.id.toString());
  };

  return (
    <div
      className={`max-w-xs w-full shadow-lg rounded-lg overflow-hidden transition-colors ${
        isSelected ? "bg-blue-100" : "bg-white"
      }`}
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{player.name}</h2>
            <p className="text-sm text-gray-600">{player.position}</p>
          </div>

          <input
            id={player.id.toString()}
            type="checkbox"
            checked={isSelected}
            onChange={handleCheckboxChange}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
          />
        </div>

        {/* Player Stats */}
        <div className="mt-4">
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">National Team: </span>
            {player.national_team}
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Height: </span> {player.height} cm
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Weight: </span> {player.weight} kg
          </p>
          <p className="text-gray-600 text-sm">
            <span className="font-semibold">Age: </span> {player.age}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
