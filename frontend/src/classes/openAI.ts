import axios, { AxiosInstance } from "axios";
import { headers } from "next/headers";
import { debug } from "./DebugLogger";

interface ChatMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

interface ChatGPTResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        message: ChatMessage;
        finish_reason: string;
        index: number;
    }>;
}

class OpenAI {
    private api: AxiosInstance;
    private model: string;
    private debug: typeof debug


    constructor(apiKey: string, model: string = 'gpt-3.5-turbo') {
        this.api = axios.create({
            baseURL: 'https://api.openai.com/v1',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        })
        this.model = model
        this.debug = debug
    }

    public async sendMenssage(messages: ChatMessage[]): Promise<string> {
        try {
            const response = await this.api.get<ChatGPTResponse>('/chat/completions', {
                model: this.model,
                messages
            })
            const reply = response.data.choices[0].message.content
            return reply
        } catch (err: any) {
            this.debug.error('Erro ao enviar mensagem: ', err.response?.data || err.message)
            throw new Error('Erro durante comunicação com a API do chatGPT.')
        }
    }
}