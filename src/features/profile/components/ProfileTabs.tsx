import {
  BookOpen,
  Calendar,
  Clock,
  Heart,
  Trophy,
} from '@phosphor-icons/react/dist/ssr';

import { Progress } from '@/shared/components/ui/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';

interface ProfileTabsProps {
  userActivity: {
    type: string;
    title: string;
    chapter?: string;
    time: string;
  }[];
  userFavorites: string[];
  userReading: {
    title: string;
    progress: number;
    currentChapter: number;
    totalChapters: number;
  }[];
}

export function ProfileTabs({
  userActivity,
  userFavorites,
  userReading,
}: ProfileTabsProps) {
  return (
    <>
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="reading">Lendo</TabsTrigger>
          <TabsTrigger value="favorites">Favoritos</TabsTrigger>
          <TabsTrigger value="achievements">Conquistas</TabsTrigger>
        </TabsList>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <div className="overflow-hidden rounded-xl bg-profileCardBackground shadow-sm">
            <div className="relative bg-gradient-to-r from-profileActivityBgFrom to-profileActivityBgTo p-6">
              <div className="relative">
                <h3 className="flex items-center gap-3 text-xl font-bold text-profileActivityText">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Clock className="h-6 w-6" />
                  </div>
                  Atividade Recente
                </h3>
                <p className="mt-2 text-sm text-profileActivityTextSecondary">
                  Acompanhe suas últimas leituras e descobertas
                </p>
              </div>
              <div className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-profileActivityBgTo to-profileActivityBgFrom opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="bg-profileCardMenuBg/50 hover:bg-profileCardMenuBg/80 group flex items-center justify-between rounded-lg border border-profileCardBorder p-4 transition-all hover:border-profileActivityBgFrom"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-profileActivityBgFrom to-profileActivityBgTo">
                        {activity.type === 'read' && (
                          <BookOpen className="h-5 w-5 text-profileActivityIcon" />
                        )}
                        {activity.type === 'completed' && (
                          <Trophy className="h-5 w-5 text-profileActivityIcon" />
                        )}
                        {activity.type === 'added' && (
                          <Heart className="h-5 w-5 text-profileActivityIcon" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-profileTextPrimary">
                          {activity.title}
                        </p>
                        {activity.chapter && (
                          <p className="text-sm text-profileTextSecondary">
                            {activity.chapter}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-profileTextSecondary">
                        {activity.time}
                      </span>
                      <div className="h-2 w-2 rounded-full bg-profileStatsTotal"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Currently Reading Tab */}
        <TabsContent value="reading" className="space-y-6">
          <div className="overflow-hidden rounded-xl bg-profileCardBackground shadow-sm">
            <div className="relative bg-gradient-to-r from-profileReadingBgFrom to-profileReadingBgTo p-6">
              <div className="relative">
                <h3 className="flex items-center gap-3 text-xl font-bold text-profileReadingText">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  Lendo Atualmente ({userReading.length})
                </h3>
                <p className="mt-2 text-sm text-profileReadingTextSecondary">
                  Acompanhe o progresso das suas leituras ativas
                </p>
              </div>
              <div className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-profileReadingBgTo to-profileReadingBgFrom opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {userReading.map((item, index) => (
                  <div
                    key={index}
                    className="bg-profileCardMenuBg/50 group overflow-hidden rounded-xl border border-profileCardBorder transition-all hover:border-profileReadingBgFrom hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-profileTextPrimary">
                            {item.title}
                          </h4>
                          <p className="text-sm text-profileTextSecondary">
                            Capítulo {item.currentChapter} de{' '}
                            {item.totalChapters}
                          </p>
                        </div>
                        <div className="ml-4 rounded-full bg-gradient-to-r from-profileReadingBgFrom to-profileReadingBgTo px-3 py-1">
                          <span className="text-sm font-bold text-profileReadingText">
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress
                          value={item.progress}
                          className="h-3 bg-appListBorder"
                        />
                        <div className="flex justify-between text-xs text-profileTextSecondary">
                          <span>Início</span>
                          <span>Completo</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-profileCardMenuBg/80 px-6 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-profileTextSecondary">
                          Última leitura: Ontem
                        </span>
                        <div className="flex items-center gap-1 text-profileStatsTotal">
                          <div className="h-2 w-2 rounded-full bg-profileStatsTotal"></div>
                          <span className="text-xs">Ativo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="space-y-6">
          <div className="overflow-hidden rounded-xl bg-profileCardBackground shadow-sm">
            <div className="relative bg-gradient-to-r from-profileFavoritesBgFrom to-profileFavoritesBgTo p-6">
              <div className="relative">
                <h3 className="flex items-center gap-3 text-xl font-bold text-profileFavoritesText">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Heart className="h-6 w-6" />
                  </div>
                  Gêneros Favoritos
                </h3>
                <p className="mt-2 text-sm text-profileFavoritesTextSecondary">
                  Os gêneros que mais despertam seu interesse
                </p>
              </div>
              <div className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-profileFavoritesBgTo to-profileFavoritesBgFrom opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userFavorites.map((genre, index) => (
                  <div
                    key={index}
                    className="bg-profileCardBackground/50 group relative overflow-hidden rounded-lg border border-profileCardBorder p-4 transition-all hover:border-profileFavoritesBgFrom hover:shadow-md"
                  >
                    <div className="relative z-10">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="font-semibold text-profileTextPrimary">
                          {genre}
                        </h4>
                        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-profileFavoritesBgFrom to-profileFavoritesBgTo"></div>
                      </div>
                      <p className="text-sm text-profileTextSecondary">
                        {Math.floor(Math.random() * 50) + 10} obras lidas
                      </p>
                    </div>
                    <div className="to-profileFavoritesBgFrom/20 absolute inset-0 bg-gradient-to-r from-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="bg-profileCardMenuBg/50 mt-8 rounded-lg p-4">
                <h4 className="mb-3 font-semibold text-profileTextPrimary">
                  Estatísticas dos Gêneros
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                  <div>
                    <div className="text-2xl font-bold text-profileStatsFavorited">
                      {userFavorites.length}
                    </div>
                    <div className="text-xs text-profileTextSecondary">
                      Favoritos
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-profileStatsTotal">
                      87%
                    </div>
                    <div className="text-xs text-profileTextSecondary">
                      Compatibilidade
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-profileStatsCompleted">
                      {Math.floor(Math.random() * 100) + 50}
                    </div>
                    <div className="text-xs text-profileTextSecondary">
                      Total Lidas
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-profileStatsReading">
                      12
                    </div>
                    <div className="text-xs text-profileTextSecondary">
                      Este Mês
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="overflow-hidden rounded-xl bg-profileCardBackground shadow-sm">
            <div className="relative bg-gradient-to-r from-profileAchievementsBgFrom to-profileAchievementsBgTo p-6">
              <div className="relative">
                <h3 className="flex items-center gap-3 text-xl font-bold text-profileAchievementsText">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Trophy className="h-6 w-6" />
                  </div>
                  Conquistas Desbloqueadas
                </h3>
                <p className="mt-2 text-sm text-profileAchievementsTextSecondary">
                  Marcos importantes da sua jornada como leitor
                </p>
              </div>
              <div className="absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r from-profileAchievementsBgTo to-profileAchievementsBgFrom opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="group relative overflow-hidden rounded-xl border border-profileCardBorder bg-gradient-to-br from-achievementEpicBgFrom to-achievementEpicBgTo p-6">
                  <div className="absolute right-4 top-4">
                    <div className="rounded-full bg-achievementEpicBackground p-3">
                      <BookOpen className="h-6 w-6 text-profileTextTertiary" />
                    </div>
                  </div>
                  <div className="pr-16">
                    <div className="mb-2 flex items-center gap-2">
                      <h4 className="text-lg font-bold text-achievementEpicText">
                        Leitor Voraz
                      </h4>
                      <div className="rounded-full bg-achievementEpicBackground px-2 py-1 text-xs font-semibold text-profileTextTertiary">
                        ÉPICO
                      </div>
                    </div>
                    <p className="text-sm text-profileTextTertiary">
                      Leu mais de 100 obras diferentes
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-2xl font-bold text-achievementEpicText">
                        147
                      </div>
                      <span className="text-sm text-profileTextTertiary">
                        / 100 obras
                      </span>
                    </div>
                  </div>
                </div>

                <div className="group relative overflow-hidden rounded-xl border border-profileCardBorder bg-gradient-to-br from-achievementRareBgFrom to-achievementRareBgTo p-6">
                  <div className="absolute right-4 top-4">
                    <div className="rounded-full bg-achievementRareBackground p-3">
                      <Calendar className="h-6 w-6 text-profileTextTertiary" />
                    </div>
                  </div>
                  <div className="pr-16">
                    <div className="mb-2 flex items-center gap-2">
                      <h4 className="text-lg font-bold text-achievementRareText">
                        Consistência
                      </h4>
                      <div className="rounded-full bg-achievementRareBackground px-2 py-1 text-xs font-semibold text-profileTextTertiary">
                        RARO
                      </div>
                    </div>
                    <p className="text-sm text-profileTextTertiary">
                      12 dias consecutivos lendo
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-2xl font-bold text-achievementRareText">
                        12
                      </div>
                      <span className="text-sm text-profileTextTertiary">
                        dias seguidos
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
