// "use client";

// import { useQuery } from "@tanstack/react-query";

// export const getSingleTeam = ({ params }: { params: { id: number } }) => {
//   const { id } = params;

//   console.log(id, "usequery");

//   return useQuery({
//     queryKey: ["getsingleteam", params?.id],
//     queryFn: async () => {
//       await fetch(`/api/singleteam/${id}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         cache: "force-cache",
//       }).then((res) => res.json());
//     },

//     staleTime: Infinity,
//   });
// };

import { db } from "../db";

export async function getSingleTeam(id: number) {
  const singleteam = await db.query.teamsTable.findFirst({
    where: (teamsTable, { eq }) => eq(teamsTable.id, id),
  });

  return singleteam;
}
