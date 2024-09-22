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

interface DataRequest {
    data: MovieRequest[]
}

class CreateManyMovieService {
    async execute({ data }: DataRequest) {
        //console.log("Received data:", data);


        const batchSize = 10;
        const results = [];

        for (let i = 0; i < data.length; i += batchSize) {
            const batch = data.slice(i, i + batchSize);
            try {
                const movies = await prismaClient.movies.createManyAndReturn({
                    data: batch
                });
                results.push(...movies); // Adiciona os resultados do lote
            } catch (error) {
                console.error("Error creating movies in batch:", error);
                throw new Error("Failed to create movies");
            }
        }

        return results;


    }
}

export { CreateManyMovieService }