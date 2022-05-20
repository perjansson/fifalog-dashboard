import useSWR from 'swr'
import { TotalMatchStat, StatsResponse, TeamStat } from '../types'

const statsFetcher = (origin: string) => async () => {
  const statsResponse = await fetch(`${origin}/api/stats`)
  return (await statsResponse.json()) as StatsResponse
}

interface UseStatsResponse {
  stats?: Array<TotalMatchStat>
  teamStats?: Array<TeamStat>
  totalGames?: number
  timestamp?: string
  isLoading: boolean
  isValidating: boolean
  isError: boolean
}

export function useStats(origin: string): UseStatsResponse {
  const { data, error, isValidating } = useSWR<StatsResponse, Error>(
    `${origin}/api/stats`,
    statsFetcher(origin),
    {
      suspense: true,
      refreshInterval: 15000,
    },
  )

  return {
    ...data,
    isLoading: !error && !data,
    isValidating,
    isError: !!error,
  }
}
