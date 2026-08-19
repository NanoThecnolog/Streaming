import prismaClient from "../../prisma";
import { BadRequestError } from "../../Utils/badRequestExtend";

interface EditProfileRequest {
    profileId: string;
    userId: string;
    name?: string;
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

class EditProfileService {
    async execute({ profileId, userId, name, avatar }: EditProfileRequest) {
        const existing = await prismaClient.profile.findFirst({
            where: { id: profileId, userId },
        });

        if (!existing) {
            throw new BadRequestError("Perfil não encontrado.");
        }

        validateAvatarUrl(avatar);

        if (name && name !== existing.name) {
            const nameConflict = await prismaClient.profile.findFirst({
                where: { userId, name, id: { not: profileId } },
            });
            if (nameConflict) {
                throw new BadRequestError("Já existe um perfil com esse nome.");
            }
        }

        const profile = await prismaClient.profile.update({
            where: { id: profileId },
            data: {
                name: name ?? existing.name,
                avatar: avatar ?? existing.avatar,
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                isDefault: true,
                createdAt: true,
            },
        });

        return profile;
    }
}

export { EditProfileService };
