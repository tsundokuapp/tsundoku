import {
  BookOpen,
  Calendar,
  Clock,
  Heart,
  Trophy,
} from '@phosphor-icons/react/dist/ssr';

import { Progress } from '@/components/shadcn/progress';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn/tabs';

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
          <div className="bg-profileCardBackground overflow-hidden rounded-xl shadow-sm">
            <div className="from-profileActivityBgFrom to-profileActivityBgTo relative bg-gradient-to-r p-6">
              <div className="relative">
                <h3 className="text-profileActivityText flex items-center gap-3 text-xl font-bold">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Clock className="h-6 w-6" />
                  </div>
                  Atividade Recente
                </h3>
                <p className="text-profileActivityTextSecondary mt-2 text-sm">
                  Acompanhe suas últimas leituras e descobertas
                </p>
              </div>
              <div className="from-profileActivityBgTo to-profileActivityBgFrom absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="border-profileCardBorder bg-profileCardMenuBg/50 hover:border-profileActivityBgFrom hover:bg-profileCardMenuBg/80 group flex items-center justify-between rounded-lg border p-4 transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="from-profileActivityBgFrom to-profileActivityBgTo flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b">
                        {activity.type === 'read' && (
                          <BookOpen className="text-profileActivityIcon h-5 w-5" />
                        )}
                        {activity.type === 'completed' && (
                          <Trophy className="text-profileActivityIcon h-5 w-5" />
                        )}
                        {activity.type === 'added' && (
                          <Heart className="text-profileActivityIcon h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <p className="text-profileTextPrimary font-semibold">
                          {activity.title}
                        </p>
                        {activity.chapter && (
                          <p className="text-profileTextSecondary text-sm">
                            {activity.chapter}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-profileTextSecondary text-sm">
                        {activity.time}
                      </span>
                      <div className="bg-profileStatsTotal h-2 w-2 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Currently Reading Tab */}
        <TabsContent value="reading" className="space-y-6">
          <div className="bg-profileCardBackground overflow-hidden rounded-xl shadow-sm">
            <div className="from-profileReadingBgFrom to-profileReadingBgTo relative bg-gradient-to-r p-6">
              <div className="relative">
                <h3 className="text-profileReadingText flex items-center gap-3 text-xl font-bold">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  Lendo Atualmente ({userReading.length})
                </h3>
                <p className="text-profileReadingTextSecondary mt-2 text-sm">
                  Acompanhe o progresso das suas leituras ativas
                </p>
              </div>
              <div className="from-profileReadingBgTo to-profileReadingBgFrom absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {userReading.map((item, index) => (
                  <div
                    key={index}
                    className="border-profileCardBorder bg-profileCardMenuBg/50 hover:border-profileReadingBgFrom group overflow-hidden rounded-xl border transition-all hover:shadow-lg"
                  >
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-profileTextPrimary text-lg font-semibold">
                            {item.title}
                          </h4>
                          <p className="text-profileTextSecondary text-sm">
                            Capítulo {item.currentChapter} de{' '}
                            {item.totalChapters}
                          </p>
                        </div>
                        <div className="from-profileReadingBgFrom to-profileReadingBgTo ml-4 rounded-full bg-gradient-to-r px-3 py-1">
                          <span className="text-profileReadingText text-sm font-bold">
                            {item.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Progress
                          value={item.progress}
                          className="h-3 bg-appListBorder"
                        />
                        <div className="text-profileTextSecondary flex justify-between text-xs">
                          <span>Início</span>
                          <span>Completo</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-profileCardMenuBg/80 px-6 py-3">
                      <div className="flex items-center justify-between">
                        <span className="text-profileTextSecondary text-sm">
                          Última leitura: Ontem
                        </span>
                        <div className="text-profileStatsTotal flex items-center gap-1">
                          <div className="bg-profileStatsTotal h-2 w-2 rounded-full"></div>
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
          <div className="bg-profileCardBackground overflow-hidden rounded-xl shadow-sm">
            <div className="from-profileFavoritesBgFrom to-profileFavoritesBgTo relative bg-gradient-to-r p-6">
              <div className="relative">
                <h3 className="text-profileFavoritesText flex items-center gap-3 text-xl font-bold">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Heart className="h-6 w-6" />
                  </div>
                  Gêneros Favoritos
                </h3>
                <p className="text-profileFavoritesTextSecondary mt-2 text-sm">
                  Os gêneros que mais despertam seu interesse
                </p>
              </div>
              <div className="from-profileFavoritesBgTo to-profileFavoritesBgFrom absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {userFavorites.map((genre, index) => (
                  <div
                    key={index}
                    className="border-profileCardBorder bg-profileCardBackground/50 hover:border-profileFavoritesBgFrom group relative overflow-hidden rounded-lg border p-4 transition-all hover:shadow-md"
                  >
                    <div className="relative z-10">
                      <div className="mb-2 flex items-center justify-between">
                        <h4 className="text-profileTextPrimary font-semibold">
                          {genre}
                        </h4>
                        <div className="from-profileFavoritesBgFrom to-profileFavoritesBgTo h-6 w-6 rounded-full bg-gradient-to-r"></div>
                      </div>
                      <p className="text-profileTextSecondary text-sm">
                        {Math.floor(Math.random() * 50) + 10} obras lidas
                      </p>
                    </div>
                    <div className="to-profileFavoritesBgFrom/20 absolute inset-0 bg-gradient-to-r from-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
                  </div>
                ))}
              </div>

              {/* Stats Section */}
              <div className="bg-profileCardMenuBg/50 mt-8 rounded-lg p-4">
                <h4 className="text-profileTextPrimary mb-3 font-semibold">
                  Estatísticas dos Gêneros
                </h4>
                <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4">
                  <div>
                    <div className="text-profileStatsFavorited text-2xl font-bold">
                      {userFavorites.length}
                    </div>
                    <div className="text-profileTextSecondary text-xs">
                      Favoritos
                    </div>
                  </div>
                  <div>
                    <div className="text-profileStatsTotal text-2xl font-bold">
                      87%
                    </div>
                    <div className="text-profileTextSecondary text-xs">
                      Compatibilidade
                    </div>
                  </div>
                  <div>
                    <div className="text-profileStatsCompleted text-2xl font-bold">
                      {Math.floor(Math.random() * 100) + 50}
                    </div>
                    <div className="text-profileTextSecondary text-xs">
                      Total Lidas
                    </div>
                  </div>
                  <div>
                    <div className="text-profileStatsReading text-2xl font-bold">
                      12
                    </div>
                    <div className="text-profileTextSecondary text-xs">
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
          <div className="bg-profileCardBackground overflow-hidden rounded-xl shadow-sm">
            <div className="from-profileAchievementsBgFrom to-profileAchievementsBgTo relative bg-gradient-to-r p-6">
              <div className="relative">
                <h3 className="text-profileAchievementsText flex items-center gap-3 text-xl font-bold">
                  <div className="rounded-lg bg-white/20 p-2 backdrop-blur-sm">
                    <Trophy className="h-6 w-6" />
                  </div>
                  Conquistas Desbloqueadas
                </h3>
                <p className="text-profileAchievementsTextSecondary mt-2 text-sm">
                  Marcos importantes da sua jornada como leitor
                </p>
              </div>
              <div className="from-profileAchievementsBgTo to-profileAchievementsBgFrom absolute -bottom-1 left-0 h-1 w-full bg-gradient-to-r opacity-70"></div>
            </div>
            <div className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="border-profileCardBorder from-achievementEpicBgFrom to-achievementEpicBgTo group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6">
                  <div className="absolute right-4 top-4">
                    <div className="bg-achievementEpicBackground rounded-full p-3">
                      <BookOpen className="text-profileTextTertiary h-6 w-6" />
                    </div>
                  </div>
                  <div className="pr-16">
                    <div className="mb-2 flex items-center gap-2">
                      <h4 className="text-achievementEpicText text-lg font-bold">
                        Leitor Voraz
                      </h4>
                      <div className="bg-achievementEpicBackground text-profileTextTertiary rounded-full px-2 py-1 text-xs font-semibold">
                        ÉPICO
                      </div>
                    </div>
                    <p className="text-profileTextTertiary text-sm">
                      Leu mais de 100 obras diferentes
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-achievementEpicText text-2xl font-bold">
                        147
                      </div>
                      <span className="text-profileTextTertiary text-sm">
                        / 100 obras
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-profileCardBorder from-achievementRareBgFrom to-achievementRareBgTo group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6">
                  <div className="absolute right-4 top-4">
                    <div className="bg-achievementRareBackground rounded-full p-3">
                      <Calendar className="text-profileTextTertiary h-6 w-6" />
                    </div>
                  </div>
                  <div className="pr-16">
                    <div className="mb-2 flex items-center gap-2">
                      <h4 className="text-achievementRareText text-lg font-bold">
                        Consistência
                      </h4>
                      <div className="bg-achievementRareBackground text-profileTextTertiary rounded-full px-2 py-1 text-xs font-semibold">
                        RARO
                      </div>
                    </div>
                    <p className="text-profileTextTertiary text-sm">
                      12 dias consecutivos lendo
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <div className="text-achievementRareText text-2xl font-bold">
                        12
                      </div>
                      <span className="text-profileTextTertiary text-sm">
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

/*
Sobre as Tabs: fiz completamente sugestiva. Sem as informações reais é dificil saber o que realmente será mostrado.
*/
