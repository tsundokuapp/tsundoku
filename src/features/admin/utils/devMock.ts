/**
 * tsundoku - Utilitários de Mock em Desenvolvimento e Isolamento R3
 *
 * Em conformidade com o Requisito R3:
 * Dados fictícios são fornecidos APENAS quando `process.env.NODE_ENV !== 'production'`.
 * Em ambiente de produção, todos os métodos retornam coleções vazias ou valores nulos,
 * permitindo que a interface apresente estados vazios ou avisos de indisponibilidade
 * sem quebrar a execução ou vazar dados falsos para usuários finais.
 */

export function isDevEnvironment(): boolean {
  return process.env.NODE_ENV !== 'production';
}

export interface OverviewCardMetrics {
  balance: string | null;
  pendingCount: number | null;
  deliveredMonthCount: number | null;
}

export interface PendingProjectItem {
  id: string;
  titleProject: string;
  typeProject: string;
  name: string;
  notes: string;
}

export interface RecentProjectItem {
  id: string;
  titleProject: string;
  typeProject: string;
  name: string;
}

export interface TrackerDeliveryMonthItem {
  month: string;
  novel: number;
  comic: number;
}

export interface TrackerDeliveryWeekItem {
  week: string;
  novel: number;
  comic: number;
}

export interface SiteViewsData {
  month: string;
  views: number;
}

export interface WorkViewsData {
  work: string;
  views: number;
}

export interface ChapterViewsData {
  chapter: string;
  views: number;
}

export interface SiteAccessData {
  month: string;
  accesses: number;
}

export interface HourlyAccessData {
  hour: string;
  accesses: number;
}

// TODO(backend-integration): Endpoint de carteira/saldo de pontos do usuário logado (ex: GET /api/admin/pontos/saldo ou GET /api/usuario/perfil).
// Atualmente nem o tsundoku-api (ContextBase.cs) nem o Torii Auth possuem tabela de pontuação ou carteira virtual (T$).
// TODO(backend-integration): Endpoint de métricas consolidadas do dashboard (ex: GET /api/admin/dashboard/metricas)
// para contagem de pendências e capítulos entregues no mês por membro do staff.
export function getDashboardOverviewMetrics(): OverviewCardMetrics {
  if (!isDevEnvironment()) {
    return {
      balance: null,
      pendingCount: null,
      deliveredMonthCount: null,
    };
  }

  return {
    balance: 'T$ 34,00',
    pendingCount: 5,
    deliveredMonthCount: 12,
  };
}

// TODO(backend-integration): Endpoint de pendências e tarefas editoriais atribuídas ao membro do staff (ex: GET /api/admin/tarefas/pendentes).
// O backend tsundoku-api não possui entidade de tarefas, notas ou fluxo de aprovação de capítulos no banco de dados.
export function getPendingProjectsData(): PendingProjectItem[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    {
      id: '1',
      titleProject: 'Bruxa Errante',
      typeProject: 'Novel',
      name: 'C.15 - V.01',
      notes: '3 comentários pendentes',
    },
    {
      id: '2',
      titleProject: 'Eminence in Shadow',
      typeProject: 'Comic',
      name: 'C.20 - V.01',
      notes: 'Aguardando aprovação',
    },
    {
      id: '3',
      titleProject: 'Mushoku Tensei',
      typeProject: 'Novel',
      name: 'C.03 - V.02',
      notes: '2 comentários pendentes',
    },
    {
      id: '4',
      titleProject: 'Tearmoon Empire',
      typeProject: 'Novel',
      name: 'C.05 - V.03',
      notes: 'Aguardando aprovação',
    },
    {
      id: '5',
      titleProject: 'Matador de Goblins',
      typeProject: 'Comic',
      name: 'C.07 - V.01',
      notes: '4 comentários pendentes',
    },
  ];
}

// TODO(backend-integration): Endpoint de auditoria ou histórico de projetos modificados recentemente (ex: GET /api/admin/projetos/recentes).
// Necessita de rota agregadora no backend tsundoku-api unificando atualizações de Novel e Comic.
export function getRecentProjectsData(): RecentProjectItem[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    {
      id: '1',
      titleProject: 'Bruxa Errante',
      typeProject: 'Novel',
      name: 'C.15 - V.01',
    },
    {
      id: '2',
      titleProject: 'Eminence in Shadow',
      typeProject: 'Comic',
      name: 'C.20 - V.01',
    },
    {
      id: '3',
      titleProject: 'Mushoku Tensei',
      typeProject: 'Novel',
      name: 'C.03 - V.02',
    },
    {
      id: '4',
      titleProject: 'Tearmoon Empire',
      typeProject: 'Novel',
      name: 'C.05 - V.03',
    },
    {
      id: '5',
      titleProject: 'Matador de Goblins',
      typeProject: 'Comic',
      name: 'C.07 - V.01',
    },
    {
      id: '6',
      titleProject: 'Marcha Mortal',
      typeProject: 'Novel',
      name: 'C.12 - V.05',
    },
    {
      id: '7',
      titleProject: 'Bruxa Errante',
      typeProject: 'Novel',
      name: 'C.13 - V.02',
    },
  ];
}

// TODO(backend-integration): Endpoint de agregação de capítulos entregues por período (ex: GET /api/admin/estatisticas/capitulos-entregues?periodo=semana|mes).
// O backend tsundoku-api não possui serviço de telemetria ou consolidação temporal de entregas por staff.
export function getStaffTrackerMonthlyData(): TrackerDeliveryMonthItem[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { month: 'Janeiro', novel: 186, comic: 80 },
    { month: 'Fevereiro', novel: 305, comic: 200 },
    { month: 'Março', novel: 237, comic: 120 },
    { month: 'Abril', novel: 73, comic: 190 },
    { month: 'Maio', novel: 209, comic: 130 },
    { month: 'Junho', novel: 214, comic: 140 },
    { month: 'Julho', novel: 256, comic: 150 },
    { month: 'Agosto', novel: 287, comic: 170 },
    { month: 'Setembro', novel: 240, comic: 160 },
    { month: 'Outubro', novel: 325, comic: 180 },
    { month: 'Novembro', novel: 300, comic: 190 },
    { month: 'Dezembro', novel: 400, comic: 220 },
  ];
}

export function getStaffTrackerWeeklyData(): TrackerDeliveryWeekItem[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { week: 'Segunda', novel: 2, comic: 1 },
    { week: 'Terça', novel: 3, comic: 0 },
    { week: 'Quarta', novel: 1, comic: 3 },
    { week: 'Quinta', novel: 0, comic: 2 },
    { week: 'Sexta', novel: 2, comic: 0 },
    { week: 'Sábado', novel: 5, comic: 0 },
    { week: 'Domingo', novel: 1, comic: 0 },
  ];
}

// TODO(backend-integration): Endpoint de métricas de visualizações mensais do site (ex: GET /api/admin/estatisticas/views-site?meses=10).
// tsundoku-api não possui telemetria de pageviews ou integração com analytics.
export function getSiteViews10MonthsData(): SiteViewsData[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { month: 'Jan', views: 650 },
    { month: 'Fev', views: 420 },
    { month: 'Mar', views: 980 },
    { month: 'Abr', views: 510 },
    { month: 'Mai', views: 390 },
    { month: 'Jun', views: 720 },
    { month: 'Jul', views: 890 },
    { month: 'Ago', views: 560 },
    { month: 'Set', views: 920 },
    { month: 'Out', views: 680 },
  ];
}

// TODO(backend-integration): Endpoint de agregação das obras mais visualizadas (ex: GET /api/admin/estatisticas/top-obras?limit=10).
// A entidade Obra no tsundoku-api possui a coluna Visualizacoes, porém não existe endpoint agregador no Capitulo/ObraController.
export function getTop10WorksViewsData(): WorkViewsData[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { work: 'Bruxa Errante', views: 940 },
    { work: 'Eminence in Shadow', views: 880 },
    { work: 'Mushoku Tensei', views: 810 },
    { work: 'Tearmoon Empire', views: 750 },
    { work: 'Goblin Slayer', views: 690 },
    { work: 'Overlord', views: 620 },
    { work: 'Re:Zero', views: 580 },
    { work: 'Slime Tensei', views: 530 },
    { work: 'Solo Leveling', views: 490 },
    { work: 'Chainsaw Man', views: 420 },
  ];
}

// TODO(backend-integration): Endpoint de agregação dos capítulos mais visualizados (ex: GET /api/admin/estatisticas/top-capitulos?limit=10).
// tsundoku-api não expõe estatísticas agregadas de visualização de capítulos por período.
export function getTop10ChaptersViewsData(): ChapterViewsData[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { chapter: 'Cap. 15', views: 350 },
    { chapter: 'Cap. 20', views: 320 },
    { chapter: 'Cap. 03', views: 290 },
    { chapter: 'Cap. 05', views: 270 },
    { chapter: 'Cap. 07', views: 240 },
    { chapter: 'Cap. 12', views: 210 },
    { chapter: 'Cap. 01', views: 190 },
    { chapter: 'Cap. 08', views: 160 },
    { chapter: 'Cap. 04', views: 140 },
    { chapter: 'Cap. 02', views: 120 },
  ];
}

// TODO(backend-integration): Endpoint de acessos totais ao site por mês (ex: GET /api/admin/estatisticas/acessos-site?meses=10).
// tsundoku-api não possui serviço de rastreamento de acessos.
export function getSiteAccess10MonthsData(): SiteAccessData[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { month: 'Jan', accesses: 310 },
    { month: 'Fev', accesses: 280 },
    { month: 'Mar', accesses: 350 },
    { month: 'Abr', accesses: 260 },
    { month: 'Mai', accesses: 290 },
    { month: 'Jun', accesses: 340 },
    { month: 'Jul', accesses: 360 },
    { month: 'Ago', accesses: 300 },
    { month: 'Set', accesses: 330 },
    { month: 'Out', accesses: 315 },
  ];
}

// TODO(backend-integration): Endpoint de distribuição de tráfego por faixa horária nos últimos 14 dias (ex: GET /api/admin/estatisticas/horarios-acessados?dias=14).
// Atualmente não há tracking de logs de requisição ou hits por hora no backend.
export function getHourlyAccess14DaysData(): HourlyAccessData[] {
  if (!isDevEnvironment()) {
    return [];
  }

  return [
    { hour: '00h', accesses: 70 },
    { hour: '02h', accesses: 40 },
    { hour: '04h', accesses: 20 },
    { hour: '06h', accesses: 50 },
    { hour: '08h', accesses: 120 },
    { hour: '10h', accesses: 180 },
    { hour: '12h', accesses: 260 },
    { hour: '14h', accesses: 290 },
    { hour: '16h', accesses: 240 },
    { hour: '18h', accesses: 340 },
    { hour: '20h', accesses: 360 },
    { hour: '22h', accesses: 220 },
  ];
}
