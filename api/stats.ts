import { StatsResponse } from '../types'

export const statsFetcher = async (): Promise<StatsResponse> => {
  const statsResponse = await fetch(`api/stats`)
  return (await statsResponse.json()) as StatsResponse
}
