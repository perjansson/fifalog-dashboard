import Head from 'next/head'
import { useTranslation } from 'react-i18next'

import { Error } from '../components/Error'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { MatchStatsChart } from '../components/MatchStatsChart'
import { Timestamp } from '../components/Timestamp'
import { useStats } from '../hooks/stats'
import { useTheme } from '../hooks/theme'
import { useWindowHeightOnResize } from '../hooks/windowResize'

import { styled } from '../stitches.config'

const Container = styled('div', {
  height: 'calc(var(--vh, 1vh) * 100)',
  width: '100%',
  backgroundColor: '$bg',
  color: '$primary',
})

const Main = styled('main', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '$space5',
  '@bp1': {
    paddingY: '$space3',
    paddingX: '@space10',
  },
  '@bp2': {
    paddingY: '$space5',
    paddingX: '$space15',
  },
})

const ChartWrapper = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
  transition: 'opacity 0.5s ease-in-out 1s',

  svg: {
    flexGrow: 1,
  },

  variants: {
    loading: {
      true: {
        opacity: 0.5,
      },
    },
  },
})

const LastUpdated = styled(Timestamp, {
  color: '$white60',
})

const Home: React.FC = () => {
  const theme = useTheme()
  useWindowHeightOnResize()

  const { stats, totalGames, timestamp, isLoading, isValidating, isError } =
    useStats()

  const { t } = useTranslation()

  return theme ? (
    <Container className={theme}>
      <Head>
        <title>{t('pageTitle')}</title>
      </Head>

      <Main>
        <Header>{t('header')}</Header>

        <ChartWrapper loading={isLoading || isValidating}>
          {isLoading && <Loading />}
          {stats && (
            <>
              <MatchStatsChart matchStats={stats} />
              <div>{t('totalGames', { count: totalGames })}</div>
              {timestamp && <LastUpdated time={timestamp} />}
            </>
          )}
        </ChartWrapper>

        {isError && !stats && <Error />}
      </Main>
    </Container>
  ) : null
}

export default Home
