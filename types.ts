export interface TotalStats {
  stats: Array<TotalMatchStat>
  totalGames: number
}

export interface TotalMatchStat {
  title: string
  value: number
}

export interface TeamStat {
  team: string
  matches: number
  wins: number
  winPercentage: number
}

export interface StatsResponse {
  totalMatchStats: Array<TotalMatchStat>
  teamStats: Array<TeamStat>
  timestamp: string
}

export interface FifaLogStat {
  month: string
  ties: number
  matches: number
  goals: number
  userStats: Array<FifaLogUserStat>
}

export interface FigaLogUser {
  id: number
  name: string
}

export interface FifaLogUserStat {
  month: 'Last 10' | string
  user: FigaLogUser
  wins: number
  overTimeWins: number
  goalsFor: number
}

export type FifaLogStatsResponse = Array<FifaLogStat>

export interface FifaLogMatchStat {
  team: string
  matches: number
  wins: number
  winPercentage: number
}

export type FifaLogTeamStatsResponse = Array<FifaLogMatchStat>
