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
      <div className="rounded-lg bg-profileCardBackground p-4 text-center">
        <div className="text-2xl font-bold text-profileTextPrimary">
          {userStats.totalRead}
        </div>
        <div className="text-sm text-profileTextSecondary">Total Lidos</div>
      </div>
      <div className="rounded-lg bg-profileCardBackground p-4 text-center">
        <div className="text-2xl font-bold text-profileTextPrimary">
          {userStats.currentlyReading}
        </div>
        <div className="text-sm text-profileTextSecondary">Lendo Agora</div>
      </div>
      <div className="rounded-lg bg-profileCardBackground p-4 text-center">
        <div className="text-2xl font-bold text-profileTextPrimary">
          {userStats.completed}
        </div>
        <div className="text-sm text-profileTextSecondary">Completos</div>
      </div>
      <div className="rounded-lg bg-profileCardBackground p-4 text-center">
        <div className="text-2xl font-bold text-profileTextPrimary">
          {userStats.favorites}
        </div>
        <div className="text-sm text-profileTextSecondary">Favoritos</div>
      </div>
    </div>
  );
}
