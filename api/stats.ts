import { TotalMatchStatsResponse } from '../types'

export const statsFetcher = async (): Promise<TotalMatchStatsResponse> => {
  const statsResponse = await fetch(`api/stats`)
  return (await statsResponse.json()) as TotalMatchStatsResponse
}
