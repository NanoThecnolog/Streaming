import { cards } from "@/data/cards"
import { series } from "@/data/series"

export const cookieOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    path: '/'
}
export const avatares = [
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.woueb.net%2Fimages%2Fmanga%2Fromain-manga.jpg&f=1&nofb=1&ipt=44ff213852ef9a7bbcf72a0c9e624c3e2a880f7e2c5852e751ff6a047b5d561e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-ik64bZYvKVs%2FTqmIccMI0gI%2FAAAAAAAAAgk%2FKhs8LaJTzPg%2Fs1600%2Favatar3.PNG&f=1&nofb=1&ipt=bdf3f948941d1dcc7ff7df54560175d3a814fe3f015e2fcfdfcca9ec8cb08888&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F94%2Ff6%2Fa6%2F94f6a63dd9704cae40c3675fe8e7409f.png&f=1&nofb=1&ipt=0d9db133e6d1e4636668e15cc5f409567d72cf9d7099647434e9fe9f582198e7&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcodigoworpress.com%2Fwp-content%2Fuploads%2F2021%2F04%2F1619444573_Cree-avatares-personalizados-y-dibujos-manga-para-chats-sitios-blogs.jpg&f=1&nofb=1&ipt=d8cd5a4a8775a8946479597a29939fc7ad6bbdcc4b8990119b27b74d09947305&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2F4.bp.blogspot.com%2F_X0x5Kbc6cU4%2FSD62SRkO0mI%2FAAAAAAAAAHM%2FWMKHvjyRlzU%2Fs200%2Fmetalozaru%2540gmail.com_20080529_75244834.jpg&f=1&nofb=1&ipt=ee67735d2f8e8e471fd3e5c6cff4ec4abbbf39701762e9d6ac216c99c1b46430&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.giardiniblog.it%2Fwp-content%2Fuploads%2F2009%2F02%2Fmangavatar.jpg&f=1&nofb=1&ipt=c75632be0173882a8ecf16fd1985f61c7b33c55adf3c39b89d4b50947fd6e879&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2F4.bp.blogspot.com%2F-3sSGU0Zkaqs%2FTenH0sC3YZI%2FAAAAAAAAAFg%2FK-NBKWorVXE%2Fs1600%2FAVATAR%2BSILVIA.jpg&f=1&nofb=1&ipt=0c92d97c1a82b264fbd78ef56dc567541e95c5d8e3e6b089c82cd6ebe8830b7e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthypix.com%2Fwp-content%2Fuploads%2F2021%2F10%2Fmanga-profile-picture-92-150x150.jpg&f=1&nofb=1&ipt=f23e792a0b68556d2a391bb33d9e80fa7dc8297aa087d42c89e7ce139f7acd8e&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.polymerclaydaily.com%2Fimages%2Ftinapple_manga.jpg&f=1&nofb=1&ipt=c269e6060e950e008a2c0e2631ed18779fc93f95efab9092debd744757ae8907&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F002%2F275%2F847%2Foriginal%2Fmale-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg&f=1&nofb=1&ipt=6e0ae00a4e223ccdf20fd5deae051af89d4a4e9b1002e1ff36d6e1345a4674ea&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fdf%2F5f%2F5b%2Fdf5f5b1b174a2b4b6026cc6c8f9395c1.jpg&f=1&nofb=1&ipt=005ecb7710f06341543ada561e1d3b0ddec5f32f967be43547ed3f735127f5d4&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8a%2F55%2F99%2F8a5599792c0d7b0a02377b97fafe76a9.jpg&f=1&nofb=1&ipt=2c8805c79cab54dbdcf4399dc01a9b9841c8741e9f0b40ee273373949daf6cfb&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fe3%2F63%2F16%2Fe36316cfd05ca21e44d8fabcf1a192be.jpg&f=1&nofb=1&ipt=09ccaab8cadd62e6e5b1045246049efcd0dd87b55744e33453b3e27cddf8f1a9&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fopenclipart.org%2Fimage%2F800px%2F313668&f=1&nofb=1&ipt=5669ff93e5d8b8aa18a3f36cad75a2110fc0875775e36df75800a3734514b377&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F736x%2F12%2Fc9%2Fd8%2F12c9d84f6be4493161938ce036f54fcc.jpg&f=1&nofb=1&ipt=44a514170a249169bfc036fe63d0a6808447ce5b7776507423367b83db6f006a&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.iconfinder.com%2Fdata%2Ficons%2Fteen-people-face-avatar-1%2F500%2Fhigh_99-1024.png&f=1&nofb=1&ipt=de39bc34c9a6dd311f9de6063c677b0e54b5b35f1cc771658380e0164832045b&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstatic.vecteezy.com%2Fsystem%2Fresources%2Fpreviews%2F019%2F494%2F963%2Fnon_2x%2Fman-boy-avatar-user-person-people-curly-hair-black-colored-outline-style-vector.jpg&f=1&nofb=1&ipt=7bba4bf362237dae90fe104070b7789adf4f51a16313b84c53e6ee94c2269c06&ipo=images",
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2Fd0%2F6b%2F43%2Fd06b43ef4fc9ed6d78ac7a925923b303.jpg&f=1&nofb=1&ipt=0d226e44feaa2d58f84ed2d37d01244f226b56cf4d9ee5d1953961db640fbe3d&ipo=images",
]
/**
 * config do fuse
 */
export const fuseConfig = {
    dados: [...cards, ...series], // array de objetos para a busca
    chaves: ["title", "subtitle"], // propriedades a serem comparadas
    taxa: 0.3 // taxa de comparação
}

export const breakpoints = [
    { width: 780, cards: 1 },
    { width: 1160, cards: 2 },
    { width: 1500, cards: 3 },
    { width: 1855, cards: 4 },
    { width: Infinity, cards: 5 },
]


export const text = [
    "...Carregando filmes...",
    "...Sincronizando som e imagem...",
    "...Ajustando qualidade...",
    "...Gerando lista de episódios das séries...",
    "...Lutando contra monstros...",
    "...Expansão de domínio...",
    "...Elevação pélvica...",
    "...Extraindo romances...",
    "...Preparando filmes de ação com Jason Statham...",
    "...Ficando com medo dos filmes de terror...",
    "...Chorando com o Jack na água... Tinha espaço Rose, tinha espaço...",
    "...Rindo com As Branquelas...",
    "...Fingindo ser John Wick...",
    "...Correndo pelo labirinto...",
    "...Procurando o Nemo também...",
    "...Ameaça no Ar, que filme ruim...",
    "...Aprendendo a sobreviver ao apocalipse zumbie...",
    "...Dumbledore tinha segredos...",
    "...SHAZAM!!!",
    "...Carrie era muito estranha...",
    "...Buscando wallpapers...",
    "...Carregando arquivos...",
    '...Como o "Bodycount" da Jane era 312?...',
    "...Procurando filmes com a Ana de Armas...",
    "...Tem um filme do Plankton agora?...",
    "...Procurando filmes baseados em livros...",
    "...Matrix é o melhor filme de ficção científica e só minha opinião importa...",
    "...Ficando impressionado com os filmes do Jason Statham...",
    "...Fingindo não gostar de comédia romântica...",
    "...Pedindo para esquecer Uma Sombra na Nuvem...",
    "...Torcendo pelo Frodo...",
    "...Esperando o oitavo filme do Tom Cruise...",
    "...Crepúsculo é ruim...",
    "...DC é melhor que Marvel...",
    "...Procurando séries baseadas em livros...",
    "...Instalando legendas...",
    "...Carregando informações do TMDB...",
    "...Excedendo limites com Bradley Cooper...",
    "...Encarando as bochechas do Ben Affleck como Batman...",
    "...Robert Pattison ficou bom como Batman e ninguém pode negar..."
]