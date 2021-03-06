import { PieChart } from 'react-minimal-pie-chart'
import { Data } from 'react-minimal-pie-chart/types/commonTypes'
import i18n from '../utils/i18n'
import { TotalMatchStat } from '../types'

const COLORS = ['#e6cb22', '#9c9b94', '#82541b']
const EMOJIS = ['🥇', '🥈', '🥉']

interface Props {
  matchStats: TotalMatchStat[]
}

export const MatchStatsChart: React.FC<Props> = ({ matchStats }) => {
  const matchStatsWithColors: Data = matchStats.map((matchStat, i) => ({
    ...matchStat,
    color: COLORS[i] || '#fff',
  }))

  return (
    <PieChart
      data={matchStatsWithColors}
      label={({ dataEntry: { title, value, percentage }, dataIndex }) => {
        if (!title) {
          return ''
        }

        const translatedTitle = title === 'Ties' ? i18n.t('ties') : title

        return `${
          title !== i18n.t('ties') ? EMOJIS[dataIndex] : ''
        } ${translatedTitle}: ${value} (${Math.round(percentage)}%)`
      }}
      style={{
        height: '50vh',
      }}
      labelStyle={{
        fontSize: '0.3rem',
        fontFamily: 'VT323',
      }}
    />
  )
}
