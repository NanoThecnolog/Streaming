//import prismaClient from '../../prisma';

import { efiPay } from "../EfiPay";

export class DetailSubService {
  async execute(id: number) {

    const params = { id }
    const detail = efiPay.detailSubscription(params)
    return detail
  }
}