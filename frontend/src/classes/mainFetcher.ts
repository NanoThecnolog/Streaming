import { CardsProps } from "@/@types/Cards";
import { debug } from "./DebugLogger";
import axios from "axios";

const maxTentativas = 3;

export class MovieFetcher {
    private cache = new Map<number, any>()

    constructor(private token: string, private maxRetries: number = maxTentativas) { }

    async fetchCardData(cardId: number): Promise<any> {
        debug.log("Starting fetchCardData, cardId:", cardId)

        if (this.cache.has(cardId)) {
            debug.log('card no cache', cardId)
            return this.cache.get(cardId)
        }

        let attempts = 0

        while (attempts <= this.maxRetries) {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/movie/${cardId}`,
                    {
                        headers: { Authorization: `Bearer ${this.token}` },
                        params: { language: "pt-BR" },
                        timeout: 3000,
                    }
                )
                const data = {
                    sucess: true,
                    data: response.data,
                    cardId,
                }
                this.cache.set(cardId, data)
                return data
            } catch (err: any) {
                console.log(`Erro na tentativa ${attempts + 1}, card ${cardId}`)

                if (err.code === "ECONNABORTED") console.log(`Timeout na request para o card ${cardId}`)
                else if (err.response) console.log(`Erro HTTP ${err.response.status} para o card ${cardId}`)

                attempts++
                if (attempts > this.maxRetries) {
                    return {
                        sucess: false,
                        error: err.response?.data || err.message,
                        cardId
                    }
                }
                await new Promise((resolve) => {
                    const delay = Math.pow(2, attempts) * 100 + Math.random() * 100
                    setTimeout(resolve, delay)
                })
            }
        }
    }
}

export class CardFetcher {
    constructor(private tmdbService: MovieFetcher, private batchSize: number = 20) { }

    async fetchInBatches(items: CardsProps[]): Promise<any[]> {
        debug.log("Iniciando function fetchInBatches")

        const batchPromises = []

        for (let i = 0; i < items.length; i += this.batchSize) {
            const batch = items.slice(i, i + this.batchSize)
            batchPromises.push(
                Promise.all(batch.map((card) => this.tmdbService.fetchCardData(card.tmdbId)))
            )
        }
        try {
            const batchResults = await Promise.all(batchPromises)
            return batchResults.flat()
        } catch (err) {
            console.log("Erro no batch: ", err)
            return []
        }
    }
}