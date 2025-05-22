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
exports.apiEmail = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const url = process.env.MENSAGERIA;
if (!url)
    console.log("URL de mensageria ausente");
const apiKey = process.env.API_KEY;
if (!apiKey)
    console.log("Chave da api de mensageria ausente");
exports.apiEmail = axios_1.default.create({
    baseURL: url
});
exports.apiEmail.interceptors.request.use((config) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (apiKey) {
        config.headers = (_a = config.headers) !== null && _a !== void 0 ? _a : {};
        config.headers['key'] = apiKey;
    }
    else
        console.log("enviroment variable AKI_KEY missing");
    return config;
}), (error) => {
    return Promise.reject(error);
});
