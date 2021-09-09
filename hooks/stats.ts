import useSWR from 'swr'
import { TotalMatchStat, TotalMatchStatsResponse } from '../types'

async function statsFetcher() {
  const statsResponse = await fetch(`api/stats`)
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

export function useStats(): UseStatsResponse {
  const { data, error, isValidating } = useSWR<TotalMatchStatsResponse, Error>(
    `api/stats`,
    statsFetcher,
    {
      refreshInterval: 5000,
    },
  )

  return {
    ...data,
    isLoading: !error && !data,
    isValidating,
    isError: !!error,
  }
}
