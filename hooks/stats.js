import useSWR from 'swr'

async function statsFetcher() {
  const statsResponse = await fetch(`api/stats`)
  return await statsResponse.json()
}

export function useStats() {
  const { data, error, isValidating } = useSWR(`api/stats`, statsFetcher, {
    refreshInterval: 5000,
  })

  return {
    stats: data?.stats,
    timestamp: data?.timestamp,
    isLoading: !error && !data,
    isValidating,
    isError: error,
  }
}
