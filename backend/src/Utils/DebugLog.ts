/**
 * Função para debug no console.log em desenvolvimento
 * @param args Argumentos para debugar no console
 */

export function debugLog(...args: any[]) {
    if (process.env.DEBUG === "development") {
        console.log(...args)
    }
}