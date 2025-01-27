# 🎥 FlixNext: Plataforma de Streaming

Seja bem-vindo ao repositório da plataforma de Streaming **FlixNext**.

Este projeto foi concebido com o intuito de oferecer uma experiência imersiva e otimizada para exploração, pesquisa e consumo de conteúdos audiovisuais de forma gratuita. Apresentado como protótipo funcional, o sistema integra práticas avançadas de desenvolvimento e design, configurando-se como o Trabalho de Conclusão de Curso para o Bacharelado em Sistemas de Informação no Centro Universitário IBMR.

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
- **PostgreSQL**: Banco de dados relacional, gerenciado com Prisma ORM para maior flexibilidade.
- **TMDB API**: Fonte confiável de dados ricos sobre filmes e séries.

Cada tecnologia foi estrategicamente selecionada para alinhar-se aos requisitos de um sistema moderno e de alta qualidade.

---

## 🎨 Estrutura e Arquitetura

O **FlixNext** adota uma **arquitetura monolítica** que alia simplicidade e organização. Essa abordagem foi escolhida considerando as necessidades de um projeto em fase inicial, onde centralização e coesão são cruciais para eficiência e facilidade de desenvolvimento.

### Vantagens da Arquitetura Monolítica

- **Simplicidade Operacional**: Todo o código reside em um único repositório, facilitando o desenvolvimento e a implantação.
- **Facilidade de Depuração**: Identificar e corrigir problemas é mais direto.
- **Menor Complexidade Inicial**: Ideal para projetos de pequeno e médio porte.
- **Comunicação Direta**: Dispensa a necessidade de integração entre múltiplos serviços independentes.

### Preparação para Microserviços

Embora o projeto adote a arquitetura monolítica, sua estrutura modular foi planejada para permitir uma transição gradual para **microserviços**, caso seja necessário no futuro. Entre os benefícios dessa evolução estão:

- **Escalabilidade Independente**: Componentes específicos podem ser ampliados conforme a demanda.
- **Autonomia das Equipes**: Possibilidade de desenvolvimento paralelo em serviços independentes.
- **Resiliência Aumentada**: Isolamento de falhas em componentes específicos, minimizando impactos no sistema como um todo.

A organização modular do código assegura que cada funcionalidade seja bem isolada e reutilizável, servindo como base sólida para uma potencial migração futura.

### Estrutura de Pastas

```plaintext
├── backend/
│   ├── prisma/             # Configuração do banco de dados com Prisma
│   └── src/             
│       ├── @types/         # Tipagem e Interfaces
│       ├── Controllers/    # Controladores
│       ├── prisma/         # Configuração do prismaClient
│       ├── Services/       # Lógica de negócios e serviços de backend
│       └── Middlewares/    # Validação e autenticação
├── frontend/
│   └── public/             # Arquivos estáticos (imagens, ícones, etc.)
│   └── src/
│       ├── @types/         # Tipagem e Interfaces
│       ├── components/     # Componentes reutilizáveis
│       ├── contexts/       # Context API
│       ├── data/           # Dados estáticos
│       ├── pages/          # Páginas da aplicação
│       ├── styles/         # Estilos globais com SASS
│       ├── services/       # Integração com APIs externas
│       └── utils/          # Funções utilitárias
```

Essa estrutura foi projetada para promover organização, legibilidade e manutenção simplificada.

---

## 📄 Licença

Este projeto está licenciado sob a **CC-BY-NC-4.0**. Para mais detalhes, entre em contato.

---

Feito com dedicação por [NanoThecnolog](https://github.com/NanoThecnolog).