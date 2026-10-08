# Projeto Integrador - IoT Agro

Plataforma de monitoramento climático e logístico em nuvem desenvolvida para produtores e exportadores da região do Vale do São Francisco (Petrolina/Juazeiro). O sistema integra dados de sensores IoT, gestão de lotes e previsão de safra em um painel centralizado com controle de acesso por perfil.

---

## Sobre o Projeto

O IoT Agro é um dashboard web que reúne informações operacionais e de inteligência agrícola em uma interface moderna. Foi desenvolvido como Projeto Integrador do curso de Análise e Desenvolvimento de Sistemas.

**Principais funcionalidades:**

- Autenticação com seleção de perfil de acesso (Produtor, Logística Fria, Admin IoT)
- Dashboard geral com indicadores de sensores e lotes
- Monitoramento de status de sensores IoT
- Gestão e rastreamento de lotes de produção
- Previsão de safra e análise climática
- Histórico climático da região
- Dados de mercado e exportação
- Área administrativa com gestão de usuários, auditoria e configurações (restrita ao Admin)
- Controle de acesso baseado em perfis (RBAC)

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 19 | Biblioteca de interface |
| React Router DOM | 7 | Roteamento SPA |
| Vite | 8 | Bundler e servidor de desenvolvimento |
| JavaScript (ESM) | — | Lógica da aplicação |
| CSS Vanilla | — | Estilização |
| Plus Jakarta Sans | — | Tipografia de display |
| Inter | — | Tipografia de corpo |

---

## Estrutura de Pastas

```
src/
├── assets/          # Imagens e arquivos estáticos
├── components/      # Componentes reutilizáveis (Header, Navigation, Layout, RoleSelector...)
├── context/         # Contexto de autenticação (AuthContext)
├── pages/           # Páginas da aplicação
│   ├── LoginPage.jsx
│   ├── CadastroPage.jsx
│   ├── DashboardPage.jsx
│   ├── SensoresPage.jsx
│   ├── LotesPage.jsx
│   ├── LoteDetalhePage.jsx
│   ├── PrevisaoPage.jsx
│   ├── HistoricoPage.jsx
│   ├── MercadoPage.jsx
│   ├── UsuariosPage.jsx
│   ├── AuditoriaPage.jsx
│   └── ConfiguracaoPage.jsx
├── routes/          # Definição de rotas e proteção por perfil (AppRoutes, ProtectedRoute)
├── index.css        # Estilos globais
└── main.jsx         # Ponto de entrada da aplicação
```

---

## Perfis de Acesso

O sistema utiliza controle de acesso baseado em perfis (RBAC):

- **Produtor** - Acesso ao painel operacional, sensores, lotes, previsão, historico e mercado
- **Logística Fria** - Mesmo acesso do produtor, com foco em logística de cadeia fria
- **Admin IoT** - Acesso completo, incluindo gestão de usuários, auditoria e configurações do sistema

---

## Como Executar Localmente

**Pré-requisitos:** Node.js 18 ou superior instalado.

```bash
# Clone o repositório
git clone https://github.com/caiobcmv/front-end-PI.git

# Acesse a pasta do projeto
cd front-end-PI

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`.

---

## Comandos Disponíveis

```bash
npm run dev       # Inicia o servidor de desenvolvimento
npm run build     # Gera o build de produção em /dist
npm run preview   # Visualiza o build de produção localmente
npm run lint      # Executa o linter (oxlint)
```

---

## Autenticação

Por se tratar de um protótipo acadêmico sem backend, qualquer e-mail e senha preenchidos permitem o acesso. O perfil selecionado na tela de login determina quais rotas estarão disponíveis para o usuário.

O estado de autenticação é mantido via `localStorage` para persistência entre sessões.

---

## Requisitos Funcionais Implementados

| Código | Descrição |
|---|---|
| RF01 | Login com seleção de perfil |
| RF02 | Cadastro de novo usuário |
| RF03 | Dashboard com indicadores gerais |
| RF04 | Monitoramento de sensores IoT |
| RF05 | Listagem e detalhe de lotes |
| RF06 | Previsão de safra |
| RF07 | Histórico climático |
| RF08 | Gestão de usuários (Admin) |
| RF09 | Dados de mercado e exportação |
| RF10 | Histórico climático regional |
| RF11 | Auditoria e logs do sistema (Admin) |
| RF12 | Configurações do sistema (Admin) |
| FE07 | Animação de carregamento para login |
| FE-D02 | Cliente HTTP e tratamento de erros base |

---

## Desenvolvedores

Projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas como Projeto Integrador.

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
