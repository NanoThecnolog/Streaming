"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateManyMovieService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
class CreateManyMovieService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ data }) {
            const batchSize = 10;
            const results = [];
            for (let i = 0; i < data.length; i += batchSize) {
                const batch = data.slice(i, i + batchSize);
                try {
                    const movies = yield prisma_1.default.movies.createManyAndReturn({
                        data: batch
                    });
                    results.push(...movies); // Adiciona os resultados do lote
                }
                catch (error) {
                    console.error("Error creating movies in batch:", error);
                    throw new Error("Failed to create movies");
                }
            }
            return results;
        });
    }
}
exports.CreateManyMovieService = CreateManyMovieService;
