import { DashboardOverview, DashboardPeriod, DashboardSubscription } from '@/@types/Dashboard/dashboard'
import axios from 'axios'

class DashboardService {
  public async getOverview(period: DashboardPeriod): Promise<DashboardOverview> {
    const overview = await axios.get(`/api/admin/dashboard`, {
      params: {
        period: period ?? '30d',
      },
    })

    if (overview.status !== 200) {
      throw new Error(`Dashboard request failed with status ${overview.status}`)
    }

    return overview.data
  }

  public async getSubscriptions(params?: { search?: string; status?: string }): Promise<DashboardSubscription[]> {
    const response = await axios.get('/api/admin/subscriptions', { params })
    if (response.status !== 200) throw new Error(`Subscriptions request failed with status ${response.status}`)
    return response.data.subscriptions
  }
}

export const dashboardService = new DashboardService()
