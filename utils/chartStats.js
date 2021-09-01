export function transformMatchStatsToChartData(stats) {
  const monthlyStats = stats.filter(({ month }) => month !== 'Last 10')

  const winsAndLosses = [
    ...Object.entries(
      monthlyStats.reduce((totalMatchMemo, { userStats }) => {
        const monthMatchStats = userStats.reduce(
          (monthMemo, { user, wins, overTimeWins }) => ({
            ...monthMemo,
            [user.name]: wins + overTimeWins,
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

  return [...winsAndLosses, { title: 'Ties', value: totalTies, color: '#fff' }]
}
