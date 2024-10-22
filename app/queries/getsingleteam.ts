"use client";

import { useQuery } from "@tanstack/react-query";

export const getSingleTeam = ({ params }: { params: { id: number } }) => {
  const { id } = params;
  return useQuery({
    queryKey: ["getsingleteam", params?.id],
    queryFn: async () => {
      return await fetch(`http://localhost:3000/api/singleteam/${id}`, {
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
