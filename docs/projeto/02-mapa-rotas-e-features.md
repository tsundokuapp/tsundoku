# Tsundoku Web - Mapa de Rotas e Features

Data: 2026-03-30

## 1) Grupos de rota (App Router)

### Publico webapp
- /(webapp)/(home): pagina inicial
- /(webapp)/(projects)/novels: listagem de novels
- /(webapp)/(projects)/novels/[slug]: detalhe de novel
- /(webapp)/(projects)/comics: listagem de comics
- /(webapp)/(projects)/comics/[slug]: detalhe de comic
- /(webapp)/(pages)/about, blog, dcma, maintenance

### Leitura
- /reader/novels/[slug]/[chapter]
- /reader/comics/[slug]/[chapter]

### Auth e perfil
- /auth
- /profile/[username]

### Admin
- /(admin)/dashboard
- /(admin)/staff
- /(admin)/noveladmin
- /(admin)/mangaadmin
- /(admin)/useradmin
- /(admin)/project/[worktype]/[slug]
- /(admin)/project/[worktype]/[slug]/[chapter-slug]

### Editor
- /editor/[documentId]

## 2) Layouts importantes
- src/app/layout.tsx: layout raiz + Providers
- src/app/(webapp)/layout.tsx: header/footer + banner dinamico
- src/app/(admin)/layout.tsx: sidebar e shell administrativa
- src/app/reader/layout.tsx: shell de leitura
- src/app/profile/layout.tsx: shell de perfil

## 3) Mapeamento de features
- features/auth: login e cadastro (Torii)
- features/project: home, generos, busca, recomendacoes
- features/novels: listagem, detalhe, capitulos
- features/comics: listagem, detalhe, capitulos
- features/reader: experiencia de leitura
- features/admin/*: paines e operacoes de staff/admin
- features/editor: edicao de conteudo

## 4) Middleware e compatibilidade de URLs
`src/middleware.ts` redireciona:
- /novels/:slug/:chapter -> /reader/novels/:slug/:chapter
- /comics/:slug/:chapter -> /reader/comics/:slug/:chapter

Objetivo: manter compatibilidade de links antigos com novo padrao de leitura.
