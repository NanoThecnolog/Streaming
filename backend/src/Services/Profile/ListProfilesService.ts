import prismaClient from "../../prisma";

class ListProfilesService {
    async execute(userId: string) {
        const profiles = await prismaClient.profile.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                avatar: true,
                isDefault: true,
                createdAt: true,
            },
            orderBy: { createdAt: "asc" },
        });

        return profiles;
    }
}

export { ListProfilesService };
