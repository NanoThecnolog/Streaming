import { Request, Response, text } from "express";
import { ActiveUserService } from "../../Services/User/ActiveUserService";


class ActiveUserController {
    async handle(req: Request, res: Response) {
        try {
            const activeUserService = new ActiveUserService();
            const { email } = req.query;
            if (!email) {
                throw new Error("Email não recebido.")
            }
            const user = await activeUserService.execute({
                email: email as string
            })
            const userVerified: boolean = user.verified;

            const page = `
            <style>
                .container{
                    background-color: #000;                    
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    width: 100%;
                    color: #fff;
                    padding: 20px;
                    box-sizing: border-box;
                    margin: 0;
                }
                .cardContainer{
                    background-color: rgba(0,0,0,0.2);
                    backdrop-filter: blur(10px);
                    overflow: hidden;
                    border-radius: 2rem;
                    box-shadow: 5px 5px 15px 1px black;
                    width: 50%;
                    height: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;                    
                }
                .contentContainer{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;                    
                }
                .button{
                    border: none;
                    border-radius: 2rem;
                    padding: 15px 25px;
                    background-color: #d42c2c;
                    color: #fff;
                    cursor: pointer;
                    transition: all .5s;
                }
                .button:hover{
                    transform: scale(1.1)
                }
                
                @media (max-width: 768px) {
                    .cardContainer {
                        width: 90%;
                        height: auto;
                        padding: 15px;
                    }

                    .button {
                        padding: 12px 20px;
                        font-size: 0.9rem;
                    }

                    .contentContainer h2 {
                        font-size: 1.5rem;
                    }

                    .contentContainer p {
                        font-size: 1rem;
                    }
                }

                
                @media (max-width: 480px) {
                    .cardContainer {
                        width: 90%;
                        height: auto;
                        padding: 10px;
                    }

                    .button {
                        padding: 10px 15px;
                        font-size: 0.8rem;
                    }

                    .contentContainer h2 {
                        font-size: 1.2rem;
                    }

                    .contentContainer p {
                        font-size: 0.9rem;
                    }
                }
            </style>
            <div class="container" style="
            background-image: url(https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwallpaperaccess.com%2Ffull%2F4321344.jpg&f=1&nofb=1&ipt=e561bcf964fd269c74214638aaa624daf5819fa9a9458a1033209e52c3d2ab80&ipo=images);
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            ">
                    <div class="cardContainer">
                        <div class="contentContainer">
                        <h2>Sua conta foi ativada com sucesso!</h2>
                            <p>Obrigado por ativar sua conta na FlixNext =D</p>
                            <div style="padding: 10px;">
                                <a href="https://flixnext.vercel.app">
                                    <button class="button">Fazer Login</button>
                                </a>
                            </div>                       
                        </div>
                    </div>
            </div>
            `

            return res.send(page)
        } catch (err) {
            if (err instanceof Error) {
                return res.status(400).json({ error: err.message })
            }
            return res.status(400).json({ error: "Erro ao ativar usuário." })
        }
    }
}

export { ActiveUserController }