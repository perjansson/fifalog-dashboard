import Head from 'next/head'
import { PieChart } from 'react-minimal-pie-chart'

const COLORS = ['#e6cb22', '#9c9b94', '#82541b']
const EMOJIS = ['🥇', '🥈', '🥉']

export default function MatchStatsChart({ matchStats }) {
  const matchStatsWithColors = matchStats.map((matchStat, i) => ({
    ...matchStat,
    color: COLORS[i] || '#fff',
  }))

  return (
    <PieChart
      data={matchStatsWithColors}
      label={({ dataEntry: { title, value, percentage }, dataIndex }) =>
        `${
          title !== 'Ties' ? EMOJIS[dataIndex] : ''
        } ${title}: ${value} (${Math.round(percentage)}%)`
      }
      style={{
        height: '70vh',
        width: '70vw',
      }}
      labelStyle={{
        fontSize: '0.4rem',
        fontFamily: 'VT323',
      }}
    />
  )
}
