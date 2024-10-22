export type Team = {
  id: number;
  title: string;
  teamColor: string;
  ScoreId: number;
  players: string[];
};

export type TeamDetails = {
  teamId: number;
  title: string;
  teamColor: string;
  players: string[];
  scoreId: number;
  gamesPlayed: number;
  gamesWon: number;
  gamesLost: number;
  gamesDrawn: number;
  goalFor: number;
  goalAgainst: number;
  goalDifference: number;
  points: number;
  form: number;
  createdAt: Date;
  updatedAt: Date;
};
