import { transformMatchStatsToChartData } from '../../utils/chart'
import {
  API,
  SUPER_SECRET_PASSWORD,
  SUPER_SECRET_USER_NAME,
} from '../../utils/constants'
import { parseCookies } from '../../utils/cookies'

export default async function asynchandler(req, res) {
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
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      cookie: parseCookies(loginResponse),
    },
  })

  const stats = transformMatchStatsToChartData(await statsResponse.json())
  res.status(200).json({ timestamp: new Date(), stats })
}
