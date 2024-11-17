// import { GetAllPlayersFromApi } from "@/app/queries/apigetallplayers";

import { getAllPlayers } from "@/app/queries/getallplayers";
// import { PlayerForm } from "./playerform";
import { PlayerList } from "./playerList";
import { Player } from "@/types/player";
import { Suspense } from "react";

// const DeletePlayerRequest = async (playerId: number) => {
//   const response = await fetch(`http://localhost:3000/api//deleteplayer/${playerId}`, {
//     method: "DELETE",
//   });

//   if (!response) {
//     throw new Error("failed to delete player");
//   }

//   return response.json();
// };

export const CreatePlayers = async () => {
  // const queryClient = useQueryClient();

  // const { data } = GetAllPlayersFromApi();

  // const players: Player[] = data;

  // const mutation = useMutation({
  //   mutationFn: DeletePlayerRequest,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["getallplayerapi"] });
  //     console.log("Player successfully deleted");
  //   },
  // });

  const playerData = (await getAllPlayers()) as Player[];

  return (
    <section className="flex gap-4 p-4 bg-white h-screen">
      {/* <PlayerForm /> */}
      <Suspense fallback="Loading..">
        <PlayerList playerDatas={playerData} />
      </Suspense>
    </section>
  );
};
