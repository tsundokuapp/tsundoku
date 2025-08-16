interface ProfileStatsProps {
  userStats: {
    totalRead: number;
    currentlyReading: number;
    completed: number;
    favorites: number;
    readingStreak: number;
  };
}

export function ProfileStats({ userStats }: ProfileStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      <div className="bg-profileCardBackground rounded-lg p-4 text-center">
        <div className="text-profileTextPrimary text-2xl font-bold">
          {userStats.totalRead}
        </div>
        <div className="text-profileTextSecondary text-sm">Total Lidos</div>
      </div>
      <div className="bg-profileCardBackground rounded-lg p-4 text-center">
        <div className="text-profileTextPrimary text-2xl font-bold">
          {userStats.currentlyReading}
        </div>
        <div className="text-profileTextSecondary text-sm">Lendo Agora</div>
      </div>
      <div className="bg-profileCardBackground rounded-lg p-4 text-center">
        <div className="text-profileTextPrimary text-2xl font-bold">
          {userStats.completed}
        </div>
        <div className="text-profileTextSecondary text-sm">Completos</div>
      </div>
      <div className="bg-profileCardBackground rounded-lg p-4 text-center">
        <div className="text-profileTextPrimary text-2xl font-bold">
          {userStats.favorites}
        </div>
        <div className="text-profileTextSecondary text-sm">Favoritos</div>
      </div>
    </div>
  );
}
