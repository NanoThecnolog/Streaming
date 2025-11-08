import prismaClient from "../../prisma";

type MovieRequest = {
    background: string;
    overlay: string;
    title: string;
    subtitle: string;
    src: string;
    description: string;
    duration: string;
    genero: string[];
}

class CreateMovieService {
    async execute({ background, overlay, title, subtitle, src, description, duration, genero }: MovieRequest) {

        const createMovie = await prismaClient.movies.create({
            data: {
                background,
                overlay,
                title,
                subtitle,
                src,
                description,
                duration,
                genero
            }
        })
        return createMovie;
    }
}

export { CreateMovieService }