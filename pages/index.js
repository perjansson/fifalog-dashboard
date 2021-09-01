import Head from 'next/head'
import MatchStatsChart from '../components/MatchStatsChart'

import { useStats } from '../hooks/stats'
import styles from '../styles/Index.module.css'

export default function Home() {
  const { stats, timestamp, isLoading, isError } = useStats()

  return (
    <div className={styles.container}>
      <Head>
        <title>Fifa Log Dashboard</title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.header}>FIFA Log statistics from all eternity</h1>
        {stats && (
          <div
            className={[styles.chart, styles[`loading-${isLoading}`]].join(' ')}
          >
            <MatchStatsChart matchStats={stats} />
            {timestamp && (
              <div className={styles.lastUpdated}>
                Last updated at {timestamp}
              </div>
            )}
          </div>
        )}
        {isError && !stats && (
          <p className={styles.error}>
            😢 Crap! Error loading awesome FIFA data, try again...
          </p>
        )}
      </main>
    </div>
  )
}
