"use client";

import { useQuery } from "@tanstack/react-query";

export const GetAllTeamFromApi = () => {
  return useQuery({
    queryKey: ["getallteamapi"],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/teamapi`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // cache: "force-cache",
      }).then((res) => res.json());
    },

    staleTime: Infinity,
  });
};
