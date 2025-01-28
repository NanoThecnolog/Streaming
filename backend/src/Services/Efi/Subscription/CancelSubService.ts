import prismaClient from '../../../prisma';
import { efiPay } from '../EfiPay';

interface CancelSubRequest {
    id: number,
    userId: string
}

export class CancelSubService {
    async execute({ id, userId }: CancelSubRequest) {
        const cancelSub = efiPay.cancelSubscription({ id })
        return cancelSub
    }
}