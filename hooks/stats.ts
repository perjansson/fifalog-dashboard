import useSWR from 'swr'
import { TotalMatchStat, TotalMatchStatsResponse } from '../types'

const statsFetcher = (origin: string) => async () => {
  const statsResponse = await fetch(`${origin}/api/stats`)
  return (await statsResponse.json()) as TotalMatchStatsResponse
}

interface UseStatsResponse {
  stats?: Array<TotalMatchStat>
  totalGames?: number
  timestamp?: string
  isLoading: boolean
  isValidating: boolean
  isError: boolean
}

export function useStats(origin: string): UseStatsResponse {
  const { data, error, isValidating } = useSWR<TotalMatchStatsResponse, Error>(
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
