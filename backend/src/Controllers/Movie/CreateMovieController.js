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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMovieController = void 0;
const CreateMovieService_1 = require("../../Services/Movie/CreateMovieService");
class CreateMovieController {
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createMovieService = new CreateMovieService_1.CreateMovieService();
                const { background, overlay, title, subtitle, src, description, duration, genero } = req.body;
                const movie = yield createMovieService.execute({
                    background,
                    overlay,
                    title,
                    subtitle,
                    description,
                    src,
                    duration,
                    genero
                });
                return res.json(movie);
            }
            catch (err) {
                if (err instanceof Error) {
                    return res.status(400).json({ error: err.message });
                }
                return res.status(400).json({ error: "Erro ao cadastrar filme" });
            }
        });
    }
}
exports.CreateMovieController = CreateMovieController;
