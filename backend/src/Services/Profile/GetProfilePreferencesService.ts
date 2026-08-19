import prismaClient from "../../prisma";
import { BadRequestError } from "../../Utils/badRequestExtend";

interface GetPreferencesRequest {
    profileId: string;
    userId: string;
}

class GetProfilePreferencesService {
    async execute({ profileId, userId }: GetPreferencesRequest) {
        console.log("[GetProfilePreferences] profileId:", profileId, "userId:", userId);

        const profile = await prismaClient.profile.findFirst({
            where: { id: profileId, userId },
        });

        if (!profile) {
            console.error("[GetProfilePreferences] perfil não encontrado para userId:", userId);
            throw new BadRequestError("Perfil não encontrado.");
        }

        const preferences = await prismaClient.profileGenPreference.findMany({
            where: { profileId },
            include: {
                gen: {
                    select: { id: true, name: true, slug: true },
                },
            },
            orderBy: { weight: "desc" },
        });

        const result = preferences.map((p) => ({
            genId: p.gen.id,
            name: p.gen.name,
            slug: p.gen.slug,
            weight: p.weight,
        }));

        console.log("[GetProfilePreferences] count:", result.length);
        return result;
    }
}

export { GetProfilePreferencesService };
