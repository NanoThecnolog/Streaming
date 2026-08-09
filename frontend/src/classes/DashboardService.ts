import { DashboardOverview, DashboardPeriod } from '@/@types/Dashboard/dashboard'
import { dashboardOverviewMock } from '@/components/dashboard/Panel/mocks/dashboard'
import { SetupAPIClient } from '@/services/api'
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
}

export const dashboardService = new DashboardService()
