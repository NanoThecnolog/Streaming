import { SetupAPIClient } from '@/services/api'
import axios from 'axios'

interface VerifyEmailResponse {
  result: boolean
  data: Data | {}
}

interface Data {
  name: string
  cpf: string
  //birthday: Date;
  email: string
  //address: null;
  phone_number: null
  verified: boolean
  donator: boolean
  subscription: null
  created_at: Date
}

export class Payments {
  private client: SetupAPIClient

  constructor() {
    this.client = new SetupAPIClient()
  }

  public async verificarEmail(email: string): Promise<VerifyEmailResponse> {
    const hasEmail = await this.client.api.post<VerifyEmailResponse>('/user/verify', {
      email,
    })
    return hasEmail.data
  }
}
