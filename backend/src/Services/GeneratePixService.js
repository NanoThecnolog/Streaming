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
exports.GeneratePixService = void 0;
const qrcode_1 = __importDefault(require("qrcode"));
class GeneratePixService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const chavePix = '0134ericssongomes.fotografia@gmail.com';
            const nomeRecebedor = '5925ERICSSON COSTA GOMES';
            const cidadeRecebedor = '14516007Niteroi';
            const valor = 10.00;
            const qrCode = "00020101021126700014br.gov.bcb.pix013669d28ddb-5447-44ec-997a-71be040384090208FlixNext520400005303986540510.005802BR5920Ericsson Costa Gomes6009SAO PAULO61080131010062120508FlixNext6304303C";
            function gerarPixPayload(chavePix, nomeRecebedor, cidadeRecebedor, valor) {
                const pixKey = `680014br.gov.bcb.pix${chavePix}`;
                const infoRecebedor = `27600016BR.COM.PAGSEGURO`;
                const txid = "52040000";
                const transfId = "0136953AF884-B58A-4F7E-821A-4D5FB11E0890";
                const valorFormatado = `5405${valor.toFixed(2)}`;
                const merchantCategoryCode = "0208flixnext";
                const countryCode = "5802BR";
                const txCurrency = "5303986";
                const crc16 = "409180228396304E300";
                const infoAdicional = "62290525PAGS0000010002";
                return `00020126${pixKey}${merchantCategoryCode}${infoRecebedor}${transfId}${txid}${txCurrency}${valorFormatado}${countryCode}${nomeRecebedor} ${cidadeRecebedor}${infoAdicional}${crc16}`;
            }
            const pixPayload = gerarPixPayload(chavePix, nomeRecebedor, cidadeRecebedor, valor);
            function payloadEqual(str1, str2) {
                return str1 === str2;
            }
            function compararPayLoad(str1, str2) {
                const charsStr1 = new Set(str1);
                const charsStr2 = new Set(str2);
                const emStr1NaoEmStr2 = [...charsStr1].filter(char => !charsStr2.has(char));
                const emStr2NaoEmStr1 = [...charsStr2].filter(char => !charsStr1.has(char));
                return { emStr1NaoEmStr2, emStr2NaoEmStr1 };
            }
            try {
                const qrCodeDataUrl = yield qrcode_1.default.toDataURL(qrCode);
                return qrCodeDataUrl;
            }
            catch (err) {
                throw new Error(`Erro ao gerar QR Code. ${err}`);
            }
        });
    }
}
exports.GeneratePixService = GeneratePixService;
