import { renderAPI } from "./renderAPI";

export async function serverStatus() {
    //console.log("Chamando serverStatus")
    const serviceId = 'srv-crlhtrd6l47c7383d3qg'
    const limit = 1
    try {
        const ultimoCommit = await renderAPI.get(`/${serviceId}/deploys?limit=${limit}`)
        if (ultimoCommit.status === 200 && Array.isArray(ultimoCommit.data) && ultimoCommit.data.length > 0) {
            const commit = ultimoCommit.data[0].deploy
            if (commit && commit.status) {

                return commit.status
            } else {
                return "Status do servidor não encontrado"
            }
        } else {
            return "Nenhum deploy disponível ou erro na requisição"
        }
    } catch (err) {
        console.log("Erro ao verificar status do servidor: ", err)
        return "Erro ao verificar status do servidor"
    }

}