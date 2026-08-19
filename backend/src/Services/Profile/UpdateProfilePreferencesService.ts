import prismaClient from "../../prisma";
import { BadRequestError } from "../../Utils/badRequestExtend";

interface GenreInput {
    genId: number;
    weight: number;
}

interface UpdatePreferencesRequest {
    profileId: string;
    userId: string;
    genres: GenreInput[];
}

class UpdateProfilePreferencesService {
    async execute({ profileId, userId, genres }: UpdatePreferencesRequest) {
        const profile = await prismaClient.profile.findFirst({
            where: { id: profileId, userId },
        });

        if (!profile) {
            throw new BadRequestError("Perfil não encontrado.");
        }

        for (const g of genres) {
            if (g.weight < 1 || g.weight > 3) {
                throw new BadRequestError("Peso deve ser entre 1 e 3.");
            }
        }

        const genIds = genres.map((g) => g.genId);
        const validGens = await prismaClient.gen.findMany({
            where: { id: { in: genIds } },
            select: { id: true },
        });

        if (validGens.length !== genIds.length) {
            throw new BadRequestError("Um ou mais gêneros são inválidos.");
        }

        await prismaClient.$transaction([
            prismaClient.profileGenPreference.deleteMany({
                where: { profileId },
            }),
            prismaClient.profileGenPreference.createMany({
                data: genres.map((g) => ({
                    profileId,
                    genId: g.genId,
                    weight: g.weight,
                })),
            }),
        ]);

        const updated = await prismaClient.profileGenPreference.findMany({
            where: { profileId },
            include: {
                gen: {
                    select: { id: true, name: true, slug: true },
                },
            },
            orderBy: { weight: "desc" },
        });

        return updated.map((p) => ({
            genId: p.gen.id,
            name: p.gen.name,
            slug: p.gen.slug,
            weight: p.weight,
        }));
    }
}

export { UpdateProfilePreferencesService };
