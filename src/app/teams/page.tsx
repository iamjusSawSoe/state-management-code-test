"use client";

import Button from "@/components/Button";
import Header from "@/components/Header";
import CreateTeamModal from "@/components/modals/CreateTeamModal";
import DeleteTeamModal from "@/components/modals/DeleteTeamModal";
import EditTeamModal from "@/components/modals/EditTeamModal";
import TeamDetailsModal from "@/components/modals/TeamDetailsModal";
import { Player } from "@/hooks/getAllPlayers";
import { useEffect, useState } from "react";
import AuthLayout from "../auth-layout";

export interface Team {
  id: string;
  name: string;
  playerCount: number;
  region: string;
  country: string;
  players?: Player[];
}

const TeamTable = () => {
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isTeamDetailModalOpen, setTeamDetailModalOpen] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);
  const [teamToEdit, setTeamToEdit] = useState<Team | null>(null);
  const [teamToDelete, setTeamToDelete] = useState<Team | null>(null);
  const [selectedTeamName, setSelectedTeamName] = useState("");
  const isAnyModalOpen =
    isCreateModalOpen ||
    isEditModalOpen ||
    isDeleteModalOpen ||
    isTeamDetailModalOpen;

  useEffect(() => {
    if (isAnyModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isAnyModalOpen]);

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    if (storedTeams) {
      setTeams(JSON.parse(storedTeams));
    }
  }, []);

  useEffect(() => {
    if (isCreateModalOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isCreateModalOpen]);

  const toggleCreateModal = () => setCreateModalOpen(!isCreateModalOpen);

  const handleEditClick = (team: Team) => {
    setTeamToEdit(team);
    setEditModalOpen(true);
  };

  const handleDeleteClick = (team: Team) => {
    setTeamToDelete(team);
    setDeleteModalOpen(true);
  };

  const confirmDeleteTeam = () => {
    if (teamToDelete) {
      const updatedTeams = teams.filter((t) => t.id !== teamToDelete.id);
      setTeams(updatedTeams);
      localStorage.setItem("teams", JSON.stringify(updatedTeams));
      setDeleteModalOpen(false);
      setTeamToDelete(null);
    }
  };

  const updateTeam = (updatedTeam: Team) => {
    const updatedTeams = teams.map((t) =>
      t.id === updatedTeam.id ? updatedTeam : t
    );
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
    setEditModalOpen(false);
    setTeamToEdit(null);
  };

  const createTeam = (data: Omit<Team, "id">) => {
    const newTeam = {
      id: crypto.randomUUID(),
      ...data,
    };
    const updatedTeams = [...teams, newTeam];
    setTeams(updatedTeams);
    localStorage.setItem("teams", JSON.stringify(updatedTeams));
  };

  const handleRowClick = (teamName: string) => {
    setTeamDetailModalOpen(true);
    setSelectedTeamName(teamName);
  };

  return (
    <AuthLayout>
      <Header />

      <div className="overflow-x-auto p-10 bg-white">
        <div className="flex items-center justify-start mb-4">
          <Button text="Create" onClick={toggleCreateModal} />
        </div>

        <div className="max-h-[30rem] overflow-y-auto border border-gray-200 shadow-lg">
          <table className="min-w-full bg-white border-collapse">
            <thead className=" sticky top-0 bg-gray-100 z-10">
              <tr>
                <th className="py-3 px-4 text-left">Team Name</th>
                <th className="py-3 px-4 text-left">Player Count</th>
                <th className="py-3 px-4 text-left">Region</th>
                <th className="py-3 px-4 text-left">Country</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No teams available
                  </td>
                </tr>
              ) : (
                teams.map((team) => (
                  <tr
                    key={team.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => {
                      handleRowClick(team.name);
                    }}
                  >
                    <td className="py-2 px-4">{team.name}</td>
                    <td className="py-2 px-4">{team.playerCount}</td>
                    <td className="py-2 px-4">{team.region}</td>
                    <td className="py-2 px-4">{team.country}</td>
                    <td className="py-2 px-4">
                      <div className="flex space-x-2">
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(team);
                          }}
                          text="Edit"
                        />
                        <Button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(team);
                          }}
                          text="Delete"
                          className=" px-6 py-2 transition duration-200 ease-in-out cursor-pointer bg-red-500 text-white rounded hover:bg-red-600 "
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <TeamDetailsModal
        isOpen={isTeamDetailModalOpen}
        onClose={() => setTeamDetailModalOpen(false)}
        teamName={selectedTeamName}
      />

      <CreateTeamModal
        isOpen={isCreateModalOpen}
        onClose={toggleCreateModal}
        existingTeamNames={teams.map((team) => team.name)}
        onCreate={createTeam}
      />

      <DeleteTeamModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDeleteTeam}
        teamName={teamToDelete?.name || ""}
      />

      <EditTeamModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        team={teamToEdit}
        onSave={updateTeam}
      />
    </AuthLayout>
  );
};

export default TeamTable;
