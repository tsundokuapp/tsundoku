import { Calendar, DiscordLogo, MapPin } from '@phosphor-icons/react/dist/ssr';

import { CollapseText } from '@/features/project/components/CollapseText';

interface ProfileBioProps {
  userBio: {
    username: string;
    bio: string;
    location: string;
    discord: string;
    joinDate: string;
    roles: { title: string; color?: string }[];
  };
}

export function ProfileBio({ userBio }: ProfileBioProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-profileCardBackground px-6 py-4">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex flex-grow flex-col gap-4">
          <h1 className="text-3xl font-bold text-profileTextPrimary">
            {userBio.username}
          </h1>

          <div className="flex flex-wrap items-center gap-2 text-sm text-profileTextSecondary">
            <span className="rounded-full bg-roleEditor px-4 py-1 text-xs font-semibold text-profileTextTertiary">
              {userBio.roles[0].title}
            </span>
            <span>•</span>
            <span className="rounded-full border border-profileTextPrimary px-4 py-1 text-xs text-profileTextPrimary">
              {userBio.roles[1].title}
            </span>
            <span>•</span>
            <span className="rounded-full border border-profileTextPrimary px-4 py-1 text-xs text-profileTextPrimary">
              {userBio.roles[2].title}
            </span>
          </div>

          <div className="flex flex-wrap gap-6 text-sm text-profileTextSecondary">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-profileIcon" />
              <span>Membro desde {userBio.joinDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-profileIcon" />
              <span>{userBio.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DiscordLogo className="h-4 w-4 text-profileIcon" />
              <span>{userBio.discord}</span>
            </div>
          </div>

          <CollapseText>{userBio.bio}</CollapseText>
        </div>
      </div>
    </div>
  );
}

/*
Sobre as roles: o ideal é ter um componente que renderize elas e saiba identificar as roles com cores (admin, staff, etc..)
*/
