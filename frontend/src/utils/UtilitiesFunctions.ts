/**
 * Função que transforma minutos em horas
 * @param min Minutos
 * @returns Retorna hora e os minutos formatados
 */

export function minToHour(min: number = 0): string {
    if (min <= 0) {
        return "--"
    }
    const hora = Math.floor(min / 60)
    const remainingMin = min % 60
    if (hora === 0) {
        return `${remainingMin}m`
    }
    return `${hora}h ${remainingMin}m`
}
/**
 * Função de tradução para os departamentos da equipe técnica
 * @param translations objeto com as traduções
 * @param str palavra a ser traduzida
 * @returns retorna a tradução correspondente no array translations ou str, caso não exista tradução.
 */
export function translate(str: string) {
    const translations: { [key: string]: string } = {
        "Directing": "Direção",
        "Writing": "Roteiristas",
        "Production": "Produção",
        "Editing": "Edição",
        "Sound": "Som",
        "Camera": "Câmera",
        "Art": "Arte",
        "Costume & Make-Up": "Figurino e Maquiagem",
        "Visual Effects": "Efeitos Visuais",
        "Lighting": "Iluminação",
        "Crew": "Equipe",
    }
    return translations[str] || str;
}

/**
 * Função pra garantir que a primeira letra seja maiúscula pq eu quero...
 * @param str palavra para capitalizar
 * @returns retorna a palavra com a primeira letra maiúscula
 */

export function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Função para remover acentuação de palavras.
 * @param str Palavra a ser tratada
 * @returns retorna a palavra sem acentos
 */

export function normalizing(str: string) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}