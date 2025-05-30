import Image from "next/image";
import { useEffect, useState } from "react";
import Spinner from "../ui/Loading/spinner";
import { SetupAPIClient } from "@/services/api";

export default function Qrcode() {
    const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const client = new SetupAPIClient()
    useEffect(() => {
        qrCode();
    }, []);
    async function qrCode() {
        try {
            const response = await client.api.get('/pix');
            const data = response.data;
            setQrCodeUrl(data);
        } catch (err) {
            if (err instanceof ErrorEvent) {
                //console.error(err.message)
                setError(err.message)
            }
            return { error: "Erro ao gerar qrCode" }
        }
    }

    return (
        <div>
            {
                error ? (
                    <p>{error}</p>
                ) : (
                    qrCodeUrl ? (
                        <Image src={qrCodeUrl} alt="Qr code Pix" width={250} height={250} />
                    ) : (
                        <Spinner />
                    )
                )
            }
        </div>
    )
}