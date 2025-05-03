import { HomeClient } from "@/components/HomeClient";
import { fetchAllPlayers } from "@/hooks/getAllPlayers";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["players"],
    queryFn: () => fetchAllPlayers({ items_per_page: 10 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeClient />
    </HydrationBoundary>
  );
}
