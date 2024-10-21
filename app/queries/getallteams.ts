import { useQuery } from "@tanstack/react-query";

export const getAllTeams = () => {
  return useQuery({
    queryKey: ["getallteams"],
    queryFn: async () => {
      return await fetch("http://localhost:3000/api/teamsapi", {
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
