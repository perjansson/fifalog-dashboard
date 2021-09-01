import Head from 'next/head'
import MatchStatsChart from '../components/MatchStatsChart'

import { parseCookies } from '../utils/cookies'
import { transformMatchStatsToChartData } from '../utils/chartStats'
import {
  API,
  SUPER_SECRET_PASSWORD,
  SUPER_SECRET_USER_NAME,
} from '../utils/constants'

import styles from '../styles/Index.module.css'

export async function getServerSideProps() {
  const loginResponse = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: SUPER_SECRET_USER_NAME,
      password: SUPER_SECRET_PASSWORD,
    }),
  })

  const statsResponse = await fetch(`${API}/api/stats`, {
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
        {matchStats ? <MatchStatsChart matchStats={matchStats} /> : null}
      </main>
    </div>
  )
}
