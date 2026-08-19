import prismaClient from "../../prisma";
import { BadRequestError } from "../../Utils/badRequestExtend";

interface DeleteProfileRequest {
    profileId: string;
    userId: string;
}

class DeleteProfileService {
    async execute({ profileId, userId }: DeleteProfileRequest) {
        const profile = await prismaClient.profile.findFirst({
            where: { id: profileId, userId },
        });

        if (!profile) {
            throw new BadRequestError("Perfil não encontrado.");
        }

        const count = await prismaClient.profile.count({
            where: { userId },
        });

        if (count <= 1) {
            throw new BadRequestError("Não é possível excluir o único perfil da conta.");
        }

        await prismaClient.profile.delete({
            where: { id: profileId },
        });

        const remainingDefault = await prismaClient.profile.findFirst({
            where: { userId, isDefault: true },
            select: { id: true },
        });

        if (!remainingDefault) {
            const oldest = await prismaClient.profile.findFirst({
                where: { userId },
                orderBy: { createdAt: "asc" },
                select: { id: true },
            });
            if (oldest) {
                await prismaClient.profile.update({
                    where: { id: oldest.id },
                    data: { isDefault: true },
                });
            }
        }

        return { deleted: true };
    }
}

export { DeleteProfileService };
