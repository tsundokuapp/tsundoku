// TODO: reavaliar essas rotas, rotas de cadastro e login foram alteradas por necessidade.
// TODO: reavaliar também essa estrutura admin/admin pois ficou um pouco estranho, mas por hora vou deixar assim

export const ROTAS = {
  CADASTRO: '/cadastro',
  LOGIN: '/login',
  ESTATISTICAS: '/admin/admin/estatisticas',
  USUARIOS: '/admin/admin/usuarios',
  ADICIONAR_USUARIOS: '/admin/admin/usuarios/adicionar',
  EDITAR_USUARIOS: '/admin/admin/usuarios/editar',
  CATEGORIAS:'/admin/blog/categorias',
  POSTS:'/admin/blog/posts',
  ADICIONAR_POSTS:'/admin/blog/posts/adicionar',
  EDITAR_POSTS:'/admin/blog/posts/editar',
  CAPITULOS: '/admin/principal/capitulos/',
  ADCIONAR_CAPITULO: '/admin/principal/capitulos/adicionar',
  EDITAR_CAPITULO: '/admin/principal/capitulos/editar',
  DASHBOARD: '/admin/principal/dashboard',
  GENEROS: '/admin/principal/generos',
  OBRAS: '/admin/principal/obras',
  ADICIONAR_OBRA: '/admin/principal/obras/adicionar',
  EDITAR_OBRA: '/admin/principal/obras/editar',
  VOLUMES: '/admin/principal/volumes',
  ADICIONAR_VOLUME: '/admin/principal/volumes/adicionar',
  EDITAR_VOLUME: '/admin/principal/volumes/editar',
};
