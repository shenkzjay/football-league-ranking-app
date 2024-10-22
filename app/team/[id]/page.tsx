"use client";

import { getSingleTeam } from "@/app/queries/getsingleteam";

export default function Team({ params }: { params: { id: number } }) {
  const teamId = params.id;

  console.log({ teamId });

  const { data, isError, isPending } = getSingleTeam({ params: { id: teamId } });

  console.log({ data });

  return <h1>My page {params.id}</h1>;
}
