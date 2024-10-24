"use client";

import { useQuery } from "@tanstack/react-query";

export const GetAllPlayersFromApi = () => {
  return useQuery({
    queryKey: ["getallplayerspi"],
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
