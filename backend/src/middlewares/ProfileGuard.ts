import { NextFunction, Request, Response } from "express";
import prismaClient from "../prisma";

interface AuthenticatedRequest extends Request {
    user_id: string;
    profile_id?: string;
}

export const ProfileGuard = async (req: Request, res: Response, next: NextFunction) => {
    const r = req as AuthenticatedRequest;
    const profileId = r.headers["x-profile-id"] as string | undefined;
    console.log("[ProfileGuard] x-profile-id:", profileId, "userId:", r.user_id);

    if (!profileId) {
        const defaultProfile = await prismaClient.profile.findFirst({
            where: {
                userId: r.user_id,
                isDefault: true,
            },
            select: { id: true },
        });

        if (!defaultProfile) {
            console.error("[ProfileGuard] nenhum perfil padrão encontrado para userId:", r.user_id);
            return res.status(400).json({ error: "Nenhum perfil encontrado." });
        }

        console.log("[ProfileGuard] usando perfil padrão:", defaultProfile.id);
        r.profile_id = defaultProfile.id;
        return next();
    }

    const profile = await prismaClient.profile.findFirst({
        where: {
            id: profileId,
            userId: r.user_id,
        },
        select: { id: true },
    });

    if (!profile) {
        console.error("[ProfileGuard] perfil não pertence ao usuário:", profileId, "userId:", r.user_id);
        return res.status(403).json({ error: "Perfil não pertence a este usuário." });
    }

    console.log("[ProfileGuard] perfil validado:", profile.id);
    r.profile_id = profile.id;
    return next();
};
