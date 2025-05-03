"use client";

import AuthLayout from "@/app/auth-layout";
import { Team } from "@/app/teams/page";
import { fetchAllPlayers, Player } from "@/hooks/getAllPlayers";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { HiMiniUserPlus } from "react-icons/hi2";
import { IoMdInformationCircleOutline } from "react-icons/io";
import Button from "./Button";
import Header from "./Header";
import AddPlayerToTeamModal from "./modals/AddPlayerToTeamModal";
import PlayerCard from "./PlayerCards";
import PlayerCardSkeleton from "./PlayerCardShimmer";

export function HomeClient() {
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectPlayer, setSelectPlayer] = useState<Player[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState<Team[]>([]);

  const { data: players, isLoading } = useQuery({
    queryKey: ["players", itemsPerPage],
    queryFn: () => fetchAllPlayers({ items_per_page: itemsPerPage }),
  });

  useEffect(() => {
    const teamsJson = localStorage.getItem("teams");
    if (teamsJson) {
      setTeams(JSON.parse(teamsJson));
    }
  }, []);

  const handleLoadMore = () => {
    setItemsPerPage((prev) => prev + 10);
  };

  const handleSelectPlayer = (player: Player) => {
    setSelectPlayer((prevSelected) => {
      const exists = prevSelected.find((p) => p.id === player.id);
      if (exists) {
        return prevSelected.filter((p) => p.id !== player.id);
      } else {
        return [...prevSelected, player];
      }
    });
  };

  const handleConfirmAddPlayers = (teamName: string) => {
    const alreadyAssignedPlayers: string[] = [];
    const alreadyInSelectedTeam: string[] = [];
    const teamsJson = localStorage.getItem("teams");

    if (!teamsJson) return;

    const teams: Team[] = JSON.parse(teamsJson);

    const selectedTeamObj = teams.find((team) => team.name === teamName);

    if (!selectedTeamObj) {
      toast.error("Selected team not found.");
      return;
    }

    selectPlayer.forEach((player) => {
      const inAnotherTeam = teams.find((team) =>
        (team.players || []).some((p) => p.id === player.id)
      );

      if (inAnotherTeam && inAnotherTeam.name !== teamName) {
        alreadyAssignedPlayers.push(
          `${player.name} (in team ${inAnotherTeam.name})`
        );
      } else if (inAnotherTeam && inAnotherTeam.name === teamName) {
        alreadyInSelectedTeam.push(player.name);
      }
    });

    if (alreadyAssignedPlayers.length > 0) {
      toast.error(`Cannot add: ${alreadyAssignedPlayers.join(", ")}`);
      return;
    }

    if (alreadyInSelectedTeam.length > 0) {
      toast(`Already in ${teamName}: ${alreadyInSelectedTeam.join(", ")}`, {
        icon: <IoMdInformationCircleOutline fontSize={20} color="blue" />,
      });
      return;
    }

    const updatedTeams = teams.map((team) => {
      if (team.name === teamName) {
        return {
          ...team,
          players: [
            ...new Map(
              [...(team.players || []), ...selectPlayer].map((p) => [p.id, p])
            ).values(),
          ],
        };
      }
      return team;
    });

    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setTeams(updatedTeams);
    toast.success("Players successfully added to the team!");
    setIsModalOpen(false);
    setSelectPlayer([]);
  };

  const renderSkeletons = () =>
    Array.from({ length: itemsPerPage }).map((_, index) => (
      <PlayerCardSkeleton key={index} />
    ));

  return (
    <AuthLayout>
      <Toaster />
      <Header />

      <main className="p-10 grid grid-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-100">
        {isLoading
          ? renderSkeletons()
          : players?.map((player) => (
              <PlayerCard
                key={player.id}
                player={player}
                isSelected={selectPlayer.some((p) => p.id === player.id)}
                onSelect={() => handleSelectPlayer(player)}
              />
            ))}

        {!isLoading && (
          <div className="col-span-full text-center mt-4">
            <Button text="Load More" onClick={handleLoadMore} />
          </div>
        )}

        {selectPlayer.length > 0 && (
          <div
            className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg cursor-pointer hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            <HiMiniUserPlus fontSize={25} />
          </div>
        )}
      </main>

      <AddPlayerToTeamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAddPlayers}
        teams={teams}
      />
    </AuthLayout>
  );
}
