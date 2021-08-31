import Head from 'next/head'
import { PieChart } from 'react-minimal-pie-chart'

import styles from '../styles/Index.module.css'

const COLORS = ['#e6cb22', '#9c9b94', '#82541b']
const EMOJIS = ['🥇', '🥈', '🥉']

function parseCookies(response) {
  const raw = response.headers.raw()['set-cookie']
  return raw
    .map((entry) => {
      const parts = entry.split(';')
      const cookiePart = parts[0]
      return cookiePart
    })
    .join(';')
}

function transformMatchStatsToChartData(stats) {
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
    .map((matchStat, i) => ({
      title: matchStat[0],
      value: matchStat[1],
      color: COLORS[i] || '#fff',
    }))

  const totalTies = monthlyStats.reduce(
    (drawMemo, { ties }) => drawMemo + ties,
    0,
  )

  return [...winsAndLosses, { title: 'Ties', value: totalTies, color: '#fff' }]
}

export async function getServerSideProps(context) {
  const loginResponse = await fetch(
    'https://fifalog.herokuapp.com/auth/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: 'fifalog', password: 'per' }),
    },
  )

  const statsResponse = await fetch('https://fifalog.herokuapp.com/api/stats', {
    method: 'GET',
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: parseCookies(loginResponse),
    },
  })
  const matchStats = transformMatchStatsToChartData(await statsResponse.json())

  return {
    props: {
      matchStats,
    },
  }
}

export default function Home({ matchStats }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fifa Log Dashboard</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>FIFA Log statistics from all eternity</h1>
        {matchStats ? (
          <PieChart
            data={matchStats}
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
        ) : null}
      </main>
    </div>
  )
}
