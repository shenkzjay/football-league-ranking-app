import { useQuery } from "@tanstack/react-query";

export const getAllPlayers = () => {
  return useQuery({
    queryKey: ["getallpalyers"],
    queryFn: async () => {
      return await fetch("http://localhost:3000/api/playersapi", {
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
