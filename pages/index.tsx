import Head from 'next/head'
import { Error } from '../components/Error'
import { Loading } from '../components/Loading'

import { MatchStatsChart } from '../components/MatchStatsChart'
import { Timestamp } from '../components/Timestamp'
import { useStats } from '../hooks/stats'
import { useWindowHeightOnResize } from '../hooks/windowResize'
import styles from '../styles/Index.module.css'

const Home: React.FC = () => {
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
            className={[
              styles.chart,
              styles[
                `loading-${Boolean(isLoading || isValidating).toString()}`
              ],
            ].join(' ')}
          >
            <MatchStatsChart matchStats={stats} />
            {timestamp && <Timestamp time={timestamp} />}
          </div>
        )}

        {isLoading && <Loading className={styles.loader} />}
        {isError && !stats && <Error className={styles.error} />}
      </main>
    </div>
  )
}

export default Home
