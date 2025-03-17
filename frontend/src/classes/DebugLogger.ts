class DebuLogger {
    private isDebug: boolean

    constructor() {
        this.isDebug = process.env.NEXT_PUBLIC_DEBUG === "development"
    }
    /**
     * Exibe uma mensagem no console.
     * @param args - Argumentos a serem exibidos no log.
     */
    log(...args: any[]) {
        if (this.isDebug) console.log(...args)
    }

    /**
     * Exibe uma mensagem de erro no console.
     * @param args - Argumentos a serem exibidos como erro.
     */
    error(...args: any[]) {
        if (this.isDebug) console.error(...args)
    }

    /**
     * Exibe um aviso no console.
     * @param args - Argumentos a serem exibidos como aviso.
     */
    warn(...args: any[]) {
        if (this.isDebug) console.warn(...args)
    }

    /**
     * Exibe uma tabela formatada no console.
     * @param data - Dados a serem exibidos em formato tabular.
     */
    table(data: any) {
        if (this.isDebug) console.table(data)
    }

    /**
     * Exibe uma mensagem informativa no console.
     * @param args - Argumentos a serem exibidos como informação.
     */
    info(...args: any[]) {
        if (this.isDebug) console.info(...args)
    }

    /**
     * Exibe a pilha de chamadas que levou até este ponto.
     * @param args - Mensagem opcional a ser incluída no trace.
     */
    trace(...args: any[]) {
        if (this.isDebug) console.trace(...args)
    }

    /**
     * Inicia um grupo de logs agrupados no console.
     * @param label - Nome do grupo.
     */
    group(label: string) {
        if (this.isDebug) console.group(label)
    }

    /**
     * Finaliza um grupo de logs iniciados com o método group.
     */
    groupEnd() {
        if (this.isDebug) console.groupEnd()
    }

    /**
     * Conta quantas vezes este método foi chamado com um determinado rótulo.
     * @param label - Rótulo do contador.
     */
    count(label: string) {
        if (this.isDebug) console.count(label)
    }

    /**
     * Reseta o contador iniciado pelo método count.
     * @param label - Rótulo do contador a ser resetado.
     */
    countReset(label: string) {
        if (this.isDebug) console.countReset(label)
    }

    /**
     * Inicia um temporizador no console.
     * @param label - Nome do temporizador.
     */
    time(label: string) {
        if (this.isDebug) console.time(label)
    }

    /**
     * Finaliza um temporizador iniciado com o método time e exibe o tempo decorrido.
     * @param label - Nome do temporizador.
     */
    timeEnd(label: string) {
        if (this.isDebug) console.timeEnd(label)
    }
}
export const debug = new DebuLogger();