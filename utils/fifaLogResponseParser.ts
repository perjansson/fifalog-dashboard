import {
  FifaLogStatsResponse,
  FifaLogTeamStatsResponse,
  TeamStat,
  TotalMatchStat,
  TotalStats,
} from '../types'

type MatchStatObject = { [key: string]: number }

export function transformMatchStatsToChartData(
  statsResponse: FifaLogStatsResponse,
): TotalStats {
  const monthlyStats = statsResponse.filter(({ month }) => month !== 'Last 10')

  const winsAndLosses = [
    ...Object.entries(
      monthlyStats.reduce<MatchStatObject>((totalMatchMemo, { userStats }) => {
        const monthMatchStats = userStats.reduce<MatchStatObject>(
          (monthMemo, { user, wins }) => ({
            ...monthMemo,
            [user.name]: wins,
          }),
          {},
        )

        const totalPlusMonthMatchStats = Object.entries(monthMatchStats).reduce(
          (memo, [key, value]) => ({
            ...memo,
            [key]: value + (totalMatchMemo[key] || 0),
          }),
          {},
        )

        return {
          ...totalMatchMemo,
          ...totalPlusMonthMatchStats,
        }
      }, {}),
    ),
  ]
    .sort((a, b) => {
      return b[1] - a[1]
    })
    .map((matchStat) => ({
      title: matchStat[0],
      value: matchStat[1],
    }))

  const totalTies = monthlyStats.reduce(
    (drawMemo, { ties }) => drawMemo + ties,
    0,
  )

  const stats: TotalMatchStat[] = [
    ...winsAndLosses,
    { title: 'Ties', value: totalTies },
  ]

  const totalGames = stats.reduce<number>(
    (total, { value }) => total + value,
    0,
  )

  return {
    stats,
    totalGames,
  }
}

export function transformTeamStatsToTeamStandingData(
  statsResponse: FifaLogTeamStatsResponse,
): { teamStats: Array<TeamStat> } {
  return { teamStats: statsResponse }
}
