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

Para ver dados reais (sensores, dashboard, alertas e cadastro), é preciso subir também o banco e a API. Veja a seção [Integração com a API](#integração-com-a-api).

---

## Integração com a API

O front consome a API do back-end ([iot-backend-](https://github.com/rafaellins7/iot-backend-)), que usa um banco PostgreSQL modelado no repositório [iot_db](https://github.com/LorenaLira05/iot_db). A ordem para rodar tudo localmente é: banco, API, front.

### 1. Banco de dados (PostgreSQL)

Instale o PostgreSQL, crie o banco e rode os scripts do `iot_db` **nesta ordem**:

```bash
psql -U postgres -c "CREATE DATABASE iot_db;"
cd iot_db
for f in schema restricoes seed triggers views; do
  psql -U postgres -d iot_db -v ON_ERROR_STOP=1 -f $f.sql || break
done
```

### 2. API (back-end)

Use **Python 3.12**. Versões muito novas (3.15, por exemplo) ainda não têm pacotes prontos e a instalação das dependências falha.

```bash
cd iot-backend-
python -m venv venv
source venv/Scripts/activate   # Windows (Git Bash). No Linux/macOS: source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env           # preencha DB_HOST, DB_PORT, DB_NAME, DB_USER e DB_PASSWORD
python -m uvicorn src.api.app:app --reload
```

A documentação interativa da API fica em `http://127.0.0.1:8000/docs`. O `.env` do back guarda a senha do banco e **nunca deve ser enviado ao GitHub**.

Para popular o sensor real com leituras do ThingSpeak, defina `THINGSPEAK_CHANNEL_ID=3500765` e `SENSOR_ID=1` no `.env` do back e rode, com o ambiente virtual ativo:

```bash
python -c "from scripts.backfill_historico import main; main(2000)"
```

### 3. Front-end

```bash
cp .env.example .env     # define VITE_API_URL=http://127.0.0.1:8000
npm install
npm run dev
```

A porta do front (`5173` ou `5174`) já está liberada no CORS do back. Se o Vite usar outra, adicione-a em `CORS_ORIGINS` no `.env` do back.

### O que já usa dados reais

| Tela | Endpoints |
|---|---|
| Sensores (`/sensores`, acessível pelo endereço, ainda sem item no menu) | `GET /sensores`, `GET /sensores/{id}/leituras`, `GET /leituras` |
| Dashboard (indicadores, medidor e gráficos de telemetria) | `GET /dashboard/resumo`, `GET /sensores/{id}/leituras` |
| Alertas | `GET /alertas`, `PATCH /alertas/{id}/status` |
| Cadastro | `GET /perfis`, `POST /usuarios` |

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

- **Cadastro:** grava usuários reais no banco (`POST /usuarios`). A senha é armazenada com bcrypt e deve ter de 8 a 72 caracteres.
- **Login:** ainda é simulado. Qualquer e-mail e senha preenchidos permitem o acesso, porque o back ainda não tem `POST /auth/login` nem emissão de token. O acesso simulado entra como Gestora.

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
| FE-D08 | Aumento da fonte e melhoria do contraste visual |
| FE-D10 | Toggle de visão Resumida e Detalhada no Dashboard |

---

## Desenvolvedores

Projeto desenvolvido por estudantes do curso de Análise e Desenvolvimento de Sistemas como Projeto Integrador.

---

## Licença

Este projeto foi desenvolvido para fins acadêmicos.
