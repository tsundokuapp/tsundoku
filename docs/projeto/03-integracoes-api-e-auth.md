# Tsundoku Web - Integracoes com API e Torii

Data: 2026-03-30

## 1) Clientes HTTP
Arquivo: src/core/api/index.ts
- `api`: cliente principal para API de obras
- `apiPrivate`: cliente principal com credentials
- `auth`: cliente para Torii (withCredentials)

Selecao de baseURL em src/core/api/request.ts:
- API principal: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_API_URL_DOCKER`, `NEXT_PUBLIC_PROD_URL_API`
- Torii: `NEXT_PUBLIC_TORII_URL`, `NEXT_PUBLIC_TORII_URL_DOCKER`, `NEXT_PUBLIC_PROD_URL_API_TORII`

## 2) Autenticacao
- Login: `features/auth/api/authApi.ts` -> POST `login` (Torii)
- Cadastro: `features/auth/api/authApi.ts` -> POST `cadastro` (Torii)
- Refresh: `core/api/refreshToken.ts` e `core/auth/hooks/useAuthHydration.ts` -> GET `refresh-token` (Torii)

Store central: `core/auth/stores/useAuthStore.ts`
- Guarda `accessToken`, `username`, `tsunId`, `roles`, `position`
- Faz decode de JWT para extrair roles
- Define `isAdmin` por role

## 3) Interceptors e resiliencia
Arquivo: src/core/api/interceptors.ts
- Request interceptor: adiciona `Authorization: Bearer <token>`
- Response interceptor: em 401, tenta refresh e repete request uma vez (`_retry`)

Concorrencia de refresh:
- `refreshToken.ts` usa fila para evitar multiplos refresh simultaneos
- ponto de melhoria: tipar fila sem any

## 4) Endpoints de negocio (exemplos)
- Novels: `/obras/novels`, `/obras/novel/slug/{slug}`, `/novels/capitulos/{obra}/{capitulo}`
- Comics: `/obras/comics`, `/obras/comic/slug/{slug}`, `/comics/{obra}/{capitulo}`
- Projetos/Home: `/obras/home`, `/obras/recomendadas`, `/obras/pesquisa`

## 5) Pendencias de configuracao
Arquivo atual de exemplo: `.env.local.example`
- Hoje ele contem variaveis da API principal, mas nao todas de Torii.
- Recomendado incluir no exemplo:
  - NEXT_PUBLIC_TORII_URL
  - NEXT_PUBLIC_TORII_URL_DOCKER
  - NEXT_PUBLIC_PROD_URL_API_TORII
  - NEXT_PUBLIC_TORII_DOCKER_UP
  - NEXT_PUBLIC_IS_PRODUCTION_TORII

## 6) Regra operacional solicitada
Durante esta analise:
- Nao foi feito commit
- Nao foi feito push

Regra a manter para proximas tarefas:
- Commit e push somente com autorizacao explicita do usuario.
