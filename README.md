# 🎥 Projeto FlixNext

Seja bem vindo ao repositório da plataforma de Streaming FlixNext.

Este projeto foi desenvolvido com foco em performance e uma experiência de usuário, permitindo que usuários explorem, pesquisem e assistam a conteúdos diversos de forma gratuita.

## 🚀 Funcionalidades

- **Catálogo de Filmes e Séries**: Sessões de filmes e séries agrupados por gênero com imagens, descrições, avaliações e classificação indicativa.
- **Sistema de Pesquisa**: Busca inteligente de títulos de forma fácil por nome ou subtítulo.
- **Página da Série**: Informações sobre a série, incluindo lista de temporadas e informações sobre os episódios.
- **Carrossel de Destaques**: Apresentação dos conteúdos incluídos na plataforma.
- **Contas de Usuários**: Criação de contas de usuários para reprodução de filmes, sendo possível personalizar avatar e receber emails sobre as principais adições ao catálogo.
- **Reprodução de Vídeos**: Integração para streaming.
- **Responsividadee**: Interface adaptável para dispositivos móveis, tablets e desktops.

## 🛠️ Tecnologias Utilizadas

- **Next.js**: Framework React para renderização otimizada (SSR e SSG).
- **TypeScript**: Superset para maior segurança, redução de erros e escalabilidade no código.
- **SASS**: Pré-processador para estilização avançada.
- **Express**: Framework Backend escrito em javascript para gerenciamento de APIs, comunicação com banco de dados e autenticação.
- **PostgreSQL**: Banco de dados relacional.
- **TMDB API**: Integração para obtenção de informações sobre filmes e séries.

## 🎨 Estrutura de Pastas

```plaintext
├── backend/
│   ├── prisma/             # Configuração do banco de dados com Prisma
│   └── src/             
│   │   ├── @types/         # Tipagem e Interfaces
│   │   ├── Controllers/    # Controladores
│   │   ├── prisma/         # Configuração do prismaClient
└───└───├── Services/       # Serviços de comunicação com backend
├── frontend/
│   └── public/             # Arquivos estáticos (imagens, ícones, etc.)
│   └── src/
│   │   ├── @types/         # Tipagens e Interfaces
│   │   ├── components/     # Componentes reutilizáveis (botões, cards, etc.)
│   │   ├── js/             # Informações dos títulos disponíveis
│   │   ├── pages/          # Páginas da aplicação
│   │   ├── styles/         # Estilos globais e variáveis SASS
└───└───├── services/       # Integração com APIs externas, Funções auxiliares e Microsserviços
```

## ⚙️ Como Executar o Projeto

Siga os passos abaixo para rodar o projeto localmente:

### Pré-requisitos

- Node.js instalado (v16 ou superior).
- npm ou yarn como gerenciador de pacotes.
- PostgreSQL configurado e rodando.
- Conta e chave de API no TMDB (The Movie Database).

### Passo a passo

```bash
1. Clone o repositório utilizando o comando git clone https://github.com/NanoThecnolog/Streaming.git e entre na pasta do projeto com o comando cd Streaming.
2. Instale as dependências do projeto utilizando npm install ou yarn install.
3. Configure as variáveis de ambiente criando um arquivo .env com base no .env.example e preencha as informações necessárias, incluindo a sua chave de API do TMDB.
4. Execute as migrações do banco de dados com o comando npx prisma migrate dev.
5. Inicie o servidor utilizando npm run dev ou yarn dev.
6. Acesse a aplicação no navegador por meio do endereço http://localhost:3000.
```

## 📄 Licença

Este projeto está sob a licença CC-BY-NC-1.0. Para mais detalhes, entre em contato.

---

Feito com ❤️ e código por [NanoThecnolog](https://github.com/NanoThecnolog). Sinta-se à vontade para entrar em contato!