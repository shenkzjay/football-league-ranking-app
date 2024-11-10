"use client";
export const dynamic = "force-dynamic";

import { createTeam } from "../../formaction/teamaction/createteam-action";
import { useFormState } from "react-dom";
import { useState, useRef, useEffect } from "react";
import { Colors } from "@/types/color";
import { Player } from "@/types/player";
import { TeamDetails } from "@/types/team";
import { GetAllTeamFromApi } from "@/app/queries/apigetallteams";
import { GetAllPlayersFromApi } from "@/app/queries/apigetallplayers";
import { updateTeam } from "../../formaction/teamaction/updateteam-action";

export default function CreateTeams() {
  const { data: teamsData } = GetAllTeamFromApi();

  const { data } = GetAllPlayersFromApi();

  const teams: TeamDetails[] = teamsData;

  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(createTeam, initialState);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [editMode, setEditMode] = useState(false);

  const [toggleInput, setInputToggle] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [availableItems, setAvailableItems] = useState<string[]>([]); // Available items for selection
  const [currentTeamData, setCurrentTeamPlayers] = useState<TeamDetails>();

  useEffect(() => {
    if (editMode && currentTeamData && formRef.current) {
      // Populate form fields with current team data when in edit mode
      formRef.current.teamname.value = currentTeamData.title;
      setSelectedItems(currentTeamData.players || []);
      setSelectedColor(currentTeamData.teamColor);
    }

    let selectedItemsFromStorage: string[] = [];

    if (localStorage.length > 0) {
      const getLocalStorageTeamDetails = localStorage.getItem("teamDetails");

      const localStorageTeamDetails = JSON.parse(getLocalStorageTeamDetails as string);

      selectedItemsFromStorage = localStorageTeamDetails?.selectedItems || [];
    }

    if (data) {
      setPlayerNames(data.map((player: Player) => player.playerName)); // Extract player names

      setAvailableItems(data.map((player: Player) => player.playerName));
      setAvailableItems((prevAvailableItems) =>
        prevAvailableItems.filter((item) => !selectedItemsFromStorage.includes(item))
      );
    }
  }, [data, currentTeamData, editMode]);

  const handleSelect = (selectedItem: string) => {
    if (!selectedItems.includes(selectedItem)) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, selectedItem]);
      setAvailableItems(availableItems.filter((available) => available !== selectedItem));
    }
  };

  const removeSelectedItems = (selectedItem: string) => {
    setSelectedItems(selectedItems.filter((selected) => selected !== selectedItem));
    setAvailableItems((prevRemovedItems) => [...prevRemovedItems, selectedItem]);
  };

  const handleEditTeam = (team: TeamDetails) => {
    setEditMode(true);
    setCurrentTeamPlayers(team);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const teamName = formData.get("teamname") as string;
    formData.append("selectedItems", JSON.stringify(selectedItems));
    formData.append("teamColor", JSON.stringify(selectedColor));

    const teamData = {
      teamName,
      selectedItems,
      selectedColor,
    };

    if (editMode && currentTeamData) {
      updateTeam(currentTeamData?.teamId, formData);
    } else {
      formAction(formData);
    }

    localStorage.setItem("teamDetails", JSON.stringify(teamData));

    formRef.current?.reset();
    setSelectedItems([]);
    setAvailableItems(playerNames);
    setEditMode(false);
  };

  const handleSelectColor = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <section className="flex md:flex-row flex-col gap-4 p-4">
      <div className="md:w-[40%] bg-white flex-col flex p-6 border gap-6 md:h-screen rounded-xl w-full">
        <form ref={formRef} onSubmit={handleSubmit} className="">
          <legend className="font-bold text-xl">Add Team</legend>
          <fieldset className="w-full">
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="teamname" className="sr-only">
                Enter Team name
              </label>
              <input
                type="text"
                name="teamname"
                id="teamname"
                placeholder="Enter Teams name"
                className="border rounded-xl py-2 px-4 w-full"
                required
              />

              <div className="border rounded-xl">
                <div
                  onClick={() => setInputToggle(!toggleInput)}
                  className="flex flex-row px-4 py-2 gap-4 flex-wrap"
                >
                  {selectedItems.map((selected, index) => (
                    <div
                      key={index}
                      className="flex bg-slate-100 items-center p-1 gap-2 text-xs rounded-xl cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        removeSelectedItems(selected);
                      }}
                    >
                      {selected}
                      <button className="text-base leading-none">&times;</button>
                    </div>
                  ))}

                  {!selectedItems.length && (
                    <span className="cursor-pointer text-slate-400">
                      Click to select team players
                    </span>
                  )}
                </div>

                {toggleInput && (
                  <ul className="border h-44 overflow-auto">
                    {availableItems &&
                      availableItems.map((test, index) => (
                        <li key={index + 1} className="p-2 ">
                          <p
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelect(test);
                            }}
                            className="hover:bg-slate-200 hover:p-2 p-2 cursor-pointer"
                          >
                            {test}
                          </p>
                        </li>
                      ))}
                  </ul>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <h3>Select team color</h3>
                <div className="flex flex-row gap-6">
                  {Object.values(Colors).map((color, index) => (
                    <div key={index}>
                      <label
                        style={{ backgroundColor: color }}
                        htmlFor={color}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectColor(color);
                        }}
                        className={`w-10 h-10 ${
                          selectedColor === color ? `outline outline-2 outline-offset-4` : ""
                        } flex rounded-full cursor-pointer hover:outline hover:outline-offset-4 hover:outline-slate-400 border`}
                      ></label>
                      <input type="radio" name="radio" id={color} hidden className={` `}></input>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className={`py-2 mt-4 px-4 ${
                  editMode ? "bg-blue-500" : "bg-black"
                } rounded-xl text-white`}
              >
                {editMode ? "Update team" : "Add Team"}
              </button>
              <p>{state?.message}</p>
            </div>
          </fieldset>
        </form>
      </div>

      <section className="flex flex-col justify-between w-full bg-white gap-10  p-6 rounded-xl">
        <div className="w-2/3">
          {teams &&
            teams.map((team, index) => (
              <div
                key={index}
                //   onClick={() => handleViewTeam(team)}
                className="flex w-full items-center justify-between bg-[#f5f5f5] mb-4 p-2 rounded-xl cursor-pointer"
              >
                <div className="flex gap-4 items-center">
                  <span
                    className="w-5 h-5 rounded-full "
                    style={{ backgroundColor: team?.teamColor }}
                  ></span>
                  <p>{team.title}</p>
                </div>
                <button type="button" onClick={() => handleEditTeam(team)}>
                  Edit
                </button>
                <button>delete</button>
                <button>→</button>
              </div>
            ))}
        </div>
        <div className="pitch relative w-2/3 rounded-xl overflow-hidden">
          {selectedItems && selectedItems.length > 0
            ? selectedItems.map((player, index) => (
                <div key={index} className="">
                  <span
                    style={{ backgroundColor: selectedColor }}
                    className={` ${
                      index < 5
                        ? `style-${
                            index + 1
                          } z-50 ml-4 md:ml-0 mt-8 md:mt-0 flex items-center justify-center text-nowrap  font-bold [font-size:clamp(1vw,5vw,1.2vw)]`
                        : "[font-size:clamp(.5vw,5vw,1vw)] flex m-1 w-fit"
                    }`}
                  >
                    {player}
                  </span>
                </div>
              ))
            : ""}
        </div>
      </section>
    </section>
  );
}
