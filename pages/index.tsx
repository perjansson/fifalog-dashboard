import { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import React, { Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import absoluteUrl from 'next-absolute-url'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

import { Error } from '../components/Error'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { MatchStatsChart } from '../components/MatchStatsChart'
import { Timestamp } from '../components/Timestamp'
import { useStats } from '../hooks/stats'
import { useTheme } from '../hooks/theme'
import { useWindowHeightOnResize } from '../hooks/windowResize'
import { isServer } from '../utils/isServer'

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
  transition: 'opacity 0.5s ease-in-out 1s, filter 0.5s ease-in-out 1s',

  svg: {
    flexGrow: 1,
  },

  variants: {
    loading: {
      true: {
        opacity: 0.5,
        filter: 'blur(10px)',
      },
    },
  },
})

const LastUpdated = styled(Timestamp, {
  color: '$white60',
})

interface Props {
  origin: string
}

const Chart: React.FC<Props> = ({ origin }) => {
  const { stats, totalGames, timestamp, isLoading, isValidating, isError } =
    useStats(origin)
  const { t } = useTranslation()

  return (
    <>
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
    </>
  )
}

const ChartSkeleton = () => {
  return (
    <>
      <div
        style={{
          height: '96vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Skeleton circle={true} height="50vh" width="50vh" />
      </div>
      <div
        style={{
          height: '3vh',
          width: '40vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1vh',
        }}
      >
        <div style={{ width: '100%' }}>
          <Skeleton
            width="100%"
            height="8"
            count={2}
            style={{ marginBottom: '8px' }}
          />
        </div>
      </div>
    </>
  )
}

const Home: NextPage<Props> = ({ origin }) => {
  const theme = useTheme()
  useWindowHeightOnResize()

  const { t } = useTranslation()

  return theme ? (
    <SkeletonTheme
      color={theme?.colors.contrast.value}
      highlightColor={theme?.colors.bg.value}
    >
      <Container className={theme}>
        <Head>
          <title>{t('pageTitle')}</title>
        </Head>

        <Main>
          <Header>{t('header')}</Header>

          {isServer ? (
            <Chart origin={origin} />
          ) : (
            <Suspense fallback={<ChartSkeleton />}>
              <Chart origin={origin} />
            </Suspense>
          )}
        </Main>
      </Container>
    </SkeletonTheme>
  ) : null
}

Home.getInitialProps = (context: NextPageContext) =>
  absoluteUrl(context.req, context.req?.headers.host)

export default Home
