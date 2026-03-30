# Tsundoku Web - Visao Geral Inicial

Data: 2026-03-30
Escopo desta analise: somente repositorio web `tsundoku`.

## 1) Objetivo do app web
Frontend em Next.js para consumo de duas APIs:
- API principal de obras (novels, comics, projetos, admin)
- Torii (autenticacao/login/refresh)

## 2) Stack principal
- Next.js 14 (App Router)
- React 18 + TypeScript (strict)
- TailwindCSS + Radix UI + componentes proprios
- TanStack Query para cache e fetch
- Zustand para estado global (auth, banners, preferencias)
- Axios com interceptors para token
- Jest + Testing Library para testes de frontend

## 3) Estrutura de pastas (alto nivel)
- src/app: rotas e layouts
- src/core: infraestrutura (API e auth base)
- src/features: modulos de negocio por dominio
- src/shared: componentes, hooks, stores e utilitarios compartilhados
- src/providers: providers globais (tema, query, contextos)
- src/middleware.ts: redirecionamentos de leitura

## 4) Fluxo de runtime
1. Root layout carrega Providers globais.
2. Providers inicializam interceptors Axios e hydration de autenticacao.
3. Hydration chama endpoint de refresh para recuperar sessao (cookie + access token).
4. Requests para API principal usam access token em Authorization.
5. Em 401, interceptor tenta refresh automatico via Torii.

## 5) Pontos fortes observados
- Organizacao por dominios (features) bem definida.
- Separacao clara entre camada de API e camada de UI.
- Fluxo de refresh token centralizado.
- App Router com grupos de rotas para webapp, admin e reader.

## 6) Riscos e dividas tecnicas iniciais
- `src/core/auth/stores/useAuthStore.ts`: logs em console e regras de role embutidas no store.
- `src/core/api/refreshToken.ts`: fila de refresh tipada como any.
- `.env.local.example`: nao lista variaveis de Torii usadas no codigo (`NEXT_PUBLIC_TORII_*`).
- `src/middleware.ts`: modo manutencao comentado (nao ativo).
- Protecao de rotas administrativas parece depender de UI/estado, sem gate forte no middleware.

## 7) Comandos uteis
- Desenvolvimento: `pnpm dev`
- Build: `pnpm build`
- Lint: `pnpm lint`
- Testes: `pnpm test`
- Testes watch: `pnpm test:watch`

## 8) Limites desta etapa
Esta etapa e exploratoria. Nao houve alteracao de regra de negocio, nem commit, nem push.
