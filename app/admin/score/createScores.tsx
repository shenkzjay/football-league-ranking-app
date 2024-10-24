"use client";

import { useFormState } from "react-dom";
import { useState, useEffect } from "react";
import { createScores } from "../formaction/createscore-action";
import { GetAllTeamFromApi } from "@/app/queries/apigetallteams";
import { Team } from "@/types/team";

export const CreateScores = () => {
  const initialState = {
    message: "",
  };

  const { data } = GetAllTeamFromApi();

  const [selectHomeTeam, setSelectHomeTeam] = useState("");
  const [selectAwayTeam, setSelectAwayTeam] = useState("");
  const [homeTeamScores, setHomeTeamScores] = useState("");
  const [awayTeamScores, setAwayTeamScores] = useState("");
  // const [teamName, setTeamName] = useState([]);
  const [availableteams, setSelectAvailableTeam] = useState<string[]>([]);
  const [state, formAction] = useFormState(createScores, initialState);

  useEffect(() => {
    if (data) {
      // setTeamName(data.map((team: Team) => team.title));
      setSelectAvailableTeam(data.map((team: Team) => team.title)); // Initialize availableItems
    }
  }, [data]);

  // if (isLoading) {
  //   return <div>Loading teams</div>;
  // }

  // if (isError) {
  //   return <div>Error fetching teams</div>;
  // }

  const handleSelectHomeTeam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = e.target.value;
    if (!selectHomeTeam.includes(selectedTeam)) {
      setSelectHomeTeam(selectedTeam);
      setSelectAvailableTeam(availableteams.filter((team) => team !== selectedTeam));
    }
  };

  const handleEditSelectedHomeTeam = () => {
    setSelectHomeTeam("");
    setSelectAvailableTeam((prevAvailableTeams) => [...prevAvailableTeams, selectHomeTeam]);
  };

  const handleSelectAwayTeam = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTeam = e.target.value;

    if (!selectAwayTeam.includes(selectedTeam)) {
      setSelectAwayTeam(selectedTeam);
      setSelectAvailableTeam(
        availableteams.filter((team) => team !== selectedTeam && team !== selectHomeTeam)
      );
    }
  };

  const handleEditSelectedAwayTeam = () => {
    setSelectAwayTeam("");
    setSelectAvailableTeam((prevAvailableTeams) => [...prevAvailableTeams, selectAwayTeam]);
  };

  const handleHomeTeamScores = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedScores = e.target.value;
    setHomeTeamScores(selectedScores);
  };

  const handleAwayTeamScores = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedScores = e.target.value;
    setAwayTeamScores(selectedScores);
  };

  const handleEditHomeTeamScores = () => {
    setHomeTeamScores("");
  };

  const handleEditAwayTeamScores = () => {
    setAwayTeamScores("");
  };

  const handleSubmitScores = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    formData.append("hometeam", selectHomeTeam);
    formData.append("awayteam", selectAwayTeam);
    formData.append("homescores", homeTeamScores);
    formData.append("awayscores", awayTeamScores);

    formAction(formData);
  };

  return (
    <section className="flex gap-4 p-4 ">
      <div className="w-[80%] flex flex-col h-screen bg-white rounded-xl border  p-6">
        <form onSubmit={handleSubmitScores} className="  flex-col flex gap-6  ">
          <legend className="font-bold text-xl">Update Scores</legend>
          <fieldset className="w-full">
            <div className="flex flex-row w-full gap-6 justify-between">
              <div className="flex flex-col w-1/2 gap-3 border rounded-xl p-4">
                <h3 className="text-slate-400">HOME</h3>

                {!selectHomeTeam ? (
                  <div className="flex justify-between gap-2">
                    {/* <h3 className="text-slate-400">Select team</h3> */}
                    <select
                      className="border py-2 px-4 w-full rounded-xl"
                      onChange={handleSelectHomeTeam}
                      name="hometeam"
                    >
                      <option value="">Select team</option>
                      {availableteams?.map((team, index) => (
                        <option key={index}>{team}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{selectHomeTeam}</span>
                    <button
                      className="text-blue-600 underline cursor-pointer"
                      onClick={handleEditSelectedHomeTeam}
                    >
                      Edit
                    </button>
                  </div>
                )}

                {!homeTeamScores ? (
                  <div className="flex justify-between">
                    <h3 className="text-slate-400">Update Scores</h3>

                    <select
                      onChange={handleHomeTeamScores}
                      name="homescores"
                      className="border rounded-lg p-1"
                    >
                      <option></option>
                      {Array.from({ length: 11 }).map((_, index) => (
                        <option key={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{homeTeamScores}</span>
                    <button
                      className="text-blue-600 underline cursor-pointer"
                      onClick={handleEditHomeTeamScores}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/**AWAY TEAM */}
              <div className=" gap-3 border rounded-xl p-4 flex flex-col w-1/2">
                <h3 className="text-slate-400">AWAY</h3>

                {!selectAwayTeam ? (
                  <div className="flex justify-between gap-2">
                    <select
                      name="awayteam"
                      className="border py-2 px-4 w-full rounded-xl"
                      onChange={handleSelectAwayTeam}
                    >
                      <option value="">Select team</option>
                      {availableteams?.map((team, index) => (
                        <option key={index}>{team}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{selectAwayTeam}</span>
                    <button
                      className="text-blue-600 underline cursor-pointer"
                      onClick={handleEditSelectedAwayTeam}
                    >
                      Edit
                    </button>
                  </div>
                )}

                {!awayTeamScores ? (
                  <div className="flex justify-between">
                    <h3 className="text-slate-400">Scores</h3>
                    <select name="awayscores" onChange={handleAwayTeamScores}>
                      <option></option>
                      {Array.from({ length: 11 }).map((_, index) => (
                        <option key={index}>{index}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-2xl font-bold">{awayTeamScores}</span>
                    <button
                      className="text-blue-600 underline cursor-pointer"
                      onClick={handleEditAwayTeamScores}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
            <button className="py-2 mt-4 px-4 bg-black rounded-xl text-white">Update scores</button>
            <p>{state?.message}</p>
          </fieldset>
        </form>

        <div className="mt-32">
          <h3 className="font-bold text-xl">Fixtures</h3>
        </div>
      </div>
      <section className="bg-white w-full p-6 rounded-xl">
        <h2>List of Players</h2>
        <table className="w-full text-left bg">
          <thead>
            <tr className="">
              <th className="px-4 py-2">S/N</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2"></th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2">1</td>
              <td className="px-4 py-2">Abel</td>
              <td className="px-4 py-2">Edit</td>
              <td className="px-4 py-2">Delete</td>
            </tr>
          </tbody>
        </table>
      </section>
    </section>
  );
};
