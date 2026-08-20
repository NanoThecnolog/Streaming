# Flixnext Frontend Web

Frontend Next.js (Pages Router) do ecossistema Flixnext. Atua como BFF (Backend for Frontend): nunca chama microsserviços diretamente — todo acesso passa por API Routes com proxy e injeção de credenciais de serviço.

## Tecnologias

- **Next.js 14 (Pages Router)** com SSR/SSG;
- **React 18** + MUI 6 + Emotion;
- **SASS/SCSS** com variáveis e mixins;
- **HLS.js** para reprodução de vídeo (HLS);
- **Axios** para comunicação com os serviços via BFF.

## Estrutura principal

```text
src/
├── @types/       # Tipagens compartilhadas
├── classes/      # Serviços cliente (MongoContent, TMDB, Flixclass, etc.)
├── components/   # Componentes de UI
├── contexts/     # Context API (FlixContext, ThemeContext)
├── data/         # Dados estáticos do catálogo
├── hooks/        # Hooks customizados
├── pages/        # Páginas + API Routes (BFF)
├── services/     # Clientes HTTP (apiManager, apiTMDB, etc.)
├── server/       # Mecanismo BFF proxy (proxyRequest.ts)
├── styles/       # Estilos globais (SCSS)
└── utils/        # Funções utilitárias
```

## Reprodução de vídeo protegida

O conteúdo do bucket Backblaze B2 é protegido por **URLs assinadas com validade**. O fluxo de reprodução:

1. O frontend solicita a URL assinada via BFF (`/api/content/stream/...`), que injeta a chave do Content Manager — o token nunca chega ao navegador.
2. O Content Manager consulta o `src` no MongoDB e gera a URL com token efêmero de download.
3. O `PlayerHLS` usa `xhrSetup` do HLS.js para anexar o token aos segmentos `.ts`/subtitle do HLS no próprio navegador.
4. Acesso direto à URL (sem autenticação) é negado pelo bucket (allPrivate + CORS restrito).

Métodos consumidos em `src/classes/MongoContent.ts`: `getMovieStreamUrl`, `getSerieEpisodeStreamUrl`, `getTrailerStreamUrl`.

Detalhes completos em `docs/architecture/20-playback-security.md`.

## Configuração

```text
NEXT_PUBLIC_RENDER=http://localhost:5479              # Backend Core
NEXT_PUBLIC_SUBMANAGER_URL=http://localhost:3120       # Subscription Service
NEXT_PUBLIC_MENSAGERIA=http://localhost:4556           # Mensageria
NEXT_PUBLIC_CONTENT_MANAGER_URL=http://localhost:4300  # Content Manager
NEXT_PUBLIC_WEBSITE_LINK=http://localhost:3000
```

A chave do Content Manager (`API_KEY`) é usada apenas em ambiente de servidor (BFF).