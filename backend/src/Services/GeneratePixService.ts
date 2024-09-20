import QRCode from 'qrcode';


class GeneratePixService {
    async execute() {
        const chavePix = '0134ericssongomes.fotografia@gmail.com';
        const nomeRecebedor = '5925ERICSSON COSTA GOMES';
        const cidadeRecebedor = '14516007Niteroi';
        const valor = 10.00;

        const qrCode = "00020101021126700014br.gov.bcb.pix013669d28ddb-5447-44ec-997a-71be040384090208FlixNext520400005303986540510.005802BR5920Ericsson Costa Gomes6009SAO PAULO61080131010062120508FlixNext6304303C";

        function gerarPixPayload(chavePix: string, nomeRecebedor: string, cidadeRecebedor: string, valor: number): string {
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

        function payloadEqual(str1: string, str2: string): boolean {
            return str1 === str2;
        }
        function compararPayLoad(str1: string, str2: string): { emStr1NaoEmStr2: string[], emStr2NaoEmStr1: string[] } {
            const charsStr1 = new Set(str1);
            const charsStr2 = new Set(str2);
            const emStr1NaoEmStr2 = [...charsStr1].filter(char => !charsStr2.has(char))
            const emStr2NaoEmStr1 = [...charsStr2].filter(char => !charsStr1.has(char))

            return { emStr1NaoEmStr2, emStr2NaoEmStr1 }
        }

        try {
            const qrCodeDataUrl: string = await QRCode.toDataURL(qrCode);
            return qrCodeDataUrl;
        } catch (err) {
            throw new Error(`Erro ao gerar QR Code. ${err}`)
        }
    }
}
export { GeneratePixService }