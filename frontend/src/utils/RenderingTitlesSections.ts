export const getTitle = (section: string, type: string): string => {
    switch (`${section}_${type}`) {
        case 'Ação_movie':
            return 'Filmes de Ação'
        case 'Aventura_movie':
            return 'Aventuras de Tirar o fôlego'
        case 'Romance_movie':
            return 'Para Assistir a Dois'
        case 'Comédia_movie':
            return 'Comédias para Descontrair'
        case 'Drama_movie':
            return 'Drama do começo ao fim'
        case 'Terror_movie':
            return 'Terror na tela'
        case 'Suspense_movie':
            return 'Nada é o que parece'
        case 'Fantasia_movie':
            return 'Fantasia Sem Limites'
        case 'Animação_movie':
            return 'O Melhor da Animação'

        default:
            return section
    }
}