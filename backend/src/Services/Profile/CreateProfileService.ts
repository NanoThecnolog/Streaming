import prismaClient from "../../prisma";
import { BadRequestError } from "../../Utils/badRequestExtend";

interface CreateProfileRequest {
    userId: string;
    name: string;
    avatar?: string;
}

const validateAvatarUrl = (avatar?: string): void => {
    if (!avatar) return;

    let url: URL;
    try {
        url = new URL(avatar);
    } catch {
        throw new Error("URL do avatar inválida.");
    }

    const allowedStyles = new Set([
        "lorelei", "lorelei-neutral", "notionists", "notionists-neutral",
        "open-peeps", "pixel-art", "pixel-art-neutral", "identicon",
        "shapes", "thumbs", "adventurer",
    ]);
    const params = [...url.searchParams.entries()];
    const hasInvalidParam = params.some(
        ([key, value]) =>
            !/^[a-z][a-zA-Z0-9]{0,49}$/.test(key) ||
            value.length > 250 ||
            !/^[a-zA-Z0-9#.,_:+-]+$/.test(value),
    );
    const [, version, style, format] = url.pathname.split("/");
    const isValid =
        url.protocol === "https:" &&
        url.hostname === "api.dicebear.com" &&
        version === "10.x" &&
        allowedStyles.has(style) &&
        format === "svg" &&
        !url.username &&
        !url.password &&
        !url.hash &&
        Boolean(url.searchParams.get("seed")) &&
        params.length <= 100 &&
        !hasInvalidParam &&
        avatar.length <= 2000;

    if (!isValid) throw new Error("Avatar não permitido.");
};

class CreateProfileService {
    async execute({ userId, name, avatar }: CreateProfileRequest) {
        const profileCount = await prismaClient.profile.count({
            where: { userId },
        });

        console.log("[CreateProfileService] userId:", userId, "profileCount:", profileCount);

        if (profileCount >= 4) {
            throw new BadRequestError("Limite de 4 perfis atingido.");
        }

        validateAvatarUrl(avatar);

        const profile = await prismaClient.profile.create({
            data: {
                userId,
                name,
                avatar: avatar ?? null,
                isDefault: profileCount === 0,
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                isDefault: true,
                createdAt: true,
            },
        });

        console.log("[CreateProfileService] profile criado:", JSON.stringify(profile));
        return profile;
    }
}

export { CreateProfileService };
