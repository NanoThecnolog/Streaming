import prismaClient from "../../prisma";

class ListMoviesService {
    async execute() {
        const movieList = await prismaClient.movies.findMany()
        return movieList;
    }
}

export { ListMoviesService }