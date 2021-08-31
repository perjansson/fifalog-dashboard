import Head from 'next/head'
import Chart from 'react-google-charts'
import styles from '../styles/Home.module.css'

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

function parseMatchStats(stats) {
  return [
    ...Object.entries(
      stats
        .filter(({ month }) => month !== 'Last 10')
        .reduce((totalMatchMemo, { month, userStats }) => {
          const monthMatchStats = userStats.reduce(
            (monthMemo, { user, wins, overTimeWins }) => ({
              ...monthMemo,
              [user.name]: wins + overTimeWins,
            }),
            {},
          )

          const totalPlusMonthMatchStats = Object.entries(
            monthMatchStats,
          ).reduce(
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
  ].sort((a, b) => {
    return b[1] - a[1]
  })
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
  const matchStats = parseMatchStats(await statsResponse.json())

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
        <title>fifalog-dashboard</title>
        <meta name="description" content="Fifa Log Dashboard" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>FIFA Log statictics from all eternity</h1>
        {matchStats ? (
          <Chart
            width="1400px"
            height="1000px"
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[['Player', 'Wins'], ...matchStats]}
            options={{
              legend: {
                position: 'labeled',
                textStyle: { color: '#FFFFFF' },
              },
              fontSize: 24,
              pieSliceText: 'value',
              backgroundColor: '#262626',
              slices: {
                0: { color: '#adab02' },
                1: { color: '#9c9b94' },
                2: { color: '#82541b' },
              },
            }}
          />
        ) : null}
      </main>
    </div>
  )
}
