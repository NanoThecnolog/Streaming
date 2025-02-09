import { SeriesProps } from "@/@types/series";
import { agp, gen, lang, stm } from "@/utils/Genres";

const background = "/fundo-largo.jpg";
const overlay = "/fundo-alto.jpg";

export const series: SeriesProps[] = [
    /*
    schema genero: padrão > streaming > secundario
    padrão: Ação, aventura, romance, drama, comédia, terror, suspense, animação
    streaming: HBO, Disney+, Netflix, Prime Video, Apple TV, SKY, StarZ, Paramount
    secundario: dc, marvel, super herói, vilão
    para aplicar selo de novidade, incluir propriedade news:
    news: {
            type: "", (season OR episode)
        },
    {
        background: background,
        overlay: overlay,
        tmdbID: 0,
        title: "",
        subtitle: "",
        description: "",
        genero: [],
        faixa: "",        
        season: [
            {
                s: 1,
                lang: "",
                episodes: [
                    {
                        ep: 1,
                        src: "",
                        duration: ""
                    },
                ]
            },
        ]
    },
    */
    {
        background: background,
        overlay: overlay,
        tmdbID: 127532,
        title: "Solo Leveling",
        subtitle: "",
        description: 'Há mais de uma década, surgiu uma misteriosa passagem chamada "portal", que conecta este mundo a uma dimensão diferente, o que fez com que pessoas despertassem poderes únicos… e essas pessoas são chamadas de "caçadores". Os caçadores usam seus poderes sobre-humanos para conquistar masmorras dentro dos portais e assim ganhar a vida. Sung Jinwoo, um caçador de nível baixo, é considerado o caçador mais fraco de toda a humanidade. Certo dia, ele se depara com uma "masmorra dupla", que tem uma masmorra de nível alto escondida dentro de uma masmorra de nível baixo. Diante de um Jinwoo gravemente ferido, surge uma misteriosa missão! À beira da morte, Jinwoo decide aceitar essa missão, tornando-se assim a única pessoa capaz de subir de nível!',
        genero: [gen.animacao, gen.acao, gen.aventura, gen.fantasia],
        faixa: "A16",
        news: {
            type: "episode"
        },
        season: [
            {
                s: 1,
                lang: "Dublado & Legendado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1OJt8mGa4AyX4FjecZehvA1P_SZ4jlXmv/preview",
                        duration: "23m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ArsYO0NJ34qPiQ_YmmqFHDdGBNrDVyUN/preview",
                        duration: "23m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1V8x9LF0xtmsFxaeuiuWo5JWbmJSuTRdb/preview",
                        duration: "23m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1XxLGXcjYkcl4gvUNwqDiVBi23C0YlUKF/preview",
                        duration: "23m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1hpBYjnW-3OF1OShdJXhLzJGW60vR3wBf/preview",
                        duration: "23m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1szUygNiWfssBrXfcMMsck6P3Necg-boz/preview",
                        duration: "23m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1d0kXhBClsiAmmOifHF3MFSBN05vbhzlZ/preview",
                        duration: "23m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1omEGYOqaxB0bPXdAsHhXRv8Bc2837PDe/preview",
                        duration: "23m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1kiO5BoyXY2kfhBX8vsCR0X0FOd6Ut0gL/preview",
                        duration: "23m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1NxlGVA07iNVxdi_FRcp7H9gTceyIk4fu/preview",
                        duration: "23m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/185na25gVF4cAC4dyF1FsTL4IQf9Sl7wU/preview",
                        duration: "23m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1JaZDUXClsjgcfQ4WzLLNAjBz5uQZwbGw/preview",
                        duration: "23m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/17gN05EE_OscKH0VdB_Y3tg8AsWfGYwzJ/preview",
                        duration: "23m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/13P4FJjZKPsK1f0GRDAOn-IHIo46rSmn5/preview",
                        duration: "23m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1KCXWriVw0o55IVcsW5kpy8TOEWvZ8C8z/preview",
                        duration: "23m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1TUL5tM0fjke3z_wKtaPelgTl49WZqov2/preview",
                        duration: "23m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1kgZyTvEloEHjXMPqKYiCkL4W4qtCqAJp/preview",
                        duration: "23m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1vMPqtB7ICE29fjYEmkzZZAnkCqSflbnb/preview",
                        duration: "23m"
                    }
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 95396,
        title: "Ruptura",
        subtitle: "",
        description: "Mark lidera uma equipe de funcionários de escritório cujas memórias foram divididas cirurgicamente entre a vida no trabalho e a vida pessoal. Quando um colega de trabalho misterioso aparece fora do escritório, ele começa uma jornada para descobrir a verdade sobre seu trabalho.",
        genero: [gen.drama, agp.misterio, stm.apple],
        faixa: "A16",
        news: {
            type: "episode"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1p0vs9mgCS1L-E8vPBNbOG0-Ir5vO-MNj/preview",
                        duration: "57m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1CWZ6J197-M3BdGBHmj1N8UL3Bj50_dtR/preview",
                        duration: "53m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12edSfK0fZc2vog3J8Tol12t7_P2f2Zjf/preview",
                        duration: "56m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-ChxlMjvX8yPqQIS_SYCOamV1NmPgM83/preview",
                        duration: "46m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16QZ2NdVBjNseauGO0kGr8A0pwuzXVhB2/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1h1-sLNM_czN7GkurAigz6lA6nvY8GTD0/preview",
                        duration: "40m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1zd6zulP68L-QlEasscO7nMPlc07yVcQe/preview",
                        duration: "49m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1CMkU1PwTvMtX2vI5J0thXsRPiEH6kux7/preview",
                        duration: "46m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1iXqiVpeVv_EPhPNrf2k7rHqXPYQQIFLv/preview",
                        duration: "40m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1444o4GtHbK-P1FbP73HLh38EijCZrV_y/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1IFz4PjAAr4CgrTKpQscRdPcjM8euohHF/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1_NRnNs2QLoTFMH1zIlL4YmNdj_VlQ4lq/preview",
                        duration: "53m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1OhTtJQ4hVjh0GC5N-wZLo2scvhoycBzK/preview",
                        duration: "50m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 95557,
        title: "Invencível",
        subtitle: "",
        description: "Uma animação de super-heróis para adultos e conta a história de Mark Grayson, de 17 anos, um cara como qualquer outro de sua idade, exceto que seu pai é o super-herói mais poderoso do planeta, Omni-Man. Porém, à medida que Mark desenvolve seus próprios poderes, ele descobre que o legado de seu pai pode não ser tão heroico quanto parece.",
        genero: [gen.animacao, gen.acao, stm.prime],
        faixa: "18",
        news: {
            type: "season"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1xvWoi-mJAFzTLQ3Dhnw0V_7fr8cf0U73/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/17ZmjPw088QzNdwQSi4wKJIVL_gFNJ0d4/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ZprSAqRdOB9wulKAPHNaUd-qkTHy-OLZ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1bmaogKzDM_bnC2e2qvCV8VVzwJjD7Z6a/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1opz2x3S9Lqwbde9UUuhS8jvDPEjSiMWA/preview",
                        duration: "46m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1mn4qAjKw-EdULui1_afftGupUJyEKOGo/preview",
                        duration: "44m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/18QpxjSdGfjBff8Tce6MgF6DvVFicohy1/preview",
                        duration: "48m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1l-x724VJF4WKlb4kOVu3euFK4n7ngiPx/preview",
                        duration: "44m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1U6K3QNgy2BqujAAPFkzsoncN060qph_e/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1BtzaCFvl_--uXGAJULOEoH6NAIVnzvV7/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ZzTSnGFj4v7oTR8kkCZKGdVMBssloRTS/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/15bItupk0uu0fzCDf_PYdgrirByOTv29u/preview",
                        duration: "46m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1whENcY-e9Ur4Pa897de0loftWDn5jqIU/preview",
                        duration: "35m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/17Un82m3ZRSJylv_KxIVkkHhPb4t_ydk_/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/13F78n252dM7iLcCxLxvBbsZtGDlrzJd3/preview",
                        duration: "51m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Q1CBqjns0bpl7du7vpDKX6ioQ1K-Wz0R/preview",
                        duration: "53m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12nnnnLd4QA2gBqJLLEzQL9XvK9l2I1LI/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1Hpr3REd227KoSVhZWYVlezXn-9-uaRhB/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1O36MRo7AWVRAWlDWAE14ibA29oJgoAAT/preview",
                        duration: "50m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 62687,
        title: "Limitless",
        subtitle: "",
        description: "Brian Finch (Jake McDorman) é mais um rapaz comum de 28 anos, tentando encontrar algo em que realmente seja bom na vida. Ele encontra a solução de seus problemas quando é apresentado ao NZR, uma droga misteriosa que atua em sua cognição e libera a possibilidade de ele usar 100% da capacidade de seu cérebro. Ele então começa a trabalhar como consultor para o FBI, junto à Agente Rebecca Harris (Jennifer Carpenter), ajudando a resolver casos misteriosos com suas novas habilidades. Porém, ele também tem contatos clandestinos com o Senador Edward Morra (Bradley Cooper), que também é usuário de NZT e tem seus próprios planos para o protegido. ",
        genero: [gen.ficcao, gen.drama, gen.acao, gen.aventura, gen.comedia],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1dJRorH5r1NWTRAWzC06UuPD2PgKc3RIn/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1i8AOyXvRBzqEX2ZxDkqvkZumYYJvs2Af/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1V3W--y76FvV6vVZQ9qaQICVdATEyz9wE/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1st2gDdJcnQLSF_7T5xXNx5kRPFnw9W1-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/12rfkhV2-iNm4xOtrOUN98A9wP0unHZun/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1mwLN0DhGSps1_XTwNlvaA9z4Oayh6k_f/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/15abPyLdM-4eLrAiAgPFNwe1HcnVOHI2u/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1dc4hk13sipaBccnoLU7fRZBlC_4XkUUb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1VE8WtrkM1uPXloVd9RcNsI1dfddz6158/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1g_CuZhHApQQG-skdGyQQBEUZBvqzsGOu/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1DQpjbQge33M24xlG2u6JuVCZctLrAmTb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/12WnfE_pMD6jixnG__3ljblhMIXGAKuHm/preview",
                        duration: "41m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1jSOwdH25a8iFIPyVfp6uQ3njbfE5EKCM/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1GtbuxnIICzB34YbH3-cIETk1azXMJ6M2/preview",
                        duration: "41m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1suPqRUE5F07pV-ZY0GsSXSBNkFRR7EK4/preview",
                        duration: "41m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/144FldVxOWniVIkIaAhNQiSzAuY7GDHvo/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1j3glC2x6x6Lmr8TrFFeQDVX2TtWCRP0y/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1FxHXbrX16PPJiEBAVT_HTAqmvT0JUku6/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/13Qm1WjEZW41WTViZxRrs-_COyM_jfXcM/preview",
                        duration: "43"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1JyE9YQXnzMCm43MKNz8n9e1ovY8MD-xf/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1ZP3KaHqItHlQW9CF7RnXa28W2tKWLB7J/preview",
                        duration: "41m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1FlLs-s6Xt30TQQtJ7U1Hk_kiCdIGOqN8/preview",
                        duration: "42m"
                    },
                ]
            },
        ]
    },

    {
        background: background,
        overlay: overlay,
        tmdbID: 63639,
        title: "The Expanse",
        subtitle: "",
        description: "Duzentos anos no futuro, um detetive interespacial, o capitão de uma nave e uma diplomata antiguerra cruzam seus caminhos após uma jovem desaparecer misteriosamente.",
        genero: [gen.drama, gen.ficcao, agp.misterio],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1I5aCcW5dR-fQip7MhV_vsEht4J5dvLqU/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1PwvoC6XnegDCVgoPOIZy_WVwqsaGbx6g/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1b7wQZmi1yIEljnbDQ-XKKcObwxco-mas/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1QMALOse0LyoS4w1a3sMETYOrnbOBNipa/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1hC0-ZMV9vKfVpKDNU3ZDtd6t3q4X2jhr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/140ka1Pby_alvkBggDO4a_sESzT-exx2E/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1WaLZczxgefaMKuZnGKesFYVrm3jjLohe/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1cDFW75OeO_5L0835FJhl39ndoJHGfIXY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1XNKNU_4_v4lKeZfdLAcHDPlqVzmb_NgX/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/125Fk4fc5C2z-m9tHM3NzL35gn3QTYLs4/preview",
                        duration: "46m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ObR7HxEif0I6nm1iVf7PEhyMlyv2bHY8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1urrSpkPHuosSbuv-9ooWgZAhFvpQgl30/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1JIA9qLnMixbgJ9cRupXL02H26P6uU43C/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1c1wQmrQdToFWhzgyYTAiJ202HNgVMUrw/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1SWGCkfU3_FHbr1fgZycLRbwlYKitfAp-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1mDU48mJoy_ShWjd4XP76JYH9OSjDm3rX/preview",
                        duration: "35m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1_vWjDQQYx5q86Cr6vo-v64QpLVPo-7JQ/preview",
                        duration: "44m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/18jQSbF_Fi_tRIXP3Uyge2lVo-ePWwGw4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1IFuLWC__tCOICqxo3fotQt4AqMF7lmjV/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1PhZPo7yRbh-AoeM74rIWJfC9MNwXp010/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1gM7NhRb3GhvCrZ0t42khezbv9EXmoi8h/preview",
                        duration: "44m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1QSqZeJ99SF31rsGpLSR2soPxP2mbAPSC/preview",
                        duration: "42m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 129552,
        title: "Agente Noturno",
        subtitle: "",
        description: "A série acompanha um agente de baixo escalão do FBI que trabalha no porão da Casa Branca, a postos para atender um telefone que nunca toca. Até que um dia, ele recebe uma ligação que acaba revelando uma perigosa conspiração contra o governo dos Estados Unidos.",
        genero: [gen.acao, gen.suspense, stm.netflix],
        faixa: "A16",
        news: {
            type: "season"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1v0LDKA5RncbnxGGiJTkor_3Ml_lyPFJs/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1FBx6GvuxCe02KeYuZrS4D7CX1nljnYU7/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1hS7NSlYqBCwaiNoSfDCt2Jt68M4tAqqF/preview",
                        duration: "56m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/19-C7NJSCOHyGJvdKSwOJMyE4pR38UG-8/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1dy-INGdSiOjpbbaEiwaYGkTQoVQKRiKD/preview",
                        duration: "52m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1PnZJbYZUPyMhotHEWaPPC2C2Atm8bBNP/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/19oTPsY_eePAI2z86j1YaJrED3qOlFYTl/preview",
                        duration: "45m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/15rLbn3xd62FPYHWMDLeyecv4QlbmRU1S/preview",
                        duration: "45m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1L-nBhyAzAzSIMKesxKqAoz44DRJNAfSo/preview",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1diZm3VRDnukfaoHocf3umJMDPg0ONNkk/preview",
                        duration: "45m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1xcdObN9gl6hD3BTaK19HBFL0HxzX6nEA/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1r-GPKbXcQFIUfoX-SGtzfb61V5F28LNr/preview",
                        duration: "51m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1MwgYyB_Y_NRXl9YQbERAMIKj1PLKjQrP/preview",
                        duration: "54m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1FSP2tH7EJdrZ9WDcUSf2pSoNAN4rVsXJ/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1h8xyjZ2NVbNCnF-m1gO2fkfMeFdf_6Vi/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1WqAhn46vW-MeFhc_KyAt6V30LHeI82_d/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1aCjB1Ahzhan_z6eZ9HM7U_yk1AOMZg5V/preview",
                        duration: "53m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1YEwe54aIBj6SUZWIivDcYdABoXzWbiIS/preview",
                        duration: "54m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1i175mofFsh-ozseLNhvHYTKcz-EmC7My/preview",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1sDnldR7uoal7O3R9EpQt0W4rlz8Ma94H/preview",
                        duration: "45m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 127235,
        title: "Invasão",
        subtitle: "",
        description: "Uma visita extraterrestre ameaça a existência humana. Os impactos a dessa chegada são acompanhados em tempo real por cinco pessoas comuns. Em cantos diferentes do planeta, elas tentam encontrar sentido em meio ao caos.",
        genero: [gen.drama, gen.ficcao, stm.apple],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1igKad09zff2G0temD0uJrHujvOlFgHIP/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ruxIqq3XXUR_MCgMoissIbV5oD84pGqm/preview",
                        duration: "57m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1zJ64zh8E6j5itjGoHG11IYblFg41dWXX/preview",
                        duration: "52m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1jGLQ67EuYN4FgF7bylO4tCDN2Zh7C4sN/preview",
                        duration: "56m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1qv4herTTdxWMVFJ_Hb760d2Z6FGjVyl_/preview",
                        duration: "41m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1N5Es8Udjr0NxEdkhJOPuKivk4YtvgKXM/preview",
                        duration: "33m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1usS7HFncenuQu_dvVJYAcUneu0gzRTRY/preview",
                        duration: "48m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1pQvfEO2TIgNgIWzRnJzVqnXvuNe1hQQA/preview",
                        duration: "48m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1STTPsqceky-aDNN4gnWNvGJpZmL7XOv0/preview",
                        duration: "58m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1Zi2TMpHwWXDn0ETAJHCWqbaBWQylJkh9/preview",
                        duration: "57m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 1416,
        title: "Grey's Anatomy",
        subtitle: "",
        description: "Os médicos do Grey Sloan Memorial Hospital lidam diariamente com casos e consequências de vida ou morte. É um no outro que eles encontram apoio, conforto, amizade e, às vezes, até mais que amizade... Juntos, eles descobrem o quanto a vida profissional e a pessoal podem ser complicadas e se misturarem no meio do caminho.",
        genero: [gen.drama],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ODm_gFpTKH5weG_IB4o6zcbAdX3j2cxC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1PABjqeXZ7hDypLHiFI3oOjfaTVl8E9D9/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1KMnv_WQPwlhdwK5lEY14n6EJTb5V08-X/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1vk--XxXKRUcXQkEoPD1h86VYJpAL1wcm/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1f1Jr2FliOw4gNguNls-eS3FpBMsEkmTI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1V-xid3HXb-K4NomqoElcawQnsgerT1gO/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/10wSYSzN4-X-Kozwu3JsM3eljWVnhTkGr/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1HHqFUBOgtT6kt13TKApWDFPKbyRC4sdb/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/135UQleOAe6WE47GhqByigHLBJXCfS7J7/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10YyS2MOq-FQrzQjGUq01lOCfGTUzmcMy/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ftFBxz0p9JeuzVs2Q_3B1rEajmGQW39c/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1cx7rHpHWRUaPH_BWwYsP9N55Jvgfag1K/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1UCaEs8EiB3Gp3KdYfMUqtkOW7xUeNOw4/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/17JPbXQiwlwspE52c-h6U_k3KweWylQ1Q/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/17W7DPAlHmynEVBLSD3GbdKhM1EqphnQR/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ccSqMHTEVu29EJJKQhFl0mtQLyuoZHzW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1fp_55CJqb1dTv6SQZEXQfMFVSSQbYWV5/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1s5If1C-ub_--a3_z1g8CLde0Sd4bBlcS/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1okmIUl8PV8I5tNK8IY9wu0ehme11_adI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1OlNTj9ocYzK590JD7OCjt07GwN7vREh0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1RNtVYBzzwLwbU-yqD8dzPj2__xky_vnG/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1kUgZz0GT13ZXmpMUhUPwJSsn1rZF8rFg/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1skbxozswD_S7Ha15FjxAFetSvxwfoc2w/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1OHKfFyjmF8c7jgvs3XM48AAxbVzr_5C_/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1WknPlWMDg45arqPNBW3IgT2To2JvbTmn/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1zMZTcHiewOiWizr3LkB_o1_RBshtM3Gb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1FUn_WWYCikrJS1mr1oDEX5mh7ilXwz9W/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1TrZNYFTmj73mISoAOixux_z-fbH9zsZC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1ctz1wcI7BA1cF2fKTuPiYj1T_VZzdidp/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1w0BNZFavuzAlETyx-TfhGC6tLpxPRhv_/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1y_czxzOQUEBB9B7JbYJpWKbJ72H-5AOz/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/11n3w0nMoP2f93pLEZYQ8GZT_fmJu36DM/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/17vUtujxnWqLIGBsXyvq-qEzD1AARlEnz/preview",
                        duration: "43m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1kMCVBXysDzhkL09KJS2I-b7lvfsz6iVw/preview",
                        duration: "43m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1wJeEFSIQIb8tLYZ5b5W63ixjAKr4hUDI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 27,
                        src: "https://drive.google.com/file/d/1UONt3NK_vdxep6PDaoeDYsxLhfEzi5eA/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1r-9WVTUM77yL2N1vW0fCoarT8ou7DDPl/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1_jxPLqPMs3DXIXH2v4mL_rvIEKMveX8j/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1CT4IoDUPLUrmwSbG1RR_exolNUkjE4m9/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1QEFmCRJTpRrBh0JVHLldqKKSTPYVVC_3/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/14VcLTkuA6rcjLAj4SF5ZCRcEWJ9ITbX1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Xz9TKqQqqhlwy7bKxbzxdzt5I1MugREH/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ufd4MmTdixvF3fvVXncI-39lotE1NAdr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1PyKs0TQEo4JnfYhFQqGl7uzuGQsndIIJ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1Z4Llo7FhkQdJM2kUhFQnWCS0OCemuOi5/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1Se9wbibvdI2vezSx4-pWxRmChYytqb-z/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1uWyZkthMBxh5wdTHWRH3cbr-dNHJTuqx/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1irzjrrvgSFmaM-mG12osSzrMEvm8QON2/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1Id4L24pLXXI0hK3PIdPfh1wFUBviZCDN/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1zNy88ysikbMs-wvUrGrdrKQ0v0UQKOdH/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1zRrAzw9ikbTUnM6Sf0VYXvnHoNlO7WXo/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1v2FowxcBCGk14n6u5lLaIHM7qTUZ4DCS/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1r-Ia_SnHqNWueElP6T6Vxh37mji8j0wT/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1D8afhiGRIFqbeieNjgjp-mBo8E5c67Hs/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1dE47l-1ndeOML3zVMa6u16wqLsSOo3SZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/10iusNZdETMfrrOGW9H8K1DBj3hKHw7Iu/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1snuCqQN9yQ5rYsJ9G5pQul4fmnBjS7kY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1AnTwltLkEcX7LnOoppwqhUVLz1dgOduS/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1trU5zdswXIDjtNn7fEdVsduk-I35VBrQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1Ty-Fhwf-HZTiwaWFj-l44-Js4krMpftw/preview",
                        duration: "43m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1wNiglkQyViB7xV8S85aqEIeCzfX9goal/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1GfkiQH5ybwmolkDu-H120dJfpSiYA1J7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1gWkP4s1j0nI4tdaHL6dTwaWA6fg1-z1z/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1lUHtwUMFwDRVYtZKlLjOC1OpJvle8mbo/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1BmAeXgjAxvmyd6dDHTfBdT9p0Xee-9dQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1cmQvNb76LW1W8WWT1pVos8j9xYytpxBO/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1mFPdMBc_URHslvi9Y5yxgEcieEnB3FOe/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Wdwmnqdu165egBFus5_xaygiz6lpW_Ti/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1hFj1O9qDyIHk0eNJgO216ImMNeQH9X39/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1e_222R0vcq2VqS1Nx9OtEMSjhBvS5FRo/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1CD7P6hw0rWXPmhP5C_dM2d6ZstOhpk04/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1XYOgk9y1lzji_YapxFz5-06u-dBoOuKg/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1W7kukKvwA2xdb6uWjAyAPj9k9J1mFJvJ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/15oyO6AgK7M2tOYoyEw8wxJteYjkg11-u/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1PdvAEGtM2WH0tZenSVc8y4QVR3L47NOl/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/189pBUQKblfZ8kolwENgl2H0JvWaoGFzO/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1_TCLKTPVNR-YKx9nyAr2y7HyV4NkN6vI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/18Bf9RP4CaLEO0XmB_rRWwTzcmdfGEFOw/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1aoO5ZtP2g4BZ0ZKyKMNGaTXvlxSRNExq/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1KUhT4EFxhLP-AWIEMxyF6yLkjkGctpBe/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1fm5YTMzYJtopkwkD7eAnsdlLCnkCYCaH/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1irk0hB0YayunogWKmrlDt3U7VwAZjVkB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1zfUY2BVjZPA8-dUFbs97HTcAIFnyaDkb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1_XfA8eHoUX7XxQkMCgP6i4_w8upWr6CT/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1rfJNlr4IYima7G1ADLnrejaKzFw2csZR/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/15alr5cc-fXyZnaRtaWGgeUb9U2p6rMFV/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1DjGDCinvC50GMX8xBHdrI29ka-5F1fY0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1x9dU0TeLWpGa_1lCTXPTYl8BCHHyMPEb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/17axx3J0AvDekrI6wyo1S7qA3BItA5Kmy/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/149mVRLCnPiAsLrURdQ2EJetiev79Y7NQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1qLC39uVW8awErQ1uo2GgiHWBT2liJ7ra/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1gPwEYwPLESgeLKcYdd32xzdjQF1MO_x3/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1SEIXmCszh38E9cxXSIByiK0kAqub14Xu/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1XMSQUkoyPCu25Jsh1tyK0aws36TkvXz8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1S1htIgp0h3GUBJYbwjLdZMz4wzaSzanu/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1ATjXgBiPkXrzbf0i8j0kmnqtY2Ywcl-G/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/16bJl6tDIm6f1JhQo3lVVFohI_6QAHahB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1YOOFhjYuy-vRpgOM-2-s7e30xOrU_2C8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1ZT0j8RzUD1rOcdEZWdbcZGKGdysmog0X/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1eQ2Tdd4TYBNNjtvjeTLQIDrw_VYvRlUH/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/173MvGptrgbzHi9O-wAwT-U6PDCAA838r/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1rP1UINRx5lfhI9W3ZdaErIS1c2SBUP_k/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1p_OYZevOj2JavLu7-jb8UxKJ0ZVMSmk9/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1RSxd19aTn_GvUqCAWo1TeK_p8wx-OY1R/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/13ojxeSa9m6-2uxKngT9-yBwZ7XpkiPMn/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1H3qvGxkpSdLm449-FydtOdmV5iDHzCuS/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ZeA3XRhoBVvrhtj1BWDU0gm0Go2jfaZ0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1OrubbHWqjbiZUPf6l_wJnyfdYyRO5fPY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1YR6GUbiHCEW8BroruBpIqKuE8XxElLyT/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1tNjKIMbMZXbHWoK675iibGT_j0a6HvgR/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1bOFTu-6tU76Xw1-IVPr2neqWhAZ7OY7U/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/19LkE9J7UJsob8qi9ztokeN0wYMCgSiRp/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1_GF0NCtzUkUnptu6EXoqzhhjdkuojT3O/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1ky4AKqza9bqvbEa9iEHUZ3GQOGYUq85v/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1XpzMxlkfxSWaAr5DMwzvdKP3jfc-0Ko0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/101-kjCpR7hwNzJ8LzfffprUG9qtw2FTN/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1ZcPUZTr9d9kJcGUrXNdeyevYJwy8hNSG/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1aFPnqhNJ33BjYli3EE7YHQ9Hw7IvrlxM/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1tlMXsqQVW2i3CmlwBS5QaaP1uIZdYXnZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1yf6w_REiXYZLCg9pkp5PxGbv4ayVF1Oz/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1oC_1W3NXH3o643HRMUfFaFRv7hhv5Eww/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1SLKq8xmwW3tKYIjfdcceZKn6fdd3AS2Y/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1R84iFV0F8eaYAzQdtISP1qlKAUahP2KK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1B4ekZY63XYZGDwA6J0lK7PQ2EAmxbaf3/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1c1QdxDQlQVx6IT_Mopm3uDHtQebO_0KD/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1gJ9JmJ457WK34zo9w4mur7r5glVJ8zR5/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 7,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1OIP_xZfb3IXziCxcagjdpMBoymIZZNzh/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1NpfD3XeMYWMHUwLPxwdxYiiRhOxCmnA8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1D5YTst8hu1uYtNzv3ASdtQlVmVB5iMgK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1K36_-YTbK3fMTmKRk-dRQ_BJqZ3FgUB7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1_hPMafZlO7YPGlDdaXRPAZwG5RtE5MP1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1wPGWou-Gz761QMQxNVch4M0FiQEzM5FD/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1lW9fsOM3tQ9E02Df1_ysRezj_1486ZsY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/10Yy_YH63Maq2flwWdMV9n7UJOqCZnvDt/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/11odalaJTCe7fSIqFZYFKjqOkPTyOMhik/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1XCeM_qaKiuHEKgbuDEC_hG1vzitFJY0N/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1_YRjPCJD5ubXEpXRdP-qQS5Slw0Hzwfs/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1z8uTTOatCFOohmYcYtCgmpjrV-b27STx/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1zY0LH8Hy85BHVyUEpDctJ8nUidzBYm36/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1NBtsB8EFR6rPhTsbezWk0P2EqfFohA0a/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1p_IcYRTitkEN4X3r8ZLUbRbuJ-UZvgfP/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1AjJQ6jTShYkmAI345kM6aaYQJ2yE5dNk/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/17hu6ZYLnvxTNqIN-fSJWAyMgdzGpmvI2/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1tZcOGtu4oVjKF-tcU_lrP4lv1nedFBn_/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1jl5zDrgbqn_qAsVu4V5qiwx869b4vByJ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1YJmY-AV0BQ1yZ-bEsO7GgeN_Nv8aa29L/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1um1B1_DJN914Ucc6k2nrvp40WnuoL_y-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1Y_ND2fPVAQPPw6GGuOcERIOnygNNE1OG/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 8,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1QPQ3LD2ab7KjPHc2rNCbWSoo29FCg_Xy/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1QFiZvWZ1lyaS8wH1GwUO4HSa6VISZzmL/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ALvTYuw_QcKtPG-X9SD0tcWn3-4nQF8B/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/14dTc-_w2hgKCj2K3MdM4YYzUT_Ba_lqW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16tMH7r_g82khcGlZDsT80Z-rlqEHJVP0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1mbOdOJH5MzP3CwkEqLOsrU49Wh4-XGL1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1DaIaxvibS6JffrT0-bQFjmkFMATZSNMo/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Fjbm5NtZjH17dmkQPkNVyiVPZ2u_IJ08/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1SW_t23Fr6_3tqqc9ZYVQBDTZEUiW6xB1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1dyyiUiqs_RaihOWCP7eaVkYBav2IR2rv/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1lgpArZMwrTcvIyZ4LEq9kRcPfMKWkcnB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1c5T6XkmvekTFKdTH66yecfqPknCdP5yj/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1ekyE_dSOzk0qI348n1YQLejmPJRN08kL/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1xvMEYdp0y-sUcR_XNfTS_aGTAkeTWjoJ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1TYhFuXjfv3OwyRYu0LSw6lANnR6NeILI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1ymNzh2th3EjjS5KaZNu_LKZYFhCHpPkz/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/18lQCrnhvVtdlujbmZtypfK7zpHUxhWXs/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1PSIdg-5BJFMtJMvtVIwu2_uXW6JpmcwI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1FTdlAQLZUXPXYkv65SFcAa8f9alCrvkI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/16bbu5JBxnteBsXsbcJk2EnyxwnWyQ3A0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1NRNjcjv1mMj-fPHKkNQlt5PetlUNPj4Z/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1oDRd634DASTyypeplbk9LlOqu306OwhN/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1bVJu4CMfJFg-Y6vURRbG86dfpMJFLvkl/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/18WS_MtpUHX8YIEWKyPJYBiFh-svC6YfQ/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 9,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1RWnqsliRT_g1QRrbWln5QQe1ioiqEe6l/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/16uyD9Q7HS5Q5IE4bcSSnBuFatVR0Ij-x/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1bFPWg6-hV2p01FAg_6b409nMj7pw98QR/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/18b5QZbIqkHE4hvlsxSZhxhwBtVS5uB-7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1QiDmg9BgPJ5ttDd32JtAHN0JAbLxp3oy/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1ZhmR265-Jpkkh2lyUvWaZoFP-gI9eScZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1DyWR4M5dTijy4M6q8KAoN7JWMxy8pEbZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1diXC-zXU2sa3UT7mqmugDzIUMt2YfX80/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1rZetkSU4SKWEErBIfUNdNbRuaoRu4PJr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1lZ-x-rXFz_i5oe33SO_p4vYmg8g6w2G9/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1Ct3TIwW2b87wbgrdp29yRVRI-HWFy8bt/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1yOFt3pSZgB7GQPIiB9c09a-vg0svfOfv/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1yi23tBwJxTFxtIVbEmPZnR4i6QATDX4Z/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1ZGQ-ZEL-RSj6QS9i2PrfxKo3Ao3FW7Ku/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1Be6M6VAzK-mBOL13a65Hs6oubgZPC5Cb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1AbbZlwppuI_Fs8qi7tMpqmx5ycpqZvs7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1duzsaA4v_GaRExZdki8SDw43nuaak1nf/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/12pOjEV35v5PoY-kpJEy96WktgjelhH37/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1RczwlDyGXSiYYmKZgbGPoUAgOVqpCGK1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1VTjw7ZwHEfGpkj1ojGDKiUnHkCkqFjFQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1UV45ra7_z5T1PIuZcw0M7TBHhoyM58lE/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1qERI0cHzmMDyVrPK58H-CQY2PNDm2HKH/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/10ie83m3vEnPRYyaQwMHdeM-Gkhvh3COa/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1nR3Aee-ambC5ZDm6v--ojp7Z-Ai5w9CI/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 10,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1KNe8UXxJbExZY-_IJaB4EZLFT20Dd29F/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1kVgoA4-Fnm4zfMjw--5FOz8WgHuvMMDR/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1EKGCzoqxGZ91w1XUygLxyUoIeksWZR00/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Bc2I4Dn7Cw2inJDXBXTzvY6EsWlulYv5/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1dMQY1CEW6G7FKvbbLzIlgejFyh1ZOoHC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/18TlBNybfwLX5tMBn4kf9NW5Xcp-WXW67/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1katkT0bCUN2PQNo1C6OBBVdPDKiE6Tiv/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1lE2dds-9lh9M2q8uzf6CzjlIFCONrl2s/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1cwQ1R3vVRIhcwywhJxGyKswhn5pT4kcr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/18K5drl2cUQzoX9UeZV2aJU8WiICgE2ki/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1cL73wi88gFpUHnlCf7rfM6kBOFvJ1M9j/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1SlLrGNx6wbxAJu_vRh6Cg2ZqlWTcE8Na/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1fGFjWqP9ReepMisKKdJrAR6XHm3dvIqK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1VmJ4aNsyIfhFHE9WX6L6UzxdQHY_qdO5/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1f3bJ05mGy9-CoHvMmPOwREI8YYOrOnhQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1NFFfDxXtFkmjQEfg5n2iv3Qb9Z5_eP7c/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1k4hEQggaqvcy5yFMGynOgTyVOr-01_Mf/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1X_kgJqCe4dptR23oAUGmVZuJe8DL8QOW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1JU--aSn-sW16nh7UsJF8rVTZc9zkmOPW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1NKiJYi8Bgf-UJHhFh9-YwS7JLMMFHvrd/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1bmISZ2LBXX6S5_otxhCU11E63P4LufOf/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1HC7d8PZwjWV9F_BHgDW28btmUa-1NgvC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/11eUtU-yY45YK_VfwiBC5iIko6FpOwCWC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1L9BwEmMA9zRUSualfGWnSu_MO2XZuqsi/preview",
                        duration: "43m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 74577,
        title: "The End of The F***ing World",
        subtitle: "",
        description: "Nesta comédia de humor negro, um adolescente psicopata e uma rebelde louca por aventuras caem na estrada em uma malfadada viagem.",
        genero: [gen.comedia, gen.drama, agp.crime, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ENeRB7dwGdbtFkstCWbLTU9pMVMlscaT/preview",
                        duration: "19m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/155GeP0NXG6BUl5VxaE_8bRnVsULoAWyE/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ANP6lMJP5U0lV3Dknr5M4Fj7FdQ4aU4r/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/19Es5pevPmD0321MxCW5n7sI-2RLBIjx-/preview",
                        duration: "21m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/17bb_G1mQF9YU9zjMR_GgbBVPxq_dX7M8/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1XOu1zOzMl4eBGZ82GUthL_1x8VkZ7T21/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1idEmsdSWvd2OLrZbrdeanK_5yPwXlWve/preview",
                        duration: "21m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1oT9Hc-OsbrUpPST2EJ1XPwH8Htz9-1IT/preview",
                        duration: "20m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1mk_aZhPzOXPAeZ8suRYIEnWO5dZRqJ7c/preview",
                        duration: "25m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/16xTeYjjsBriQyyuVIi8TKs_NiNx52hw8/preview",
                        duration: "19m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1aVIxZIDEk5YcOXt2XBLEoVObFX7l4F3a/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ToNZYJWKDRk91JX3FE41QbRfqsU21k-5/preview",
                        duration: "24m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1CJeQ_uZleEfBBbtWIorE7NOWu8vuO4eD/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Z-h1NLEvPL_hnkFT3BbpxQ9iUJkRyvII/preview",
                        duration: "19m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1WOCLJBYADMzhAs0f0WEK-WbGfgo5J49Z/preview",
                        duration: "24m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1JQNwMkAy-drT2Acx80yNds5CSyPU-i2m/preview",
                        duration: "19m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 100088,
        title: "The Last Of Us",
        subtitle: "",
        description: "Situado duas décadas após a implosão de nossa sociedade, o drama seguirá Joel, um sobrevivente difícil, que é contratado para contrabandear uma garota de 14 anos chamada Ellie para fora de uma zona de quarentena opressiva. O que começa como um pequeno trabalho logo se torna uma jornada brutal e de partir o coração, já que os dois precisam atravessar os Estados Unidos e dependem um do outro para sobreviver.",
        genero: [gen.drama, stm.hbo],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ouag3rRozn5UhyeTFhq4ZZPp9ofzd4eg/preview",
                        duration: "01h 20m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1z0gorcOERGvnPM5_uz7EzIRHUiCw0h9Y/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12AkEJNKro-XYSVS_0k0uOEVFryuv4Emr/preview",
                        duration: "01h 15m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1U9DnG2Wymc4Ky2bfA_-BXfT4O0f67E6k/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1fo3wn5LGt10BPE5viDYVbg4imGb6XL51/preview",
                        duration: "59m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Mde_VtRFU6WHawAWPjiZlW2MZuH_bv-G/preview",
                        duration: "58m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1lpy291kkri9uS89kRukwP4oCfvClkrwc/preview",
                        duration: "55m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/13wwa8_ax1TXtH7xAiy3hc92G2wBeJHfm/preview",
                        duration: "50m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1FVol1oNdOteCW90Gw32B6W8NygqUIQCT/preview",
                        duration: "43m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 250307,
        title: "The Pitt",
        subtitle: "",
        description: "A equipe do Centro Médico de Emergência de Pittsburgh trabalha para salvar vidas em um departamento de emergência superlotado e carente de recursos.",
        genero: [gen.drama, stm.hbo],
        faixa: "A14",
        news: {
            type: "episode"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1nFWEI4J4JFW9HpZs7jhBYntMwAmrN9sF/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/16gKd_iaaGCn6yxZnR6L9gq-IbygN8GXU/preview",
                        duration: "50m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oTITjE95KrOfqY2m3saHCNjF5mE_Jddm/preview",
                        duration: "50m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 123548,
        title: "Castlevânia",
        subtitle: "Noturno",
        description: "Enquanto a revolução assola a França, Richter Belmont luta para manter o legado da família e impedir a ascensão de uma vampira brutal e gananciosa.",
        genero: [gen.animacao, gen.drama, stm.netflix],
        faixa: "A16",
        news: {
            type: "season"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1aoFKybmKrEx2kiH1LNjRdjMvuJ3qqGmZ/preview",
                        duration: "28m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1oo9RBEpRCDBlrforQcWibIIqtDS3OTHe/preview",
                        duration: "25m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oMdMdyFXkieUF2Zlf0FKuUWrb2Uj7gN7/preview",
                        duration: "27m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/15zdFVCWYpTPL-POFo_LWtZY9lsIkFS7X/preview",
                        duration: "25m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16VxXV1o5QsCHsVS9NWFUgg5eXeo2-bvH/preview",
                        duration: "26m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/16HVKWEQujW-ilYd2skMTlW1-DSWV47AR/preview",
                        duration: "32m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1IR6knwCANmGpit1u3g0qYievl2_CQlgt/preview",
                        duration: "26m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/17DgbyKLMwgx9YzYrVIeKQgi9Y7zNGerR/preview",
                        duration: "28m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1UgwsYdhwqatHXNN_V7SEEer7n46Ery33/preview",
                        duration: "31m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1okrc4b-NqR13cy7ciO8ZjqPXG-Rxy1i1/preview",
                        duration: "28m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/19p44XHnyeilyqlhogdpL_W2RNQSnMc2o/preview",
                        duration: "28m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1TWmjFm8FIP2LokS3RGQG4G2E6nOew0z1/preview",
                        duration: "28m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1YOqzuqewM3wfSEMKNU1gNDsYigFbHGOR/preview",
                        duration: "27m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/188m49GDn_5TvpgeFdcqtlifT8Epqk-Jd/preview",
                        duration: "28m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1OMpACwWUijsWr9hXf528TkR12TI_Nu2Q/preview",
                        duration: "30m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1vn2G0sklwkQocJ2Vo621KmZrnbzMHuxF/preview",
                        duration: "33m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 61889,
        title: "Demolidor",
        subtitle: "",
        description: 'Cego desde pequeno, Matt Murdock luta contra a injustiça durante o dia como advogado e à noite nas ruas de Hell’s Kitchen, Nova York.',
        genero: [gen.acao, gen.drama, agp.marvel, stm.disney],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10aIzgWkaT1uWDpiCoJdGamx2Slf1OPFo/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1dheUy3tn7RFLJcL6cVohWGgSTXVA8Zos/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1nAgr1U6PPfocnMZ3ie7mQe_LqopDcme5/preview",
                        duration: "51m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/16KQ663mLddbYYY6aMtpNcUCbO6xZg8RZ/preview",
                        duration: "52m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1zdjhTA0JWLfdnPfWESAN5fZhcenGKoox/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Q4rC112RcvNxhHKZQNplO34YQNtQBsEy/preview",
                        duration: "48m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1L2e06xpP1-sHZoJL8Xb05L_ZvWZlieWj/preview",
                        duration: "50m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Tk9IY0O3RBJCqIsGvA-FKvm7R6vGQmzv/preview",
                        duration: "53m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1uVFvrzAVFLJa_MK4TRSGetmVUGfhRYgD/preview",
                        duration: "57m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1FcRuN3sBOmvckDHpRFawInkIDwWEIK8U/preview",
                        duration: "56m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/100xzgt74T3n9OPSQYlmYDVmQz607hJyu/preview",
                        duration: "58m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1pQEdP4zLvdT9GirXsJmFjYm5IlSQLyQf/preview",
                        duration: "59m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/14cjsVAB75jqKKwww88X1CXTjqrO4vivs/preview",
                        duration: "55m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1k9RbQiBxJ8hChDn1Rql3GwcJiVnNFtLo/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1lCCCQxjF7jPC82orTjHoH-fFjJTLV5dE/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1omTU2TM7TEGVDeUDYp8b-nbYvEN9yuiu/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1I8jQyWijXvXVnUcEQINju2rkCpZ5eMf8/preview",
                        duration: "1h"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1td2D-IvEuGAfPmhB3JpFZgBO6T9AypDj/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/14CrLO9Qc4T5wA-u7WbXvvDK6HV0gte_O/preview",
                        duration: "55m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1pYeTXUu6XRmRQfs3onKlg9FSowjFqX68/preview",
                        duration: "56m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1uZtjSKizCgv2P-KFs1OFbCUZLjPLnCuF/preview",
                        duration: "53m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1wAxa8eAF4ADZCSZpn7fXnGo8OeEu90lO/preview",
                        duration: "59m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/13lspFsvJG-Liaugl0Sv5zE-NaNMAx_oP/preview",
                        duration: "51m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1HbC2ZNIUYPzvghB1iE3qmm_l9_5yBcrD/preview",
                        duration: "54m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1OFNEHzXK8CccL_tgXGZp0OOZR9FhUGWJ/preview",
                        duration: "52m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1t0L_mukOFe62NRFFQQI4z547YZt-ygnj/preview",
                        duration: "57m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1R93g4HP-mUwctmvKSpGosunRg_Exd-il/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1NeIqIDfHyrBf7tiCDTAk9cHO4Va46wSa/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1M8G8Dzw6SHoPIyH-oeVFeNX36cUsyBA0/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1AOCUMKn5Wi-ZFb1CbQxUKfNyk8Q9tHdV/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1NypXlD4ojJdMoR8be3wZCTnZyuyN3T_a/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1vWCsFD7iXjEKDVBV0qL4but6pL75Fb3_/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/179Web7WQJTHHrXTABd18_SM1wIx46M3V/preview",
                        duration: "49m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1sIbaoYiycPW9-MExExE2L58cfkeTURQ4/preview",
                        duration: "50m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1dBzrRxc1eVkDZeVeWYmmibU5h1iwq7SU/preview",
                        duration: "54m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1eR7p4_sg9h3QkWzkkfRrihIvCOE7407B/preview",
                        duration: "46m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1-VcGmLuShAnrPNlIy6lWEDAPDdlNj30a/preview",
                        duration: "49m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1BEt_AdAVv4msKfHkmy1Jc6GfNp4PNGF8/preview",
                        duration: "55m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/18JvZGDGY51XTxaTGlsV3m2ORp2Ulz3-v/preview",
                        duration: "53m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 91363,
        title: "What If...?",
        subtitle: "",
        description: '"What If…?" reinventa os acontecimentos do UCM, mudando a história de forma surpreendente.',
        genero: [gen.animacao, agp.marvel, stm.disney],
        faixa: "A14",
        news: {
            type: "season"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1csJAtkVsuEsQxuSV3FhMbBdsZKYV2v4B/preview",
                        duration: "33m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/17t9riJl3fBzvsq5y6j_LxUONTr3UVe6X/preview",
                        duration: "34m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1UY4BiowJSMvqPpDyC8pY_l9wmoBxS5iB/preview",
                        duration: "30m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/12AhBvehuLutGsAfpEAgR3IJQYG5_F2mm/preview",
                        duration: "34m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1dpfBTy7zLC8clzwgzrJefzdleO4Ztg8j/preview",
                        duration: "29m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1j0r3R4gl5sfPYWCtxNzrj_H5vXPjICrV/preview",
                        duration: "31m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1L6Pn0m13NfO7pLhQ_2O7ZoHzXpJ1s_yc/preview",
                        duration: "31m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1FmEKO3ScG1SjSB9ZehdYiYlzSl5Lu4UA/preview",
                        duration: "29m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1e0wtajSafjdJ08DGXgyGwiajP5TavTBl/preview",
                        duration: "33m"
                    }
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1FpRrzk0aPM4A-T2JYzb1J-gLVyvwL2LZ/preview",
                        duration: "28m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1YTBKy9DQ_jlRgZOKMNoL5wykCZOBCBor/preview",
                        duration: "29m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1hDwuBlJJ8VkA7DXyb6AbzPoxUGczOM02/preview",
                        duration: "26m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/11sZi667zeXihXpv86gkh9juPm1vm64Ve/preview",
                        duration: "31m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1sSaxWgCuDfre4xMBoV7yLv1A-ZDIZB5-/preview",
                        duration: "30m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1ZjkUlcoURY6QSCztZFXwmovQwvDAeMul/preview",
                        duration: "32m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1g0hD83ppK5VH6NxNgo1mJYqHOyJblVU-/preview",
                        duration: "28m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11MOXqifZmzef0Ltwv2s-e3sowIayAbIz/preview",
                        duration: "29m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1zJ90sdYELiGStxHTsrUySA-8p6zZ8P4R/preview",
                        duration: "31m"
                    }
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/18iTCOrw_mfPFmPhidgCA9tY5tW2rviOh/preview",
                        duration: "28m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ApG8Hre5ugQ360PcYyA3BU-UrLtSZ6aT/preview",
                        duration: "28m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1BquRGvESfvDclAGqDxdPRxuyhddqISCQ/preview",
                        duration: "30m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1DrBhlVZKfDgHUN_7vEXBbWhN8AQqXwTW/preview",
                        duration: "29m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1GpHcPniexihU3i2NuRK_WX31Wfw77DaK/preview",
                        duration: "30m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1IWkrcmDszslVkhubPzXFuDKxamQTNaRk/preview",
                        duration: "30m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1JptIvpLT9XXsvNRGRtMVMA2C6SvsN0lJ/preview",
                        duration: "25m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1KAHZBqwnmUbJsy69Slp1RYccbKi5dlLj/preview",
                        duration: "32m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 76438,
        title: "Everything Sucks!",
        subtitle: "",
        description: "Em 1996, na cidade de Boring, alunos dos clubes de teatro e vídeo encaram os altos e baixos da vida adolescente nos tempos do vídeo-cassete.",
        genero: [gen.comedia, stm.netflix],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1D6oVZ39lppe38yigLBbj0q0prRUSUtPm/preview",
                        duration: "23m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1DAxkHrF6AH3iFOrhnxA7w0fLDu8PSfkT/preview",
                        duration: "23m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1DBWR8Yb6feygHe946oOmE1aQH5wlh-dx/preview",
                        duration: "26m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1DC7vaLMaHfHE0hoQ4yYUysN2PSbmdb_A/preview",
                        duration: "23m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1DDCvT-TT_nAXc-Af_T3JTJF46TfeKxRE/preview",
                        duration: "23m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1DGcPS4jZdAe3bvoA3nY5xQPXgY1DW-ix/preview",
                        duration: "23m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1DGuPPBJhd1zOGv5oaUociNspgbfxHUSu/preview",
                        duration: "25m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1DHtGKGFXh7udD2yBLiQEpbzoteh-FKM1/preview",
                        duration: "24m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1DM7SadfDeaWUPhbizon_JssM9l3m_wf-/preview",
                        duration: "23m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1DQE-z2aX0XGnAVsDEZgkWmSbImkjU896/preview",
                        duration: "27m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 109939,
        title: "Nossa Bandeira é a Morte",
        subtitle: "",
        description: 'Uma comédia de época escandalosamente engraçada e vagamente baseada nas aventuras reais de Stede Bonnet, um aristocrata mimado do século XVIII que abandonou sua vida cheia de privilégios para virar o "Pirata Cavalheiro".',
        genero: [gen.acao, gen.aventura, gen.comedia, stm.hbo],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-CYSW5sjidO6-ul2k7FDNaWOTtwxdN00/preview",
                        duration: "32m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-E-tDeaFKWYK1T4XmkNX8KBKNUmOI07i/preview",
                        duration: "26m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-Fct02AUX2haJ6bbFyS7RYd54YZ4WNGp/preview",
                        duration: "27m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-Jjpeh503FcPejlLzFFIEM9l0Kn0Dicd/preview",
                        duration: "34m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-U4qW4-_dETsFgd3O4_1lkcXtKsx5z8W/preview",
                        duration: "29m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-agxDwHMwwPtBlL6guOhw1IixNsmbIrM/preview",
                        duration: "28m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-huyDiSS-rexpkUiDnF7UT-lSavH1GLK/preview",
                        duration: "28m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-kqAPHfZoGua9KP9pwMfMQyhWBGjrw0l/preview",
                        duration: "35m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-npgTnJxIdJ2cTPpzn9POJXVkijrf79Y/preview",
                        duration: "27m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1-uJAI3TTz7oZSP8Mm_CmUvfo-lRwjgVw/preview",
                        duration: "36m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-iJ1AfIUjSSIENalVVseAeIZBQCIxdPF/preview",
                        duration: "28m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-l6579Dw0zNxvtSOcCEV2AZgimu33C1F/preview",
                        duration: "27m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-nYmZKrF-ptfbsWj8n0mOK-RhNkFaY_d/preview",
                        duration: "31m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-ZM8FYewKEy3IPS5Fi3CZzlMph6dBD_C/preview",
                        duration: "29m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-cu9e_EcJKHqSjZfP5uVbi6BD0MV8OOi/preview",
                        duration: "29m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-KzXzEtSFdg79tz8ycKNoAZbWFBxXA8R/preview",
                        duration: "25m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-GWIpExwu7axezeoNJuxvRLAB0eFG5Tb/preview",
                        duration: "24m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11uOrTrtVpvxSF_mzMXToHhNBw_Pmj1kM/preview",
                        duration: "29m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 126308,
        title: "Xógum",
        subtitle: "A Gloriosa Saga do Japão",
        description: "Ambientada no Japão de 1600, o Senhor Yoshii Toranaga está lutando pela sua vida à medida que seus inimigos no Conselho dos Regentes se unem contra ele, quando um navio europeu misterioso é encontrado encalhado em um vilarejo de pescadores próximo.",
        genero: [gen.drama, stm.disney],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Vpns8885MYz3t1JJDP44fa_9Nwq6IoLu/preview",
                        duration: "01h 09m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/19Tl_jeOswrn6Z7hTnEspBNg2S2YE8C8j/preview",
                        duration: "58m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/150khbZQV299QzH2Ea8R27lnSbm4iXq05/preview",
                        duration: "52m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1AeHMddVtRj3bK_QM27wDty3LL73VT2RM/preview",
                        duration: "56m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/10isCOvMavx3nYsBjyjZo__NZWI_WyU6F/preview",
                        duration: "56m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/14k6vywdLhUylM-joe6Ed8TBGlX9bXiZH/preview",
                        duration: "56m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1wwnt_c0bwTv1Yf1sRm3kYVgJYQTTsMmy/preview",
                        duration: "54m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1WozIlC4THRj4v9x5VJEWph499FIQIphg/preview",
                        duration: "57m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/16kb2qIn0yOnLW3MMufuPfnP7ZpvTz9Tc/preview",
                        duration: "1h"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1uLd2LI_U5VjSLzsvS5VYNo2vhWitcB-w/preview",
                        duration: "1h"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 75450,
        title: "Titãs",
        subtitle: "",
        description: "Uma equipe de jovens super-heróis liderada por Asa Noturna (anteriormente Robin de Batman) formada para combater o mal e outros perigos.",
        genero: [gen.acao, agp.dc, stm.netflix],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1v1-OjKL0ty7vE0FwuqJJ4KIOS6gvGWoR/preview",
                        duration: "51m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1JIU0-aKm1qxz-oNDvW5iiYwipr8Ad35-/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oW18UknsvCeymWOoQSWHwgBnJGmarKRO/preview",
                        duration: "54m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1LcjvPPd6-OyhwvYqd3tiawsBNF8wmv9e/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16ucWE2KSPGmwCgGpcfv-f0pFUV-yEvkS/preview",
                        duration: "40m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1ERDfOMjofBEP9cVePvLXd0_Zbzab5niX/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1cmr-pUch3sWLCj-ioDCeN-_E-IZZt9D0/preview",
                        duration: "46m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1fOLnlmkCvsPUPjGJFCPm6EN7W22VLhLG/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1qV4mVEA8A-GZPN-8MgIe1NBZmx2CmM1g/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1BpwQ5q7C5w6FpQ0AJ8HHGtFzyfMiW75l/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Z7zRlUmRdR6Mo6W3gFvzTDSkrjNSBQ_9/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1hOg2WZgxA-q68Uf1NBxAq-z81bzxEmd-/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1GRetXoydZrGMP7aOLTgqbyvHy203oo10/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1vazIrhMa37YpGdBJBIdRHEQdq7IEFvSc/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1zOTfI-GnWx5KunDBAp8SqmVVj5QL7WnR/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1CecLaUp-4tWHCMJO1EKj7cwC5uBvEEuM/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1iU10zCTHvTpB8dYQ7sFtM846pwWIT74P/preview",
                        duration: "46m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1pMxuzt1wB25DFqxx-oabWQblyL3OabPA/preview",
                        duration: "44m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1Fi8nG54zLvrUXwcbkl2_gHdTC1Jz5qPh/preview",
                        duration: "48m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1lfcLSzvol0OkRXHzIGC3i8UuJ1HGdUs7/preview",
                        duration: "49m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1n9A0s73wVKyWu3eXOMBZb_PBJDe_4AwY/preview",
                        duration: "50m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1CSc6JTOWzMRMBiYW6zuU1N0LVYqxKsIn/preview",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1FEQb1myAVa-t98ncGd0m6s2KBOvU1Hqz/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/19TCaDAgXD6kv_YlwQ2CERJzr-ITgLAHy/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-jQcZjA4YEUqzw99bfcX-spLjS-16M1_/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1SqbiiT8CHCQH5JcY-nEfAYiCh6RGcChg/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/13TipmwZzisO3pHnatAmkAGCPHu-qKgmJ/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1UMsbUbWpX6Ju187UcPR51o2gakN7lTpB/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Ew67nUA6IznwDUrdwjRP7bpdfFeIt0sn/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1eBj75aLNM6vyTDEUMSMjN40VQmTucmai/preview",
                        duration: "46m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1JCWOgtvGg1G8O5LQ3Dr3lpvoW_xNBDi8/preview",
                        duration: "45m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1HiTW74PMhlo9tksLXYuZAs_6D4PTfDpk/preview",
                        duration: "50m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/14hfPb9U8tJH75juJpgKR5xA5aGTlrG59/preview",
                        duration: "51m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/11Ti1afcxwYxwPk6XnMiQRztYJ6ZC_rUJ/preview",
                        duration: "53m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/19vOq9pOK9re4B8K96fRHYQKko2xfejyJ/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/13fvgp9Cw197jj8cIOnl_NBP_A4M5tKr2/preview",
                        duration: "50m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1RCSymc5OuNOYGqiLg-e3M7eZVyfrcle4/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1mgNjD2apfiKRmqAI9tZxezUtjsceYyuy/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1HBYahlC6x6RkxIdI99wY8bRCo39DTJMv/preview",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1hd2t4YHy8KDHurgCZh2vXEbwHTe8tpmC/preview",
                        duration: "51m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1smMOVVTKJFDc7x5lskwXUx5t1lBCrPo1/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1m2bMC8rYdADOj9aaGIfzVLyWlZ9tavse/preview",
                        duration: "45m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1yv6ylngFK71nbJcUObAQosTqih-HyjSZ/preview",
                        duration: "52m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1yw2Ue3Bj-hGYa7lOVjYLYYmrpfZWq6CF/preview",
                        duration: "54m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1ZCz3D4vNogOCQGfYARM_US0r7AAZbXrR/preview",
                        duration: "57m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1uXT1eCkM7v-AGCOCz9TKUZzInchtnCIR/preview",
                        duration: "54m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 118906,
        title: "Universos Paralelos",
        subtitle: "",
        description: "As vidas dos quatro amigos de infância, Bilal, Romane, Sam e Victor, são afetadas quando um misterioso evento os separa, enviando-os para dimensões paralelas. Eles tentam entender o que aconteceu e se esforçam para retroceder o tempo, a fim de retornar ao seu mundo anterior.",
        genero: [gen.ficcao, stm.disney],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1OZA26SbuVnZ55vVVN6Zo1PxAB9but2Vm/preview",
                        duration: "35m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ze0gALufn5DopP5H_wN1jY88MtTX92yW/preview",
                        duration: "35m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ZyPg7RorAUR_wLYuv6ypBtH6FYxp3P8n/preview",
                        duration: "35m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Blu9-90V92AFuSim-8dVKRfCsmUIdVqE/preview",
                        duration: "37m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/17iBKQpfUeT8veiDaEbpYLI0RRu84LNhj/preview",
                        duration: "32m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Vlpdc8pLXvGIuTrP2y-LRZfuNHV-YCD1/preview",
                        duration: "40m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 241259,
        title: "Bebê Rena",
        subtitle: "",
        description: "Um comediante é gentil com uma mulher vulnerável, despertando uma obsessão sufocante que pode acabar com as vidas dos dois.",
        genero: [gen.drama, stm.netflix],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1P75mO7UYm6uC8JlMlq4BI7tj8oZeUS0m/preview",
                        duration: "32m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/16xKpIsT0b_unW2X_tybuVEcJIMJFbQ-8/preview",
                        duration: "27m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1pAiNOylg8YYtfKE9m0wPlxh7eTrYg6Qy/preview",
                        duration: "38m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1gaBYIfi2yGavnVlzjFhaWI7SFvZ3as5I/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1r8-AaPnterI7A004oh9QI5GfrX7Algio/preview",
                        duration: "28m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1uKPhOGhQfQ4BBHaLdvgrKrItAoiathox/preview",
                        duration: "34m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/13HbxhTgn9iAmkhkCv8Kns322g_MxueDd/preview",
                        duration: "31m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 138502,
        title: "X-men ’97",
        subtitle: "",
        description: "X-Men ’97 revisita a era icônica dos anos 1990, quando os X-Men, um grupo de mutantes que usam seus dons extraordinários para proteger um mundo que os odeia e teme, são desafiados como nunca antes, forçados a enfrentar um novo futuro perigoso e inesperado.",
        genero: [gen.animacao, agp.marvel, stm.disney],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1kOp34U-_4fexB7uavHV3zTtK62hf6P8X/preview",
                        duration: "30m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/11duHGbCHsYBD5hr0k7kIZGTzY2hNAap-/preview",
                        duration: "30m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1zySzehtp4VoSy8U1Sq9JTe0i7zF9GruF/preview",
                        duration: "30m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Dz0UgMSgrtk9G06QxKIEC-Uw0ibpqDk8/preview",
                        duration: "27m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1WTcCR4Uk3QSTxJUOiWTMlXWthgm63OYh/preview",
                        duration: "34m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1_KQesk7XIS7KU3K8Xr0ZrvXyBG42gYVg/preview",
                        duration: "31m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Xq1fboxphfNUsZ96E0orpGvOF_BeXu63/preview",
                        duration: "31m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1asDvn7zpyZJ9rnvdJqvGnQTJrVjSS1Le/preview",
                        duration: "31m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1KSPW3j5VhycOQwP7OPDoXtYyA6Q6KH18/preview",
                        duration: "29m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/16NRsIXiNlZhuREmKF_LvKav5pRGMsv_f/preview",
                        duration: "40m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 122226,
        title: "Eco",
        subtitle: "",
        description: "Perseguida pelo criminoso Fisk, Maya volta para casa, onde confrontará sua família e seu legado.",
        genero: [gen.acao, agp.marvel, stm.disney],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1651SSXnvHbkfDuzoM4TNU2byF3e47wNZ/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/16Pvth68dKSTgV_K9NV0vq5Db6YMqSMf7/preview",
                        duration: "39m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/16TleHfcti7FpeKrjnojEm57Q4SeCjlnJ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/16YF75RwxVRDdlk12kL0rfEAMGNo1D51s/preview",
                        duration: "37m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16Zl8zRUGfX0NzjtIC2NIPAcg8_wBlyjA/preview",
                        duration: "34m"
                    },
                ]
            },
        ]
    },

    {
        background: background,
        overlay: overlay,
        tmdbID: 219543,
        title: "Comando das Criaturas",
        subtitle: "",
        description: "Acompanha uma equipe secreta de monstros encarcerados, recrutados para missões consideradas perigosas demais para humanos.",
        genero: [gen.animacao, agp.dc, stm.hbo],
        faixa: "A16",
        news: {
            type: "episode"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1fm6OJZwjUhW6UOXPrb26j1x7o0klFBxm/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1zGzfIjagpUUEVS7RXAiOho6nhw0AJ2mX/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1zrKIZwV1IEsdnnm55LnNAKwC2dJsPOtV/preview",
                        duration: "21m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1PfW-cZX0UzpsxIV1qjBlMqQQYbUto0EA/preview",
                        duration: "25m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1X49hajNR-eKh-f-Z9Qpd0aT4bt5gTebN/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1YFBW0dH3iQVHSYjZAgZlGDoOB2Ro_rSH/preview",
                        duration: "24m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1LwLDPvK40D7zyryuKNluH-UqzHT2FSmw/preview",
                        duration: "28m"
                    }
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 84958,
        title: "Loki",
        subtitle: "",
        description: "Começando imediatamente depois que Loki rouba o Tesseract (de novo), ele se encontra diante da Autoridade de Variação Temporal, uma organização burocrática que existe fora do tempo e espaço. Forçado a responder por seus crimes contra a linha do tempo, ele recebe uma escolha: Ser deletado da realidade ou ajudar a capturar uma ameaça ainda maior.",
        genero: [gen.drama, gen.ficcao, agp.marvel, stm.disney],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1y0W5N32Yv90HdTYHXCgoFmC5dMHmW9zV/preview",
                        duration: "50m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1AlBQfr9zOdwS_fbovCZnW6BiPHvanunW/preview",
                        duration: "53m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oq_SZuf2tQZn-QKqfb_IJCbP62MK9jti/preview",
                        duration: "40m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1AxRUkPhQ_Fe8IvXYZNK4XoKVN5kqpyKt/preview",
                        duration: "47m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/17yRVkRg1ZvNLAPNhtd7XnoNelud-f4Lq/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1aSvaPUlgtjJLxYpxazVWip_k2vutLbFm/preview",
                        duration: "45m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1hvlR1RE3zEbzT2u7wbvD89Mymd8g4AnL/preview",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1_ochtQmE3-1k-vyJ9GekZYf2EPLArn8E/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/15Six-Zjc7Xwq01oWBVTF3z9qOadQI4aq/preview",
                        duration: "53m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/18SGwjiYn9JnmOr_62huaVXAYUACndNeJ/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1JtAUi7CpxGIr-uKn_JRpBIFKNMJYo3NU/preview",
                        duration: "44m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1BrzuaPd9Qns7Bb5g5DnJXuXX4LN4x60P/preview",
                        duration: "56m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 82452,
        title: "Avatar",
        subtitle: "O Ultimo Mestre do Ar",
        description: "Água. Terra. Fogo. Ar. As quatro nações viviam em harmonia, com o Avatar, mestre de todos os elementos, mantendo a paz entre eles. Mas tudo mudou quando a Nação do Fogo atacou e exterminou os Nômades do Ar, o primeiro passo dos mestres do fogo para conquistarem o mundo. Com a próxima encarnação do Avatar ainda por vir, o mundo perdeu a esperança. Mas como uma luz na escuridão, a esperança floresce quando Aang, um jovem Nômade do Ar — e o último de seu grupo — desperta para tomar seu lugar por direito como o próximo Avatar. Junto com seus novos amigos Sokka e Katara, irmãos e membros da Tribo da Água do Sul, Aang embarca em uma busca fantástica e cheia de ação para salvar o mundo e lutar contra o terrível ataque do Senhor do Fogo Ozai. Mas com o Príncipe Zuko determinado a capturá-los, não será uma tarefa fácil. Eles vão precisar da ajuda de muitos aliados e personagens coloridos que encontrarem ao longo do caminho.",
        genero: [gen.acao, gen.fantasia, gen.aventura, stm.netflix],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1F0JzOhfZsBHHwMPLG0IZmWwzGeTLPpiD/preview",
                        duration: "01h 03m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1Xj2ekAeZTJOzhviNqKJhkFQXGHyG13R_/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oHM7_qPbORVv-3vDneKzzZfp55LruxAO/preview",
                        duration: "52m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1fp2bsyuZ7D6_V9qGSIQkHkozQvMGu3WH/preview",
                        duration: "55m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1M0-Pg7EeqEXew2Rfgb7-DpZqw7eO2fdw/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1V3Tlnk4gdh3CggL5vOSms7Zu0bmAY5xF/preview",
                        duration: "56m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/12UdZIZ4_ryqEs-2_d2_DeKu4NwrjJIny/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11FS88NcSenrQdQO6HYkjxWFWJqqh69Xy/preview",
                        duration: "57m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 85271,
        title: "WandaVision",
        subtitle: "",
        description: "Wanda Maximoff e Visão, um casal de super-heróis com uma vida perfeita, que começa a suspeitar que nem tudo é o que parece.",
        genero: [gen.drama, agp.misterio, stm.disney],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/17rqNaqpXS9BWxsZ4P-MwEagsZ50xHf2j/preview",
                        duration: "26m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1nKvOsoFKbOsrWH7VMKsVH0AONMD34h6g/preview",
                        duration: "33m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/17LaVZZs3IpPyeYjMEksRY7mEJU7PQZvd/preview",
                        duration: "29m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1IuUvoLlDBmTppkQqnnBPz3d-C5Ygnbpd/preview",
                        duration: "32m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1QxiWcJxyOvk8EXWm3pwORQY0bzDnJ4CP/preview",
                        duration: "38m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1f9lAghr3ILNlXwXgctKN_KSEy5PTmRVH/preview",
                        duration: "34m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1lGlesYl6FOoOob4-sPxQmOfhTxh2rLxH/preview",
                        duration: "34m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1lJ0QbdEjuxIwbLmUbdfFyWGzbyKzXmlL/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1NDWbz0tRcLpm0d3LE-Q5_IkoBkr_OBXp/preview",
                        duration: "46m"
                    },
                ]
            },
        ]
    },

    {
        background: background,
        overlay: overlay,
        tmdbID: 108978,
        title: "Reacher",
        subtitle: "",
        description: "Quando o policial militar aposentado Jack Reacher é preso por um assassinato que não cometeu, ele se vê no meio de uma trama mortal cheia de policiais corruptos, empresários obscuros e políticos conspiradores. Só com sua inteligência, ele precisa descobrir o que está havendo em Margrave, Geórgia.",
        genero: [gen.acao, agp.crime, gen.suspense, stm.prime],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1h4s2S5s46SUbtGRgW9NYop9U0A6yj6Qr/preview",
                        duration: "54m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1leHMhV6UbG-hB8zJfzhV2nuyZZLK44bT/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/15qEq0TICQ7s6GMwEvvni7BNec4yBSPLj/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1a6zLO5ybTKYBSLyjEphYgGJUiKYMq74O/preview",
                        duration: "46m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1hK-vFpUKncfa1E0Ayb537JWjBilfVw59/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1glegWNiMdmQrs98qQ5DKCXmhIyn3BImD/preview",
                        duration: "48m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/177fnUyhrun-oirYUkeh5YxTHRN1sKyyI/preview",
                        duration: "41m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/19hSs2gTsdVgxfnRnXJsjT0ervWXJqDxS/preview",
                        duration: "52m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1wDI467_uWp0GS3DrTVp-2IedI0JzWJT9/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/120TJKTa4NKqDbgJVhC2lIEAuvvNZH_2c/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1t34Tp-NFbnpckKtt-pcHDFhr6tzouIFc/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1jBj6Xr-PNSCEUQ5unC-3sZxZC_3QP24z/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Ou9rt1TwXDwcI_Xlwp_oqcR4sqEElGMO/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/10uc2FzkUCcRbUNmnuSVULlEOUod57oTQ/preview",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/110zGgRVuWXkzbxAvA4VjpjtdbyQ9LsdP/preview",
                        duration: "45m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1lIrFJW0C4YXcSRkbFzwt7aZq8wbyBn0P/preview",
                        duration: "42m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 113962,
        title: "Lioness",
        subtitle: "",
        description: "Inspirado por um programa militar americano, Operação: Lioness segue as agentes Joe, Kaitlyn e Cruz enquanto elas embarcam em uma perigosa missão secreta para impedir o próximo 11 de setembro.",
        genero: [gen.drama, gen.acao, agp.guerra, stm.paramount],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/17GVJpbeivQcifJivHl7oExA3uncKjPBg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1suwFIWxsqXQtollhN5JpHASG9_QYKyRq/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1AEsmnFUeTsKFV9pXRla5e_M_732vgJb-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1zmaFzih1oBOzvd6gEnC7qnVmkfwQbCKr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/18mSsTNQgXTs4ZeqroL0BdJrx4G1tOI4J/preview",
                        duration: "39m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-j8K5b2SMEwZOJV0KahvIqpwxGhBNIH_/preview",
                        duration: "41m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1b3Wk-f5rXSbY7UmTBsotJ0muz3yswweT/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1tDV2JQ6dneX90ZE42k_XvtbTWCyTjPFt/preview",
                        duration: "57m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1zdfcufbJCh8n45XJiBFXGbf972xN4zCW/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1YtGWoIsdk_P64yS7v3WcOiSbbAIgK-9W/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ftNmg6okPOfE-4-3Uk5yE8geQQ7GLzLf/preview",
                        duration: "51m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1pWnpYUOrsS61z_QcadprHZrqUpKt2vtE/preview",
                        duration: "47m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1hJzOEy1p-71zQ8b_0lf0J-JiOu4py8OG/preview",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1S2Qm36-YkX5Y0ZyGQS8YgVpEqqahv6Hg/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1mq2FJxCYLl7XmW4RExpcx0BRIHpxKfaY/preview",
                        duration: "56m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-S3afVMUARSLHHfneHSQXcvreYslpZZ4/preview",
                        duration: "51m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 63174,
        title: "Lucifer",
        subtitle: "",
        description: "Entediado com a vida nas trevas, o diabo se muda para Los Angeles, abre um piano-bar e empresta sua sabedoria a uma investigadora de assassinatos.",
        genero: [gen.fantasia, agp.crime, agp.dc, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/18xJKo4YL1asghes1Xjc4SBXX4j-1cseQ/preview",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1dUeowp7I9rOAPvKR0Yv-zpvAl_rTygGr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1zumlIpD3c-IySmqew2B43ykzOaDurPFe/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ui2CTCgaBKXYjWYE6y8z8mgwjRbA4Ksf/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1zigtP4gI5H3AmPocFoDxrFygo05NChJp/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-gtW9dSRpsqXCVI1uATmMtKm4Ql_Yufz/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1kGh4vA11s1VoP0p6kEWj19F9AygS-s0E/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1eP1R2e6U-JkKLMsE8ijgNhbIYedAa45J/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1ivqqGDWA1kFOJC2221a510iWgprbR6_X/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1TQ0hNsKhChzu0r_WZCYzPJYF3SXqMqQr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1WHk5WCQHZ37FhFpyTy-99sTkoAyWn3XY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1GLlZvRxoGazkOJxv9xBH3emRnsfeVa3j/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1SkDxmIjtgMtG70Yw5w986i6UNo9pUACR/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 2,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1a5FV8V-WAD32noiH-6S9Xlw5ASshnBxI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1gOfcRJFVPajxyQgKcWyno5zs8r55NyoQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oy2ZTBBr4BjB8Kz22-QW30VDhAs0uiJQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1SQ-AZb1sQo3FzfdSBtflfR0GA8f0K9ML/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1bnPFrGLC9-H2JtCIuggfwziiTEWWmn2m/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1BL9b1l4BBolzwGgYMk5WQwqial1x-p4e/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1U06bRVIXF3lZnPf2jH9JF0w9SdHsM5ix/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1cQPpkMVM_Al4GpLmyc0KxKErcmm6iAkg/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/14Jk0l_CU0TKKn7jUhiWCQasm3o-B_0lr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/15XXHjNdY5MU7npy91ucbUUfn71OYACzS/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1p4KvFZ5ejB3RvqfkKPrbMAs5gHnixp3M/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1KQNt0RqEc-lI69_FWVaUAqaFiUtItY9d/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1ar5gY2rzkU7IzfT_HSknWiw4yocQ--Lg/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1h5OLoV33HYbdTQPKXng7yCAuQNlbOCwE/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1eUkT3JDNfkuP2bGUyz9VSQ-zRj4iVeSW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1A0bOQpgz4dxXIKCkg6fy3qxlSaqdL0xV/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1VZtJzXTXrdIjbry0mEZbiLgqs1SDAY6c/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1mwX2n-72zUqwkHZrf125WrTq3yOUdu3A/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 3,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1F2tUDz-YyoitI8TfN2YcAigfH1CKd07u/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/15aFNJWXOOgqDaoNRcsJo6z9MPw8hNPeY/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1E5Pni2XsaUCD2qDIat_neH1khsoUEyX1/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1CMr2WjIFTOG16YicBq07EeyeVSPieeJA/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1DaERsGiwSu2mZnXx5UE0ETrf6LfXJmBv/preview",
                        duration: "44m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/11V1lXe8Tuw18vho6RURq_VzCbvJBQx3F/preview",
                        duration: "44m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1pB9VyGH0Pd4-LIUVQ363ZSiCT407ce0r/preview",
                        duration: "44m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1v87MaSZ8ltyCGSTOiBw1rzywzQ0Lr4hO/preview",
                        duration: "44m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/12GWmaSMw9J91q8F4WVTKpFfVkaoeoxV1/preview",
                        duration: "44m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1Kuh4oLMKZKqGqgRZKg66BwDrZ2aT8gCR/preview",
                        duration: "44m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1ltQvnNjO6noRlBX_sk9QF7so29fL-W_R/preview",
                        duration: "44m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1cqRNnWmzyLvCinMvQEINFzQv8cfhqfCZ/preview",
                        duration: "44m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1c5cNAERytCGwOcrbby_4EdiHIeciZG7k/preview",
                        duration: "44m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/12XQP2iX9HvA9SaHKPKv6NIWfP0ghgKu-/preview",
                        duration: "44m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/186WSN6mCj_GhOLmA0P2dDvlO05Li6OcX/preview",
                        duration: "44m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1anELRYjSc3M7SnITJKn7Y9exRIVskZa1/preview",
                        duration: "44m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1gjvZX0gfAxaKMEf7RVLuDDZZSwHosbN4/preview",
                        duration: "44m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1uoAshVgh4TjjNFdS8b7ftQtruQ4DqLy9/preview",
                        duration: "44m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1n0_n8kk7TVxTG53E41f_uU_rMYyD4s4X/preview",
                        duration: "44m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1i6-q7GONZjs88gpTpoereC_8kBs3h5jF/preview",
                        duration: "44m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1agNxTK-ZuMyWjCs50Jp6ocZpRlR8PZoU/preview",
                        duration: "44m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1akj2GLs7okvYZNKCXohE0weHPaZl6zKW/preview",
                        duration: "44m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/147zglRUTJ49Gsq7yDPY63H5JZlFYTgCo/preview",
                        duration: "44m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1bHzgP06RZC_VGpfDRgaObdvU6kxkIB1I/preview",
                        duration: "44m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1VRn_ErN9cKHEBgJmw_iue7GJODuPlP1C/preview",
                        duration: "44m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1lsJgEGyizV8wmy2ncxM72x_VlNt-96Xr/preview",
                        duration: "44m"
                    },
                ]
            },
            {
                s: 4,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1afe2NR7oAJ1UZGnkYCtLggeuus6dUj6l/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1NlhB0ku8k7npjg-pFWqtJSeZfseuFKOh/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1mRVMk5r20TCpo-JmE6PvE5uxInFGivdR/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Bv2h06B9215EppETzFxnCCuuE6N0zR-b/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1kwY9lZfN4tkslWvkqvilJHP_8m8gjUCx/preview",
                        duration: "44m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1TMCq-WESm0_C4gX-GMCtpb_Dof4B2F6N/preview",
                        duration: "44m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1t-MCPEvVZ0B_2jcgq-4TSFBYNaG7fbq5/preview",
                        duration: "44m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1HvnWIBKnv4XOAQUea_4z0LtiapscDxvC/preview",
                        duration: "44m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1XgOuDH0VnXtibGdSYjJcXfaqli-UHE8l/preview",
                        duration: "44m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1axi-zn188hOZLRlIHlozpoq1sNOHdw_4/preview",
                        duration: "44m"
                    },
                ]
            },
            {
                s: 5,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1WpC4to7fvm11wsOppseVi0OlYjNBpYEl/preview",
                        duration: "51m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/13uKynlGnaigT2E7EpSi6aP0R0gmzXiQw/preview",
                        duration: "57m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1NFdEy_Kq9japTBNK7-PhSO17PImb2W7I/preview",
                        duration: "54m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1PMry5WSTWq3ALYPSlxLeNRUNPZ8oAi9e/preview",
                        duration: "55m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1I3lHZT1Zx-Rwcwk2EbXGKgBhxpLOPhEa/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Xpcf9HNCVkUBlSFnr3KDRXP8I8uqKS4s/preview",
                        duration: "56m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1q5DFNytd_qHbIXSyZkEAIw62lcvqN4NI/preview",
                        duration: "56m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1oJy9Fgkoo0sGyxLHrLQWW7Egi1NzHUEY/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1T3DEySroEMcPiatHLu5VpKdqODdzPy7O/preview",
                        duration: "55m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1oOtOFNkGWQxZBGRndy5Q8k6qKIEp8bDf/preview",
                        duration: "01h"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1nM2Dg6jMMKuJfnofOulS_i90ciivfdB8/preview",
                        duration: "53m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1XJ74E_kibiDxr9pkbZIomz8mXd6nUrXE/preview",
                        duration: "58m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1uPmS8K49I8zs6QCSBgN1vHgumyvjbyYw/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/15In2s12JFq1Np_2ZpC2lFMeF9aMsbHuW/preview",
                        duration: "59m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1dSD_oQqaxnEKcVV25WhZmLjR_7Dx8RDB/preview",
                        duration: "01h 03m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/16nD-49Fl3KrxnG8VgTkD0zG_A9yMf61C/preview",
                        duration: "53m"
                    },

                ]
            },
            {
                s: 6,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1PJMuDu_bmklKGRWkOGRe-GpXWt3Y3OTs/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1MsoOxbE3aQh3T0i5BDMBEqlQ3kv2czP1/preview",
                        duration: "55m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1T2ZgVbioiOiIOR8RM2NTVF2isQnJbMv6/preview",
                        duration: "45m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1T9yl-UaCJ0LFWDHgvdsln85T241XRLNx/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Vad99pZ2J9ZtynR0azQ3PyAYdq1HHxvT/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FVCZP29l2gfYjVIxu4PegG0dlElNZgcK/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1CqMsHqXiCpUnGrecH5xjIvIAj2Pq9lDc/preview",
                        duration: "58m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1ZrToYeF8heiCENjz_6e79pZPepvmLKsc/preview",
                        duration: "55m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1rlvUt4pZorIELHzJXCSpFducBscSNaO4/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1MF_SJiMrkXL1Wn8CkYlJp-CZ8ln_3T8B/preview",
                        duration: "53m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 90802,
        title: "The Sandman",
        subtitle: "",
        description: "Após anos aprisionado, Morpheus, o Rei dos Sonhos, embarca em uma jornada entre mundos para recuperar o que lhe foi roubado e restaurar seu poder.",
        genero: [gen.aventura, gen.drama, gen.fantasia, agp.dc, stm.netflix],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/19ILh3rM19l7F6tNWZJrjuDyll9WN5iXX/preview",
                        duration: "54m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1bDd-xW3VVFIBfSx5tOtUGvDpOGuk2oZU/preview",
                        duration: "37m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1rc8DbqnnIj9YifUz3u7rOvEt_HNgFDYQ/preview",
                        duration: "45m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1jpV6zmnUf2bpXd-5oCMPtqTsPob_Bzej/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/18i9DfaPA_x3yLRD7bcibP3R5PD1wrccM/preview",
                        duration: "54m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/177cCaxng0qrvIYx5O99kcCVIRIMTib6t/preview",
                        duration: "53m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1YP3lbP_Z4SOtG4aN7uOH24I6wNzDnNSC/preview",
                        duration: "48m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1g2UPONCYc8vaBS7MFA_Z3m1oiau9-FIN/preview",
                        duration: "50m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1gGKtWqh9ZJ2hZiP7E-7hYoGcgP1RKOCf/preview",
                        duration: "48m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/12jHVUhFSGKB9StoLLolVQCHnJUWTQ9ib/preview",
                        duration: "46m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 92749,
        title: "Cavaleiro da Lua",
        subtitle: "",
        description: "A série acompanha Steven Grant, um gentil e educado funcionário de uma loja de souvenir, que é atormentado com apagões e memórias de outra vida. Steven descobre que tem transtorno dissociativo de identidade e divide o corpo com o mercenário Marc Spector. À medida que os inimigos de Steven/Marc se voltam para eles, ambos devem navegar em suas complexas identidades enquanto mergulham em um mistério mortal entre os poderosos deuses do Egito.",
        genero: [gen.acao, gen.aventura, agp.marvel, stm.disney],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1BY10yYMXNrhIPapZIiSvvhR4zl17bbaA/preview",
                        duration: "46m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1NM4P5oaHIKryxMhq93ScbQzUMTljScRl/preview",
                        duration: "50m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1jkXEKGhFdAhZEVFkeA_axNw0ccXja9Gf/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1jQUDFh_lg-EyQLQuMxC4GreeIKw7l0Hv/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1jqWndhfeYbQpAL-YFLUZabeInQ8UYkJi/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1oqmyrmY0AbWPfbSDueVvSrNjo0zeIbJA/preview",
                        duration: "42m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 92782,
        title: "Ms. Marvel",
        subtitle: "",
        description: "Kamala Khan é uma adolescente muçulmana de Jersey City. Ela adora jogar videogames e escrever fanfictions, além de ser fã de super-heróis e ter uma imaginação sem limites – especialmente quando se trata da Capitã Marvel. Kamala sente que não se encaixa na escola e, às vezes, nem mesmo em casa. Mas um dia ela descobre que tem superpoderes como os heróis que sempre admirou... e a vida fica bem melhor com superpoderes, não é?",
        genero: [gen.ficcao, gen.fantasia, gen.acao, stm.disney, agp.marvel, gen.comedia],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1LVZRXR-bSjGGJkE7D7InZSaWW7avxNr-/preview",
                        duration: "46m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1HAvVnhC0pai77PKJ2pZOJEVzBHOc9oUJ/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1B52lyE4c-GyRNQsKUJqEMgf74j1N5lM5/preview",
                        duration: "45m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1GYjEcV98QR1ZFKaJBGsVBHy2I9EsRG-8/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1mYTTE_MJJIXxwwYevJpnuQleAUo2N698/preview",
                        duration: "38m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1DyjPnEvC2KqSogoTjsYrDvZGMbnw1IIM/preview",
                        duration: "46m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 222766,
        title: "O Dia do Chacal",
        subtitle: "",
        description: "Um atirador de elite, um mestre dos disfarces, um assassino treinado – Chacal é um assassino que mata friamente mediante um pagamento. Após o ataque contra um político famoso e importante, Chacal recebe o trabalho mais arriscado de todos, mas que pagará o suficiente para que ele largue essa vida de vez. Só que seu trabalho atraiu a atenção de Bianca, uma policial da inteligência britânica tenaz e com uma grande experiência em armas de fogo, o que faz dela a candidata perfeita para buscá-lo. O que se segue é uma perseguição emocionante pela Europa, com Chacal tentando terminar sua missão enquanto é perseguido por Bianca. Quando a vida pessoal de Bianca e de Chacal entra em conflito com seu trabalho, eles arriscam tudo por essa caçada e vão até o limite, com consequências desastrosas.",
        genero: [gen.drama, gen.acao, agp.misterio, stm.disney],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/16n2Q2SNDfqOBqaLpqbhitJP_m7gCVdOh/preview",
                        duration: "56m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ZRa8UYGCO19Ec3GMGAWBJvv39U0K46Wb/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1aLtRKQrqZRmYStYMGEnStqeBHDfLVaZZ/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1xU0p7wspAN39h4ZXUz-OW2xEssyEBL2h/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1BC1JiH6lbhaCaOZ3R_yZjEbSasVWL3dJ/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1L-F2xcUPL99QduWETojyIe4whyfHZNhh/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1PZSVvGdcamqHqtEJzGF-YEPnu_TKUgsB/preview",
                        duration: "45m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1INwPEyQbdt-ioc1dQ60Q9qBo8R5XaWR5/preview",
                        duration: "47m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/12yrTI9X6Rie8sW97lq_fdHqdX6JJv6bL/preview",
                        duration: "49m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1qJV-WbajlHr6XkibbOdGnKCCBaZB1crt/preview",
                        duration: "01h 04m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 4604,
        title: "Smallville",
        subtitle: "As Aventuras do Superboy",
        description: "Antes da vida como Super-Homem, o jovem Clark Kent encara os problemas da adolescência enquanto aprende a controlar seus poderes e usá-los para proteger a cidade de Smallville.",
        genero: [gen.ficcao, gen.fantasia, gen.acao, gen.aventura, agp.dc],
        faixa: "L",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1UObaCFYTTsYNFFMGnGmwfLOiJW8_OOOx/preview",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1lCzNclyV9GClxnzwrNKOfN7TBR9pw-W3/preview",
                        duration: "45m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1W9wOhBeAisoNRkojNy0d6p0AV-oq1vJA/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1RN7SaqyFr8ThB5A2HctoqtzDNo9lQgk_/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1777alb3NctbsAYOYUNmdoLP3DOMXBFu0/preview",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1K46Mh3nZN1jmG-QlHRQZ0zhT0pD8SsbZ/preview",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1xtBXvaGHBEUvF0qsb_lye9V02XPpO9jb/preview",
                        duration: "44m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1bC_14k1m7jVrAEXZEn9kaYUEGm0Qp9R_/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-Oxv-jbzKdWkdGPjRXvV1Nv6Lah-7Fud/preview",
                        duration: "44m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1loM7ZeokBlCbX8NtXBl7vazGYPN8U-R0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1aYuhObdFc2ucwJ2__bFsE6TWZXbUH4c2/preview",
                        duration: "44m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1ywWECLP4mq_ZaQ-wkBoaMhLWj7GH0ldx/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1awgZGOASdyhS4saxzG-zCzx_aS_wn-OB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1WpZDpVU_u3kYf1fKmKMYvfKs6y_9CSCA/preview",
                        duration: "41m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/16rHD_mi8xzDfCoWoI-hwvdB5dTAKnamO/preview",
                        duration: "44m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1Cmv1j0gLCivFdjmulEmhqjSfqVSJEk6k/preview",
                        duration: "44m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1mpI_ILCqoWdGVvAt-fD__QK1tC3u5dtE/preview",
                        duration: "44m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/14gr7U-6G6AVbUcdZynlxahLNIH1N2nzQ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1ziI___vVsTD7cYds0tzIyYyM7bWwRKC4/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/14gA-w-rs6Q9P23fkMVr-77iJHsHMXRG3/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1uep_v9y0Ww2SUB6ZQcYN-F5pfg5I01RY/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1dmW8nocUDDXzvJm7-NJ9U17YhB6YXlAL/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1YFt-LhvJMtVSWIzqa6ZyXaULLv3HLUNY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1mK0jS_zpdRdHJ4xfQDbN93JYxQ-Hg9Pk/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1rLYSb4EZ_TBqccVBAt_x9mRxV06cPV6c/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1h_wRJng-oyck9ZXSNSJVurRefDoxv_X5/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1EMA2kPDBEoXMTSXxP9jg2tOY7kbmUXzy/preview",
                        duration: "41m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Nfzb1UjqutIrv0VLs943O-88jz6Xpn4n/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-SVoCWph6a3VqCNL-OoNEIvRQ2l7xCTr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1CrdN357XryDkd2Ql8QgWfVDTdpv4gsDJ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1J-2L6aEOX6bMAoHeHKNDtRFRVlgJtgdM/preview",
                        duration: "41m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1892imEpGx-qX5I25L-5mxUwzVvWYi1-Y/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1KkKDMd7NEqXa9_K71ksDz5oFU0cnNRv-/preview",
                        duration: "44m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/14aFxnQbDqqZpEHBi8-OuLCwIK2CYjx96/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/186U5-P611ME5uX6nGLOVdSr6lIKAj8gd/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1xGQTSBEPqmlJoch38Spjz71Ze2I_6Apw/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1EIgYWoTbRZjy6tJ05fQ5S8qScospiLv8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1R5nC2apCiU9bnEz0tQlEmCF2vbOGE4kb/preview",
                        duration: "44m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1zdSvs3tU_u-LPwo1AQbUmCmATqsvra6j/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1qVZVa3lk66vaelCeV81DjZGNrEBZkgHQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1MjJ7lSqkcwYEQ7LtUWztK0T2cmQku9g5/preview",
                        duration: "41m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1D4R-qwXrUO_o13e_9xRh_mxAjqY-x-na/preview",
                        duration: "44m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1dn-nZ3uPWkFnl1lXNTIjoLtocfUKUSGA/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1i6_sGDtmTz-msL86plANkKwVhoGeYvkG/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Kc3dhgyy7LJ2RgGkfQfElQtekOvE3lc-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/16AF9xX4k27Ah3UAsAUhQDf6Q8cdO-S7X/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1IMNAqJVdPuxlzitn_Ow-D4VbisnsDed-/preview",
                        duration: "41m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1y2_6HbKKlQ24M_kD4P95Zc_odUBrNitW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ASHTO-SOKL64yjwYx-zZs_0S2tQ5NDZ3/preview",
                        duration: "44m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1RTnJeH1sd5gumcDOPKJRRM_5MN-vUBbF/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1J-8YXboLrMBf5lsjQWRT9Bp78AnIDD4G/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Zfo99Ui97cMbxVEeGyFsDWIGelX0Zai7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1toesWfEDQUR1WbijLI0sVS6lxR83_spG/preview",
                        duration: "44m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1YeHIYYOTDlE7DDMf6JC3fQ_BNBcQul0d/preview",
                        duration: "40m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1Xb9AF8O9OX8Y1lgtOR9AXWZt6L9NJMYq/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1IP3RNsPV_ZZOeEPWbhn4gox0y_RAYTZ6/preview",
                        duration: "41m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1nkUOTbmTGyFOC8Z-cvnNR0e0uwQ6S2x9/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1286Po-BIIMJyBccVthWuKgkMekH5kpS0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1JELs2i2czeD3-6ksi_Ca0BOJAs5D4HOL/preview",
                        duration: "41m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1gD5qi9pf2tRhuCii_fsC3vzteVWfDcl8/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1dH4jzrlH6cZOAPJN0RzrnxtHvR5mgjQM/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/127tv4TmCMVyVdl_GSv21STXaop47YqIB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1YOXaS9cgzMWD_VrXfl1yu0D8yhYTwuix/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1r4j3MLyb6G8neXrXLvBqfJ7Wg-IjidKk/preview",
                        duration: "41m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1fUTs-you1Vsj1scJdpMpGHoOX9fB_Dv7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1w9EDQ73GDqlyu5DYOw3XuHF2jZ1TSYQB/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1regcAhFHtGXv4HoZy_mj1ttEw2T3XUU1/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1Af_n1PHjWn0FDS8ccLdhoW9yFILza007/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1rpDvjM98sTW2AeYxs-GGD9FaOXJcI7IK/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1EEwtzg0qCubEBvZ7BIAKOa3u0OMp4RLG/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1kHEplWw-XZFQ-l8QAbgkdPaOJHIi8cW7/preview",
                        duration: "44m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1KkUzQU4yscrIbAKp0CmkR13l5KQbHgQB/preview",
                        duration: "44m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1HnB5ryxOnxyst5fAi9lsq6vgZrQF-dKT/preview",
                        duration: "44m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1FuNNDiRr1Em-_aL1OkpSaf54L3uxlwOO/preview",
                        duration: "44m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1O7wpZ8DTqIRTDnS2I60LJaylrz68_4hn/preview",
                        duration: "44m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/13MJE5JHM8iE6BdbfvsF38kjBrsBo3bbB/preview",
                        duration: "44m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1wHpcJPQAkdmKhai4qOtOLmaEFiaa8Q5F/preview",
                        duration: "44m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1cs-S1UH4kW39Hp1zLtYPBycDFx8-fxM9/preview",
                        duration: "44m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1VRaiQUvwvl8ZgZ_Uj-xgy-1SreZu4Vwx/preview",
                        duration: "44m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1XGCF1E2MmOdGZceJxH2YKGjy-adLVDLn/preview",
                        duration: "44m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/10pAo-CpF0bI3yIkfUy_nByOxbEjmRTSG/preview",
                        duration: "44m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1FhZHCbOpb2i1S4rKxx3RhNo8E2vGEu1F/preview",
                        duration: "44m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/15uwP7Cr0Bnn256isl_uBlNQ4yLcDqxVr/preview",
                        duration: "44m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1Etz0acj7Ijr5M5cSf8dfKFePDXQisEb6/preview",
                        duration: "44m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1pb8-GR0T5TXDBf7m6LYsweg9OF-YxpqP/preview",
                        duration: "44m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1jRTLsX3-ChhX4fxAA3vz3ba-LPJ10T9_/preview",
                        duration: "44m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1nhpdC72At724sa7BJh3GHc9lLuswtoa8/preview",
                        duration: "44m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1CKpuHkwPi9qeEMKR-_F3q0-_ZgOj-1zB/preview",
                        duration: "44m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELR1llS2d3Rk1KQ0k/preview?resourcekey=0-eVd4DoTxhlNye52vepJmPQ",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELNHlZYWpjZUkyeUE/preview?resourcekey=0-RCinCU90-jq4TwccMJNzzg",
                        duration: "45m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELTkRIRXhqak5jWE0/preview?resourcekey=0-83KudbWt-2wFqTaBvO7g_w",
                        duration: "45m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELaHhaa245UXNOdFU/preview?resourcekey=0-EFolF7dHvqD6YCLupiRb8A",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELQl9aR0swUE5Ja0U/preview?resourcekey=0-iWWGDajKdD2-GyhqcVChYw",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELSFZFY01tMXVIbEU/preview?resourcekey=0-lIVRFpG0rsF9KZTekHnLEw",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELZWoyRlA2b2hJOE0/preview?resourcekey=0-NkWnc7k3qBkuMQakMQY1Dw",
                        duration: "45m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELSjlCbFg3UV9Nblk/preview?resourcekey=0-o2TwIpv3ZHz3aI_dIE-kHQ",
                        duration: "45m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELQWg1bmw0OWhNVDg/preview?resourcekey=0-bB3Z7zn2QCSw407vugDHlw",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELTTNOUUNKWlY3RVU/preview?resourcekey=0-_n4eUsQiXncSCeivRQjVHQ",
                        duration: "45m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELY3RObDF5aUVPU2c/preview?resourcekey=0-8xnh7UxZWVO4qdG3rEjqRA",
                        duration: "45m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELaGtGcFAwa1hZNFk/preview?resourcekey=0-djDzDJrenmifT9Ov38-ubw",
                        duration: "45m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELeS13V00wMDJ5WEU/preview?resourcekey=0-91MF5LEZexvZaNBpvftW3w",
                        duration: "45m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELczdqN0E4YkpHekE/preview?resourcekey=0-frjEUwLpzxhKMAyi7Awe7Q",
                        duration: "45m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELWWE2Wm44RmJRdWs/preview?resourcekey=0-Hpvctb4Mjp5c-fhcA07AWA",
                        duration: "45m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELQWVrV3JZaFhEenc/preview?resourcekey=0-fiVJmU31m-C_UZMRgPFArQ",
                        duration: "45m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELcDctNWpmMWYyejg/preview?resourcekey=0-Q4ECkqQzRIWVpJzYcbV1ZA",
                        duration: "45m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELaWtJZXhkZEFFZ2s/preview?resourcekey=0-2cPK8KvL9zItUCw7iz9pug",
                        duration: "45m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELRnBQNTNaaWVBdmc/preview?resourcekey=0-VDYoQbFfTaLCtScsbYqFeg",
                        duration: "45m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELM19ldjFsVUZpRTA/preview?resourcekey=0-04AbJRttjBwbvZ7bCTMBkw",
                        duration: "45m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELdnRJSDljUkhRbmc/preview?resourcekey=0-ZYW6SxAUpJJE8S4_j1nzhg",
                        duration: "45m"
                    },

                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELOFJjOGdnckJqdE0/preview?resourcekey=0-bxLZHm6PFjWwfSclY3AREQ",
                        duration: "45m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELOG0ycDJQZkRzOE0/preview?resourcekey=0-ZGXNUAppPKaJuhayD8QsZg",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELN1JuOVZVS2tBLUU/preview?resourcekey=0-nq22xVa-t0AzTOp6_jBbAA",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELTTF4UVZadGdXUWs/preview?resourcekey=0-clgOL_LL6XIj_1iNKBfyFA",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELRjctUTF2S0Z4aVk/preview?resourcekey=0-QatjCfM4PHW5clCLrA2ZkQ",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELWGFGak42S0pka1U/preview?resourcekey=0-hr2G6BeuY3yH107c1ki1iQ",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELUGg5ZFJhX2g0ajg/preview?resourcekey=0-v7Oe6OBxSUt4_NYpfo0X-w",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELb3dfQ2Y1TmRaakU/preview?resourcekey=0-3CbR9ZIwzKjJn_0_rY6vsQ",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELYWRPT0gzYi16V2s/preview?resourcekey=0-eNAKUbqiy9dor3vlb2xxHQ",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELUTNGVklaTzZ0Qmc/preview?resourcekey=0-yFz9Ajm0JJuJKHFmr5zvXg",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELLUV6bXluN3lvYm8/preview?resourcekey=0-DxpaUmp8KEIQbkL-Vyed4Q",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELeFlvRVg5UjA2VmM/preview?resourcekey=0-JWPjOaX2Qxht9Zru-LsRnQ",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELUWpRdmZiZG5JZzA/preview?resourcekey=0-ZJV4dG4RQT8B5ykpAdWvkw",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELWU12NzQxUUl3U28/preview?resourcekey=0-ZcQ0XZThwyV-Q4gYz9jBCA",
                        duration: "42m"
                    },

                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1Mzi8B7AL-nzr7OoFjOt9mLSmN9H58sFm/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELMXE1cEZYTDFCU0U/preview?resourcekey=0-7rXMfF4AaNan3zWFpQH8KA",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELRWszckFicy16YkE/preview?resourcekey=0-sEVrvNZsv9ebW9fVr8kD6Q",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELT29GclBQdlEzemc/preview?resourcekey=0-1r69rhaGDZTNPqWOh2D4dA",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELejdfOUpCbnVFNWc/preview?resourcekey=0-BjntMt6GdhRPwyuW8r-xng",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELSHJna1FrelJzM3c/preview?resourcekey=0-_AfZvJ2gCqazoEG8g8JzDA",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELSlQ5RV9XdUdZS2c/preview?resourcekey=0-LtIZkUJyOW9Ef5B9jN-f6g",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELWlNUSXpST2o5c28/preview?resourcekey=0-ucIP6pT1QGMSkAKL5jWBeQ",
                        duration: "42m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELcU03aHZtMmt4QU0/preview?resourcekey=0-zexnER7rOnxp_hLOc8zkAA",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 7,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELenpIMzNoN1VXcXc/preview?resourcekey=0-JJ3jWPSzehAg3uv5TM2atA",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELVVhXa3lZdk5ZNHc/preview?resourcekey=0-oFSSZhFt_OWKhxRnKjc0Fw",
                        duration: "45m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELX1NhclJKSHVFNVU/preview?resourcekey=0-9ah6kCDIGOxXCiiUmj93IA",
                        duration: "45m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELbjBaUG5XTDlYYWc/preview?resourcekey=0-j16fD5D93r4QBiXgtoOzdQ",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELTUdBeFByeUtyTjQ/preview?resourcekey=0-yOViIdvsiwBOu9-rB64wNg",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELcmxEV0ExWXExRUU/preview?resourcekey=0-Q2bfXj_PNiPXpk27QZ634A",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELUzdvVW1SbUgwS28/preview?resourcekey=0--VhF6n3DpdVW7Wa9Sv6cLQ",
                        duration: "45m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELVWRyc2lpQ1BmdDg/preview?resourcekey=0-VS1KFleEXv5M8QqIM5zF2Q",
                        duration: "45m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELblQwa0ZnSk9GcUU/preview?resourcekey=0-fZhZBEcvvl7zakKU0T_W2g",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELNms0ek9VYnQ0TUk/preview?resourcekey=0-_xsB1HQwlWTRvhkXg_FgBg",
                        duration: "45m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELQ1JIdEJPN0QtblE/preview?resourcekey=0-XJZIpsFfvIMNDl_DJF9Psw",
                        duration: "45m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1N6Gycsew3uR2O-vDbdK6Z-5HnJLhb199/preview",
                        duration: "45m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELYVktY2poVmZGTkE/preview?resourcekey=0-OBYn70zwqD5D-uEN3t8nFQ",
                        duration: "45m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELdTFRQ3hSc1NEMUU/preview?resourcekey=0-DTusYjT1mHiGJdXdEnE_cA",
                        duration: "45m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELZUZrZHhyVFZQcTQ/preview?resourcekey=0-ZBT1_6j_zkSIT93IoHE3tA",
                        duration: "45m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELd0g5VVFOb2g3Qms/preview?resourcekey=0-3deiVovo-VZPMnBluuy7XA",
                        duration: "45m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELSjZYbHN6WW9PLTg/preview?resourcekey=0-vzW_HmvY_gxobMXB1LzJ9Q",
                        duration: "45m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELakZELVlMWFhrd0U/preview?resourcekey=0-LIqJTnamJ4tPWAHCPXm0aA",
                        duration: "45m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELZm9BX2l1Qm9HaTg/preview?resourcekey=0-KJTuu7AneIoMbOxnMQTpbw",
                        duration: "45m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/0BxaBfHfhtnELZThUUE4wNWRmNXc/preview?resourcekey=0-OKItRyyA829cLLU054iQow",
                        duration: "45m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 261579,
        title: "Nivel Secreto",
        subtitle: "",
        description: "Nível Secreto é uma nova série animada de antologia para adultos, apresentando histórias originais nos mundos de alguns dos videogames mais adorados no mundo todo. Das mentes criativas por trás de LOVE, DEATH + ROBOTS, cada um dos 15 episódios é uma celebração de jogos e jogadores.",
        genero: [gen.animacao, gen.ficcao, gen.acao, gen.aventura, stm.prime],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1UC3vYZW517dNL8ZWsaT4w_yxbHU259Zb/preview",
                        duration: "16m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1TUwNAiOE8O70DyAEHjRka7rYk7Kksk7w/preview",
                        duration: "9m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1H0GhpeSY9Z4_qc1cFqThH74h_zDJZQTb/preview",
                        duration: "14m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1hLlcxq_P-vG_h5UEYBbYX7Q28AYhUP5e/preview",
                        duration: "19m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1xaC2xE1SOWsYZKzQe_dr9nEJ3WoKHVea/preview",
                        duration: "19m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1HzwYWuKeVK_46a8g8rL09wDyKs7srS3x/preview",
                        duration: "11m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1u5ik2HG2IuuoaRrBAkJ7fiSNJV5vEu2j/preview",
                        duration: "19m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Lyu6TKPzwh7EzfQoQ4K6mWF5f92xtkM9/preview",
                        duration: "14m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1iBvSsOKRH4oyKUqxDWuc9K-0G550IuZt/preview",
                        duration: "18m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1qR8p9SVRFv65nd4HnHpPAWs2NnyXQ-o4/preview",
                        duration: "8m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1lZT39l1J1IxRaHjhguoW1YByu0kqyqk2/preview",
                        duration: "15m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1D7NeN0ZJ-DO1hurhJnCqhB8wMmEsc23I/preview",
                        duration: "8m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1dKdhSyTAC3X75SJ8YlAk_nNmbgRCgCt0/preview",
                        duration: "18m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1vesF73QfRRaA_ZbPKI9kTzpnc09ZHmgn/preview",
                        duration: "18m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/17uVeQ-OgFORssA-DAffFY1zTp-mUDxVC/preview",
                        duration: "12m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 1405,
        title: "Dexter",
        subtitle: "",
        description: "Renomado funcionário da Polícia de Miami, Dexter esconde de todos uma segunda identidade: ele é um assassino em série que mata os criminosos que a polícia não consegue prender.",
        genero: [agp.crime, gen.drama, agp.misterio],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1KY-RXLjiwmQtnQdWtBp-UNzzgUiDG9iQ/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1GWbSOpsD6imNDbDL3FE3zkJvAQORbdXI/preview",
                        duration: "54m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Pyt77hEXIS4DJy59hTU19iLjyJECXKuv/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1g2DJDPgzxKcml5gH0_UQB5tZyuA26G7H/preview",
                        duration: "57m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1VLraIOAiLzeazkRLm25-MSQKzgPQscnC/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1E-M9lu9ybmvbAEcKQZpNkqmDRs5Vd0LA/preview",
                        duration: "52m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/15WJ4djPmbVNtbdukvyxq9PjNyeHosVbG/preview",
                        duration: "52m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1ZtmV7nLtZYLvV7JaYBDxn5Ym0N399wWs/preview",
                        duration: "53m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1SaP7epik8l57Yw7rPgmCu0mwxVvqh8_p/preview",
                        duration: "55m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/15tOCVt52v7kCnSYtYR4_vx0RZSF0PTQk/preview",
                        duration: "56m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/16l6cqnGVrvi2EXQarB4z-X-UsOfCSbGy/preview",
                        duration: "53m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1u1i2o_Hv08-WFXb_uptA-XvFzoCpbRLC/preview",
                        duration: "56m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/18v9wM2XcgMeg6LX_kzd21E0WFPy_5EGY/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12N45mCAZqlwvRaq_OcagFjID9tML4wLo/preview",
                        duration: "55m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1R8Q3b4vdt0KkyR3fVx3yDmL9n7XD3x_e/preview",
                        duration: "52m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1lzwpWSscl3qin-OgZsTy-M34VqV8mH5f/preview",
                        duration: "53m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1k2s_yGZDhkDiTTld9uyXc_F5cMe9wnQ9/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/16IBEfEQY9Uwxd7Kr0eOLTfyRXDKEP9y-/preview",
                        duration: "53m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1R7TJEysnUHDMgEa2COTGjvMwXF_0js8C/preview",
                        duration: "55m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1CChbHlBUEA5p7EHMfughpa1CkfruTijR/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1aLXPJFPgWyCSNxRHsgKpmRGZZHGDizpL/preview",
                        duration: "50m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1ntqWxfOway1ph8ayV1xnwl6WdoqrLgiF/preview",
                        duration: "55m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1tB6oo_ej4-A44sTjrCJu2XgtTRn4VMAr/preview",
                        duration: "51m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1U6eQIpvsxOViBNq9TsyfX36JiM-redHN/preview",
                        duration: "51m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ynYrfBYrxKTbOD_PDfDU-hEljzbKRvti/preview",
                        duration: "58m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1QjgqnfWFTQk9fm-C0HOPIwmSgpRpx56j/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/14bTjbB1InMUnCFR2WAQqzuusrvv7Za8U/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1j2A4caThGlVtAL5K1LxGtThD1X8EzhQH/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/107nFBCukXecVIT7lfl7Vig2tZyakefZ3/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1tlW0VmEMbyFkIg6QPkjbkpBbwiUkCZqT/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1LRDFVzOiB18fbj134xPDErfbwFpfihOa/preview",
                        duration: "57m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/15fGgbMcZNipxTPpn2XSfqlkqGisLAJy1/preview",
                        duration: "59m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1I310-lRDN0-9Pm-POc3TWb7eAwmZnV_z/preview",
                        duration: "51m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/125qwm6JRgXXYCs5aWsvUOnpfDvpOzrX6/preview",
                        duration: "50m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1lK3AqQVkLEjGgN4Y2ay_ztPs-TpEH1V3/preview",
                        duration: "50m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1EGatD2naiIFJfWcxSlMGkL6x_NW3mC3F/preview",
                        duration: "51m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1EEvNcayVaGZx7Z331Wj0fsPLPi79W9av/preview",
                        duration: "54m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1uZlYsCkFa3R1KAtKDNyDpDigH4WnO8W4/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1TdSH-Dq9roQldV0NfHYfquH_tHI-Tmnc/preview",
                        duration: "51m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1W2Y8uB_yrNcFnjqygIVznbaUcpCLKnYR/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1DL_rH1CT0bE2FxVMh_gY1Hv212VwiDxh/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FxjkW7CPlVQGTcc1kuYYuAFtUe4fq1Wr/preview",
                        duration: "55m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1iw1nt4iiBgbHaH3rHo0T0t1xIQ3q7g_k/preview",
                        duration: "52m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1xY6gK2RHrF4If59BS1akDaZyitu6lZTq/preview",
                        duration: "54m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1HuJGvCzWk8q0oThFKP9dFFegZyDn-AQ2/preview",
                        duration: "51m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1hCp6-Pljl5roTwD-dzJQL4aDtN8dISuz/preview",
                        duration: "56m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1xc1_jaTsORspIgxERuiKbHPDK_dl_2Yl/preview",
                        duration: "51m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1P8ZAFYCItPhke6gw73fK9e0ZX2630dnm/preview",
                        duration: "51m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1EfkVDo46cPL2FZqNuL-7xy2i0NbBTfDd/preview",
                        duration: "54m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/18PWVyFuraxSjkdW1TAw51oNgrKBIjAV9/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-ozVlun6T2HeGAhl-2m88tB8AP6HEQVB/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1rFUcuj9WCv1ricGEXllb85k6B6hiLarx/preview",
                        duration: "50m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16wMyAaz6fGNv13MPD0LKae3JsZPb4Lsw/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FelOAu9N1xoK5tlGjRIPCcX-CgpY-ZyH/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/16v4GC38oU3qY2BBav5U4PKMnmcO_IiqG/preview",
                        duration: "48m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1qUIR34yjIiNanUo399-sRv0-BjjS3rry/preview",
                        duration: "52m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1szf1RSYI9mvXzld8JRJUqHRakyu1uBjP/preview",
                        duration: "55m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1yX043u8S-AqJU29XvmL6jH3Dg9-D0wov/preview",
                        duration: "54m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1svkxA1UFro4Xez6U4LCIvQQlB_ArkGpz/preview",
                        duration: "47m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1K31fx1Z5aHXKZU9TSze3qOWuHp8rbVho/preview",
                        duration: "55m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/144o_W8cwwzazZFw1Jbs6CMIhQ3mrY1sR/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/18n95oL2yOdOSOggSUWV-TCGjMn6rGxgV/preview",
                        duration: "53m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1o8qdl0uO-dXLmDvCKtsbKkMtPH8L7_hV/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/12teikhYapwPsuxIBXtRNmPyoahbu1Bez/preview",
                        duration: "52m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1oMDtsXzxAckyomuLyCSW3bE-BcE3JEvH/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/16XY21SqqRi3jvCuxpIpglrWm5A0xUXQi/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1zE7GZQ6ez4CigVKjZ5sOXeFxOM3hov8E/preview",
                        duration: "51m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1zrFj26tqQWtIP8WH1rAGWCY1t0U8E9rx/preview",
                        duration: "52m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1FKpHJomn9vUZiohYQUepCJKFNVOm5VbV/preview",
                        duration: "49m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1lTAU8GH-t1LWU1H6_1aJp0wicW00nfDJ/preview",
                        duration: "49m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1F7P-VahMD7_SR-WkcYKZcuPpO7DgTbcP/preview",
                        duration: "49m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1Yatq1I2cMDjxaiNkEs1qptP4iovN1Sjf/preview",
                        duration: "51m"
                    },
                ]
            },
            {
                s: 7,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/19lHsJ9DVRrf_hpays3LluQm_M59hDiK0/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1EDffmKqveaeCWVVVZdVJx-Tz0eM-hQ-z/preview",
                        duration: "58m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Uvv_TpAaLG4qaNeD_KlZKhaIn34oinKs/preview",
                        duration: "56m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1__WmgNMN4D_8TpMgOykNsFg1SW9bUSs7/preview",
                        duration: "53m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1aSsXcYm4iholCHwnRdkCco07xxVSbRnT/preview",
                        duration: "57m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1klp3oR_--rUnbJgEJKTDK_G9XSRtJ6vK/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1An1nSBFTbhqVortYSiqrOEWl77hnJBsF/preview",
                        duration: "53m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1vnX29VVdN0Lv6hDpHcar1uAY9Qxz5lON/preview",
                        duration: "57m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1s_50q_q2Otx1J7RggqJRNI6Hztm1t5Ry/preview",
                        duration: "56m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1SiaHWflh1JFRo8dOEbx-FP60tIEq0GAI/preview",
                        duration: "53m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1oBemo9HFLDF8pxO_g55UODmkNOBwgXW1/preview",
                        duration: "57m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1Tv7SIWV5Z-0pAI-sB4RyavfDQtDYmSkM/preview",
                        duration: "56m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 219937,
        title: "Dexter",
        subtitle: "Pecado Original",
        description: "Miami, 1991. Quando sua sede de sangue não pode mais ser ignorada, o jovem Dexter Morgan precisa aprender a canalizar sua escuridão interna conforme ele passa de estudante para assassino em série com a orientação de seu pai, Harry.",
        genero: [gen.drama, agp.crime, stm.paramount],
        faixa: "18",
        news: {
            type: 'episode'
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1WAX6CyXMEc-wsUev7kBFkAlbPMk3Vjfl/preview",
                        duration: "50m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1BmW1yMWwFy09o5zzJ9AGXC_DVKbqmTow/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1b-b9BK__YmtuKtqWKyOsK0vzfLw3IY4g/preview",
                        duration: "58m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1W5QtZ9y_mwlHZIE1tUTBt3Yjl4Q1riFl/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1IHZOtoQ6nUUo9Qox4oD7bauT7osCzy9j/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1zGiqNkjomEwa_dxz7Ntew3XVhZLBSEhf/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1_fD_yfmMNQBKg1vPby2YDz4J5cjCJe6e/preview",
                        duration: "48m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1RBgbqnoimHGSkOE7b0o5KhuHcwMUpIMg/preview",
                        duration: "52m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1E2Udi4aMQDUZQLXtCfl61tajL3Kma3kF/preview",
                        duration: "50m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 125988,
        title: "Silo",
        subtitle: "",
        description: "Em um futuro destruído e tóxico, existe uma comunidade que vive dentro de um gigantesco silo subterrâneo com centenas de andares de profundidade. Lá, homens e mulheres vivem numa sociedade cheia de regras que acreditam existir para protegê-los.",
        genero: [gen.ficcao, gen.drama, stm.apple],
        faixa: "A14",
        news: {
            type: "episode"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/113SjLpkGcS8aNFUE8P3WLReE8qSPMj8j/preview",
                        duration: "59m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/116Hnu890l3PPJkCHSlTNKX36AcK1dl2X/preview",
                        duration: "47m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/117bCQAzbbb7QmBQXc2j-gC_TRPwMRZwN/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/118p33QqWWu2LqTIiIwA4Amg7ENprP41g/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/11D12JTcJL-LzMPmyN9MxLCWcDrWO4uWX/preview",
                        duration: "50m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/11GqTri7xnKdbZXBjr-Jtf8Ro4XygTBZF/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/11M2_JuZnsMN8MtSkSkQYBZ8DMaHAXIez/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11NQ9PCxjaduQGKVqdc47Pg6YdZEzJJ2E/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/11ZuSQEQfwzWauO-3Pq-QTD9_DKVAICU8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/11_DYVKjymCzR_2-Db1hsC9bt6f0jqEsY/preview",
                        duration: "44m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1WQg-s80zf5JwVtfyVOuPxsPTq5RS5-Uy/preview",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1mkKcbiiWg68wXmXOdGxxuebMZHA1zrvG/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1JaI6cR00UE-QXGTAdn6xC8rqsIKvNxYB/preview",
                        duration: "54m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-xoKwyO-fzcJoJmfx3oU7coAu1AIvS5X/preview",
                        duration: "55m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1F5ZI6VaDBW-LKCE4E7stbhEc0YZTA87U/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1dZnhXhsRI7HRaO9_S9YWE0B01Y8rfDkb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1pfPFWQ3tAMSxqUqwIUyvUJDjIKeDF5u0/preview",
                        duration: "51m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1XiOxBjhyUCq7uqXQXnjNH-TkOupYvnSs/preview",
                        duration: "48m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1MAjAqk2blDEtq_gqk6kSXB3vg3DibWgL/preview",
                        duration: "01h"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1uEr7Y0ULVypemYCwqYRUH4quGCDfGa8t/preview",
                        duration: "59m"
                    }
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 218347,
        title: "Sweetpea",
        subtitle: "",
        description: "Ela é continuamente esquecida para uma promoção no trabalho, o cara de quem ela gosta não se compromete, e seu pai está muito, muito doente. Então, tudo em sua vida vira de cabeça para baixo. Rhiannon é levada ao limite e perde o controle.",
        genero: [gen.comedia, gen.drama, stm.sky, stm.starz],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1IsUssEdgucl-OibrH2B2MsePhJQIku45/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1QF1YncIIIinritJrVGlySv-Jp984g0s4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Clc5FqWQb0A18UrUPIO_CuUUamI7OhXo/preview",
                        duration: "41m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1sKwwMMao8j8jANdKL80WB0Vmwqn1RF-G/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/12nhVU4d9JHLBpqkI7VtAFRmAVa9WeXfu/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Xfn7xnGTamLS4Lb9_txZmcV_HLdsrlWR/preview",
                        duration: "49m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 66732,
        title: "Stranger Things",
        subtitle: "",
        description: "Quando um garoto desaparece, um grupo de crianças participa nas buscas. Mas o que encontram são segredos, forças sobrenaturais e uma menina.",
        genero: [gen.ficcao, gen.terror, gen.acao, agp.misterio, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1dFb8Eo32llhYwUWQVckzIwdC_xkesk10/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/15ing-Q2dNYJnDMdC5xtJ7z2wd74pbBhJ/preview",
                        duration: "54m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1WormNDPNPj_4Fhr9H9DOpj3oSyu6ziLp/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1mPL846dP8ZFGnvOvb9KAHFHjIPOkQyBJ/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/18q7xmMzDXN8p5xSdYD4nBk7kNRBUp3Eo/preview",
                        duration: "52m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1vqXO8v9nQ8gKf_nFhAIkxc1wt4CufMOT/preview",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1IwmgY8yLHshNMw2Y4dUpUYM5W-XungVW/preview",
                        duration: "41m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/14dY9qWAa_awJstwPbPlTh0fb3-DUhi-I/preview",
                        duration: "53m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1qYQTMhTZgMr-oK7TCjVruMQeZVgia4dV/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1z93bmzDx7ubW9ujhWw6NcoQ2ou8b63hl/preview",
                        duration: "55m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/15vs8AosgXamam4_AroHdf3EkRuaqPMxY/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1SonjPwRAVSNgm1zqwqcJzhb8OuZxmwM-/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1f_FPOxyF-vzDzCYS2A8_xnPdM8nKKRiW/preview",
                        duration: "57m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1qGP62jVymi4gfFRw0sAwYcGgpZpWCv0k/preview",
                        duration: "51m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1gKfW6UttPceXZRA5Lo6NY1oQZSqiJVn3/preview",
                        duration: "45m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Hh7QLuSEJ6__grFHPBh-kucOTE9tCPr_/preview",
                        duration: "47m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1o_y36O6u8H1XelwWK01BOi2_TL_htSkb/preview",
                        duration: "01h 01m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1F1JPxyax-QrZrGb32Mvl2MZn6DCCDzhh/preview",
                        duration: "50m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1PHzplAdq5Ke-pzGJvdH4gZdNrL1Xzkr9/preview",
                        duration: "50m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1tIBJjA5ECq0FJLA9uNK3pgcrQATytMyr/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1TJdRvs9eTgI5zhNjarNd2puEvdQjMe0-/preview",
                        duration: "52m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1mBfIBBIxDd7l35BX4qEFqHCoXT__aLI6/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1zXuav76mzJ8lARlhej_RxTKjj5zh07G1/preview",
                        duration: "59m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Ug-1WNCQ5XtBmRm1IpNMGatW6iOxG890/preview",
                        duration: "55m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1_0LNOAHjFZ0xUos8hy6twfHN8apbh0Ll/preview",
                        duration: "01h 17m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1tPuZEylOCdsssc4N9vH71kYbP0jGMHZ8/preview",
                        duration: "01h 18m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1W9rdCxLA-mNpj-Atba76LxFFokCzy0nt/preview",
                        duration: "01h 17m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1IxffTZaC2-0P698VFuiFOXbOLFCgFjmK/preview",
                        duration: "01h 03m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1zq86QoYmAwp6gbHhG-IxHTDOMT1eZBP5/preview",
                        duration: "01h 18m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/168pfi6IgFgsIbewZLJgB8I9F-4EPg2dp/preview",
                        duration: "01h 14m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/15BJjlZg45R6GTbPKnSNHpY-Ophno8qyO/preview",
                        duration: "01h 13m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/11f5vfGtn2YfreZcSanGjskFz5TWEF2LV/preview",
                        duration: "01h 40m"
                    },
                ]
            },
        ]
    },

    {
        background: background,
        overlay: overlay,
        tmdbID: 1412,
        title: "Arrow",
        subtitle: "",
        description: "Após um violento naufrágio, o playboy milionário Oliver Queen é dado como morto. Cinco anos depois, é resgatado de uma ilha do Pacífico e enviado de volta para Starling City, onde passa a agir como vigilante secreto.",
        genero: [gen.acao, gen.drama, agp.crime, agp.dc],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1arkVxES9vQ1f4ut-jmS6-854G9geernf/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1UUNmrlV9UWz4oVgo6T3bVX1-gvhEqEX2/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1XS733MeGM10OdSE2wKogWH_wxS0NuU1d/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1VcZKvnGblHjWlnAGRLQvPc2Nw3pSP-1X/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/18cOEQN7In04lFqPe3KdV1FSc3oy2KK_3/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/113jrSoJuOI8Mhx4gTsOGds_t1mQwaysh/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1TwqeOy8LOqy72u5mvt80aCAtSa0PTv-F/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1SVkXysUFhfX4zqMunJe5TFP3KmyQJ9YA/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/138XHloHFVWtTI99EArYeFLPxYpc5ZdDM/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1veA88M6Fa6SKYZNwAMK_B2v6WQaLwVN4/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1mMs_atOLGiAZNNi6JYJFnUFlUwQ7oEq4/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1g4Zdx_IdgIUWcBXBevTg_464YvGS1d72/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1lzlkMAobb7xqNqQDYzl1vPt0EOsOFWcQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1KDaM2tOLljsOQTFEKUPRA-rmTouqKA4f/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1Rog_q2eR-Gyzbck9B5vkehmNnUaLtoev/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1ioj1PWRJusvS06O_fW32KG2ihD71DU74/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/15uM5a15fJCHIs5XkzjOGducwjDaWi63j/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1rqqIc3idfr1yQnUnFpT3KpezDV3JRCtc/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/11whUXMT9cv6NWpeJULzYKJ_XQ_vFFM2a/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1TXoSXYB3IbjK49I-l0LxRBuqP2Oxj22Z/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1Zd5MX21kLg56DUNGvAvCY-9Tub112Msd/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1C4c3rWszkX8zNlTAw3vq-2Um5wCQHuTi/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1HWXjxmvafYWt-T9CMGg6ZH334rIIgajy/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1D5HDpxh7O8w7isfofiMvZCjoeoQle1-M/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1fLIiyyMaXZNzwiqCPNnybwYFKJGS8761/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1LFfwdRAZb2OPdHO6wMYs43pOfe1Hg7v0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1UmS-LqLsxUDWfMI5MElqgJgb4po6Hd-1/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1YSTTGLnCVGc5yrCSgb4qDvcqQ-MxIujg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/12EY4xAuPnzwjvbdQTZ8JDWPaVSgl-We1/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1q687JJ106lpUL4oxt_dJNTxh2-u9hu06/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1k7f8qcwrlWgOTUnnyTYAeGKCsQaZSs0J/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1pM9quo6LYDXjvU2_781vKl6Bd6A26vQK/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1AHhXj8IPhYAQFABWGOgjj7VS9ICz2t7r/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1JfOM7VK5Kn0EvYUxtcj_JMW4SZP3QHYe/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1j5sumqIRCaHFzO9HtkNCUafCbKsrFVxH/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1cxvJuE1QiHxxFUOHwctmGfL6Thfls1Os/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1vxpGoQ-6QZH08tt_h_wcUOqV_OgkGA2Z/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/10lszS7ohvnlnjB0SUSqpkQROBAHb0LzK/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1OS-rnw0eYu5JtcY0U6SLQkHxwkKA9KH0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/15fpy4t00h4uwhW0bElaUKY8DP3pKaXos/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1bBl3ThH-bsfDOiXgWRUm8gEs6EvN_GQc/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1O91s_4gX09flJowjh3vq-qmyQrrPKAOU/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1RCdsE2q8rrGplBfic0_AEtIJEZddOKVL/preview",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1r1DK_K7Gdv_Dl7lq32rM9KBzUFzTaOT0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/18yEiJQkFlLH60v7R0jSibjCztx_tozIr/preview",
                        duration: "42m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1LMNFnT2qc7OrAZIusdEYGj0HKh1ICOwo/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/166kqWUI1OzHUDGFV1Z1L41aPc9FtbsmJ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1AsQMo_8_KqljDl_iFJmjYbxADRSh74jv/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/16cs_X43-_AUXfb7UozkuHT3fRSrPpMno/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1OTLDx3O-QkX0O1vLrYoCsY-9fhYrxfO0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1b9du_eiNM6YFDOlZHGBgA-i03gFgYyXx/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1zsMWyCSV0JfOd9evze3ndsGrbzCx7FCq/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/13xF43Xpzzqz4Eues2f6sFrCk8gwoy4mU/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1QU0a44WwCQ-r0TQ4emEsTNwgg2baYEdO/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1nRljKG2WaSGLAh2X0dacCaGbVTxY-OsD/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1nAQcdCw1LP7E5ucUgvOD3u1Q1fiV-Ird/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1A1VA9fsOprOLPpySMdPDXcZW2TXgVYpm/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/118tOo6ytnbHPku__R3SJrBSOWxYldlaa/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1s3I6pt02oiDDj_vlM7MS0HZ2e-zzhIyH/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1SqOo3HFMalXKBH-_P3LiHNX9fUjLcIpr/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1EMWDmP-WdUpXPjsAzU2d42tryBAOiSwB/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1RLsURotaP1_Dx7IrBNiGj7m-cJDcxUHr/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1e2CMSNZCoSZUpEUn5oJ8dQUtmqC2i588/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1Kf5NVkINFs4-i2fTg9kL3N59SJ1Ls668/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/17Z2IDD7DK0V4Lb8Hs6ASQiBO4scMhg_C/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1jy5RxQ_OgpXEVB1mGm54rkDduDwf8olD/preview",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1jkxjwOtw5N7duDUN6iBwCEwL3OiFtaF8/preview",
                        duration: "42m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1jku3YwonmqiB3UPqL38NLwlMc5Ha5o7g/preview",
                        duration: "42m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1OfGNdYMEA5OpY_urrcuyCxsaIMabH7Tj/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1FnL0t_H3_VZUGhRABIiB1ixYRaMssKDH/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/17ATdKxLy_n8bRZXyoY6so-I06aO0dT54/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1KtFFXxBo_nRxwdi4eQj1gQRO2Kewo15B/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1zeYfStDmI-R9r5mAEwNWj_x8KKOH8bda/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/17xX_O5n16WHycVYebTXCLLLgOoavbmvQ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1z-G-GjRkJPZwAdk_kWcBWijUpQCA_RMd/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1e3VbcLwJ4FLKt3m8iYDgdkKsB3weSQYH/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Ic5eZYUkSaMrMw8JxLtNA2IwiuXtaQy8/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1vNSfObKB32rjlHXQKAiHNn3Kw2DyK6RS/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1sWvMsF0_OChdm0TgurFMFne_PT7ObLTg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1bZeY9tgbm4_7YC5RFKDmXxATbhbfZbM1/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1cXxdtNAk0etWBmPw6no2ljDycfmEhJM4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1v6brwklbxPvCmy0r0k32v-hP9NaqrTES/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/12qQmTjlYUzjBgHR9WIc5XpXbvWlK9Q2-/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1nckdXdds4UT-GLMo1ePDPgrGoMTHew8Z/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1BQTJiCgkayxqMA3uivRsJUxsCNbBm9fR/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1HgOBo5Lm2EBLTDakL3vbYUJVEug0nNC0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1q5UbN6zzvQ3jKlMb9cZFsJcvrLEaEHKX/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1KsfFog68XNAMMwdnSfVJZZylTL0Lsgs2/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1Vis6PRML_HlkPVWGoqYKoVQWb4PKFgCE/preview",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/17ydo2DDdArMSSKFv9Zf1ZIAl6swxEzJW/preview",
                        duration: "42m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1kFhIOQefLO2IGvpdNuSkHjCqSnrg35Vg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1A2zuU2LKCetC2mYyRbjIEg4a_ZirT7LL/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1o8Go5fFNML6lnVCwA8-s2U3nSZ068C7N/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1GVG5qQd5S4sGRHwWabjaTyC8vUyT5-df/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/13aTH0a1ysG1pdt7wh5_qk9KLoObSLO1f/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1VK9aFwQ6EOAHeEVbOIrSVzKdD6XTchoB/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ITdq1XYagDIDd0a3HFFcw9I6NC-csO1-/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FCLiaeQJMQcy_K1-wiLqesmc0Xfy2Ppc/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1EooC0a7xZiUNB14cFesYxhgijnmnVEMq/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1QxPGmnK_jiyHuQ_fv-BBZhP1Wo7lWOSF/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1Qkn_8iwDno26NzMhyoroXNJCTAN1ijkS/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1Cpt11iuyhKWCCV664K8GVFdPMVefqiZG/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1nSBYcdi6X7HojwJHvyZl0Np3Hc_sWm0d/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/14q2MN3iMy0_Y_b_cTeiUtEl9selFd67d/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/18Eby-DwxH233zS8CibPBL-j1Rimpygvg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1o72j7EHiFNn2cVs6EA2xkSS9OGKq2g83/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1syTExQVyg1YbpcB0UVCo3sydGGFNbwL3/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1-fxBY20daKgEYk2_2FDts091tw0PB5X5/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1Yx7D05RyBQMTlurwOcWO8c_H8-DUz7sd/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1wbWpaxJEv7ZD4E1oBqXanEaymIFhvjoS/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1JrgIWeFeM0FSsFoTRC854BYoDWOEVArC/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/14uVk6tqqwcFnTA6bLZ1FXhxQHTgw5Bnd/preview",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1YMJZW7YK9XDFbXKdhilnKnANdEPCILnZ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/12OGPVKxo22g1CbNWjc2fHaw5D_oIfqrX/preview",
                        duration: "42m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1WN4N4nikaTIL58PkH9kAqORhLtItSaZr/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1KtCIE52W5v7CCShM2ovhS3vWXfr-HWFc/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1qymIQiGCMmQwRzNVNBRysLv7QvOrxV6d/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1c6XrAyMsZ0GVOMeBpF3RA7JUo17mbI78/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/13JghH-qkNu-vB9p3wzoEft-f3_3K_rm5/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Qd56nURmpeC0uhq0eK4WPJbhX_k2OSPV/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1AHUNnFzicXbOXem99qfWUafKNhwmLE1z/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ILUdzbjPJXuq54LTcWoRlJhAVzMX_SGT/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/103umvOhHvAYoxkvAwrk0k4Ytl8cVAThT/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1TwlJdMrpKgDCw5-jwP86wXHus5XixSg7/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1lfRC2utzYEyo13D1pRbMaJNB5Zve-bLY/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1Dr89xQudMdHwFIgU3d9j8GPwwyVRgW_0/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1MNZn7kdy6GeZ6EQKB3auQRieRInef58K/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1bs_CiGq2Vag-HHW3AWCQuF-viMxeiPDB/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1LY0BUBv8a2AUlmQhAXA5Pucj5m2sIqXK/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1qRaWbn6EyqA-Z9XoNIyXIzWL8Lir2YYZ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1MPdRXVz1-uFydoPE4QGg3THRUDtoOTMm/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1__oIX3Cg2q77zEb4G8kAM9HpcAgaPlHe/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/10Hpp_h72hVjZzW3ntukYBf2MfqzxXP2K/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1VaD7hYEIn5u5OOMsVUGyMCl7Hwgc79lo/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1X1GoTLIKE2oWjFPOgriLG8BOfuwYYYz1/preview",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/194ZJUSmlUOXPU_Xl1-l1MOC-p5aDIV_l/preview",
                        duration: "42m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1S3k2kcQM0mOHPxhWZsN-ezIDPJxFFpHy/preview",
                        duration: "42m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1hePJwcXHqrG2oUcPIKcaRyPuOX63qPrR/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 7,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Tw9PpstDXttF5q6Hf7A-sYrOkdCh0vyJ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/17D3PFnUKT2yrTaUAepS3gK9PuCqsHUJe/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1FWY3Bm7xHeTi1qYRrmzm_ZOvyWq3pEO-/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1BWG6uPOOhJNGGcVtFUEbBSRfe3d-bwa9/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1BMGI7WV3cTPEUI03Js7B4NQzHyaYXfE1/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1zNjJxm1PeJI85tJj176DTOTD8U8N-R6F/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1lJK_VSPQZQiPkiR31OMo1FX1zD2JRCUl/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/19SNORIgWFLUTL-e1mYmcIVdI159a5RXR/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/178o-aF3xVEGRHMpkMgjMrNaDob-ehJ0g/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/14lD5EYu2Zm4GEUuCicWcHww9zkfBlGsZ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1VgHegZJkfha_ZX0I4Zk59IUdorrKFwGi/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1JWnMuWSAHktouLHMQPc00C5d00T7hRJM/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1vwqQ59IpSnpCR0gcgT3PBqS_y4rhjRDA/preview",
                        duration: "42m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/11Rq2Ut8N0GC6ltF4CIJKeX8HG_mvuazs/preview",
                        duration: "42m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1gHO6lzQWG5d0hYsy1tQab_PRMZs1-KRl/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1xnf82cl60gPuMHBLtBpFmhdKQyatkOeh/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1kV4-wEmBJhQa4J60MHZxXf8q5lPPqOQl/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1OxlpRYbIIn04lb9JMlwG3IPa70H88vP6/preview",
                        duration: "42m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1frppWVTtNa4HjvW6OkBaAO8rGMj1naqL/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1btgxVFgwyd-hWPzxCReEYhnhcsdpu9D4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1tilLl5NQ0StzfaOIEBfuGbX61C7wAbao/preview",
                        duration: "42m"
                    }, {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1m72IhFbr6Qeu_fW3XB3A7V_GBvPeUly3/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 8,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1EMn8ZJwUTM-2q5Kfg8Q-fhNf8H6MzUpg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1h23ka_4vRNw8mwItztQYqlBXP_ABeQJG/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1y0JdLSuKuQsJX4dvFEXChoo72KqpTp2q/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/196XZ0KAimF_Zn509E4eDtydmuzPde94H/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1xGGlJ-4Bw9xcG49gbWcV7_9cSySXbqr5/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1diA9YNHBRjtlLCHZeot2FS971rBFAe4U/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Lezjy4_BigE4iCsyAWuI2yhSxVnRONvl/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1NFAhDtQAiaqKvxbiiF10mRlA4pDDeLuk/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1yhyRSdbTSQiIuMaJij-q5iBeBQ9Ht91z/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1W1WKaNlAaEXMOBOjNBV0_FJ3ob8JPvrg/preview",
                        duration: "42m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 2692,
        title: "Eu, a Patroa e as Crianças",
        subtitle: "",
        description: "Jay Kyle precisa se dedicar exclusivamente a carreira na contabilidade, porém Michael acredita que esse não é o melhor caminho para Jay, pois acredita que a mesma usa do trabalho para desvirtuar-se de sua família. A menina Kady está sob os cuidados da babá Rosa, uma mulher mexicana que nunca caiu aos encantos do patrão. Claire vive o período da pré-adolescência e costuma ser um pouco arrogante em suas atitudes. Júnior demonstra seu gosto pelo Hip-Hop, porém é desvirtuado da ideia pelo seu pai, que costuma extrapolar, quando o quesito é disciplina.",
        genero: [gen.comedia, agp.familia],
        faixa: "10",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-sugsUn-kirwptPMGWTm6u7f_Vo5CRbY/preview",
                        duration: "21m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/13LHOsu34ADTrHXBv2GtH1gW1DJztey2M/preview",
                        duration: "21m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1GrZlNLOAaSo4uQJtvcnTO6wUOudeKBSU/preview",
                        duration: "21m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-nnltNSFIqc73xC0EAvWs-MYJcsOWBib/preview",
                        duration: "21m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Ujk9AUZKltKRvoWWGt_ZruhNZKPMSx13/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/14pT3t7ThETg-fd7PnnB5ZPRDo2JsERRF/preview",
                        duration: "21m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ChUCrF8WHl9cNonM37h9sKRk-728cQai/preview",
                        duration: "21m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1INq-oPO7MT0GfMdmPAg8ZCRSOJyzDVm9/preview",
                        duration: "21m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/17UDd_snuqqubMK2D1CM1qjYDHOp_fjQE/preview",
                        duration: "21m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/11Cx82e3WKkoR_icpJmmQmj42louxmdsR/preview",
                        duration: "21m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1iKq3uolTG4dyVQQgVVM8SYQLwHNVk3PH/preview",
                        duration: "21m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/101oLeC4r5Z48-cS4vTOfsM1CkjtiLKPr/preview",
                        duration: "21m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1KisZTkObHb55nK895dZSYvjJxY60kTGj/preview",
                        duration: "21m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1w1j5ADVb2uS3ZdN76mycsw2FBxDeimj0/preview",
                        duration: "21m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-WfMyVqaLbJ7bJO0EyY0293tpQGRpU4P/preview",
                        duration: "21m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1QZePszjeoQPbaFSKLtzSeVFBO3-3H4F5/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1hNKBTqD1klZ38joKyTsMjqruejl87CL5/preview",
                        duration: "21m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/12FMYb99VFYQkZEPP6Gr-f-N1keLgDu0z/preview",
                        duration: "21m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1JVZqujFFjokpqeBnc2DLVzaoD_GLDw_V/preview",
                        duration: "21m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1CcUtC_0hRFo2hqXF67f57XCBkAcRI3Mz/preview",
                        duration: "21m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1BQLIEfAB7HDg2Xb7AzeB1HW89Tca8vFf/preview",
                        duration: "21m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1oSXqlIqlMdax_JqmPfy_zgD8q1jfp8jq/preview",
                        duration: "21m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/10Nz1nxclRCve-PgVBIKsC8wIB28eg7Za/preview",
                        duration: "21m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/10clFeChR72k-Ugt_bYeIERRuLryWAIR5/preview",
                        duration: "21m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1P-zUvHIPwkxZJV9rbxi9mfoMbubKhUfD/preview",
                        duration: "21m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1hJEQJLgnqc3yQsVBFq1VyaXBgm3LiZ1u/preview",
                        duration: "21m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1egXls55IlqVIg1KUm68jG2elQUnugGq6/preview",
                        duration: "21m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1Qa3pyxqXJRtg6kBGJl9p-ZTcv-rNWkP_/preview",
                        duration: "21m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1RY_iHSDekhK6nLN30IDDaL_65Y9lfcaH/preview",
                        duration: "21m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1byphf8j8s_0F9nJSHKEzSRhTy0KuBouX/preview",
                        duration: "21m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1GXrd1bO_zNqz2YTwJzojrAUcxMekkOS2/preview",
                        duration: "21m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1G5qCzTwixMa0djLQK0PUw7yIz_Av9KJe/preview",
                        duration: "21m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1Ihua6UfB1AR3_SsyVnYrAJ4ADLWQXbNY/preview",
                        duration: "21m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1-APLYA_yrzW5UgyQQsZGZVOIOZzSlq7w/preview",
                        duration: "21m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1CFgoHtboXydK0LxbQUr48v_dTjDGyLWB/preview",
                        duration: "21m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1VG4nwKtV-hJEo37T6JnNCyhQozhsZQR4/preview",
                        duration: "21m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1meozSw27xKwAm1tl5ltxOB0qZaz00sIA/preview",
                        duration: "21m"
                    },
                    {
                        ep: 27,
                        src: "https://drive.google.com/file/d/16xvwWrI3fB3utaq6AiUB0bCyAPknT16F/preview",
                        duration: "21m"
                    },
                    {
                        ep: 28,
                        src: "https://drive.google.com/file/d/1Bl6qxCrRz1mj43wEgN2zbIgs_I2D29M9/preview",
                        duration: "21m"
                    },
                    {
                        ep: 29,
                        src: "https://drive.google.com/file/d/1vCiFAftdPeC3LE20RS1BNGx_WcmSVUyn/preview",
                        duration: "21m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1D14pYeZBfTZyFJOo00Wd0xBjY0cpFuVo/preview",
                        duration: "21m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1pSkQ-Rex8oXURcTaou6XNDhs2aB9s7ox/preview",
                        duration: "21m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1kk7mIsnApNs21RLQHsmwUE4G15PUQ-Mk/preview",
                        duration: "21m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/12ffvdwfDTh6uwOgbwjFnmQgQ3IMa0CuM/preview",
                        duration: "21m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/13evtrbV20DwV4L4t_JSgu92CovuPCsYj/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1s3qyDgNBubSba-GlJo1jaC2UkV2Gxf7i/preview",
                        duration: "21m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1dBnwp5lxh7ZYC5EK8JwiG1DOWAwPn9m6/preview",
                        duration: "21m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Hcvnq6CS5KMfDWUscEMKxsMF8eZG0b1n/preview",
                        duration: "21m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1YtmH79tSlK119mBqyxG-dGZ3mCBH8KZE/preview",
                        duration: "21m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1qyuumdEApiRAHQMPqHZXRPeRZK3MWd4G/preview",
                        duration: "21m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1vmpP1o1Fb2oGm9A12XctGf7UtSnpXjbE/preview",
                        duration: "21m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1J6Dk2k6tfgbevl8KN_ZHT4vzzC2czXWP/preview",
                        duration: "21m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1O9nijBiiRCMQB521yb8ZC1KtxeizNhmb/preview",
                        duration: "21m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1meMae-ikXO3Xx5eAOLXkz9k9-iVd7Xv7/preview",
                        duration: "21m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1J3fuO0jVt2bFYZ-VRYTv1Le_q3aNir-V/preview",
                        duration: "21m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1IUrgPUNlQfLY-UKfCrhH_4maObfklG6H/preview",
                        duration: "21m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1DefGvsQ2foNb5ix3fAuhBLCZnG2xkj8d/preview",
                        duration: "21m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1i00PYSQWpRx5ldA-F6r0mKQ2XHUKj6k2/preview",
                        duration: "21m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1fCbCQ3so1hndjcB3zp6ahpIX8SyVizko/preview",
                        duration: "21m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1cSnymQZTH3OkBkwtSRxO3i8zDKjH6dTN/preview",
                        duration: "21m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1YafyPSxEPPPwrkA-NAhRaFlIUZeiAoLd/preview",
                        duration: "21m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1fQ4BFkCew5BIh1FH46sVakHMO1xKP9LR/preview",
                        duration: "21m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1Gdm5OWOnVWN0_qltrSE8ujPpeG_RhIQZ/preview",
                        duration: "21m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1NWdjdiJUaRicctkXEOfEDutR_TEmAlAP/preview",
                        duration: "21m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1VXftvcOKmtUVnQSEqz3drt9UL5OFHQlB/preview",
                        duration: "21m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1QmFxcsAE56JDkajVq5vs3bbRe5DNgWLz/preview",
                        duration: "21m"
                    },
                    {
                        ep: 27,
                        src: "https://drive.google.com/file/d/1KQOXU6_fOj_yVdSQDvljAcTxAlAHvndK/preview",
                        duration: "20m"
                    }
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1U4dpGR7edhMwdwdAOYLNQF5YULErrllr/preview",
                        duration: "21m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1X9fjwH4Hni0BsslTQxZEvnkz-Xa6Iecl/preview",
                        duration: "21m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/11wIGGJPaYx3qNDsTxWt0CeNOtDkjVz4P/preview",
                        duration: "21m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1c7zih0UAbVcmFdQIevzY-kSz6NkXMH0i/preview",
                        duration: "21m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1U5x0HV65A3ZDTz0Ed07T3szqHRdunuIn/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1T7X_Gg4A_J6JDVfdaw_uS7Y7HTKOn0J_/preview",
                        duration: "21m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1qol6xPbkY5fU7G977HNqw3Na102qAhnC/preview",
                        duration: "21m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1fvDzGmbuj9iV-sUI-vqHAKsKgUGEYiP8/preview",
                        duration: "21m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1UD5L4Ba_UYGXdB9yF2sN47GFVhcVb3z6/preview",
                        duration: "21m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1Py3RrNFP8ne3bsruxpSigYND06WaIg-q/preview",
                        duration: "21m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/16ZzV3EG4D-PsRGZ_WBpkS1I7TEtna1Qm/preview",
                        duration: "21m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1jbvL5zZgnZVpXQstmNpA8AT8QyyykEpT/preview",
                        duration: "21m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1RKp0-GpE81nmxAaczs-dUTouCXOmFCFH/preview",
                        duration: "21m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1qI7e348e2snSvm0Qb-ujlBHGuRIf4aWc/preview",
                        duration: "21m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1wMcU45PvjWNvkFJu3B3_p4uB4GYMkvkp/preview",
                        duration: "21m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1MimLXx4s9zHsSMJSS5NTWf3FVvzO-Uf0/preview",
                        duration: "21m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1H4RsP0kLF2CX8CXrmIoBMdT4YakjUALO/preview",
                        duration: "21m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1F63hgWslizsIkB5Lvlx3v3OcQ_kiFGT-/preview",
                        duration: "21m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1jO8RtQli0CSTBcii8SzqGNVAYqHFZT_v/preview",
                        duration: "21m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1Hwfvhsa0IyznFkYU2HlJ0Gjd7FFduDVo/preview",
                        duration: "21m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1bTygoyKg_jNxeGRLfVLGVVbSu8egcj_c/preview",
                        duration: "21m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1055Oh1WegP1zKMzwHZmg_2MUS30hj3we/preview",
                        duration: "21m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1eguJTYPlyca6iEj4MeW4QYROh5qAdUN8/preview",
                        duration: "21m"
                    },

                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1n4itVSdBOzZB0y6fgYKtbEYXdt7QsO7n/preview",
                        duration: "21m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/11dYNo6m1F_HeTE-hVpeOWK8aT6Ue78cZ/preview",
                        duration: "21m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1vEBava42HA9LCQHVhIY5U0wRbyLQPXEd/preview",
                        duration: "21m"
                    },
                    {
                        ep: 27,
                        src: "https://drive.google.com/file/d/1-Ljjf5SGL1rdeFXMtttzOc4MwtSrcGR6/preview",
                        duration: "21m"
                    },
                    {
                        ep: 28,
                        src: "https://drive.google.com/file/d/1sy5N2sKoj_ZVR_JzhAL5_ZQ-m8oynwTW/preview",
                        duration: "21m"
                    },
                    {
                        ep: 29,
                        src: "https://drive.google.com/file/d/1mHyBNwnH23S5u0spEyMa_C6nJxLkOLoK/preview",
                        duration: "21m"
                    },
                    {
                        ep: 30,
                        src: "https://drive.google.com/file/d/1SewLOoZn54jAIcL8Bk45XBTz82RJmHQG/preview",
                        duration: "21m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1xqYXTuU_iHOD1QPYLhlIrDloZDM3a7BV/preview",
                        duration: "21m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1qNz6T08J5x5wDuIzO9U2T9HZt5huPO5g/preview",
                        duration: "21m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1bHnTny862mYt8s4aVTKKaPrJJvjaokNk/preview",
                        duration: "21m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1gtc_FEBVEhvEwq62K9ZoYwtubXbbmwMg/preview",
                        duration: "21m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/19iH1v53U1lOXzPROiIsXuqFn1_eGpiY1/preview",
                        duration: "21m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/161ruv7qAloKBNVS1BvGlTzRwCo7vYnxM/preview",
                        duration: "21m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1jlpV-9aMSSQI0ulZe5ZwWwwZKhAO3-8q/preview",
                        duration: "21m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1gJPi9S10p9S1nOnrLw3jFpxC4F7ei4aS/preview",
                        duration: "21m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1pogHAXgpsoYOvkRe-w9My9CY7UZ3jGau/preview",
                        duration: "21m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1NrFf-slF8jS8Pmp7VOsXJLoFDaEPiY8e/preview",
                        duration: "21m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1lE7twBqVo6QwAZml6DWjN8cAhh7T9J31/preview",
                        duration: "21m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/15tnLsvv19Tw1oyeCHPdtu5Tx_F1hjN1J/preview",
                        duration: "21m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/17GAX2JMyo4i_vbRPh9YekL-MZDRpssVv/preview",
                        duration: "21m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/15ZmeTHFLq2BrE6ZwdMeQMwTRy6JSde5S/preview",
                        duration: "21m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/12EYCckw4mduu1Xn0XOxPRnXgiT9ZUcsc/preview",
                        duration: "21m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1cZEc54JJe64ZhsWUywCLFaL_ZHobdcfj/preview",
                        duration: "21m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1xnATM-VshYfYo7XrJw6598Fv7MXT6JpS/preview",
                        duration: "21m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1susgoje-DgJUab77_0Nxb1Swbgmppk8k/preview",
                        duration: "21m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/19vIp3ddEqWxT-G2ZWhDTHkUMWTlLbliU/preview",
                        duration: "21m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1r4SS_R0VwFKR-uIcStaZiEX6khm2VAEv/preview",
                        duration: "21m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1Kzf9nM_z2l6dbHBTqKOeF3MhRFbGM5nK/preview",
                        duration: "21m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/14NQaxmCxzTynNqbzp6VpUXThw7G8a7nr/preview",
                        duration: "21m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1xJaFE_emYLjS4LIjzIEj7dnuuPMxdwsn/preview",
                        duration: "21m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1LpGTKZ3Op8RwzVeepHV5tUa1A0QpfjB2/preview",
                        duration: "21m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1E9aEv5E7MRwofkLS_WrQByrazRDmubpG/preview",
                        duration: "21m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1F9UR5gPzAxQQbnWjF8y5VZTCaU8y5ogW/preview",
                        duration: "21m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 86423,
        title: "Locke & Key",
        subtitle: "",
        description: "Após o assassinato do pai, três irmãos se mudam com a mãe para uma casa antiga onde descobrem chaves mágicas que revelam poderes e segredos.",
        genero: [gen.fantasia, agp.misterio, gen.drama, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/15xS_StPveKxK6B4neZbqtQNwkNvc0-HC/preview",
                        duration: "56m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1objk8FnWVIt-45wHjCmyD_AqXS-WlK9P/preview",
                        duration: "50m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/18hTV_N61iTnfFQUHSA1oWjFZPcQjRwfJ/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1QH62JKvOlGD0kW7Es_YHUBDnxHjvXhpi/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1MSZbeozSrKl6cgdQlmCKFpCO8wLvUCzo/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/17ZKdQyBSBChfguERSa1vS1rDJnzRyQ-b/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ysq9HS0u9RSB6-H-emtwa8OLiIJapgZp/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1r8fB2m-F9lIRnI6FUjuBbiLSC3i079NZ/preview",
                        duration: "48m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1W3nMQTrxZdXvPhglcquIDKijg7NMhKVs/preview",
                        duration: "49m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1DEjfuKVaxfubSK1fdtQaknBIDOPRK2Vz/preview",
                        duration: "40m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1H0RsSg6_7OcLQhomLOnfa3KSBdIpV4PK/preview",
                        duration: "53m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/11yLWKsCjkinjdiTV4OdeMyiBNLARornr/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1xww_dcoX445quapJ8nX91L6-w8Y_r87u/preview",
                        duration: "51m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1RV3zIcTvk8_Z0h4B9abfJ_9Q6mJW_aco/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1R-s9zIpEBnmzuKX3Iyql1CIe50OXvayK/preview",
                        duration: "52m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1GkchXh1ab1LDONphHgTcdGcdj0K7IZ8e/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/14EpogXKA5nUcoJJN_FED_UeCZXdhIL7r/preview",
                        duration: "46m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1KNQNMzhL7G4Cx3XCCOWiPjAZ9o4kFwQ4/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1EJZE2n-UwPafQj5ZkBlcT0tbaTfuF2ct/preview",
                        duration: "49m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1DZtcGHzdSf_mXCAOw6-9r56Fem3nGqcw/preview",
                        duration: "46m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1xMWyJKSm7Lz0avd_k7EIyQRKzsflYfg9/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1Lj14oiFp_VRL3GwC-Yk3uh5zNVQ2Y-HL/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1GABTQDbsOPQKKJ3m_wrZavHwNCOg-Oeo/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1_xxZMCg6qxixZZiJkCA5JVBD0jzqToFW/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1xeXFPncVumyyZF89iB-NBSgDuE1XSTVP/preview",
                        duration: "36m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1sEHZQd-RQuPNL8xQP1jwTHOoyiT9UZAH/preview",
                        duration: "34m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1k5a0H15-ewApuz38P-TTPC9mtWjY3MyC/preview",
                        duration: "35m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1b7-TazdD0VTzEERlmqWQP5rpbx3SgxPS/preview",
                        duration: "40m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 195868,
        title: "Gotham Knights",
        subtitle: "",
        description: "No rescaldo do assassinato de Bruce Wayne, seu filho adotivo rebelde forja uma aliança improvável com os filhos dos inimigos de Batman quando todos eles são enquadrados por matar o Cruzado Encapuzado.",
        genero: [gen.acao, gen.aventura, agp.dc, agp.hero, stm.hbo],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1EjztJWUi6I2aThzCWw8lpRhpsPu_bRKm/preview",
                        duration: "41m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1f8QRjfOOrYcioKBbepYwA6NgL0hf2xaQ/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1rMLqG9cRftem_lk2lVftY1NG-6LMHSGN/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1YGC4Ye9P7pHFBw6rDLyHipr92l--x5fE/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1dqTvQv8ILHVdPVfnYm47deveU-4aPbkg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1PjUWN41aVSCXOldqsqP2esYSCNuSPLC4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1s2DdpbBWJkcSwa1JGkS1F4QjvZ_Y2sX-/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Bc7_bMpVlGjAEyvYxUwFDf-IJTweFNI1/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1v0fmZ0TCHrZWwlVobf8tSkm_t-Fs0Jv2/preview",
                        duration: "41m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1T_hkUPaUgIKghJYTsap8Mumg7RluflrS/preview",
                        duration: "42m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/19PBjRHPlftFh9KQsod3ADmKCRbprdY77/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1hTA3qsuNeP9g8lgzZYTF_82hCPO7BcuV/preview",
                        duration: "42m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1bN4e5j9XH097xwuv9YtShrNYIOlKU-0h/preview",
                        duration: "42m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 153784,
        title: "Tá Tudo Certo",
        subtitle: "",
        description: "Esta é a história de Pedro, um jovem estudante de direito que sonha em ser uma estrela da música e que, por acaso, conhece Ana. Com ela, o caminho do sucesso parece possível, mas logo ele se encontra com o dilema de perseguir seu sonho de sucesso ou ter uma vida cheia de música e boas vibrações ao lado de Ana.",
        genero: [gen.comedia, gen.drama, gen.romance, stm.disney],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: "Nacional",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1MByXAvl_wb9A1H2euGt80G7kDL7xyifq/preview",
                        duration: "32m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1MN36xOHkQZpZUD0x2GpbE4cPnS6Al4Nk/preview",
                        duration: "27m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1MY9dlCQ1LmOHEjadwdZxknyq9xu7yDt0/preview",
                        duration: "34m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1MiUFkhWDH9ICSBJJ5WqdfJZPNj_41aDq/preview",
                        duration: "35m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 89901,
        title: "Dickinson",
        subtitle: "",
        description: "Poetisa. Filha. Completa rebelde. Ela está determinada a tornar-se a maior poetisa do mundo e superar os limites impostos pela sociedade e por sua família.",
        genero: [gen.comedia, gen.drama, stm.apple],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1VUQ7WEoA2P-FfcOXYVytMqFmsaRvhsAD/preview",
                        duration: "34m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1P0taKngLGi3S9tyMbzDXe2stO3dfyFEl/preview",
                        duration: "27m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1LuzMF7oigPA-YRBr2IT8z6gRJY2XqxeT/preview",
                        duration: "26m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1w9_ywxXvewMOxKr3dUZ6iKAsYbQdbBJ5/preview",
                        duration: "28m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Jjzll5Nj2fvjaChlVans3olkF5AX8JP1/preview",
                        duration: "28m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1bExFaybc8odNAnPph4yqsgCKbTwl-9hy/preview",
                        duration: "29m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ftLhzwteGbkJKr3-n5q-r7zvXH5psZLf/preview",
                        duration: "27m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/15ZeFldEgInc_FyHfJn5zBpdkhtgX-4KY/preview",
                        duration: "32m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1_tU2OfqQBNv2j1LVG0oNPdpEDiktZ8wp/preview",
                        duration: "32m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1BgPURRSNTGiEE2pHVDRgiNE_UdCC2-gz/preview",
                        duration: "30m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Ubh3i5T-sPChZo9yVKtAyKH0IeuExcaa/preview",
                        duration: "29m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10Jf4LbFzvtbZrjmjTDVNh7wjfDov3gWh/preview",
                        duration: "25m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Mot2-f8Nw3ttH6RB3NaxshCJDCGhVfin/preview",
                        duration: "26m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1sXlUe4CmlzNmG0qw_WEfK4I84qeU0m12/preview",
                        duration: "30m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1gza6GGgPFnpElg-o7StBpw9qwN0ifWY_/preview",
                        duration: "27m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Xogqdh17PoK076GhE1-TRJzcDYk1nnFc/preview",
                        duration: "29m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1_KKWUhd_M6wDBA_7wGBbQIjaEhlHIM-d/preview",
                        duration: "27m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1mb7ZIpymggfEn1toggyjBz2c2YL1JV6j/preview",
                        duration: "32m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1jkD-1qlOpaPLHQl83YeRqCnixYgHAZif/preview",
                        duration: "32m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1jCEkEAzoWZTsSv7o6oR5JCl6rYV2tCqc/preview",
                        duration: "27m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1DuxtQC6DlYJSm0OCa8A_j-4VPKyfZvbp/preview",
                        duration: "35m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1vCbfutWnkvQ5uP5RJIx5ykydWeCjdglk/preview",
                        duration: "27m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oDAGIzyWWI6xhv1TcMf3gOOjgHffWhdB/preview",
                        duration: "29m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1YJZN_R8CBTUIfBZk4eoT-YXpSbVHyzkt/preview",
                        duration: "29m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Y2tLc-MfDPURq8qis584XkTmk2Kp_oVk/preview",
                        duration: "34m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1aokRA1pn5MFYgiZiH_IeIqjsu3Y8B-CM/preview",
                        duration: "33m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1wQjoL-8bS4RWFFCrNz1a4_XxrT43S_9t/preview",
                        duration: "33m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1QkKIG3b5uCuFlZFhFL4Sz81X1BR77qq9/preview",
                        duration: "34m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1QqzWNodi-ZhbC_fCpbdzLGazFg4m87QJ/preview",
                        duration: "32m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1W6kagzxIuTuX-jLnY1wOY9vzrg_i7Kaa/preview",
                        duration: "33m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 221300,
        title: "Fubar",
        subtitle: "",
        description: "Um agente da CIA prestes a se aposentar descobre um segredo de família e precisa desempenhar uma última (e inesperada) missão.",
        genero: [gen.acao, gen.aventura, gen.comedia, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1sTrk4AsliChcrXf0CvsD-smF_tPQVO-G/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1xK6zjy_zIjqFoR3pEC7mTR0vaX1NSB3V/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1vkh1I5FACOEnaY0ZBNOStSjuvt1lRmVR/preview",
                        duration: "53m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1UiWb20kfYf-rd2QGdiEi70-AmXSRgBhM/preview",
                        duration: "55m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1oYV339IdpIv6AhZzI0Fjih6sqoeFeW4r/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1_j4vS7ypl0ld5nSlGBu_23u9DsnlS0qe/preview",
                        duration: "58m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-07nPK9gOL4M7ayqH9KNfKwz2jzwVYkc/preview",
                        duration: "50m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1si_s538zSpchnq0ia9kM_A-rpZ3tZ5l5/preview",
                        duration: "44m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 127529,
        title: "Cães de Caça",
        subtitle: "",
        description: "Dois jovens boxeadores se juntam a um agiota bonzinho para derrotar um concorrente que se aproveita das pessoas mais vulneráveis.",
        genero: [gen.drama, gen.acao, agp.korean, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1wFxvLKps0m3mxzbreeozTh0N-yrYkiqR/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1mxYHjOKJx_aR4dno3vf3WD2di9rHjKdS/preview",
                        duration: "01h 03m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1eTcyhOqiMzjcoKeedVt0jkhzg0T5RBlx/preview",
                        duration: "58m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/16LpXpEhfQ9ruUeFhfZ9C0zT9EpHO_m4C/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1AFJWlKtE4JMcXRYjQuw5MZVe2QjoQuX4/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1rVNf39TxDhvlVa9PJjyMxjrXiB0Mds-B/preview",
                        duration: "58m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Txag0krGCmzMKcqT6oZr2n5cYGMw3SYh/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Oyc7paUKLHKIsLxFcg5gczXhX5mmXsBE/preview",
                        duration: "01h 14m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 106379,
        title: "Fallout",
        subtitle: "",
        description: "Baseada em um dos maiores jogos de video game de todos os tempos, Fallout é uma história que demonstra os abastados e os desprivilegiados em um mundo em que praticamente não sobrou mais nada. 200 anos após o apocalipse, os nobres residentes de abrigos de luxo são forçados a retornar ao universo incrivelmente complexo, alegremente estranho e altamente violento que os aguarda na superfície.",
        genero: [gen.acao, gen.ficcao, stm.prime],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/18QNLKfrZj9gzU8ItxGgrzNVKG4boGLlo/preview",
                        duration: "01h 14m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1kO_QKn1QCPDP0MsqvidXY9BKwnAZcszD/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1eMnQWfqdzOhy3AiI_YAJL97EE5M_ZMJz/preview",
                        duration: "57m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1EGXxFAU6By_jDQPG0nkspK5jTP0JfmdK/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1uf0hkWZY1QtI-Lh90GqJFGKW3N4LE75A/preview",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1ef_RRLlhnHS2iGAGttRXSTmd2cVKLaBy/preview",
                        duration: "01h"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1IhWimXjaY_rs2kJrHDyboqdGWLEB8l92/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1ZwBcemudKlxyPw_Xggb2bxWoZ4kH6pe1/preview",
                        duration: "01h 02m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 108545,
        title: "O Problema dos 3 Corpos",
        subtitle: "",
        description: "Um grupo de cientistas faz descobertas revolucionárias ao longo das décadas. Ao mesmo tempo, as leis da ciência começam a cair por terra.",
        genero: [gen.drama, agp.misterio, gen.ficcao, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1I12iKiJiTGEuPVhrrq_dp6QCCCIhDmL7/preview",
                        duration: "01h"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1SdSUuCr89Og-ho2GFLJrJBOB3-NQWJEN/preview",
                        duration: "01h 03m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1F9WufMYfmbd6vQeXw3qfMwX0m7GGzG8V/preview",
                        duration: "53m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1eDHFKOokTgWJ2xyhMUqdAyrvzTmpWc3S/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1BwOg1h96kFEe3EcRaQVOWti21f34qasC/preview",
                        duration: "57m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1nShadBFTliP3a4422mT2h1vVCRlDt_XG/preview",
                        duration: "48m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1e6kARBI_g3SgQakJtyVDW9_6L_QBYBEZ/preview",
                        duration: "58m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1BgOsK1DUAlgMwkgqonA-1AeCN7nD1ppd/preview",
                        duration: "56m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 124800,
        title: "Amor e Morte",
        subtitle: "",
        description: "A história real de Candy e Pat Montgomery e Betty e Allan Gore, dois casais que frequentam a igreja e vivem uma vida simples no Texas… até que uma traição faz alguém pegar um machado.",
        genero: [agp.crime, gen.drama, stm.hbo],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ye8FuDQ-g78A60Z37wwRAL5qB82DSWIV/preview",
                        duration: "56m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1jEtoUfEqeKi5SbfFP0NtJQh1ncnjo5g_/preview",
                        duration: "54m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1rdlMG5B9ZUL2vAUyerSiEpJy0z8GpKtP/preview",
                        duration: "58m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1EE-8yzEYFcDdA5i3v-AVQCV65Vvyl9Yk/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1BrQ50071Yr4WGEBmeLYups_jb1HSJ24N/preview",
                        duration: "52m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1B0ux8CNPGowWOd6ryK_Qp3L4T88zjanY/preview",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1yZ-0j73HxMQUQ77lmRyPQniIWu2LwV1P/preview",
                        duration: "57m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 202284,
        title: "Ninja Kamui",
        subtitle: "",
        description: "Um ex-membro de um clã ninja desistiu para viver uma vida tranquila com sua esposa e filho. Uma noite, sua família morre após ser atacada por uma organização misteriosa. O homem é torturado pelas consequências.",
        genero: [gen.animacao, gen.acao, stm.hbo],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10F4T7kwRlauZRoa7_2ch-Pr46ankk_Y_/preview",
                        duration: "23m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1vOEq3JPVGs0JSfg32hVXWDcHSeDvpDjz/preview",
                        duration: "23m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/16VqbFCkIqGzwx5dKjrIFw93ekrDOJTYC/preview",
                        duration: "23m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1pcyemEMPGX24JeENi55W3q1Rpy-6j-lJ/preview",
                        duration: "23m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ldlaHSAbn6WBjpFAXMJw5545sZgRl6Gx/preview",
                        duration: "23m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1xzN-4OukQf1_z-GOjYwGbAUCRao9cwlE/preview",
                        duration: "23m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-su6ZnZdI21wiUOx88EwvpAzzGiqTmNs/preview",
                        duration: "23m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/103xLVu7pzCXEFbOhvyaNywxnhT9G4m96/preview",
                        duration: "23m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1JoX_XZMnly2sF7CBGnotFFx2qEGqjFkl/preview",
                        duration: "23m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1QNHvsYrknu4EOllSHjj2tdW6T6BXzXF1/preview",
                        duration: "23m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1TXqHDsHGdQq_RBqlAPAf3Bsn3sfvdC0s/preview",
                        duration: "23m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1TYA0hUXrMKtSMbspP-bAcCpkSEl6w7JY/preview",
                        duration: "23m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1Th4q0zvwhEzYg-aEuqSQ_K-ocSGtXZYv/preview",
                        duration: "23m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 103540,
        title: "Percy Jackson e Os Olimpianos",
        subtitle: "",
        description: "Percy Jackson terá uma missão perigosa. Enquanto enfrenta monstros e engana deuses!",
        genero: [gen.aventura, gen.fantasia, gen.drama],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Xw5BXVTCqaDwGThD0GiYT32V-ylTPlEC/preview",
                        duration: "37m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1VoqRoF1gWVDOQOjgPX2EziBWSkRfcxIi/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1WS2a9rdv1GpDiVvsGwXFtBlIHSaZ7V_y/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1XU4rF5myZbu8XhdkFvFBNy1Zao5zyFm0/preview",
                        duration: "32m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1unrniOIHzG2KW2fg1qlTUATSVeeghr0h/preview",
                        duration: "39m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/12yMdFsj08Y8VcDnfUgp6tPqiVlMYuy2I/preview",
                        duration: "32m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1JiAKukvuTp0ZnvtLkIsO1d0A8t81RcQR/preview",
                        duration: "40m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Waj4cAeHmkqgCTX0BiSzapRlJdPkehdZ/preview",
                        duration: "41m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 67178,
        title: "O Justiceiro",
        subtitle: "",
        description: "O ex-marine Frank Castle só quer punir os criminosos responsáveis pela morte da sua família, mas torna-se alvo de uma conspiração militar.",
        genero: [gen.acao, gen.drama, agp.crime, agp.marvel, stm.netflix],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1xeJX0ZFNSdteHubkknfD7xZqC-UdDbgt/preview",
                        duration: "51m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1xzxn74P3tRty6ZgF7iTr9pNG2tverxaY/preview",
                        duration: "57m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1yRfr99n3yGPzEzq5257zvVT9308CodVg/preview",
                        duration: "57m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ymAlm0O3AexSSfH9ni8SS85AD4Dkj05w/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1z97EymAC2YeKQlN0_YHMpenFliCLs1kb/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1zOGqr4BvZRMwY0aC1eTcP4M6WThux7x5/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1zQ9gEC_ZSc4MzbFtrtV1zSNkRRJfX8Tc/preview",
                        duration: "49m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/100XGjApB9dBMGTIBW6_9XZHBRaVHyjQB/preview",
                        duration: "53m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1zUUG0UXRX-a9Q3rHhYJd8d6XKhJBKhvY/preview",
                        duration: "53m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1zlrYcFkAUAxFVFvpD8BfY3MH9YMGihQw/preview",
                        duration: "49m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1zmoON4vKwL6LrwQu2SNAUZzxD6mkJu_4/preview",
                        duration: "52m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1qygqVZWqUGQEeNZxZaI-f6ouuy0vIMz2/preview",
                        duration: "51m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1-4PBBYIqALWd-gSybnUt09zCWeUCFbEH/preview",
                        duration: "55m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 114472,
        title: "Invasão Secreta",
        subtitle: "",
        description: "Nick Fury descobre que uma facção de metamorfos Skrulls pretende invadir a Terra. Fury se junta a aliados incluindo Everett Ross, Maria Hill e o Skrull Talos, que estava vivendo na Terra. Juntos eles correm contra o tempo para impedir a invasão Skrull iminente e salvar a humanidade.",
        genero: [gen.acao, gen.drama, gen.ficcao, agp.marvel],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1vEQVrs45ZYc3XV76t3ET2DnGTGJWgb9v/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1wOoEog2qN2vKAE1LL9746sJKIIuUj_xq/preview",
                        duration: "55m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1wNIkE3BYjomM4ik5Gp3KkdGQDuh8EBDO/preview",
                        duration: "41m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1N9frK7eIzTFD7lPABPliTvcv-0K2W88o/preview",
                        duration: "35m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1nLyMDVdsLNGaebCh2SDpyaVKEpKxhf4g/preview",
                        duration: "36m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1bE1N71b9GxBaPpNSprZd11-4Jtvm5pWg/preview",
                        duration: "35m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 4607,
        title: "Lost",
        subtitle: "",
        description: "Os sobreviventes de um voo que estava milhas fora do curso caem em uma ilha que abriga um sistema de segurança monstruoso, uma série de abrigos subterrâneos e um grupo de sobrevivencialistas violentos escondidos nas sombras.",
        genero: [gen.suspense, gen.drama, agp.misterio],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1H_PXqNl10t_P_Wn-XykuzCL2O3oKXhKH/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1wsavPnQpdUDU0AvEniYbs1I_VzO96P8T/preview",
                        duration: "40m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/15WcTb8bw3GZHqhPB_N3e35s8sEE6GOmr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1YF_WnfZVmeN_dCaIcKpwWmE0D8_TDA3t/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1H_K4fCgkwDsc0E9yUtm283wbi6GlsuTz/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/18-1Ugp_ZSixsRhR-dyJN5mOuY5BTmlRr/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1WlgVGGe-1LZrl03Rlskx3VW0xzvVK_iK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1fyfQfvrcMebB9WD9Hxl0J-UPEg2TCuXl/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1LRR4AHewKN_IupY5SU4mBAU6Wq4ks4MZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/12-qFSwIzmu4whabIs6tLFvtXfcNINjEN/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1P9AzZ1teeyZ6awqRQKR6V895afLK3iGx/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/15B6cFFEZo7bTyiTsoODlAm7k-78XjcIT/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1S17tzAYfGXeucxsOhR2Nz75sZLVgI9A7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1zN6cOH7v3qV_pR3g-SCJNHPcXlSEssFZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1elLLR3MXkBluVLaO9yL17a9D2c-qXcDA/preview",
                        duration: "42m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/14tONfKTEm_txmqV0sRFLnzUKvrOhJ6Bu/preview",
                        duration: "42m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1viuwx2hWhiT6UWx8nsWeahrT8DKvg_RY/preview",
                        duration: "42m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1ijSobF_UOvsooRbxOgsIM7-yyRkWNOx0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1n-KI8jgReLjME3epo-D4lx426aCtvZxt/preview",
                        duration: "42m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1N8wHpvbv3RXdyC4hfm8AQ7obgbEJ7UkF/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1WeeA4kX5Vg6Ec5jP7nHq4yhgUKaGP4CG/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1wST8aIAsu-WLf2BoxqfdmEP3W5PE5Cub/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/17eZG5oRaO0zRisXirsc5Wm7-5NgHLctq/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1_QoJFsHkoY6kwyZmESirdRUtYrd0c6LM/preview",
                        duration: "43m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1I3RZzlVOTZZVBllC73FMb41NLgHCXJNj/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1YGRPmvjffRnGaXmRmBD1bHTJbcnhmewa/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1oRaFmGZr300wtaV4bnTsq4gUsvTyJKg_/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Dkqj3L-WBratI10LGnocGq6W-B7aPAtb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1zFR13sSFygahRyGDuFL6jCwMTWR9DBef/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ejA3erSop8L-rmqFKcTkqrGOjPs6g4HE/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1ZXfUKTi7lr9TWFn7RnRpgj-rFI2o6I09/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/13pR4Zjgb9oPNgxTEBYxO2TlXZBYYMCdN/preview",
                        duration: "46m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1DVHoMb-mS8Xh3WDxexatbJxBKzR-PHGo/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1qg1rjGA5xFyTNKVQ0nlM8DAlq8eqAxgo/preview",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/14n0XVxlWVCe90i-KDpCgi9NzgXg6RdZC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1btjWzzzdOtCdn3o-zR7qs_6-dqMEx5EY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1h887QQSetDqlfJ4Ab8l6APmZ8DR6TuPF/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/14iFYCT3eMcIShCcCxRAJc5atc8VNTNHX/preview",
                        duration: "44m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1JykQ5S0j9BYlCU4UOPALw7ZZsbevhHfI/preview",
                        duration: "44m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1oWG9ZNo3Y2zDWYDbE-bLD9RsnlGXhZSS/preview",
                        duration: "46m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1ZQkuYetaPt4qDqRdra__wwNlr-T87fc0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1gIY009-s6sx7Dp8qjVtnrfo3YJ0KxJuc/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1OGe6NCWimR75IIqLJtr89KN28A4EUwF9/preview",
                        duration: "46m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1Ip1Paa1ip1z-te_SZ88eEcRqOHApWZzW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1bkX_CVC9-ALZnkCc-BIDPFBX73Q9oVr1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1NqHyXxi6wxauGlk-Tb2G1hoWtEDcm8Is/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1ykYrNUfcNuvIHOgz4HwzVkOs5UmozMbJ/preview",
                        duration: "45m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1OUCH4yh13nxiP-XR39locrFNi6CrZ_KI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1XVIUIaOLJElfoSdhTezfNpR_lOfH4dsG/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1eEUFtFFp71r2GdQNR3F_cBKVKkmp_Y0s/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ZeYDNrRLJe6rs0mQlTufP82RurNX3rOk/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1gy_ybbodxXrtt_pr70BB2_D11xDl36DG/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Zh7L5rvVDhgsalj4RLJ-uRDdyv3JFKt1/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16maP5P_atWf4jyjK0X9wlSjaaHwWRrGU/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1z1-2I_7lNwv9Upzpocyx_hDkydsj598M/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1x3hkRg2FDGU2-DlZyOs4Y8ltZaOvXxIk/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Q9wg3It1Q4MN1dEQck96bK_qjS3oZoWZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1DuuQWRqyb4jyRb8eQ_d1awQjvodsM-r_/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1FsD9ZqeqLDbgRTwzuAQoUGcOb0VMg3ql/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1huSl39Ts_coEN8WJNlg-_bTDrf6MBCRW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1VDC39F5Hb-YVL97JPgX6X__CZ_4X4sY4/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1eCwhI3j9aYD6iwasx2fjtUPugNlVmoQK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1kWp3A3sR9mIPHOgA3biW9AOsy_yvYAcK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1EdM6PGcTAOviYf8kSKgpsGbouxP4vtFI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/14Ybo-qiCjAOHp2G6BlQyeNYOSp23PPmT/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1mwduA-K9tyO8dVEtfN29YuPR1TNMP9gY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1DwTkNTXopbxAcn5HXPg3_O0wz5sRGSUi/preview",
                        duration: "43m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1iiZO1qUUYUsfy06zG_lHDFt1x4paQXFC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1pzJ5HahicNH5Tp4okDpL58y0vQ72FCGK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1kFaE4mo6hlqDiFEY0Ovw8VXNkWcLyyXh/preview",
                        duration: "43m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1jIXJKE_9nyidTet5I77mx0leaThnkUwZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1WY7UEG8nZ3l-VHMPZGEUR5fJNgmXyZ8L/preview",
                        duration: "43m"
                    },

                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1D1KCsvOwiYr5ymvCA2unI27efk1kI_GB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1G6ST_KwlEZAz9m4UZy4lJR6s3407_rtm/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1L7GlEe_jgGW_4AK_tQEJEmx3tTBUrlOk/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1CPJMHcuofwcIEg-WZMwLgSqrZKiPA3s-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1CC1wo9DmvreQS0quVdvgrNyTRRyAzVtW/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/15Z28WuW4RP2JTuu-uVhOWzn033GueFSU/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1MaEt6WR75T11W_sqXFHiRIKluFeHAfT7/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1GN0EXmQZKzXeGuw5EQ0UxHE8Sd8y0nfY/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1gTzst4xDvjnfBTojZQB4mJdejV5Ttp9w/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1FBnJpotVN3rJaClZdUa7ScTlA4i6ORr6/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1mO-on42vcuxQJ2u1HmO2tt4n6BjdirGB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/16b4Q6lTUIvbdjKZZqJA8GSMVJpM_Q1Bi/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/18tct8T1-rsaWyaL3OaN00c-E7hmO1Eo0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1FdErYqxsaA9sGsyq4GJkoDGUhlIlsLcw/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ZHbO2Qf_iPoA1cmWB3XtZauB0tBB49QZ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1By_JI9iwzucDb6ujN5W1b-QgdpC-JtzN/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1oTv-Q96RWpx_6MIVoyIwyOM5y70vYmfp/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1IxC7bMLZIkSEKbSO4Or808I2tnNkZR4U/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Vr8G7CyarfXIkUWEqD1bbdCib_bhpRvT/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1P3fxvuW4dDRikgjrJoyZWhZVs8At05Fz/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/16zHdRWC1ISvF-Cwt24JfdYBka1zae-h6/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1UOOgdJa69hHxBy6Aw-dSTA0iiELA0I-e/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1NF5BRzoEpbSnfpbdkV9JlRnnd6H05ll8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1Qv3Ge2vYZtyiilxob41G8HF2pMES9XQr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/19ytUhLAMF4z85Qt-_xit7X5jAvF6OjyP/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1x4PUQ3fnULu9bZG4juRqlZ21eC3N5hTm/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/17yc4nnw4Rg5jy8nLLpTziJYa1ZX8tKX-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1kirqzzo0uums_DcOiQzKtbpBXclNdK9u/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1NmEXPx-54yxvQfpwdF8rS9J6kz_a9l6L/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1Alk1wyZgD93X_H5O7BviVJOkKjfSSUaI/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1uGKsbq5h7_9aLonGY1IphHT5bVsflaVV/preview",
                        duration: "43m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1FlbYK7kGCnuru_5Snf5ZPt_sZBICz5nU/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ZN9ETpxkQBiiJZrkWD5cru2kDY6G1QoE/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1WC5gGvqY1ZxAlolTIACEGhG1PgkykYX-/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1xfQgRisFXgc9GHKngkWS8-cuH1UOlF4R/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1GIa1b1I_3PQrVvvXt5XRxmfI9wJv46EQ/preview",
                        duration: "43m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1tLioMS3CGamrNw-5gGt51DsV268AHnTV/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1iO6CndGHerfY1a-pZRdi8ToEEO-lCiy0/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1JhUMMJ-c0r03m2E1_hn_f0BVn7rigff8/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/17Nfrn_wCAE7eCrcjw9ODsYkGvRT5yf4d/preview",
                        duration: "43m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1jr4XfLMcFs4ostiwBzbguffGRrYUz7N_/preview",
                        duration: "43m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1RIjAtDhMYKl0eVgNhetdq5XsyFvayCHe/preview",
                        duration: "43m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/15ZhJ2ui1LwepBqlTDCwTqPaKuSCO2upx/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1ABdN7A57R7asjaLqurpTKLUzClwjqgWc/preview",
                        duration: "43m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1hof_EuHub_Nxb3B8PCfZZ_9U7Ao4QtSt/preview",
                        duration: "43m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1WdRHlJWx2HKIMJdrD2vHdQ1agpV8okqs/preview",
                        duration: "43m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1HBFVWYRJ7qfb3iF0w9MXmv4k7ptU8isb/preview",
                        duration: "43m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1DcKw2JCTSOlfBjmMh57wy98496u3jY2N/preview",
                        duration: "43m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/140C9_1PZU4PFnxXMxmGaoSyIjX4W3Jno/preview",
                        duration: "43m"
                    },
                ]
            },
        ]
    },

    {
        background: background,
        overlay: overlay,
        tmdbID: 87739,
        title: "O Gambito da Rainha",
        subtitle: "",
        description: "Durante a Guerra Fria, em um orfanato do Kentucky, uma garota prodígio do xadrez luta contra o vício para se tornar a número um do mundo.",
        genero: [gen.drama, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1rEmfxJqDTD-T0sLRKLQSy2J5G75XWHFe/preview",
                        duration: "59m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1gMUfXI2WHrBFNAZ_vMASOmHNh3WQcu8b/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1RqzYZ36TMsRDqvlRsrVQFK8c1rrswfMy/preview",
                        duration: "46m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ogpPO6XbM1_xFcdDmv6W2QD0su-DRZwo/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1T3BiBQfNJJTED_z1yBcR7dfwokU-02n2/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FX3djm08eTZEc1ZSDt8_M4MPPKVTdifM/preview",
                        duration: "01h"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/14cxwkDOvvmb3zOlP69UDFLI68LuuCEZD/preview",
                        duration: "01h 07m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 48891,
        title: "Brooklyn Nine Nine",
        subtitle: "",
        description: "O brilhante e imaturo detetive Jake Peralta precisa aprender a seguir as regras e trabalhar em equipe quando um capitão exigente assume o comando de seu esquadrão.",
        genero: [gen.comedia, agp.crime],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1HvP2tjA4bAVbR6XYkQ4LQuZ98Rz0_OA0/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-L1kyH00Z2ZauqIPEmg2us58IlDc-UyL/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1FBGi9r6Vq-4jwS1xaspTCKkuW_WAR5WA/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1DMAn1_PqPJN_Bw6_KuU5C2mJIpvZhsRh/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1suiUqJ9xAjZhBx5W2xD-r_2bpyNoOlId/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-Ttpm2AycjxO0auV_c3mE4RXiIPrIsf-/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1RNuk3UZbh3iuOADak1Dq1pvPotsQVV7M/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1IiAPKVhCafLeKUzBmvUx4LUQIfMUU8H-/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1q3FZ9IweoNl2qyy7NfunRAq4JUERs9A0/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1llKkWsKhgpbOW6CSOOMRzASsK1UEZ9sJ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1bSME-3b-gdr_xJytrw7a-rmZ9kN5Xjt4/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1RHLrnU-FLDqp7hy6zmCuBbQePq3mrU-f/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1krfcQB_Ijq7BOtdUzRrqHFxLMbunk-R3/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1hps5J6HnASq7A-ZAUfYjCxDdoMsU_Xho/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1i-5PIlxsX_LAmGqSfTYvtCt0Rgg5lxEi/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1-DlJb2zaUVmN9IwZhFx7LicpKAH4Jp6o/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1EvrXcpS3xlpBFYoiSMsUHJbk8xLic5DE/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1A6S1N02D69vD0kG50ytcN3P2o31GwpOY/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1M6OjwgBTcKhn0xkTXkOp2l7r3rJz3OMo/preview",
                        duration: "22m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/16bMbhCyEVueLvXak8FyQ8l5aEqp4h-_s/preview",
                        duration: "22m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1kAwDZFqdPYUWZFOhSEacHMBnfbhlLnUw/preview",
                        duration: "22m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1fNEjr6NdVAKuJhTx6jDluRhIq7fBmRlk/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1iNHb_0Jk7BoM7n5cm_jGMm-ZDkzjdXO4/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/18LTDOXmby_jOaoB4r_kfEF4OQy_te-TY/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1S6H_lRtw_or37_--4gLyHuNftIqiJkFx/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1WJ0e4Lm57naBFNmxFjBnunE9qPYY_JTm/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/14hXxAhWoVRk5EjXd264Q0Xt0UlZhM15l/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1hfDkr1kyZWRDB4SHe1WcgsPwSmyCai1h/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1ffeZENwzJ8Q66bIKC4D179Vlmt3b8nxp/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1PU5Qlqt65CpDnPvFuREXsfWEw8kFRlkg/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1WoJXeE8clC_KJeNiAGj88awb0QkJS3VI/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1DS8vRz30nhJK-B2ZJMdSBEL_ztxaEHKv/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1868Npufay0a_qR_47arjfBS4BlsZSBbf/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1MJdgISln34rKYk186Q3RC-q9Lgaq4YKo/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1T__FtPcXDYGBW1b9sATk8vVoRTaRQvIE/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1LkYNA8vhHie0GqnrrIkrVJozgnNbL3pf/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1VPxWrvzLtDKcqYferXuP18qA16EyDTvm/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1Q46XCn6HVS2tRAgIUEk1ovjPuzaK7HRk/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1_mgETg1TqFrsAEtkvTluBND-dEi1BIYN/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1jN7P9WY8VR577TarSOBpjjNGeG3rHYOc/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1TrvlGYqGAEYVWiQBbN6-AfvPsxqTd8-j/preview",
                        duration: "22m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1g3W_Ivt1MupD3gXRh0qoD0Yd37HQ5YIT/preview",
                        duration: "22m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/182U95GyFvCc4FyRMjJ2VSFgTBLFN4Syx/preview",
                        duration: "22m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1Bg2xSssSQ1keZleXrSTN51H9HtMoxtJi/preview",
                        duration: "22m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1NJnly14Dva1FajqTkIBR4xw-3eGs1V9l/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1672qOAvJlrhUkvLU3c2FzxXQG7whoxHj/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1DrPH_OZHlKDX1uxRVVNLsG_0JKymlhgM/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1LnTubQDW4omK_9E4gbie722LRZwpKW9j/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1PgP_BauOca57KmL0d5sRmuKTcKOcQTjL/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1V9gmvsVgrX07IpD9e4PyzB5ySp1Rox7C/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1EaHZ0zZxEq31rhdgd3pSCYsaM-Ijvf9V/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Zv-M5ONC_e8-mBw17za3JMoBg9K5anPT/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1BW2DuNkV-P6FCqOlpDPitX2O2w2ODilo/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1GBBpcqr_9X9263l-8CPwEdQ2ef5OSlYQ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1su050mL-sMVLBXn0T7hmhTruF7cLCuP2/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1-QHYapbuHX4eAJJU1RNWZqx5qqbrea4e/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1A2odLvCTJOr9E6eDWM6vfpG2Nw4_duD1/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/12N-hKcFEFU5UgeRct7nje_31OFkR35lE/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1Sc_ePpQHkIt_wTdpmUEsAbpxZWMbdbL6/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/13b_pZIUd1_hdSo7_bSep39VyKb7r-LF2/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1f7FaEW8wpPro0YAYXlcVmbvWis9J4mVw/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1yKZB8ngj6w4Zq5EUgtBPetdIZ6DXekSi/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1atxFKxekXO2YLmNmB07z9IlABJEvU4Tb/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1GdgNwa6b7tLyzT-5XZ78KPishBYPJEqh/preview",
                        duration: "22m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1eILw-m2SZmwKoJrwsFiqNYb-HQaYoPJq/preview",
                        duration: "22m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/14tWH_aC-WlR8N60IFdojPETgvjQxCx_q/preview",
                        duration: "22m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1k5e5gfV4VozbQqbyiEPeMIEVNL3snn4O/preview",
                        duration: "22m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1wWZFE3vP-k7GUuWaVitK1geSw-HAsXZ5/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1oclJvPggB16oFt3zIsKSZ8f4KyzMDaQs/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1yKqAVcsspGdBRCQ4eSsXclopSp-G_z0K/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1c7_jaQoV0zsD5jVpopSqXSh4iA5nFs9Y/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1KkqyCtJtyJkrzlhuuqiUXeTN3kmPyYaF/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1wLWsrQDl14RQ5ES3x4Oa24S0G0Mluy4F/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1_rKmuluZlgcsR6iySmHRgm0eV5g3W74E/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1W_mZyXWNUIosQfFJXbwgwMy2J6jRl95N/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1idaaCBgyMn0IRfcAZsKWXkwdoJTtWE_x/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1shcRtTgw3YqLRUzbVHiHvv1kpWFafl_J/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1kJyIcTtedEvMgrglfESOThfh-gI-Wuj8/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1x3q0_z5FMiZHNz_bpsvDY0Q2EgU2Vrip/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1PKh97KBxncD3Mg61BSNXBUzxcHJvTkCi/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1KTLR3Dv9zbuLcswT-iVxIFFLqwyXw6FQ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1WnoaMfpDpBIUTA95Bnh-xWu6wIKYK2Q7/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1mg06ik3HdeD77zOWfc8VyGZPKkFCwD4A/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1C-NLTCjLJvJoKlGczmlxnVLA0umuiPQ4/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1EBQe4Tpf-zFnFPvvGWhA23RO9lpyxM1G/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1mBRX6Gk5dSJI6Mv_dOrcxlNE6cO3CxW2/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/17vu47pmSnCg1RcmQ107cF8Wn-W8VBEJJ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/17vu47pmSnCg1RcmQ107cF8Wn-W8VBEJJ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1hWZ2jGxViohS6n30anNwWuSUZiqHFQ26/preview",
                        duration: "22m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1-HjOh2OXNE_7Jcam8t6jQwsE33DUHXBl/preview",
                        duration: "22m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1Qze4LwQJ0yFcd61c1_iI1XIXzU0skKC2/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1bIZXqJQnXfs5AVtww7h8aTCpa5yYXMiJ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1Qx-Rpirjq1_CS1RG9rwFPLalCaLdtV_I/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1p07rsMnzPH7ZOwC1s0AljePx1OWFchfv/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1FeEJg1cT3s3FQ0FDOo604i1YT2raIblo/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1dymFEaQNLNZEKMFL0eppDdWDSpb4Lz_T/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FvLYf0mUMkVim-ROyLZOK8PycjdviM9N/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1V1AZi79kkGCQTPESIEoaU8AHdBtXORdh/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1wiSGbsEQTfzw57-Cagd54ocxdiRbzHgl/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/12TcEtpQ9_TDZbxbiRiy_iScfqs92DVhn/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/11autM1KuVmSGmUTj_EYl8-opfLF8zmjS/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1ZbkinrH2SznWDO7gdfOtQvjtPdIQiQIJ/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/11D8XEaEOuurkbp-HekFHjeykZ7Cw4DXD/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1ssiC8GSv_eu6uqCtGS3h6MyjsmpdRQEM/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1Ccd4uILi8VHRigfWFWkR05tre3I1TgSY/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1Wk5P0qxyn0NZWbNts_PkbYAlVzw4ljM0/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1FSetOfuVtwREXnTqi2KFG4zcr5iG4vck/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1kuSX_qmLT-0Z0n-gpC3FQDUlV54wOf4W/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/17fAHR4SWs2y8eu1dnEfKpCx8n2fnOmLG/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1U3phq3U1yJZGiLKRW47B6id28dpPxf6i/preview",
                        duration: "22m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1Ia2q2p2vo8QgKJ1PyuZd7HFmQFYCpirm/preview",
                        duration: "22m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1uu-DSMV5Ebx8vy-u3-BHDPEuhIbKXd_8/preview",
                        duration: "22m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1VjHS5tr9gwaOFPcE5Qo_-BL3gyrY3yPd/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Z3V6o-BzHq2R5abppM5wEXivt0KydRjy/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1gdAXIBolGKEZDJxdL9p04TQbQ0Epcqti/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1X49m93rdYbwuOot7RpMErE5h2p7NiXaV/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1KuhN8NeheSaGCRhRGEbIhzSnHOiK0JOE/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1rcoooxDDGYxHaEAKzU-Ijqj5VMLxO9Oy/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Rz19wBeOIas-pEywgexJ3jb_pyT9pbLS/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1GPnxEn45RXP9daFrJzvHmx2PxmMfLInL/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1O9OoTsO_ixXv6ayZjITJLzBn-hhpY7MV/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1JaWHmKqozFzaueHPMTtxlZ--NBANV74M/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1o2xibmX9b2WeUgf7nhmDlgW_ovkIgYxo/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1u_yFtXnGDPXA7wMRJzBJJm-ye9UY6Chx/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1ILQOuAjTwjQxA8rVphEzEZniUTFIjHJi/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1RoL9rW4i7jJCzII1JRFIG2TIf40KBImw/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1PiRtDkH3xZemd1_sbfaSfdZtvuocy54o/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1ntUjj_U0cJ_eUNUiHUSU-Zvzg69ZuPze/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1U1WNRG7FpR4mmFAwOHfvxlI5CnXT0v4i/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1DHJkhMIxrjygERXvkcQBJQPHdUS83Qbg/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1ebaAlCObRfjgiLi77hDcZu3tMxjlyt42/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 7,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1jcZrZU8F4RHUbgAs6I0M2tfs14AuNt4J/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1k9eKPIpyZ4iuo6k62vzqcx-VF314ezmI/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1M0MhURw4AzXyTiqYUhUmrZ5I5CRecktR/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1UOIDfXyfPVCQNGFqHaTv_PBoT23Qxjpa/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1n_dg7OV8jxmiBplnzbfsWCvg2K9p_AiD/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1oIG-UNyQc89Z2W78x5iZSfhjzgNbGU4-/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1_xgf5TbDmaH4XqHPHqCgU8RvcpYeM1-n/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/17KuJj2JCZ3k4iZ2x7OemKOm5u0c-xv7A/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1OOf0XBpfX8s1xzR-jWILWvo-5O-9LO1N/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1sl6BfjVYg_Rh_rpos8hCxJ6_bC6nbgob/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1p9zZ5lEzwjbamFUmzQavMybSomCsgrLP/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1ZNaXDhqbX5b5lEGuOMfejVoTqd3tLq6e/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1vfONiL1hnwGHWVwH3BM6CgYSev3l8oe5/preview",
                        duration: "22m"
                    },
                ]
            },
            {
                s: 8,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1B9fXy5Oflc3R-6LYm9yDS6AbvGHshMB9/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1qqlJRbIrqhCheCF5UINDIFrehw-3kt-E/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1gmTt_GsLkEC0-7LAgIYO87u6sqthgRE8/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1BN-oZQyAjmiE0oBkMbOy8x9C3mO6Srvr/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1vO1gzWCL-tV9l9mqWzXhYfjlIjtiFgqO/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1X-UwItTbMcCQ1FKtLVlyj1kAPidtu3rv/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1EJWiNA_zYOGg_JQpjdMrBWKVDfoVyQhC/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/15-UsNuV_XnTAeIhGMrtFCUmWsw5jL7nc/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1j9CgqSjppwa9AC4JZqcEWexa2WoYnWzL/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1jdQSm6BNzR9VLOweqhggu8T6ZVxrS_bZ/preview",
                        duration: "22m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 252,
        title: "Todo Mundo Odeia o Chris",
        subtitle: "",
        description: "Para Chris, fazer 13 anos não tem nada de maravilhoso. Ele é o único negro da turma do ensino médio, onde tem uma educação medíocre. É amigo de Greg, e é frequentemente abusado por Joey Caruso. Ambos os pais trabalham e ele cuida de seus dois irmãos. Parece trágico, mas é hilário.",
        genero: [gen.comedia, agp.familia],
        faixa: "L",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-3s2cDtfTGk_m1FD0vG-DgSlypKRRxcV/preview",
                        duration: "20m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-FqZdT3Gxai3qofgjIGQyLRguvgJd-yz/preview",
                        duration: "20m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-kZZ3oqCuR6wvKIUw0BqeYFQEEmVyooN/preview",
                        duration: "20m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-e38jnd7a6HruM4SRmyLoeKBBWiIwF_-/preview",
                        duration: "19m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-XFyif4xKItysVHEipQGmIBQWbynOGwh/preview",
                        duration: "19m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-vmLPwPLcF4lfbowWajomqBsnrdoUkWq/preview",
                        duration: "20m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-Xc08hcdI1VEbw4mRU_8ldnsuEgFjV9O/preview",
                        duration: "20m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-b81eSuc0BGyQyU8uf8ckSI9wEYEWQ0Y/preview",
                        duration: "20m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-xwwH8u-xd8ZUmXH3sfiiS9w4aHZJtpz/preview",
                        duration: "20m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/101vKo91DJOH3G69m9BHF5eqDGhUfayaJ/preview",
                        duration: "20m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/107BVzj9qOJR6XO4F_molCedosQmVPyDg/preview",
                        duration: "20m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1-kkv8f5zywSZesOR2XM5wiIKi4e89cJM/preview",
                        duration: "20m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1-jcWY-grr5gVFU-TxImraOQg27MmKzP-/preview",
                        duration: "20m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1078TRgjsdIQOeDLfJ5TY7gCqU2t5NyDL/preview",
                        duration: "20m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1-U-8djP_q4N92WG_y90BwsbXA_7aR1dn/preview",
                        duration: "20m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1-5gbmjmc_TsrHSX8yIRMwpQRclzg0a8C/preview",
                        duration: "20m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1-vhB0Z61xhqeKpAOABlfjEm0x720ahV6/preview",
                        duration: "20m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1-_tUccjdC8YOYu6sLr5a9JxFCgwibfHj/preview",
                        duration: "20m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1-KmYF8Clu7OAeCjTNV-JfJtxVla3I0T3/preview",
                        duration: "20m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1-_kSW7rwIuVMUpRO-GdBfbrF3pWWUSXV/preview",
                        duration: "20m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1-v2Vb4MDBVj7Wkd_xIEjS2gCvTT-bEcl/preview",
                        duration: "20m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/104J3L7G-Y_W0EoGbdhy67yC01B9DOckB/preview",
                        duration: "20m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/103ji0QC807ucQb7fzqWxcXSAQDwyW5nK/preview",
                        duration: "20m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10DuSgr9EWeR6uP3ltEK9yZw2W6-kswjV/preview",
                        duration: "20m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-JIXWqULY_EoBhp-xmzSQ4GlpwQRGiAm/preview",
                        duration: "20m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/10G6Y1uIVYnbsosXYFYzLKk47IXQ_DKm9/preview",
                        duration: "20m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-nWqMMqHo6g6-rQK8DiU0Mc0dsvZjf5t/preview",
                        duration: "20m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/10LDH0LPRHfZKTo20NN5GWdBaC6fW4PWm/preview",
                        duration: "20m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/10NZ4sPo_9fO0xj5e1lxtmNVni6h_e_Zq/preview",
                        duration: "20m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-wfTBZmspc-c1gtW0JdRDikkaCnB83Fa/preview",
                        duration: "20m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/10NEb3ZawZdPBhWflLQ6F4VGWWjNCQJv8/preview",
                        duration: "20m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/10W0LXSAje_edf44nVn93yID9OOwX-4tY/preview",
                        duration: "20m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1-CBpyfm3oyo574x4KWObs8UjEDFbSFm5/preview",
                        duration: "20m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/10k6J8zl-FogpL6xRiDfbt2SxDmxsWD2_/preview",
                        duration: "20m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1-z58uOF5dnwpjBUJXTXh8YXazfre5fYT/preview",
                        duration: "20m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1-i-Qz-f-qZ8Lil8BNtT53i9vE5QuaqLd/preview",
                        duration: "20m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/109BqiX8CuqSDmpHJNH07V3Zl5uc6TEQI/preview",
                        duration: "20m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/10iq-1bQdRVN4QBPuEDMvaEZR278bhmqN/preview",
                        duration: "20m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1-ONXW5JzZ23p0Tb7GqWSc7rZCDR2Vdw_/preview",
                        duration: "20m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/10-i6xzue3N0-sKtRfz2haSxGkxmoPYZM/preview",
                        duration: "20m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/10FGDWfItNFs3HYFiAhHMfv0nsNxcsoop/preview",
                        duration: "20m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1-sm8ajYFxfEY6ZGifgIqRnKYNNG6OpaN/preview",
                        duration: "20m"
                    }, {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1-B1gr_nLluO03YlFMm5QZZYEi9nR7iHu/preview",
                        duration: "20m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/10VCVkz5bO2iHj0xBKo1YIVneSQOVuygg/preview",
                        duration: "20m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-cBd-5mMMGvCD3vEW_TnMjCYUc5-eI3b/preview",
                        duration: "20m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-YqI5pw2jt42q-ffdU3OsIJnGFmNS6ZB/preview",
                        duration: "20m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-b9zqjjvpjhSW2PBxWeji8Svke5NUZJu/preview",
                        duration: "20m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-Y0mLTJloHxXFMTz9FVkb25PHA0h_UPs/preview",
                        duration: "20m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/107XCyLWnL_4uVGe12IdXQXrXYPaYSmI0/preview",
                        duration: "20m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-sHYmbn3mZtFdL_QXGbPLicv7vK_h6af/preview",
                        duration: "20m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/10FKQwv5w7TYipeNM9s_b6DcLTA4UGWXk/preview",
                        duration: "20m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-x2dfvyu1j0sD-Rm9T13MOkowyiDkWvn/preview",
                        duration: "20m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-fpq_c7l3wrnljbeiSEEY3iUIeXjQNBg/preview",
                        duration: "20m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1-hnbWgNMuLbh3OKfllWpwk92uGyCYtGZ/preview",
                        duration: "20m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/106QANgIJs3Zw15n6SSJAFg4euqvupPgV/preview",
                        duration: "20m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/10-8DyD_iMaFUA266reifFt8TR-bLc86l/preview",
                        duration: "20m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/10Ia_2eV-lj3lZNGWaJsqe86NcpYTLQLj/preview",
                        duration: "20m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1-vQeSUvdznBH17oaN7fEDkD8WAotv0OZ/preview",
                        duration: "20m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1-hrGswEbnkrR6W8G-MuDrCqYO6MlRfeQ/preview",
                        duration: "20m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/104juC1FAxaWIKGklgAVi_3Mo9CA9_8Ka/preview",
                        duration: "20m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1-htjsBw20in_NDHR6A8FmjJFBuk3RRFV/preview",
                        duration: "20m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/107u-22aKVj6fHXr8KUmNjYeJiWcuunx3/preview",
                        duration: "20m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1-qiKMAp8cIOaNxNyoSnYkxuUe4kJOU67/preview",
                        duration: "20m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/10EQ4iDmpXKqGSv-8r_aLv02Qeakid4KK/preview",
                        duration: "20m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/103h9-zW2EBLAibMlwXe4zPj6pWM1fRUb/preview",
                        duration: "20m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/10JCDF03mRNAlQn6cZdyg0ajRapYrdTet/preview",
                        duration: "20m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10G1WeuBKBQsx1GIfoGAqJrwtalVt4LcE/preview",
                        duration: "20m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-dO-weFlf4cRAqHtsWoG1OfNXTw3Ruk1/preview",
                        duration: "20m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-aw3R_MtLVUEPG56C8BXQYVzeBBoGo-L/preview",
                        duration: "20m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-t6z1gHhYxDjPxpnRcTYzrFAQT9yECOA/preview",
                        duration: "20m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-by0VWdWVu5In2mxfMPEwG6s1bBxyAIk/preview",
                        duration: "20m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-srem15cByNLXZUcVtiSKp1KI8ncfeBh/preview",
                        duration: "20m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-fWepVntEwaHz0AEqRHkonz75zHCFArc/preview",
                        duration: "20m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/103cNcbVrCVFb1Ok6VNZEYpoXFZXl3-4y/preview",
                        duration: "20m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-oS_W5TUV_-WDGR_u-J7HogvYYXP0XZS/preview",
                        duration: "20m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/10RbqsnF8eko9iE0TaY_hQ5M3lom2EuTu/preview",
                        duration: "20m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1-m4oeaMiwKSUaJzP5LHw3lKIS5JiqDOW/preview",
                        duration: "20m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/10NyANUvfjZ4xn6q7aMTuMPF7Mc5XF8g3/preview",
                        duration: "20m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1-l49nHbRY66Rd3und5yUIH3WttIuEyMm/preview",
                        duration: "20m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/102Yk-UlwFZD8pgcbl9Jc9jyTfDDVD2da/preview",
                        duration: "20m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1-i_BWA4Uc6HOmlYW5CTUr_2X10Xrx-1Q/preview",
                        duration: "20m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1-Mbp6PoqNNg7QrkuzOeO2KFRd1gz4I2C/preview",
                        duration: "20m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1-nfcvbvw_mjngTbtldN3BR4pH1_Se2Ju/preview",
                        duration: "20m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1-R_NqCX_DtI7-bEfbh1z-cMw786Dq9iX/preview",
                        duration: "20m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/1-uMqITizJQ0AwLnHKEPBRrbbqJTGVwSu/preview",
                        duration: "20m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1-j0AMbcvIeNKMVLakKiAOlTlD64YOJrM/preview",
                        duration: "20m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/108F_iyTjx4v6Lk9-o9DyqinnKkdrkDde/preview",
                        duration: "20m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/1-jO9EKy0j-Hf8G-FVGGPCDRC09F-H15K/preview",
                        duration: "20m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 224505,
        title: "Amor da Minha Vida",
        subtitle: "",
        description: "Bia e Victor são melhores amigos e grandes confidentes um do outro. Enquanto ele vive um relacionamento antigo que caiu no tédio, ela coleciona namoros curtos, dos mais diferentes tipos, sem nunca acreditar no amor.",
        genero: [gen.drama, gen.romance, gen.comedia, stm.disney],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Nacional",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1aEOJ3g0J0ucdMp4BsGliRMFvVYzMv2S4/preview",
                        duration: "40m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1EQ1ZN6pwITPo5TTSDccQ7lJddNAji5uJ/preview",
                        duration: "40m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1PnUNT5sWbDwPNvx_KxqfKUxH70hmUwSY/preview",
                        duration: "32m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1JT3mcEf7jmLalPSUviBpCkpH9QgEBVh2/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/18HICEJzBTHTCR10-sXujhnlaSLuTbEUw/preview",
                        duration: "35m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1UXazPxF2oKCdXVBYXk_SHAqYpQypctZ0/preview",
                        duration: "38m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/19gL_RuozBY8gQFpbX25jgiBBZ-mEpf-k/preview",
                        duration: "36m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1_-N3VBZtaSPjj5LfqC_a0TvPSCH0LEcJ/preview",
                        duration: "41m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1xhZMp9xk3baxUKgKGiH-dRJZSCrkiFWn/preview",
                        duration: "36m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1f-ddy6txy2qpNz2Jn8jT9E2O7FjKjrDp/preview",
                        duration: "37m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 119051,
        title: "Wandinha",
        subtitle: "",
        description: "Inteligente, sarcástica e apática, Wandinha Addams pode estar meio morta por dentro, mas na Escola Nunca Mais ela vai fazer amigos, inimigos e investigar assassinatos.",
        genero: [gen.fantasia, gen.comedia, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-3oTwInvoT1q4spNvWAMU08oGESooWao/preview",
                        duration: "59m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-DuFk9w4uaAfiPdJndvffAB8-_5m5VmT/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-MFF0tG0g5VLLpq0lKKK7hEZQJ7jdh0j/preview",
                        duration: "48m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-QAjusKN0ta5pp9_HJXD22ibAnG6nasy/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-WxFMYxlpZq4g9eidKr5erk1ta3bPjfi/preview",
                        duration: "52m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-YAzxhn1vTb3aLRFerz0zRyz8xxQT-W6/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-_toei6iQTS9XnCPzmLonRdjw8MSG4c_/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-mdNPYuY2dXjoxSR1gBwSIRniwibqohJ/preview",
                        duration: "52m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 71446,
        title: "La Casa de Papel",
        subtitle: "",
        description: "Um homem misterioso que atende pelo nome de El Profesor, está planejando o maior assalto do século. A fim de realizar o ambicioso plano ele recruta uma gangue de oito pessoas com certas habilidades que não tem nada a perder. O objetivo é infiltrar na Casa da Moeda, de modo que eles possam imprimir 2,4 bilhões de euros. Para fazer isso eles precisam de onze dias de reclusão, durante o qual eles vão ter que lidar com sessenta e sete reféns e as forças da Polícia de Elite, com cenas de muita ação e planos brilhantes de El Profesor.",
        genero: [gen.acao, agp.crime, gen.drama, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1CFpStrJlHEJQuJrv6OZYnpkeJYYfH4kD/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ZO8smVCzZGIJt1wyJLX73rtrn_SiMpah/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1I7MNotAX0PpF-Mb67yaxe9t_3_SFyxI9/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1m4Tmuw9mK9lo8ye0SJminjsyjNkccqSc/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/196_zO5V5PGBrLwr5WXFceKS7pPIx8PDg/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1CrwWQVpcOnUx98emw9SWdHS88N9_B1j9/preview",
                        duration: "43m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1LsS9_NLnfH8A5Y8xN6_0IwtIKxkxwcGh/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1dY2LL0T6yt1Xmg9xvV29W1RCmQfWDfkK/preview",
                        duration: "43m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1BfC1lwWQBJyLySjOyI57ms8HoK8mrqWT/preview",
                        duration: "42m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/13j_cb-jC2Lxy8J_PTF_cJU5sm6OcS_Vl/preview",
                        duration: "54m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/10xWVDlKkVi_J0imnJIqVTZEInc3o4u8w/preview",
                        duration: "42m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/16RrFNsJEqVrrLLXRiZK-iWKwB9iLqDoO/preview",
                        duration: "43m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1Kynl1FHp8stQwknQpKH8RwiiW4VlEY5R/preview",
                        duration: "55m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1x1f5hJHn4ogfELrwqWf_8wkzWLpH2Ma_/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/176hVtWZiPs0PPK3PMWTI_cs7ZHWTsBcG/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1AtrUsJ7_YGYvEjt04AzS2RITDzI1XKQG/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1B0Mon7kF71iEwhnj2EbLUODt_10c1NEL/preview",
                        duration: "50m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1hZyXfmpG3EcCat4D6l2Sv5rtCYCTC6MC/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/16mP68lmbZngEoVZAuSqK56YFmX7bdmhy/preview",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1CLChuLbgCwz86U2Ex7ascDCYzkobp6oB/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1PY3bEqJElQEDhvhR8_omMW_P3qrK3NXD/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1E2F-U2C_7aHYbAquwxvshyQfwBGa-WlD/preview",
                        duration: "44m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Leg & Dub",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10qnQFxkx-DZU-Wf3BoNcjaXcXirM8KiA/preview",
                        duration: "49m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1K1E4p8lMXPRc4raeDxHFN1Ei6cZ4i9Z7/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/115UQZuMoKN2aCbsjo_w7X2-iWPiZXN3R/preview",
                        duration: "48m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Mkpt0in3YrY9Z4ycBZMxNiXP0NH0qVP5/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1zxfAxhTfBKBAOvNjZ1oonBHJzWjjdYOs/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/13UxT2TbWm8TUp7uAxKgMEKKgR6kAHCCm/preview",
                        duration: "46m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1X8OqRCXV2z9xYXJlMQC4cFAGTgl5uto9/preview",
                        duration: "44m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/10GMq-YXasAnau_VXbuEQ7l5EN3PsHcug/preview",
                        duration: "57m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1copbymQOm_xIGpKCGu0K7T6qdZ_8qV2Z/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1sVnKYE6Dy-hWGKzwIgtxydVduzeSo3DA/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1cpYciHoqdkASe3sRWE2BvmVaNfjx9FWZ/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1KL1zR7VVk7HLoVusy-23jNdfLn9xGFkt/preview",
                        duration: "53m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1dUOCcsPQuEWLnoyIF1NlLo2HJJ93_rPv/preview",
                        duration: "42m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1errShng5s7hm-kukh99_nABrQ3KKVVgc/preview",
                        duration: "45m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1MlRAMJxKxReGcay5zL5VLAwGyDd51h5v/preview",
                        duration: "52m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1aIPtiFxJqRM8wlv3Rj4miZC5YQgBdPoD/preview",
                        duration: "01h"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1r0dYvqL3OBoKfvCT6ytKZ9s0UgYSeWUP/preview",
                        duration: "49m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1vrg_q5KYusVf5usP_a3x8FFEFkqUxN22/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1VCMO75b5HU-AP3rJURx_43mCvl2y3gPF/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1W9TBgOHoVgT2MUkWqy4r2Ctc4yXiytzW/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1TQ-simvBJfHau_NXYAWm_z7rRPqMkZmq/preview",
                        duration: "54m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1DKVSBTRrJoUisOm5Pmd1c4_WLMUh6Hd3/preview",
                        duration: "53m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1KzBDGrebwk6xCuR46DUXKMPofxI0zCao/preview",
                        duration: "53m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-j3NPzVg9PIWqXiiNQrY_WbZ3BJxcYAo/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/14HU5F-4MvLovINlFE2BcssOJNMvhv8Uk/preview",
                        duration: "52m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1D4fR2bCiombxiCmfEcUcdYc91EMzlRxA/preview",
                        duration: "01h 16m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 93405,
        title: "Round 6",
        subtitle: "",
        description: "Centenas de jogadores falidos aceitam um estranho convite para um jogo de sobrevivência. Um prêmio milionário aguarda, mas as apostas são altas e mortais.",
        genero: [gen.acao, agp.misterio, gen.drama, stm.netflix],
        faixa: "18",
        news: {
            type: "season"
        },
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/18al7AiQOe3gTZ6o-xxsel04AeUKHgNrm/preview",
                        duration: "59m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1zN8I2-bCthmcujimK40o2Hx7phsUV5iR/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1BZclg24E6UaUX735XHXEyrsl0YQrQsW8/preview",
                        duration: "54m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Z8itLprpcF0lGNY9ON-fr4C8hT_LaRLU/preview",
                        duration: "54m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1kNhMlWQUcKURACiIkKn9_X6vHRinkhV_/preview",
                        duration: "51m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1A26h4y7Qfy0z-D-ivl5m3UeqhupcMcu6/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1zTVZt5cLahQugs7drMQy_urjSQd2ihXW/preview",
                        duration: "57m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1a9RfNBNo52pjPQzfkjt2T00Ms6Y_mSQC/preview",
                        duration: "32m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1G1TvNivd4Bjzg2sodtNIb0OckygUuNV1/preview",
                        duration: "55m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10nRSHJitVa-yWzEzu4h7aEbWB-CZqO2E/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10pVmoxUw55l1Ry8PBH7MS7ZJMIY9qeEb/preview",
                        duration: "51m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/10z-VP6IP_Py6oubgr8Ky1wDTprus0-wW/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/110o17RIs0kT5CHZikg-HjUdMhaUVy4fH/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/114zk8D79YwtkGfKbjJJXk41DDWq3wBHq/preview",
                        duration: "01h 16m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/11B9GaYdMNMDQ3sM3947AKoWcafqNa2uA/preview",
                        duration: "52m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/11M0IVZjWtWpozOBri55NEQfI9NQowBOw/preview",
                        duration: "01h"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 81356,
        title: "Sex Education",
        subtitle: "",
        description: "Graças à mãe terapeuta, Otis sabe tudo de sexo. Para aproveitar isso, a rebelde Maeve propõe abrir uma clínica de terapia sexual na escola.",
        genero: [gen.comedia, gen.drama, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1DzO6rJ8S-M8VFFYdzWl37UVsJTj--EYy/preview",
                        duration: "51m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1USKGofiyOle_0ktyX9uO1c8dUyvhT1Xf/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1NX6vVzVq5rAyL20C-VPZdk4NNkLWM3jb/preview",
                        duration: "50m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1bps30XCuMeDOyXQnJSDcwGlHcy7ZrCaI/preview",
                        duration: "46m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1y3fdo0yrxIf2PY51nkRQHG-suklYj2hU/preview",
                        duration: "46m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1A7FC4msCCSZ6PZKnVcXt7PFl5j1a8D93/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1YP7ASY3zgQnQV5SPn8k48KNMuekGPdxE/preview",
                        duration: "51m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1cqBMzNeAWlio-2CR_-85ChoLTKVMT5C1/preview",
                        duration: "52m"
                    },
                ]
            },
            {
                s: 2,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1_1E_dGf1zXZimeHMqTc36FoAXSevPqDk/preview",
                        duration: "51m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1xSQKP4CxHJ4YdysR0t9Voj9WYYzk9Oq3/preview",
                        duration: "50m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1GX4FxVyx3l9UWkBqvxfFj8NbNKQM5ep4/preview",
                        duration: "48m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1v5r-Wj08NRe64bIaOtKhhJsUkHeFweMS/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1uC9qqnndopGZCz3SwvEnI6n21pdmi3gC/preview",
                        duration: "53m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1lsQY8klxTvoomM5AnqmrUXEvt2dHmBID/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Pt67Ba41hl29It28akDqZp-eYy_wfiie/preview",
                        duration: "49m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1fwkh_xHldWtGbJy0f0TKTY85OJBvIZjm/preview",
                        duration: "59m"
                    },

                ]
            },
            {
                s: 3,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1ovVLV8qFds2KiFAGWXErPfdHj8lPf42N/preview",
                        duration: "54m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/18ip3S59OP0Xa5mtBOqxHPubhEDOlkVyt/preview",
                        duration: "01h"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1xBpuU8DeNCydq72c1CZXxWlDV5n4Ezfg/preview",
                        duration: "53m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/100pt6o3a9BaI3NoQ4uQAcgTLl7J4eMnB/preview",
                        duration: "53m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1g2N9QtK71UmhE7PitYfpws7fDvYinDk3/preview",
                        duration: "53m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1r3uE4fbgpFuB_aSNaQYLV8dDctQ4_xJj/preview",
                        duration: "53m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1BHTuCY54fvIoYgCsh57ctLjubg_LRxmK/preview",
                        duration: "58m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/12mqFieikQzU9GlD8_jSAeHgY-7FXcNGA/preview",
                        duration: "01h"
                    },
                ]
            },
            {
                s: 4,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1pDUjBu_NjmrvXa3T3aRxUiY5Z_Cmf6_Y/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ZK3_OKUh0FbXEaRmSBMZLC-XR0J7dt8G/preview",
                        duration: "51m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/19mOXLmP37wqra5wvO04eBjaRgGD4NKcC/preview",
                        duration: "55m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ZndvKVo45Ox8jw0rsNb7SIWtDp7QMLS0/preview",
                        duration: "56m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1m5eWLKfj-Y6YG535WuI3gkIeyLzSanwf/preview",
                        duration: "55m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/186QAuIB8Z3yfc2dN4ffirTrByeKC0caM/preview",
                        duration: "01h 06m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1trZ74LvvZtFVxlZMXxojKa2d69NtU3uA/preview",
                        duration: "01h"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1FpT33OFMQ1reQPgZpV3S4UDyes4pii-d/preview",
                        duration: "01h 25m"
                    },
                ]
            },

        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 90228,
        title: "Duna",
        subtitle: "A Profecia",
        description: "Dez mil anos antes da ascensão de Paul Atreides, as irmãs Valya e Tula Harkonnen estabeleceram a lendária seita e ordem feminina que se tornaria conhecida como Bene Gesserit para controlar o futuro da humanidade.",
        genero: [gen.ficcao, gen.drama, stm.hbo],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/14WbHHRfDWfMu__GKH7UPu1LqMi1qG142/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1SsNif32MDrKDB41o_lcdWzINNLqoTkox/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1Wzm5qBn1Y9N2vSjNSZe_1KndS3HyaZsK/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1VEAjz334voso3VEfCYZ3jpEaJz5xMJJT/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1x5XYFCCH--P467sWY0Nem-RL9_NqfLR0/preview",
                        duration: "57m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1iyXyDiQuidpAlWtDWw--IxzjQAIItH54/preview",
                        duration: "01h 20m"
                    }
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 1396,
        title: "Breaking Bad",
        subtitle: "A Química do Mal",
        description: "Ao saber que tem câncer, um professor passa a fabricar metanfetamina pelo futuro da família, mudando o destino de todos.",
        genero: [gen.drama, agp.crime],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1JPCdBsumyltqnsheMA44YGif2OObojlV/preview",
                        duration: "58m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1jY9io-0yBMh_Hk_jFxlZ7iCZDDXr-Qu2/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/194llJnISevZC7u6GLoJgKC_gURUP9ew0/preview",
                        duration: "48m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1R_Sz9KKk7w-YEtVKRsGnJNpZmMxFju-j/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1aFo8sjhB0FT57BRZkpcWEbvapapGqmJX/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-qERF92kna_PMBPEpFkZqHpLqfrflvXp/preview",
                        duration: "48m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1jKZc_Otx77zR6p0_IX17KjJh4OzVYdpz/preview",
                        duration: "47m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1is_4it4ZwGlQZ6IKAX9IohWAafaXEWsO/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/11DnNQHI2jYpBVQmdtZObJ8IdgrGoF_gc/preview",
                        duration: "47m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1TGXuTpvEoSUxhiRXdAw9xoqQlLm7JK3z/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1YemCxOdNHiViMPoDkPrOsJTwLYufWnY8/preview",
                        duration: "47m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Fkwej6t8mryp7hE0b_TsBDfy8K8CpS68/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1hiNNyc9-nvudVIVohE6CknZk0panXkGO/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/13GzQUvfaM28BikSNzVUGV2AUlJtONE59/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1pkbAqz24HsjmPqEOnt4N6owIKDUNT9t0/preview",
                        duration: "47m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1_ZqY5eux-y4q3pN-hRHVMIvwAvMuO41L/preview",
                        duration: "47m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1HLuw3SRzV5ZYwr_Ul0jXEdrQzFcly2Ur/preview",
                        duration: "47m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1LpfLzWP8ffVsOlfAOCSpfU3984ocPvGC/preview",
                        duration: "47m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1eDx2kbatKfMvTuq3b2l6niEyqZ-N1mcD/preview",
                        duration: "47m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1PD6CeWTffJxtrtDsV0UYX6PF0t00pC-1/preview",
                        duration: "47m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1oCwp1GklC9cAwaLTAUtslGRz3vx-1W6e/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1E7noE4CW6FUzBN4VjdmYmJ8BYsxHSMRh/preview",
                        duration: "47m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1IhfK8UthQ_w4MujoJEJsdlZwlDPqRM_z/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ckfR1mgiP-FzTNTzkh-1A_1vkDsOfsiz/preview",
                        duration: "47m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1o3wZzoPYyBrM8FJz0Ku1viSLWzA0rE_v/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1PLybBfqT8cenzn33k5ttBMM95MgFX8S7/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/12rEChYmFc7Cihjr4dPZ6ihsj-K1S1jVg/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1hT3LrXJgoJYWQbsgZGuRnoYvnSZ5c5nD/preview",
                        duration: "47m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-1cY_qMaZCmbN30JWhb7h8gboRjyLi_K/preview",
                        duration: "47m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/18gR2Cz_m7G7xjFuhL6oEh-W1QHwtZunp/preview",
                        duration: "47m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1JU3PMzypoVETWTScpAiUv4dLhz-XKMma/preview",
                        duration: "47m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/11tsGnYVkcLs3GTxVvXZZQjKzkh3jwhws/preview",
                        duration: "47m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1bMqys5T39fPQLWTUjAlFzkHPFkOaO-Kr/preview",
                        duration: "47m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1HncI_8mQEVe4A3kvI1fwrrAzaC0a2PPX/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10mhxkoVEMOB_m2cTMxPxES0mY4k0jq9W/preview",
                        duration: "45m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1elTT4StdzQGk6CqRW7ofyVM2d1YFrjCY/preview",
                        duration: "46m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1FzR1MJMHIUn8tjiZqNP3ODKNjZ9MECad/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1xZRRP1fYu3Nl-S3yTv14BP_YzlH-vfsB/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1bvg1hwT-i8aYQb06V8Lz6Py6oxMB2P6k/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/16UmnYGtqWilto0mmUyf1UJ0dtiuz9mzA/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/12EstHf7WRO5InAmyFmnG7HLK5Sjt46FP/preview",
                        duration: "47m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/193DGngheICX-rohXqKxJuD43zXu4LIN4/preview",
                        duration: "47m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/18KYcVTR7VxVy9DK4kdBXo9fZikgopNoR/preview",
                        duration: "47m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/108376-v26YPtTXgV1h0lFTYFYZ9fE8kG/preview",
                        duration: "46m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1icb185vqhZCKffqo5D8Djbk0hPVDdnAx/preview",
                        duration: "47m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1PX5yvuA2jyzpITibwFzZQ7JHlfBWlk1e/preview",
                        duration: "50m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1lzDR_IgmrKG954z2WfPeYaaiZ4S_DvD4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1RMem_e65v-3TPPQKQDtn_Zc1vI2BaEEy/preview",
                        duration: "47m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1m0eYpqcb3_DxrWwZngANFWAkEvU2cWVS/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1jNnXXPc9b6k_972Ruwl6R04m7WayYprb/preview",
                        duration: "47m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1f22KPpyC78zCd9wG6MMllZzsVV-x2oL4/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1C3naQfXDt_yzq0Bg9Fsymn1GoXSMj95M/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1MVHOvln-jeszPXgc6GgXT9QujE7Db4Av/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1Hia10Q5ziw5f2Q-bl0DsjaNl-GunHkFM/preview",
                        duration: "47m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1aYAKsP-T8u--VgOhDRnZ4rR0JhuacJAF/preview",
                        duration: "47m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1sci-UGVOaaz1nEL11PmpRdEvUb-VU7Tm/preview",
                        duration: "47m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1LuR10AFstb6EZCubdMlTjAcqZgGx5D84/preview",
                        duration: "47m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/10YnsPahPR2BNbCAIiPULyppM17U1Ec7T/preview",
                        duration: "47m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1bQkqXFzy6AIpuqto5492bzN2Tb2jZ7wI/preview",
                        duration: "46m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/10sNGswQT6APRJnJF_txdSe0C8AKgOV1w/preview",
                        duration: "47m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1LLcZMCnU7-9mS_cnz6_mUj62GPwh3qvo/preview",
                        duration: "53m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/10h3ml3Q42BbkNZJ-miJtDZVAk1Lwzb2L/preview",
                        duration: "55m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 85720,
        title: "Sombra e Ossos",
        subtitle: "",
        description: "Em um mundo destruído pela guerra, a órfã Alina Starkov descobre que tem poderes extraordinários e vira alvo de forças sombrias.",
        genero: [gen.drama, gen.fantasia, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1s_0-HejubRzA-KowRkIZjjJmh9ejo2H1/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1Vzb_L0E2BiHZyOkpKMDq8XzM8tLl8TGl/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1RkVYhwoOTY1DmJhoKf1itc-cFhdZwUHd/preview",
                        duration: "47m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-nAGe6BvGFEKDGadNh6SweOv3cx8JiC-/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1t3ykL-4ykUySPsY3b43pna0nvQT1y05b/preview",
                        duration: "58m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1MZGTfhT6iGxtr3IoTTQXOQgrZiXYx80Y/preview",
                        duration: "54m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1RANB8Gi2wN4vbonaMTVpRTbes2KzhJ5t/preview",
                        duration: "52m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1aZjpMmye2po9GAavpmTuGxqR9Fp4z0O5/preview",
                        duration: "45m"
                    },
                ]
            },
            {
                s: 2,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1zTvR56XshNTGtys5BstI9VeqjBPHqQiP/preview",
                        duration: "55m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1zD6yPZBevmgUcxZVt6IA28SG13u45JCA/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1bjsORJv5iPaPlNudFHHIP9ZOKjkB0Cd3/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1L8K67SBIF76AodLsite-n12EyfIhdTlK/preview",
                        duration: "59m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ueb0jIeRmstJ4lwT0wXKLgGOYbPKXPqA/preview",
                        duration: "59m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1MJBFMl9fk88YamzUtANpFA8v0pgPE8Op/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/15o7dbwc4TS9vlDLWMQ3qOSVRChDd11P-/preview",
                        duration: "01h 03m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 76479,
        title: "The Boys",
        subtitle: "",
        description: "Na trama, conhecemos um mundo em que super-heróis são as maiores celebridades do planeta, e rotineiramente abusam dos seus poderes ao invés de os usarem para o bem.",
        genero: [gen.acao, gen.aventura, gen.ficcao, stm.prime],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1aliVadlKZiGAnzHzYIZqhemNvlRoS7ao/preview",
                        duration: "01h"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1cZOC-ct0XqfKPzt5FSpxEDva9kKdbWyg/preview",
                        duration: "59m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-IiYngQ1NIpzpXIt2i-pKEKUg_4SJdmf/preview",
                        duration: "55m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1qemvX06UYltQxY90LLuLJugqCztmIX6c/preview",
                        duration: "56m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1cVWyeZA2iu6M7r5GdnEt-PTPQGaOlOhM/preview",
                        duration: "01h"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1FHY5gFpUbPQD9zelfZRRLzeLvEPe5pd5/preview",
                        duration: "01h"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/12mW9OQKmkKXbQ2bLOUBIgJZVlLXVerMc/preview",
                        duration: "56m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1_rw5z4lc7MGAX6r1ZwMkAaNkOrpvs1g_/preview",
                        duration: "01h 06m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1f3Ziy1RQZWxTMb14uZLMoKmUC0E33nKf/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1pU9758jDDXNv7Dw7PWJS3LlyQP1sAww5/preview",
                        duration: "59m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/170X11wA51B_b4LEFj--59ciEi1JwsDou/preview",
                        duration: "58m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1ZCo0cE_c0OTbixAMbGFovcH_dxIRFe2Q/preview",
                        duration: "01h 08m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1FnYLJEuusqv8tseXz8m3X3bK5KXv2ncb/preview",
                        duration: "01h"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Y-KGmlaW8IrMn02hcSGy1XLZNnCVpYBK/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1kW8Fw4jHPIsLvHkkB45kBZU0J-XZTOxA/preview",
                        duration: "54m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1q5ndMAXgTew11C-Ywq4wCIharwIYIehZ/preview",
                        duration: "01h 07m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1VBSY_gYzN9s_fZEMZeIMumq4t_JFwO3W/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1emnc3S8929FrkDHUHc29m4f9_w8aSwDB/preview",
                        duration: "59m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1QbVSLB3CYGD5mxfxKYkICvW8KGCFPs9v/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1XigGiRkn_qaagg8OThaUcbhtWtKj4pgt/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1XkdClq2JW6GIZXGEzOFDoKlR86Z5ZlV2/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Q1l7VjUSCKlB1jvSFyWdKm9OZHFpvQVu/preview",
                        duration: "01h"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1wqIchsExNRMCkdJrN7L0-U02l3Y3P1e3/preview",
                        duration: "01h 04m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1eQYI6EVkALtKGxpZbMscNXJiPDJfq-eq/preview",
                        duration: "01h 02m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1syiKjth0dM82CKxqYw-g3H2hw4O8FywG/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1D9WpYGIAlwcBOlzz6qjst7qskcdx7DrU/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1wkX3pSp0_EKhl97QRBL49pZLzoJVFGYp/preview",
                        duration: "01h"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1_7-3Ah7PF2NMu7bj09J2bvJSrIakcatE/preview",
                        duration: "01h 06m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1EUirKeg_3zKsnzkWkkuR-eC3svkZ-jqF/preview",
                        duration: "01h 08m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1rxaLk0qBWtQPWBtHhTOmXIvG-PEmPhrM/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1XyTHIzpkbsV3OCtnY0qBYidwQ65hfaVA/preview",
                        duration: "01h 04m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 77169,
        title: "Cobra kai",
        subtitle: "",
        description: "Nesta aclamada série que é continuação dos filmes Karatê Kid, Daniel e Johnny retomam a rivalidade dos tempos de escola.",
        genero: [gen.acao, gen.aventura, gen.comedia, stm.netflix],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1DuEPeVgJqATEFEolB-qxrGVDXWojuB_7/preview",
                        duration: "28m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12S-oIYjbmD-uoaWcjbR1grCb24o2XvBz/preview",
                        duration: "27m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/13XRkrhAiRn6S94Lg1iNvFLV8NUujDMvO/preview",
                        duration: "23m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1QrWI2_QLReBVse9L41YxJqxoE5xD3Jt5/preview",
                        duration: "27m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1ahQ6HmYzP2zLlhgo7HBGOxLLlJfFLl4w/preview",
                        duration: "33m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Yi2lrIZhGdV8tqYBaN3leKOxhNcAgCLZ/preview",
                        duration: "30m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1CpTbRyh6BwZob-TDOWmIjjWPJKPCjArb/preview",
                        duration: "29m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1kREWvtbPj08NTlcuoqZHiAGvogHVi8oF/preview",
                        duration: "30m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1Q7GV_BafHerauSCBqvDYVKvMLKO326Vf/preview",
                        duration: "31m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1TqsP7nyr0-SP091JAP9Yt5XXTWGSZkQD/preview",
                        duration: "37m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10NfmMg1lXMqusskB-IcMuNLCkFeQIiJ6/preview",
                        duration: "36m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/18Iws8Ne-MEsY083ukTfK56gqBq6DEAxf/preview",
                        duration: "31m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1pTkhXyo3ebtsH3px_Ij3ZRyhWOYqZOCu/preview",
                        duration: "24m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1axSN8r7Gby4e-ifF_j1-tWvn04Kvw1yA/preview",
                        duration: "32m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Jbj7YhlyTo5AfV3ZQBCFTpTszEak6BPl/preview",
                        duration: "31m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1NwbCjt26PHnP0Ulpbx1k8Po1vMdOuyQ-/preview",
                        duration: "32m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1176isYjRhmsH4lUvGMfSkjP2boM1kdmy/preview",
                        duration: "27m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1_4timgCba90yKpIftG0YpNUCS_-fcA4-/preview",
                        duration: "31m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1RdDKg_Vgo2fxQ0cHbqycGxrbDWUC4bZb/preview",
                        duration: "31m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 240411,
        title: "Dan Da Dan",
        subtitle: "",
        description: "Esta é uma história sobre Momo, uma garota do ensino médio que vem de uma família de médiuns espirituais, e seu colega de classe Okarun, um garoto fanático pelo ocultismo. Depois que Momo resgata Okarun de uns valentões, eles começam a conversar... No entanto, surge uma discussão entre eles, já que Momo acredita em fantasmas, mas nega a existência de alienígenas, e Okarun acredita em alienígenas, mas nega a existência de fantasmas. Visando provar que o que acreditam é real, Momo vai a um hospital abandonado onde um OVNI foi avistado e Okarun vai a um túnel que dizem ser assombrado. Para surpresa deles, cada um se depara com atividades paranormais avassaladoras que transcendem a compreensão. Em meio a isso tudo, Momo desperta seu poder oculto e Okarun ganha o poder de uma maldição para superar esses novos perigos! Será que o amor deles destinado também começa aqui!?",
        genero: [gen.animacao, gen.aventura, gen.comedia, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12Usy-7t73OUT8cdR6LhG8KT8YJ1Co3pG/preview",
                        duration: "24m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12ZTafBqH1dcNRPACh05mhw22nsEZjOxM/preview",
                        duration: "24m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12h-0STRMvAdFG5dnRFxP5eudWZsW7Kqg/preview",
                        duration: "24m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/13W9VK8lXj-ijspULEpag1mauC-wO3Vh2/preview",
                        duration: "24m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/13YkeFui7bMrBYckNAu2fAEG6jtDQCJmY/preview",
                        duration: "24m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/13_0QSEm2jQiiNqpJKTMTIUuEIIVLPTF_/preview",
                        duration: "24m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/16ce0zcBtqx7jjGXmYHTH4-JRzzCtlDB-/preview",
                        duration: "24m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/18I_F191zUlLtoCvOFL16Ajid0x71KZOS/preview",
                        duration: "24m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1_MDzloOp-A3psveP4vyHYXFChRjN8pMt/preview",
                        duration: "24m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1I6JhT_fd8xKgkeYpjHVhhPC5unt4nRcm/preview",
                        duration: "24m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1sF3I4omUoaZ1t7HjJvxhzAlcNP5rTEqs/preview",
                        duration: "24m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1gJ0lFTuxAkN1akmehwtcUWG_4kRxNbJT/preview",
                        duration: "24m"
                    }
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 62823,
        title: "Scream",
        subtitle: "",
        description: "Nesta série baseada na clássica franquia de terror, um incidente de bullying por rede social leva a um assassinato que traz o passado à tona.",
        genero: [gen.terror, gen.suspense, agp.misterio, stm.netflix],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1RKXFpXAtca6rSgTw8RZTWI2xWAPgoyNU/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1HIsSTYnGS0y61883TLCfqsDICIHFhTVJ/preview",
                        duration: "40m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/16F3ac9x5YfXXUa58ezjH1F-BZoJG1bZy/preview",
                        duration: "40m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1qDg4-lE8lV5hAvZe5r2fBt9y55g5Rowu/preview",
                        duration: "39m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/16nNHh4zrY86qHWJ6lOQj2i2QFDZy6WiI/preview",
                        duration: "41m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1CzVdtiE6dBXSvN7p0hMvT5xProNTm86y/preview",
                        duration: "40m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1OHuiqE_ema0e5ilFsA_b5F8uEZuzDU0p/preview",
                        duration: "41m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1F1LoZuusC8pKpbMMlQLWoL9cYyjZrAJt/preview",
                        duration: "40m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1IlXzRp5m5U60fuvtTl9HcjjB_Hcsq59V/preview",
                        duration: "40m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/15T4naZTaJK4L896cecgQUFVgPiwFTYC3/preview",
                        duration: "41m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1UYHNW9Hp0oTi3pCpQXQ0MsEMyUZVdUUH/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1VqMkiGPmbtPEt33O3G03x39TJWjl53Lp/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1VQBV8TOvjxXax-QkqrnMy4grLmxCeKuO/preview",
                        duration: "41m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1VReOQWr3HDW5soeWF7L0Iqo7uES7erer/preview",
                        duration: "41m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Uv3lR3LuE-1umzmsN0oNw2o_QbgXhvfM/preview",
                        duration: "41m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Ut7yzkEdjv7W2rcDzyf4u9Nl_jOewBnd/preview",
                        duration: "41m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1VwA8PwwXaOfsk-A5RMlJjYsvlBW0LiH1/preview",
                        duration: "41m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1V_AJZDkPYIQXiaIx53bqKfkrZljGTc66/preview",
                        duration: "41m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1ViIW8bNzKtSBYSuguSfO4J7FwyqNrjjo/preview",
                        duration: "41m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1VhlpzKgI54KhcO3UUC-pidv72D8sCElh/preview",
                        duration: "41m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1VjvP7Io7ctSRwzjiby43ihxT7D8c968v/preview",
                        duration: "41m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1Vx-p7hn4JN0RABWkuuBBMEgmzoveXZJv/preview",
                        duration: "41m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1VpodO8ezpji5zMf5hUbN-kWkV2NdALDi/preview",
                        duration: "01h 21m"
                    },
                ]
            },
            {
                s: 3,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1lgkxbTvNpHa6uwQ_X_QOiLxKglExQASi/preview",
                        duration: "41m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ztaBtBleC97I-LIm-MFgwEmJWQzAqlMV/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1xfH6u_0DyDFPp6B33UJ5LVOI6wRVsG6W/preview",
                        duration: "41m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1qx3pakPu4KflFiaqoGhHcIqHbYXDdoMA/preview",
                        duration: "41m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1nW_T720QPC6Lu_F0s9w-JDxg6VcHrJwX/preview",
                        duration: "41m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1srRZdNJM_KCvpZApeXTYkE7OFZ_Bw56X/preview",
                        duration: "41m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 241454,
        title: "O Amor Mora Ao Lado",
        subtitle: "",
        description: "Na tentativa de recomeçar a vida, uma mulher retorna à Coreia e se envolve com alguém do passado. O problema é que existe uma história complicada entre os dois.",
        genero: [gen.drama, gen.comedia, agp.korean, stm.netflix, lang.leg],
        faixa: "A12",
        season: [
            {
                s: 1,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1EH5msFL5-qceCrvtvLbaR4-vMzqu_nHf/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1jRXfZ28XXRRRzsgy0iVHy3YiNd8Gq8in/preview",
                        duration: "01h 15m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1CycJAmEpdO6Dy9eYpXvCCPdd5dneerdN/preview",
                        duration: "01h 16m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1R3qK5Pv-OyyNq4JkFxbgJ-scRScVAHj1/preview",
                        duration: "01h 16m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1hpzMPtMtnCGKmFvtJsRG7GAG2vi1KxpS/preview",
                        duration: "01h 18m"
                    }, {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1430bW_pAead8_Cp7FFl-PfeOGSx4b-_d/preview",
                        duration: ""
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1jEc7TxpC96VX1xSYQtV74H2xpcHHUQ20/preview",
                        duration: "01h 17m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1P3N_x_qpyxS47W8N_kI_Ek89N1KpWC_3/preview",
                        duration: "01h 20m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1rfNqWTeBQgq2fe_L4gFwcS4s_L_8VbzB/preview",
                        duration: "01h 26m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1ENdT6FIgmFAxnSjsSui-ugGy1kUtGYCR/preview",
                        duration: "01h 30m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 138501,
        title: "Agatha Desde Sempre",
        subtitle: "",
        description: "A infame Agatha Harkness encontra-se sem poderes depois de um jovem gótico suspeito ajudá-la a se libertar de um feitiço distorcido. Ela se mostra interessada quando ele pede que seja levado ao lendário Caminho das Bruxas, um caminho mágico de provações que recompensará a bruxa sobrevivente com o que lhe falta. Juntos, Agatha e esse misterioso Jovem reúnem um coven desesperado e partem para o Caminho...",
        genero: [gen.fantasia, agp.misterio, agp.marvel, stm.disney],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1NVDdt15DtAfV1yahXKmkiiUgvvtgyIbl/preview",
                        duration: "39m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1NgKBzBR52GdwIZacHE97bLAsEm18aZzn/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1VE2Pprm69rUvhAGGKV6LTuYXmc-nnQHL/preview",
                        duration: "37m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1dS_4HT-V3FnPAYr7fs3ImlmvP0scafp7/preview",
                        duration: "40m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1pCkynynz1wT6y09qRLqYBhefYQASrMcT/preview",
                        duration: "29m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-e1y_tQ7N_0otBqRkQvul7qEy-niXNge/preview",
                        duration: "47m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/198Dor4dyZH-5xDN5ktPs_5oMbfzafnB5/preview",
                        duration: "34m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1IzI-TQceFgDqoeMK5jEHIa4NDskkgnVP/preview",
                        duration: "46m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1GPcTI8vOcWPGL2jdb2mqNhE7G5Mgk7BX/preview",
                        duration: "38m"
                    }
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 114922,
        title: "Citadel",
        subtitle: "",
        description: "Há oito anos, a Citadel, uma agência de espionagem global independente, foi destruída por um novo grupo, a Mantícora. Com as memórias apagadas, os agentes de elite Mason Kane e Nadia Singh escaparam com vida. Oito anos depois, o ex-colega de Mason, Bernard Orlick, pede ajuda para impedir que a Mantícora estabeleça uma nova ordem mundial.",
        genero: [gen.acao, gen.suspense, stm.prime],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10MXNW5SlHVD-lGEYUq4o08f1LhnvGzL4/preview",
                        duration: "41m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10QN5ytT-rCK17xUHcdEPaYa9g-jK4251/preview",
                        duration: "40m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/10TXRAam5tS1gL14aONu6vMT3u2eFSOlc/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/10V6duFJTQmuda484ydPFa0ZRzTmaZZ_Q/preview",
                        duration: "39m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/10WryTKJyV5hQo38uAlt9pg7WrWiyLKFx/preview",
                        duration: "38m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/10c4xY69IbovJxKtgNkNejbimmk5RRmFD/preview",
                        duration: "49m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 42009,
        title: "Black Mirror",
        subtitle: "",
        description: "Esta série antológica de ficção científica explora um futuro próximo onde a natureza humana e a tecnologia de ponta entram em um perigoso conflito.",
        genero: [gen.fantasia, gen.ficcao, gen.drama, agp.misterio, stm.netflix],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-U8hrfQuMOBxgzawoE5Z-VQmaV0S2BcW/preview",
                        duration: "44m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/101AweJJgsRWwQ5MBoes7eMq0XJCnLmnQ/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/10NajCcwpRhUSLcP1-RIWtUGwkvA_204P/preview",
                        duration: "49m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/136JlxXUDzMXTI8M6xoC4c-xwC3vhv5vV/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/101DbQdHEplfdvKYFz1exkLJM09-9R6Pb/preview",
                        duration: "41m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/10uZBIuOPjCwOLS2kyg6XWBQN0-5hOI_Y/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/13CrDxvBEUCrRP4evBuZtZpo_MwcSLvpn/preview",
                        duration: "01h 14m"
                    },
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "ttps://drive.google.com/file/d/11kRMhyb9Vl1OFMeiA-0w6h5q8Wlw3xTM/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/11szV_nSdpMoah8zhwBl2JoWRPM3DHgE_/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/11lbzx9BuHLwayuGucST2agoRVPaBvqNS/preview",
                        duration: "52m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/12A7GY6dBn7oMaurxhezk7h07MQXkJNYp/preview",
                        duration: "01h"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/12187Cc_2t32-TkQi2kLpj0ZGpIsLctFj/preview",
                        duration: "59m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/127GHpoyxYyhzDtBURJMTY0cyS2ZsP666/preview",
                        duration: "01h 29m"
                    },
                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12HhzRECuVgxd_u8IpwPPaQgfZ4u0Uz8D/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12YkVWOpdwawM2vmI52vLXG03MtiNyts5/preview",
                        duration: "01h 16m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12NyThWHdtW9e2PtXFaOzHlaF42g1Xgk5/preview",
                        duration: "59m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/12Pmbjnga_t8hge7ADvnm0G_v-aeEJOeC/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/12RUnO74BUdbQZJC8oHSCeTGksv3VIBAd/preview",
                        duration: "41m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/12XRs_NWpBW3kUGbh5z08HYgFIQHOKAIZ/preview",
                        duration: "01h 09m"
                    },
                ]
            },
            {
                s: 5,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12_beWyoCtJRfCWuEP_gGXxM744v_o7Jh/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12cAj_FpPON9hIBb9gmvKuEBYyDOmZnAm/preview",
                        duration: "01h 10m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12ieDgtj17khrrV2bI30xXzqzLzVN3tmk/preview",
                        duration: "01h 07m"
                    },
                ]
            },
            {
                s: 6,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12ymJVL5WR5dXp56mEiJU2E_EKZt5r4BF/preview",
                        duration: "58m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12tcA5JlJMtZmhF2y1MOE1TfhLAFv8mvm/preview",
                        duration: "56m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/13B61GgmFOFfYJ-DFSfAUSNKdwNrzjUUK/preview",
                        duration: "01h 20m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/133cwKkc7BQ7soe2QwF1PlXOFKGrPTKFM/preview",
                        duration: "42m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/13747weP0VzAypMjwZ3EllPTTOu8A-UXZ/preview",
                        duration: "01h 14m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 153312,
        title: "Tulsa King",
        subtitle: "",
        description: "Depois de cumprir 25 anos de prisão, Dwight Manfredi é exilado sem cerimônia por seu chefe da máfia para se estabelecer em Oklahoma. Dwight lentamente constrói um novo império criminoso em Tulsa.",
        genero: [gen.acao, gen.drama, agp.crime],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-tS-HhxK-E4fe0m_l8B99WfHAYBIcPzs/preview",
                        duration: "41m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-w4_Ev87wZkqbq-t3UJTZgYrDG2wJ03i/preview",
                        duration: "36m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/102ITT91wxSt5i0xkWvuo0TO0SHXg4ZUG/preview",
                        duration: "38m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/10DArADlwU8QGUQp1UhHOkQBTyFMAcAkB/preview",
                        duration: "39m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/10EFzCx29gSDYiI7hQLJrBhVyE99ivcg9/preview",
                        duration: "36m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/10O8aQ6FUnuTQsCvHC7uubqF2-al_TNAH/preview",
                        duration: "39m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/10Q6RoUC7x_T3wnG5ce09piVmy4q7cC6p/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/10UPGxyGla41xAiAU0hNV4QoW2owBZshb/preview",
                        duration: ""
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/10WcakW6MChZFFHts0P-WT-87SVs7wiH0/preview",
                        duration: "36m"
                    },

                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10ZHmSzH-mbBeqAm5JMYDmdzeJMO1fZEi/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10auSvbnHRSK9elGbKFkJCZVXp9jRi3wD/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/10b6sc7CQXel9EN3evzxHMTNekd9Vh1yp/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/10cZ4YFR4wGSs6s-Nqps7z8eAULEmz685/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/10d9H7BkNMsl0cvPc7ONljnjNJAAKZsMI/preview",
                        duration: "40m"
                    },
                ]
            },
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 156933,
        title: "Acima de Qualquer Suspeita",
        subtitle: "",
        description: "Um assassinato hediondo deixa o escritório da Promotoria de Justiça de Chicago de cabeça para baixo quando um dos funcionários é suspeito do crime, o que deixa o acusado lutando para manter sua família unida.",
        genero: [gen.drama, agp.misterio, stm.apple],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1c7J-tWjJ8qUfZoTA5HDamhscjfSDpERr/preview",
                        duration: "45m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1yCkG9TTZgDsf3y9rZYgeJYrad2BtAqMw/preview",
                        duration: "43m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1nnXv2vol-M8O7bej8N8ryJbDL0zyeYur/preview",
                        duration: "42m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1uOSNXsRGlfUvCXENGAwjIx6EMmLAIpzs/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1EAwnOl-RoDXFYg9WVLp85-FErI72IYN3/preview",
                        duration: "40m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1zIPdENmuVGRGAH-_EGzy6318REzJ-3FX/preview",
                        duration: "42m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1A2CzhP5AOGKAFnxZGcrQbj9bdU6n31xx/preview",
                        duration: "42m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1XS9hubpTfBslG-0m9-kFaS1TfdJ_LiNq/preview",
                        duration: "50m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 124364,
        title: "Origem",
        subtitle: "",
        description: "Desvende o mistério de uma cidade no centro dos EUA. Enquanto os moradores lutam para manter um senso de normalidade, eles também devem sobreviver às ameaças da floresta ao redor, incluindo as criaturas aterrorizantes que surgem quando o sol se põe.",
        genero: [gen.terror, stm.gplay],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1vcjXTtYugpKZQtNdRIsnCW53NQ2gyLdp/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1pOtH8fbPfcz1isWFKCc16Pph4vSbZxIq/preview",
                        duration: "49m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/19ntKla8K_tjoydaOX-dFSVjn4CvoSEpP/preview",
                        duration: "55m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1p8rCGyfMLClGmJ0AoPUYq_z56-7c8nA4/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1MRbZ2SFmS3Yw8jIt_ZiVpvadUKrsH-9O/preview",
                        duration: "48m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1F1CmnvUurGP_0HZpYEhFtmb2YPbzUPOa/preview",
                        duration: "48m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1QSqv4PwbVgpKwlJkabxZhv2eZr5eakxJ/preview",
                        duration: "50m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1mgH17GoLmM62PlSqLzLleXptgPz1gRBT/preview",
                        duration: "55m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/10FHUZp6unKwkNSUZIfrccQihWP2582vr/preview",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1YPbwrb_iz8ElEctcP-GpbXNUPOkoejrg/preview",
                        duration: "47m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-2E9X1npjp0X6N80LMDbnvllr3S8R6jI/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-64cvJ0SldQAB7iXRqjy3MvmJq_06KWG/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-7eHJ4A63z56P1d8FlHDFrXDzCgQClfP/preview",
                        duration: "51m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-9OjmOCTSk30DgC_SliRmw64dZ4v06nm/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-BfbPcL12_x8ql37ZWSJHGVdUmbZzLi0/preview",
                        duration: "53m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-CtZZM1KGG_yz7SO_3mkLUyE_i0w2Gkz/preview",
                        duration: "49m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-Diwa9ZvBznNEuW64ECE66BW4RmZl-cc/preview",
                        duration: "49m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-E1rl9brpMvS4SPCX3_YlZ3_HzlCxcxd/preview",
                        duration: "45m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1-GZml6VfnzraakBWPrSTw6BTtE4fJsy_/preview",
                        duration: "46m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1-M8gJ9RelY4Yxp4rJcmeIaGXVrv32lDi/preview",
                        duration: "59m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 87689,
        title: "Warrior Nun",
        subtitle: "",
        description: "Warrior Nun é uma série de ação e aventura da Netflix que conta a história de Ava Silva (Alba Baptista), uma jovem que acorda em um necrotério e descobre que tem superpoderes e faz parte de uma seita secreta de freiras guerreiras",
        genero: [gen.acao, stm.netflix, lang.leg],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/15Wc0uxmKReExnYWG2qSk5cXjxPQV1tzK/preview",
                        duration: "50m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/15elQzMcLum00EIeIN3Wd-ShJn-DQ3dqe/preview",
                        duration: "40m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1GPLGDvZLKEBI6b5wTljqzW9v_F4klzsm/preview",
                        duration: "46m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1u-05BVIgs_IN-wAKr58oi6IomCaDOdjq/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1As0c_WH1nmP5ZKojvv3KVtqbFBY9lcp3/preview",
                        duration: "45m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Nn2M4KzlJqIvXSV4jXokLqyc2ood7qIq/preview",
                        duration: "46m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1rZUjgQeuUNw1kLvfs_oLWcQ0smHxMJ94/preview",
                        duration: "39m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1qaRgCUf4E7LHZsXDLELNQ2tW0pBoj07G/preview",
                        duration: "41m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1MGsMiTdC4o3RnvYrt4Tt4ltnl1jh0W5b/preview",
                        duration: "37m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/15gk7i-Oe27TuhjvdmHpMV0tUZaDTvWXk/preview",
                        duration: "42m"
                    },
                ]
            },
            {
                s: 2,
                lang: lang.leg,
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10IoLX1yzy8b6AcUiONAcFdGcff-EWWV4/preview",
                        duration: "42m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/18PmX0wK0xjoMtyW-BDuummjvsER39_Pl/preview",
                        duration: "42m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1R4LQrlAHnC-OYuEoGHI1J9QIt2NdZ6Fp/preview",
                        duration: "39m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1P-dJNrkDvzAEem8o3Gi2OyzkUhdnoOW7/preview",
                        duration: "39m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1odncw_rsH0ZQ6eaRiFJ3XG2oVcBiarHA/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1h9FcBHZzkT99j8HVoo5QsagTdSAq6gp_/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/13HmE-nQuVIU5cOIEE9XD9p20poeRKH9L/preview",
                        duration: "36m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1iDsGXVnFEOerTQh39vHpo4ILtznlcEJJ/preview",
                        duration: "52m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 125909,
        title: "Batman",
        subtitle: "Cruzado Encapuzado",
        description: "A série se passa em Gotham City, uma cidade onde os criminosos dominam e os cidadãos vivem em medo. O socialite Bruce Wayne se torna o Batman após uma tragédia pessoal. O Batman luta contra o crime sozinho, mas atrai aliados do Departamento de Polícia e da Prefeitura.",
        genero: [gen.animacao, agp.dc, agp.hero, stm.prime],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1Lzbk_rdO6LOwpBv6euOzWMW0oMYS5As0/preview",
                        duration: "25m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1QJinLDOki75_7dOdMSU0F8_iLoF-PfLc/preview",
                        duration: "25m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1ELJY9Jul2J5EMmTEP4rULfY2uN1x83PS/preview",
                        duration: "26m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1jdyT1X9knxZamJ6BPrEEEuXEAzlKpiRO/preview",
                        duration: "26m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1MdQ9GQDSbel4zFx6NkO-CO1W8vzCqb3M/preview",
                        duration: "26m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1g7-6kipnZbYidaBzkJB6-EbHWT9DBhhI/preview",
                        duration: "25m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1K4Mapb5pRQk1_ztEZrizrKG99vCs-40l/preview",
                        duration: "24m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11XlDm0t6xXkW0FZRW29Nn1vIj9XGtZji/preview",
                        duration: "26m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1qI0rb3B_BgbCYEmSp2Q3S7K6W-ZwyFL3/preview",
                        duration: "24m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1bAwyC01FprudJvD-87DQu5yyy9YsGnsr/preview",
                        duration: "25m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 100757,
        title: "Outer Banks",
        subtitle: "",
        description: "O jovem John convoca seus melhores amigos para procurarem por um tesouro ligado ao desaparecimento de seu pai. Aos poucos, o grupo vai entrando em uma perigosa trama de segredos e perigos.",
        genero: [gen.drama, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1sku_6g5qzSeu5L0R4A3AYyH6IEjzuLBx/preview",
                        duration: "54m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ezh_Ww3Np8Ui_RQpkpfKk06WhR1Xw8xq/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1lmPfMRh48NdFTGCzq8WpqwD5FMsG_IhA/preview",
                        duration: "46m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1m5C1UqS_il-wN0844WHH6CYNcHJvxqp1/preview",
                        duration: "49m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Sj_KfS9wQX66NQgKL7iYby3zZKJGb5AS/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1QfG9Mnvx58ELxo4BjYr3p5gCFlHimUsv/preview",
                        duration: "53m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1WBNJkPjnlZ_aALJ2bscMl5ivbPriSvo2/preview",
                        duration: "46m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1rtpHBOdlsv73UMG66fGkcM0I6r64hud5/preview",
                        duration: "46m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1_UMMBqReQk9hE9WWuflRMSgNJKUM1CPC/preview",
                        duration: "51m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1JRTOAqrL3V6Ff8QL0F8zQUedEDlT6Khu/preview",
                        duration: "56m"
                    },
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10cRDgiQS0Y0YYsZwU_QxGPUOK8lb2Lrr/preview",
                        duration: "51m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1YMXOgWLIyw9dC6PJlipSzOAsIb1FMMOi/preview",
                        duration: "54m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/17R9ObuO0gvaWmyIhhUZ9k5vfvHD3HbMg/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/14jLet2Zh7yBAPlOU8rh1SloXeNOva1KR/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/105B5beiHduEoPo2G4yu9h9mid2t1CpEi/preview",
                        duration: "49m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/19OPS5b6wzHUdJc6zni0FdBU5qQvVHXCW/preview",
                        duration: "46m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1rd0U8PpXsLH6pd7K02mlOmoNNhCAIuGu/preview",
                        duration: "43m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1p0JfObU3ym87_seFeF446VdfdMdeUscT/preview",
                        duration: "42m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1eePoA1d20jzeavfVF_6y7kmC4x79esUP/preview",
                        duration: "49m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1QzVVGhhQC1z0NpZYe6KWZK8SgTU1uJxx/preview",
                        duration: "01h 01m"
                    },

                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1SkChMiR3ZCEh25UAWcTx_ID6Mln1y-8s/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1pP0otEwgtqdsyoWzYqg5PRqtUbzCW9_8/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1HYjK7Wz9YoCOvWyuMEpkOuCutsDE-Vi7/preview",
                        duration: "48m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1iMbw7SJ4VY7wGyy-T0SrYjALKAC58_I7/preview",
                        duration: "45m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1pUsI0QD72dCIJ25pR8UczXPxflgdDJxg/preview",
                        duration: "54m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1I8Mn-uwlM6w2Zg0rVoPdHU_mzn-qR_j8/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Rzf5Ru76Cjgy5ad7i5nC4vGPF6phoReI/preview",
                        duration: "53m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-fXKnwXPPTtlpY9MH62GSr7cAw0cCVog/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1Qs3g-PEmmsazhkMMvkj2vXmU1HJNKZOA/preview",
                        duration: "54m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/17jm0GMa3ZhbyB3Ch-88rOyHoRllmSRXk/preview",
                        duration: "01h 19m"
                    },
                ]
            },

            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12Y4_TlxtrOjjxsuWdaFyeOZLnRGvH6an/preview",
                        duration: "48m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12Y5Ll8UpLMZxt0WBpoi2onYdEe64KNUv/preview",
                        duration: "46m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12YUsg5U9aP0mua5Ae23he7Un_4sNEI9Y/preview",
                        duration: "40m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/12ZWTLctd2EUc4d0e06mR0BVNypQyNlhL/preview",
                        duration: "43m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/12gNtxmFLISLAyQmfJOqKmg-NuICNRzFB/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/12o-Mm7sS7PJBwqvl6b7nfKIZGucV7I1F/preview",
                        duration: "52m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/12vlbesFS_eEkazsioZgGpDVzKdflUZAR/preview",
                        duration: "44m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/12yxhTf5IS5eUFyYyCLTugx_HHECxzPXU/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/134_JP4QWiTwHEDAtC-3WJs_hUDxWxU0T/preview",
                        duration: "52m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/13A784xiakv9GwEzHz094TZEeMm0o1jv6/preview",
                        duration: "01h 25m"
                    }
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 13916,
        title: "Death Note",
        subtitle: "",
        description: "Um inteligente estudante do ensino médio embarca em uma cruzada secreta para eliminar os criminosos do mundo depois de descobrir um caderno capaz de matar qualquer pessoa cujo nome está escrito nele.",
        genero: [gen.animacao, agp.manga],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1dddc5tLX0s5mtvnKrbGn157DmvwGjygD/preview",
                        duration: "22m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-JPXFqyA5DIdAZ1GC0eI4QcUbQ2F7_r6/preview",
                        duration: "22m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1VR3mIGor8VUBG2vBZpoLwqhUC8jYV9WT/preview",
                        duration: "22m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1No_CaqG8xrJpkfQY87wDMNG-ECtzzydf/preview",
                        duration: "22m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1vdnzEPE0rv8c6FWnWmqQQRif6slWlSC1/preview",
                        duration: "22m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1lpa_BDi0JdnvP3XtbukPdv5AJpGbkNJY/preview",
                        duration: "22m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1gfYMKayZsIoNrbgC_5P9nQQOzFQBTa6_/preview",
                        duration: "22m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1ZI9SXuV4NE2Nh7PsPArEhFGsFkKKrguu/preview",
                        duration: "22m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1wwfG1fuiSRZ3fR6CK4M1UlLsuqfhYCIM/preview",
                        duration: "22m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1-9lrHXPSFmLWIBIL03TYNREdrV9Abzt6/preview",
                        duration: "22m"
                    },
                    {
                        ep: 11,
                        src: "https://drive.google.com/file/d/1XfajWVkIDAf-14a1wRITwJgUEak8RSlh/preview",
                        duration: "22m"
                    },
                    {
                        ep: 12,
                        src: "https://drive.google.com/file/d/1G9cWOufuD-fvbfkss8V-J8fr7UYeucbp/preview",
                        duration: "22m"
                    },
                    {
                        ep: 13,
                        src: "https://drive.google.com/file/d/1-YmqGq24j8wC127UxjCPOWtNlYcGPd7M/preview",
                        duration: "22m"
                    },
                    {
                        ep: 14,
                        src: "https://drive.google.com/file/d/1QSfXzQ77g3i-hYmfNWjLS6wSj58sz4eH/preview",
                        duration: "22m"
                    },
                    {
                        ep: 15,
                        src: "https://drive.google.com/file/d/1PaaCb2YZBL9VJWn9Be2NUuClDai57awv/preview",
                        duration: "22m"
                    },
                    {
                        ep: 16,
                        src: "https://drive.google.com/file/d/1H6nrh2JTSFRPvWvoimZZzcUiSYEhJst0/preview",
                        duration: "22m"
                    },
                    {
                        ep: 17,
                        src: "https://drive.google.com/file/d/1vd59I4quhxtDWVDKPaq-P-TQ46-E264d/preview",
                        duration: "22m"
                    },
                    {
                        ep: 18,
                        src: "https://drive.google.com/file/d/1bwSmwM_e4o6AFAUYYyjF8NJa3fyQJK3l/preview",
                        duration: "22m"
                    },
                    {
                        ep: 19,
                        src: "https://drive.google.com/file/d/15e1ao8HxPYzg-sGujSm0LcMBHBJWE4P3/preview",
                        duration: "22m"
                    },
                    {
                        ep: 20,
                        src: "https://drive.google.com/file/d/1NJ5poMOJvCPoWJ7tDSYioYkGQ8Qrp6Tu/preview",
                        duration: "22m"
                    },
                    {
                        ep: 21,
                        src: "https://drive.google.com/file/d/1yscVm-cBUk5v5YrNsFj0dyO208EvweWi/preview",
                        duration: "22m"
                    },
                    {
                        ep: 22,
                        src: "https://drive.google.com/file/d/12Qdup_JiZx1VM9Ud1cQ2V2aVb0RZ4V1J/preview",
                        duration: "22m"
                    },
                    {
                        ep: 23,
                        src: "https://drive.google.com/file/d/1DImsgxJfPRxx8LsQ8JqEBp_ukO49Fy7m/preview",
                        duration: "22m"
                    },
                    {
                        ep: 24,
                        src: "https://drive.google.com/file/d/1QBpmrQ07VwUbdYh6JrOSGnbj2Pv6Lrfv/preview",
                        duration: "22m"
                    },
                    {
                        ep: 25,
                        src: "https://drive.google.com/file/d/1pckLnagOUGNPtubeKg-awlTNREJ9ENA1/preview",
                        duration: "22m"
                    },
                    {
                        ep: 26,
                        src: "https://drive.google.com/file/d/1SNXXy4mOjyacQaOwp8DaT3xzY2dSZToK/preview",
                        duration: "22m"
                    },
                    {
                        ep: 27,
                        src: "https://drive.google.com/file/d/1WFm0JARmtRTX9miSFE3VeV4VTugCGNA-/preview",
                        duration: "22m"
                    },
                    {
                        ep: 28,
                        src: "https://drive.google.com/file/d/1avdWS65bjTuHYybF27W_B-sFCcYMClT3/preview",
                        duration: "22m"
                    },
                    {
                        ep: 29,
                        src: "https://drive.google.com/file/d/17-z_oZ5aTtxD88jfhJOJsPS_EOdpRGEr/preview",
                        duration: "22m"
                    },
                    {
                        ep: 30,
                        src: "https://drive.google.com/file/d/1V8Nlmd73GLowylckVMATZgybzEbxAAQ_/preview",
                        duration: "22m"
                    },
                    {
                        ep: 31,
                        src: "https://drive.google.com/file/d/15LLLYda89GPGFO6QgNGliA4Lmlbw6zO_/preview",
                        duration: "22m"
                    },
                    {
                        ep: 32,
                        src: "https://drive.google.com/file/d/1MiWWF5LkXDDkHyrsY7ofTCoLgbOkzUIz/preview",
                        duration: "22m"
                    },
                    {
                        ep: 33,
                        src: "https://drive.google.com/file/d/1z73QxmSbd34wweq_X84OxFh-avy0Tge-/preview",
                        duration: "22m"
                    },
                    {
                        ep: 34,
                        src: "https://drive.google.com/file/d/1G0f1GlINXO8oquVt5Nr8lfXVy_vIEzZC/preview",
                        duration: "22m"
                    },
                    {
                        ep: 35,
                        src: "https://drive.google.com/file/d/1TYU0QaxpYHCdheuTPgT2qyytoePB8rJP/preview",
                        duration: "22m"
                    },
                    {
                        ep: 36,
                        src: "https://drive.google.com/file/d/1BSGcBjX_9dKvxq0kbUK797Eor-pRU5v2/preview",
                        duration: "22m"
                    },
                    {
                        ep: 37,
                        src: "https://drive.google.com/file/d/16edz5J_mmiNSylnnhJxSdGgh9bsvcawY/preview",
                        duration: "22m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 94997,
        title: "A Casa do Dragão",
        subtitle: "",
        description: "A Casa do Dragão é uma série de TV norte-americana que conta a história de uma guerra civil entre a Casa Targaryen, que se passa 200 anos antes dos eventos de Game of Thrones",
        genero: [gen.fantasia, gen.ficcao, stm.hbo],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/17PHQzRwhRBC1ArGBH6SG25snjC64rUmc/preview",
                        duration: "01h 05m"
                    }, {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-QX2RYW7Mhv48VfQavybXWbL5knMi5PJ/preview",
                        duration: "53m"
                    }, {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-T2aL0IJy0WGjBePIux8nndRAHqXloHL/preview",
                        duration: "01h 03m"
                    }, {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-u4igpi6tb0-vuma0sDNgt0Khugd-_k1/preview",
                        duration: "01h 02m"
                    }, {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-vqE8HecEbvwZSw956H4tknnUQE-14Ap/preview",
                        duration: "59m"
                    }, {
                        ep: 6,
                        src: "https://drive.google.com/file/d/10-a8FiVPCOdA3LYrssSVsNpsgIS0m7-9/preview",
                        duration: "01h 07m"
                    }, {
                        ep: 7,
                        src: "https://drive.google.com/file/d/17QX6wvv9-jvUJkxEcX36XYZVEkal74Xu/preview",
                        duration: "58m"
                    }, {
                        ep: 8,
                        src: "https://drive.google.com/file/d/101bDbeWurUbEwuBItJRorBCZXgfg0Tvb/preview",
                        duration: "01h 07m"
                    }, {
                        ep: 9,
                        src: "https://drive.google.com/file/d/101hW3o3NYRFSJ-CRwELfNlT_WQtSCE8O/preview",
                        duration: "57m"
                    }, {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1054pbakcI7y9r8Ryz7Qedej6volhdCfM/preview",
                        duration: "59m"
                    }
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1f6O_CLZhdFLeE3iyx2f03njrBAVauI3i/preview",
                        duration: "58m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10fQXVnR3TojES-OuR2eXJli0NmWXD35S/preview",
                        duration: "01h 08m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1o7YuuFSjYstIHeAHXUPh_YwhAmLu7IJs/preview",
                        duration: "01h 06m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-lzrMcBVxXM0DCjqBXKgDVDjDnm-x9vD/preview",
                        duration: "55m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1J9BV71vfeyE7egUw0oxAnnOMsILEWJVO/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/10fatlAfOzsfNA0OOJkbZsUUcLxtEvWkH/preview",
                        duration: "01h 07m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1N88wnahrd3Z05n23PUp1Pkj9LQyEa7Ms/preview",
                        duration: "01h 03m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/10jhM_L-Kcic1zFcAYN6zdNNXmbeIJpFo/preview",
                        duration: "01h 09m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 113988,
        title: "Dahmer",
        subtitle: "Um Canibal Americano",
        description: "Por mais de uma década, Jeffrey Dahmer conseguiu matar 17 jovens rapazes sem levantar suspeitas da polícia. Como ele conseguiu evitar a prisão por tanto tempo? Assista o quanto quiser. Evan Peters, Richard Jenkins e Niecy Nash estrelam esta série policial com produção executiva de Peters e Ryan Murphy.",
        genero: [gen.drama, gen.terror, stm.netflix],
        faixa: "18",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1vFGL3qEF4cysnRqSS6rBtoYFjczBEQXC/preview",
                        duration: "49m"
                    }, {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1ngXgwD7M3lCcrPcZ5wxwVU1OnDozLrxo/preview",
                        duration: "52m"
                    }, {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1OLcHEHKO5TeyajAyqu24soecAhZY71Kg/preview",
                        duration: "53m"
                    }, {
                        ep: 4,
                        src: "https://drive.google.com/file/d/178ja5fXaSHGYlrPg6RS7hhWFHNfv-fEB/preview",
                        duration: "01h 03m"
                    }, {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1o8e95iFH4eWwibQNNsuAJ0f6ms4rP2KN/preview",
                        duration: "59m"
                    }, {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1QMFeySyAhMKoNjouETqYawRLo3qCUVzi/preview",
                        duration: "55m"
                    }, {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1RMydVQQjrl9255IzWDIrK2HnTh7zaWad/preview",
                        duration: "45m"
                    }, {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1yv1bKh9DPO60betBHGvZgbj8Ujvua6gB/preview",
                        duration: "47m"
                    }, {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1OUwl2ufhwJsD1KfcBrAE1Nn9UCY60NOn/preview",
                        duration: "49m"
                    }, {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1pRRHJdqSrTljBZ--TZeW39gsyC0kLgAJ/preview",
                        duration: "54m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 239287,
        title: "O Exterminador do Futuro",
        subtitle: "Zero",
        description: "Em 1997, um cientista atormentado deixa a família de lado por um projeto. Em 2022, uma guerreira rebelde luta contra um poderoso robô por conta de dados vitais.",
        genero: [agp.violent, gen.animacao, gen.ficcao, gen.acao, agp.manga, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/10ykHnshR1UvQqemVSj66dac9Q7z2KPaa/preview",
                        duration: "28m"
                    }, {
                        ep: 2,
                        src: "https://drive.google.com/file/d/10zVOdWMF8wVov4qW3V4nnSmTkwKagkQP/preview",
                        duration: "28m"
                    }, {
                        ep: 3,
                        src: "https://drive.google.com/file/d/11-AhSzxG37F-EQc3evz75ZDpc1tbNZMA/preview",
                        duration: "29m"
                    }, {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1138vvZpD5Eo_VTEvzUvZttNKtpZr3d8H/preview",
                        duration: "27m"
                    }, {
                        ep: 5,
                        src: "https://drive.google.com/file/d/113bQWWc4ttrXD4EacOmfxNLZLN2hVSkC/preview",
                        duration: "29m"
                    }, {
                        ep: 6,
                        src: "https://drive.google.com/file/d/11D4cUJUrvEzsosZ0IzvypS8RGGfBld0Y/preview",
                        duration: "25m"
                    }, {
                        ep: 7,
                        src: "https://drive.google.com/file/d/11DU-X2RE5ovjpWRw13rsgJ6NIwdWrBve/preview",
                        duration: "28m"
                    }, {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11JeknnP-0uL6XUm09Y4kIB5SezOmfA_S/preview",
                        duration: "28m"
                    }
                ]
            }
        ]

    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 218342,
        title: "Manual de Assassinato para Boas Garotas",
        subtitle: "",
        description: "Cinco anos após o assassinato de uma adolescente de 17 anos em uma cidadezinha inglesa pacata, uma estudante decide investigar o caso.",
        genero: [gen.suspense, gen.drama, agp.misterio, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1YTJf17cGZvNq93m_Y_uZMT0oOaO6FQ45/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1vdUhlYFl0IOXJwB1BOEZIN4geJSwJeM0/preview",
                        duration: "44m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1WQEEER-Bef8WrfKhJojcRtBUQkgnSMzC/preview",
                        duration: "43m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1XxPPuvf687SC6wyW1Bh9JJDliXqctRr8/preview",
                        duration: "44m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1jNXdceeiI28RS9sM6m2a1diCKr79UEdx/preview",
                        duration: "50m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1QEbSNvpOgRWxxsyDQkk39pi7VvRilKzM/preview",
                        duration: "51m"
                    },
                ]
            }
        ]

    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 75006,
        title: "The Umbrella Academy",
        subtitle: "",
        description: "Irmãos com poderes extraordinários se reúnem depois de passar muito tempo afastados e descobrem surpreendentes segredos de família. A família enfrenta viagens no tempo, assassinos e o fim do mundo.",
        genero: [gen.drama, gen.comedia, gen.ficcao, gen.acao, stm.netflix],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1V4_acUj8cj-5pUMZIPMKZ8yFC9OutcFX/preview",
                        duration: "59m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1tFvG9YMkq4CwKeZwMLlZzQ_QJoj9E_oC/preview",
                        duration: "57m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/14eEy8DK_iDOfClxtE8fHN0eZMxvixJKS/preview",
                        duration: "56m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/18muh58KV3qrT7XuPkJWhOxVu0acgb9k0/preview",
                        duration: "57m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1tZJeM_OOMkZZdS9tOPWRw50ZQ9AE-bXc/preview",
                        duration: "01h"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/14P3JBolCyRzb_rzbuKPGvhDEzj1dMWDE/preview",
                        duration: "58m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1AwWu7Bzdk-AA3Fl26mtxWVWzEHuHpZMI/preview",
                        duration: "56m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1McDHl_tHfygLEUYxz-P6gBouzrJl-YFB/preview",
                        duration: "52m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1ZieKPMFyRB7drNkX5j0au1Go6ZrsT-_H/preview",
                        duration: "45m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/19M-ok8y31OLllYpiHoZRGpf0hyD2KFxI/preview",
                        duration: "47m"
                    }
                ]

            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/13dmACd450LXVG6wgz5hjijQPyO_cWVGD/preview",
                        duration: "47m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1gkvDmDKCzz3woY-A1UDTncmuqsv8w2Fz/preview",
                        duration: "48m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1RbFQ1vuJxrKq9MDradMMxFhLGlR27U2z/preview",
                        duration: "48m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/15zGm-oe3ELb93QW7sujBp-3pIulD0oNz/preview",
                        duration: "48m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/13xy7K5H7FWnBE6fxMwE_qq2hLFEYA1LG/preview",
                        duration: "47m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1cv1Og0Fd4h4rEuqM9dO8OYvFYri1WWb7/preview",
                        duration: "50m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1eNJBMiMDIS_XmKYeO_v89zMiTa4-tdsk/preview",
                        duration: "47m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1inOA4SXgTOsSA6F-HQMnCiLekgOmsNFx/preview",
                        duration: "46m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1nvSqY8yFm6L_mXnQm8Qi2_ttkUg8t4e_/preview",
                        duration: "40m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1izlJRsicA8F3g0PaIv6IoyXPPQ4E8PHl/preview",
                        duration: "47m"
                    }
                ]
            },
            {
                s: 3,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1tYwitFjCRNm_gGl56BkXqvVa2q4fr9AS/preview",
                        duration: "50m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1BleRIHZCJZQnaGQZujg8iy5kKVSLN32z/preview",
                        duration: "52m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1JFY4v0rYE1c37p1TwvcQIfQba-zguuGD/preview",
                        duration: "49m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-YMZMI2uW01K8aSjGjn6e_hBUjhNxWZx/preview",
                        duration: "51m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Jw1voXrCjGfMRHsa5yhPZmNcA8FOEz64/preview",
                        duration: "44m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1Sp0Jy6gPnC_3LTOhjNmT7eqNZjLj3Tpd/preview",
                        duration: "48m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/16e1ds9sBUVkbeJBSPdzrw0H6DWohyvON/preview",
                        duration: "52m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1H_0NpV98vf7kfCe8a0ew05eXegCHyhx_/preview",
                        duration: "49m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1uTAIYT4LRCnuIJV-054AFnkfik3J4fws/preview",
                        duration: "40m"
                    },
                    {
                        ep: 10,
                        src: "https://drive.google.com/file/d/1sT6KdI7joNplohn7a-QRiRkNDJ9ar9yt/preview",
                        duration: "49m"
                    }

                ]
            },
            {
                s: 4,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-nL0RnzZw2s7nBKoNSBW76bFMhejkKmQ/preview",
                        duration: "52m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1J5W4ONtntDp7evZlEIBwaED34VPQCIok/preview",
                        duration: "47m"
                    },
                    {
                        ep: 3,
                        src: "ttps://drive.google.com/file/d/1hhw3QLIO9JO-i0AeR-HGxmxZiwwRHKOy/preview",
                        duration: "56m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/10Kzp1BeqmC5maoimICDMNuIjauJ8h1ue/preview",
                        duration: "55m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1F5Ua4flubRDr-YPnHZIuefWdyJ4NClGu/preview",
                        duration: "58m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1aa9L6upBrIu4xh8NR6mfMbziyZRqFPwh/preview",
                        duration: "01h 09m"
                    },
                ]
            }
        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 94605,
        title: "Arcane",
        subtitle: "League of Legends",
        description: "Em meio ao conflito entre as cidades-gêmeas de Piltover e Zaun, duas irmãs lutam em lados opostos de uma guerra entre tecnologias mágicas e convicções incompatíveis.",
        genero: [gen.acao, stm.netflix, gen.animacao, gen.fantasia],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1MJ4kg4s5e78ty8xO-3NgyC58YOUgWapr/preview",
                        duration: "43m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1MMY6Rg_FB9Gk4bb3ppIjOEs4PmxZV250/preview",
                        duration: "40m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1MOBNvQlM6FkaKOUbHTtipB4IW88kYws2/preview",
                        duration: "44m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1MTqOlt_QWQvCb-ORbb_xGVNUJF170xHy/preview",
                        duration: "40m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1Mc9SBdd3TXBU9HaoOftalASMf9vzCjOA/preview",
                        duration: "40m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1MnS7wH2XgBFnSlo_Uj5inKlGKwcYrTtW/preview",
                        duration: "41m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1Mp46LBXDD0EqMovVuA9NXWBRGluDzQ14/preview",
                        duration: "39m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1N7lbod4B6qjZIGsZOP_ug_jRQQuSg3Sz/preview",
                        duration: "40m"
                    },
                    {
                        ep: 9,
                        src: "https://drive.google.com/file/d/1N9c6-JbdfHTy4AQIZEegkwKa8Enm4CT6/preview",
                        duration: "40m"
                    }
                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/12_55XTxNNTC-hoJuj414-WiGXZXuYLdH/preview",
                        duration: '40m'
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/12iOryKcwLkeix7jRquixWM_Hz-8tTufY/preview",
                        duration: '39m'
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/12jgA2JY1A-RYr2_67-nwgBJYUFWm62Bl/preview",
                        duration: '40m'
                    }
                ]
            }
        ]

    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 194764,
        title: "Pinguim",
        subtitle: "",
        description: "Colin Farrell retorna como Oswald 'Oz' Cobb, O Pinguim, para conquistar Gotham neste novo capítulo da saga Batman de Matt Reeves.",
        genero: [gen.suspense, agp.dc, agp.crime, agp.vilian, stm.hbo],
        faixa: "A16",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1aO_KxlteQQSn5hAKgltEEpdlFNSVze-k/preview",
                        duration: "01h 06m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1--C4tA_jXmWi0fUgy2VAX5ZE7jba1OCC/preview",
                        duration: "55m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-8c96v9SMMnHTh5zvgHiTK4j-E7gariv/preview",
                        duration: "59m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-8c96v9SMMnHTh5zvgHiTK4j-E7gariv/preview",
                        duration: "59m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/10uCijD7HEk7jLXfaNjeNoSiqfDnPndre/preview",
                        duration: "59m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/11CBXTn_sfzWWFkdXCiuSP1ZkxFBD07Sg/preview ",
                        duration: "58m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/11J-pCpqMVQLFw62X3dEORbTCre6WKDZ9/preview ",
                        duration: "58m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/11VRmhj3tkpl1R3eoCq_TyC2CdvadM-pL/preview",
                        duration: "01h 07m"
                    }

                ]
            },

        ]
    },
    {
        background: background,
        overlay: overlay,
        tmdbID: 84773,
        title: "O Senhor dos Anéis",
        subtitle: "Os Aneis de Poder",
        description: "Antes da jornada de Frodo pela Terra-Média, a Segunda Era foi palco de diversas lendas heróicas. O drama épico que se passa milhares de anos antes de A Sociedade do Anel, tem foco em um momento da história em que grandes poderes foram forjados, reinos ascenderam e também ruíram, ao mesmo tempo em que heróis foram testados e tiveram a esperança quase aniquilada pelo grande vilão do universo de Senhor dos Anéis. A série começa em um momento de paz, quando o elenco de novos e antigos personagens precisam enfrentar o ressurgimento do mal, vindo das profundezas mais escuras das Montanhas Sombrias. Os reinos e personagens irão esculpir legados que viverão por muito tempo depois que eles se forem.",
        genero: [gen.drama, gen.fantasia, stm.prime],
        faixa: "A14",
        season: [
            {
                s: 1,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1-Lf6EZp3cVDXWfDe_uG1AoRB46RbXtu1/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-SnsnE6lLjoy94KOGlXIpvWywtnyZHUn/preview",
                        duration: "01h 07m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-hI8kf1rLAevU-EQPZIcFTD444uOPv_-/preview",
                        duration: "01h 09m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1-nMuTuwD8ikrN9wDQSXz7C12MrAZXt8J/preview",
                        duration: "01h 11m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1-pFzOvi2UeL8hXimy88e6g5fEPiA0M6W/preview",
                        duration: "01h 12m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1-pKqAWAhoA2eaIDSICBRNtzrwkv4MA9M/preview",
                        duration: "01h 09m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-wSRKgX7BDQHNxO8oqTRvqUR48feCX8g/preview",
                        duration: "01h 12m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1-wVqWDXFzBs3oKKtQkTOZfo2oqn_HJQ1/preview",
                        duration: "01h 12m"
                    }

                ]
            },
            {
                s: 2,
                lang: "Dublado",
                episodes: [
                    {
                        ep: 1,
                        src: "https://drive.google.com/file/d/1--P0EvlLrCmXIlIAeHXV_DX6QeSEDH7L/preview",
                        duration: "01h 16m"
                    },
                    {
                        ep: 2,
                        src: "https://drive.google.com/file/d/1-22tUCC-rI-tUbW0QnSrZZ5H_Tds0tpM/preview",
                        duration: "01h 02m"
                    },
                    {
                        ep: 3,
                        src: "https://drive.google.com/file/d/1-D_I4rvjOIWYziFmHK5F2perj4EEaczC/preview",
                        duration: "01h 06m"
                    },
                    {
                        ep: 4,
                        src: "https://drive.google.com/file/d/1Vqonz2q2vbukaGzyNG45i1kyv21y807V/preview",
                        duration: "01h 05m"
                    },
                    {
                        ep: 5,
                        src: "https://drive.google.com/file/d/1H8JSMWxSjnmBOZV-3IW_HHhnQZFUcerc/preview",
                        duration: "01h 01m"
                    },
                    {
                        ep: 6,
                        src: "https://drive.google.com/file/d/1MqI7q6fvahPSMQsc7fFJjEEn0_Tj0vUN/preview",
                        duration: "01h 06m"
                    },
                    {
                        ep: 7,
                        src: "https://drive.google.com/file/d/1-iZfqvvbkwNqZh8jF4j0NSaNBxa93eL8/preview",
                        duration: "01h 12m"
                    },
                    {
                        ep: 8,
                        src: "https://drive.google.com/file/d/1oXwtGm4FaxgIEqhDLSlGMPC7IK7dJBCV/preview",
                        duration: "01h 17m"
                    }
                ]
            }
        ]
    }
]