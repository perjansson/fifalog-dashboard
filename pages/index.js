import Head from 'next/head'
import FadeIn from 'react-fade-in'
import Loader from 'react-loader-spinner'

import MatchStatsChart from '../components/MatchStatsChart'
import { useStats } from '../hooks/stats'
import { useWindowHeightOnResize } from '../hooks/windowResize'
import styles from '../styles/Index.module.css'

export default function Home() {
  useWindowHeightOnResize()

  const { stats, timestamp, isLoading, isValidating, isError } = useStats()

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
                Last updated at {new Date(timestamp).toLocaleString()}
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <FadeIn
            delay={1500}
            transitionDuration={1000}
            className={styles.loader}
          >
            <Loader type="TailSpin" color="rgba(255, 255, 255, 0.8)" />
          </FadeIn>
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
