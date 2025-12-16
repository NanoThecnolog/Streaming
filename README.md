# 🎥 FlixNext: Plataforma de Streaming

Seja bem-vindo ao repositório da plataforma de Streaming **FlixNext**.

Este projeto foi concebido com o intuito de oferecer uma experiência imersiva e otimizada para exploração, pesquisa e consumo de conteúdos audiovisuais. Apresentado como protótipo funcional, o sistema integra práticas avançadas de desenvolvimento e design, configurando-se como o Trabalho de Conclusão de Curso para o Bacharelado em Sistemas de Informação. Este projeto também serve como uma simulação completa de um serviço de streaming, em todos os sentidos.

---

## 🚀 Funcionalidades Principais

- **Catálogo de Filmes e Séries**: Navegação intuitiva com agrupamento por gênero e imagens promocionais de alta qualidade.
- **Carrossel de Destaques**: Exibição dinâmica e visualmente atraente dos conteúdos mais relevantes.
- **Sistema de Recomendação Inteligente**: Sugestões personalizadas com base no comportamento e preferências do usuário.
- **Pesquisa Avançada**: Busca robusta e eficiente por títulos e subtítulos.
- **Página de Filmes**: Informações detalhadas, incluindo trailer, avaliações, elenco e conteúdos relacionados.
- **Página de Séries**: Visualização estruturada de temporadas, episódios e elenco principal.
- **Gerenciamento de Contas de Usuário**: Personalização de avatares e notificações por e-mail para novos lançamentos.
- **Autenticação Segura**: Validação de credenciais com tokens para recuperação de contas.
- **Email Service Automatizado**: Comunicação eficiente para ativação de contas, recuperação de senhas e marketing.
- **Reprodução de Vídeos**: Streaming de alta performance.
- **Interface Responsiva**: Design adaptável a dispositivos móveis, tablets e desktops.

---

## 💻 Tecnologias Adotadas

A escolha tecnológica reflete o compromisso com performance, segurança e escalabilidade:

- **Next.js**: Framework React para renderização otimizada (SSR e SSG), essencial para SEO e usabilidade.
- **TypeScript**: Superset de JavaScript, fornecendo maior robustez e escalabilidade ao código.
- **SASS**: Estilização avançada através de um pré-processador CSS.
- **Express**: Framework backend eficiente para gerenciamento de APIs e autenticação.
- **NestJS**: Framework backend versátil para gerenciamento de conteúdos e assinaturas.
- **PostgreSQL**: Banco de dados relacional, gerenciado com Prisma ORM para maior flexibilidade.
- **TMDB API**: Fonte confiável de dados ricos sobre filmes e séries.

Cada tecnologia foi estrategicamente selecionada para alinhar-se aos requisitos de um sistema moderno e de alta qualidade.

---

## 🎨 Estrutura e Arquitetura

O projeto FlixNext adota uma arquitetura modular híbrida, combinando um monólito modular com microsserviços especializados. Essa abordagem equilibra simplicidade operacional com escalabilidade, permitindo que o projeto evolua de forma sustentável conforme cresce em complexidade e volume de acesso.

O núcleo da aplicação concentra as regras centrais de negócio, enquanto serviços específicos são desacoplados em aplicações independentes, cada uma com responsabilidades bem definidas.

### 🧩 Arquitetura Modular Híbrida

A arquitetura é composta por:

- Frontend (Next.js)
Responsável pela interface do usuário, renderização e experiência de navegação.

- Backend Core (Express – Monólito Modular)
Centraliza autenticação, usuários, permissões e regras de negócio principais, mantendo os domínios bem isolados internamente.

- Microsserviços (NestJS)
Serviços independentes, desacoplados do core, responsáveis por funcionalidades específicas:

**Mensageria**

**Gerenciamento de Conteúdos**

**Gerenciamento de Assinaturas**

Cada microsserviço possui ciclo de vida próprio, podendo ser escalado, mantido e evoluído de forma independente.

### ✅ Vantagens da Arquitetura Adotada

#### Evolução Gradual: Possibilita iniciar com um core coeso e extrair serviços conforme a necessidade real.

#### Isolamento de Responsabilidades: Funcionalidades críticas ficam separadas, reduzindo acoplamento.

#### Escalabilidade Seletiva: Apenas serviços que exigem mais recursos são escalados.

#### Menor Complexidade Inicial: Evita a sobrecarga operacional típica de arquiteturas totalmente distribuídas.

#### Facilidade de Manutenção: Domínios bem definidos tornam o código mais legível e sustentável.

### Estrutura de Pastas

```plaintext
├── backend/                    # Backend Core (Monólito Modular - Express)
│   ├── prisma/                 # Configuração do banco de dados com Prisma
│   └── src/
│       ├── @types/             # Tipagens e interfaces compartilhadas
│       ├── controllers/        # Controladores HTTP
│       ├── prisma/             # Prisma Client
│       ├── services/           # Regras de negócio centrais
│       └── middlewares/        # Autenticação e validações
│
├── frontend/                   # Frontend (Next.js)
│   ├── public/                 # Arquivos estáticos
│   └── src/
│       ├── @types/             # Tipagens
│       ├── components/         # Componentes reutilizáveis
│       ├── contexts/           # Context API
│       ├── data/               # Dados estáticos
│       ├── pages/              # Páginas da aplicação
│       ├── styles/             # Estilos globais (SCSS)
│       ├── services/           # Integração com APIs
│       └── utils/              # Funções utilitárias

```

Essa estrutura reflete uma arquitetura pensada para crescimento progressivo, mantendo simplicidade onde possível e adotando desacoplamento apenas onde há ganho real de escala, resiliência e organização.

---

## 📄 Licença

Este projeto está licenciado sob a **CC-BY-NC-4.0**. Para mais detalhes, entre em contato.

---

Feito com dedicação por [NanoThecnolog](https://github.com/NanoThecnolog).