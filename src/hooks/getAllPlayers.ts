import axiosInstance from "../utils/axios";

export interface Player {
  id: number;
  position: string;
  national_team: string;
  height: number;
  weight: number;
  birth_date: string;
  age: string;
  name: string;
  first_name: string;
  last_name: string;
  team_ids: number[];
}

export const fetchAllPlayers = async ({
  items_per_page = 10,
}: {
  items_per_page: number;
}): Promise<Player[]> => {
  const response = await axiosInstance.get("/players", {
    params: { season: 2024, per_page: items_per_page },
  });
  return response.data.data;
};
