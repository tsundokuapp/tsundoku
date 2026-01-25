'use client';

import { ProfileBio } from '@/features/profile/components/ProfileBio';
import { ProfileHeader } from '@/features/profile/components/ProfileHeader';
import { ProfileStats } from '@/features/profile/components/ProfileStats';
import { ProfileTabs } from '@/features/profile/components/ProfileTabs';
import { AsyncSection } from '@/shared/components/layout/section/AsyncSection';

export default function UserProfile() {
  const isLoading = false; // Mudar quando carregar os dados pela API

  // MOCK
  const userBio = {
    username: 'Dark Detros',
    fallback: 'DD',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDsC2IjFq3bMYt3eygzuRzsNMtnHKNcjTw1w&s',
    bio: 'Apaixonado por mangás e animes, sempre em busca de novas histórias para devorar.',
    location: 'Brasil',
    discord: 'darkdetros',
    joinDate: '01/01/2021',
    roles: [
      { title: 'Editor', color: `roleEditor` },
      { title: 'Especialista em Isekai' },
      { title: 'Eminência das Sombras' },
    ],
  };

  const userStats = {
    totalRead: 147,
    currentlyReading: 8,
    completed: 139,
    favorites: 23,
    readingStreak: 12,
  };

  const recentActivity = [
    {
      type: 'read',
      title: 'Eminência das Sombras',
      chapter: 'Cap. 45',
      time: '2h atrás',
    },
    { type: 'completed', title: 'Solo Leveling', time: '1 dia atrás' },
    { type: 'added', title: 'Chainsaw Man', time: '3 dias atrás' },
  ];

  const currentlyReading = [
    {
      title: 'Eminência das Sombras',
      progress: 85,
      currentChapter: 45,
      totalChapters: 53,
    },
    {
      title: 'One Piece',
      progress: 60,
      currentChapter: 1200,
      totalChapters: 2000,
    },
    {
      title: 'Demon Slayer',
      progress: 30,
      currentChapter: 50,
      totalChapters: 167,
    },
  ];

  const favoriteGenres = [
    'Isekai',
    'Action',
    'Romance',
    'Fantasy',
    'Shounen',
    'Slice of Life',
  ];

  return (
    <AsyncSection isLoading={isLoading}>
      <div className="flex w-full flex-col gap-8">
        <ProfileHeader
          avatarFallback={userBio.fallback}
          avatarImage={userBio.avatar}
          allowEdit
        />

        <div className="mx-auto mt-8 flex w-full max-w-[1300px] flex-1 flex-col gap-6 px-6 pb-8 lg:px-4">
          <ProfileBio userBio={userBio} />

          <ProfileStats userStats={userStats} />

          <ProfileTabs
            userActivity={recentActivity}
            userFavorites={favoriteGenres}
            userReading={currentlyReading}
          />
        </div>
      </div>
    </AsyncSection>
  );
}
