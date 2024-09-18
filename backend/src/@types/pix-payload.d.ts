declare module 'pix-payload' {
    export class Pix {
        constructor(params: {
            pixKey: string;
            version: string;
            message: string;
            merchantName: string;
            merchantCity: string;
            transactionAmount: number;
            referenceLabel?: string;
        });

        getPayload(): string;
    }
}
