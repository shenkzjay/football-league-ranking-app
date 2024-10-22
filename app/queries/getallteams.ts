import { useQuery, useQueryClient } from "@tanstack/react-query";

export const getAllTeams = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({ queryKey: ["getallteams"] });
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
