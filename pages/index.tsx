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
import { TeamStat } from '../types'
import { useViewport } from '../hooks/useViewport'

const Container = styled('div', {
  minHeight: 'calc(var(--vh, 1vh) * 100)',
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

const StatsWrapper = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'opacity 0.5s ease-in-out 1s, filter 0.5s ease-in-out 1s',

  '> *:not(:last-child)': {
    marginBottom: '$space10',
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

const Stats: React.FC<Props> = ({ origin }) => {
  const {
    stats,
    totalGames,
    teamStats,
    timestamp,
    isLoading,
    isValidating,
    isError,
  } = useStats(origin)

  const hasAllStats = stats && teamStats && totalGames && timestamp

  return (
    <>
      <StatsWrapper loading={isLoading || isValidating}>
        {isLoading && <Loading />}
        {hasAllStats && (
          <>
            <MatchStatsChart matchStats={stats} />
            <TeamStandings teamStats={teamStats} />
            <StatsSummary totalGames={totalGames} timestamp={timestamp} />
          </>
        )}
      </StatsWrapper>
      {isError && !stats && <Error />}
    </>
  )
}

const Table = styled('table', {
  tableLayout: 'fixed',
  width: '100%',
  maxWidth: '1200px',
  borderCollapse: 'collapse',

  'th, td': {
    height: '48px',
    width: '20%',
    textAlign: 'right',
    color: '$secondary',
    padding: '$space2',
  },

  th: {
    color: '$primary',
    fontSize: '$large',
  },

  'th:nth-child(1)': {
    width: '40%',
    textAlign: 'left',
  },
})

const THead = styled('thead', {
  th: {
    fontSize: '$xlarge',
  },
})

const TeamStandings: React.FC<{ teamStats: Array<TeamStat> }> = ({
  teamStats,
}) => {
  const { t } = useTranslation()
  const { isMobile } = useViewport()

  return (
    <Table>
      <THead>
        <tr>
          <th scope="col">{t(isMobile ? 'teamShort' : 'team')}</th>
          <th scope="col">{t(isMobile ? 'matchesShort' : 'matches')}</th>
          <th scope="col">{t(isMobile ? 'winsShort' : 'wins')}</th>
          <th scope="col">
            {t(isMobile ? 'winPercentageShort' : 'winPercentage')}
          </th>
        </tr>
      </THead>
      <tbody>
        {teamStats.map(({ team, matches, wins, winPercentage }) => (
          <tr key={team}>
            <th scope="row">{team}</th>
            <td>{matches}</td>
            <td>{wins}</td>
            <td>{winPercentage}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

const StatsSummaryWrapper = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

const StatsSummary: React.FC<{ totalGames: number; timestamp: string }> = ({
  totalGames,
  timestamp,
}) => {
  const { t } = useTranslation()

  return (
    <StatsSummaryWrapper>
      <div>{t('totalGames', { count: totalGames })}</div>
      {timestamp && <LastUpdated time={timestamp} />}
    </StatsSummaryWrapper>
  )
}

const StatsSkeleton = () => {
  const { isMobile } = useViewport()

  return (
    <>
      <div
        style={{
          minHeight: '96vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '60px',
        }}
      >
        <Skeleton
          circle={true}
          height={isMobile ? '90vw' : '50vh'}
          width={isMobile ? '90vw' : '50vh'}
        />
        <Skeleton height={'50vh'} width={isMobile ? '90vw' : '60vh'} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Skeleton width="40vw" height="8" style={{ marginBottom: '8px' }} />
          <Skeleton width="40vw" height="8" style={{ marginBottom: '8px' }} />
        </div>
      </div>
    </>
  )
}

const Index: NextPage<Props> = ({ origin }) => {
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
            <Stats origin={origin} />
          ) : (
            <Suspense fallback={<StatsSkeleton />}>
              <Stats origin={origin} />
            </Suspense>
          )}
        </Main>
      </Container>
    </SkeletonTheme>
  ) : null
}

Index.getInitialProps = (context: NextPageContext) =>
  absoluteUrl(context.req, context.req?.headers.host)

export default Index
