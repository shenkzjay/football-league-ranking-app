"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

export const GetAllPlayersFromApi = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["getallplayerapi"] });
  return useQuery({
    queryKey: ["getallplayerapi"],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/playersapi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "force-cache",
      }).then((res) => res.json());
    },

    staleTime: Infinity,
  });
};
