import fetch, { Response } from 'node-fetch'
import { NextApiRequest, NextApiResponse } from 'next'

import {
  transformMatchStatsToChartData,
  transformTeamStatsToTeamStandingData,
} from '../../utils/fifaLogResponseParser'
import {
  API,
  SUPER_SECRET_PASSWORD,
  SUPER_SECRET_USER_NAME,
} from '../../utils/constants'

export default async function statsHandler(
  _req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  const loginResponse = await fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username: SUPER_SECRET_USER_NAME,
      password: SUPER_SECRET_PASSWORD,
    }),
  })

  const statsResponse = await fetch(`${API}/api/stats`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: parseCookies(loginResponse),
    },
  })

  const teamStatsResponse = await fetch(`${API}/api/team-stats`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: parseCookies(loginResponse),
    },
  })

  const totalStats = transformMatchStatsToChartData(await statsResponse.json())
  const teamStats = transformTeamStatsToTeamStandingData(
    await teamStatsResponse.json(),
  )

  res.status(200).json({ timestamp: new Date(), ...totalStats, ...teamStats })
}

function parseCookies(response: Response): string {
  const cookiesRaw = response.headers.raw()['set-cookie']

  return cookiesRaw
    .map((entry) => {
      const parts = entry.split(';')
      const cookiePart = parts[0]
      return cookiePart
    })
    .join(';')
}
