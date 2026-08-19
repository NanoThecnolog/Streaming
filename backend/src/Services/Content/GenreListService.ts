import prismaClient from "../../prisma";

class GenreListService {
    async execute() {
        const genres = await prismaClient.gen.findMany({
            select: { id: true, name: true, slug: true },
            orderBy: { name: "asc" },
        });

        return genres;
    }
}

export { GenreListService };
