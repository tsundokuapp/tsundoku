import { Calendar, DiscordLogo, MapPin } from '@phosphor-icons/react/dist/ssr';

import { CollapseText } from '@/components/project/CollapseText';

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
    <div className="bg-profileCardBackground overflow-hidden rounded-lg px-6 py-4">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        <div className="flex flex-grow flex-col gap-4">
          <h1 className="text-profileTextPrimary text-3xl font-bold">
            {userBio.username}
          </h1>

          <div className="text-profileTextSecondary flex flex-wrap items-center gap-2 text-sm">
            <span className="text-profileTextTertiary bg-roleEditor rounded-full px-4 py-1 text-xs font-semibold">
              {userBio.roles[0].title}
            </span>
            <span>•</span>
            <span className="border-profileTextPrimary text-profileTextPrimary rounded-full border px-4 py-1 text-xs">
              {userBio.roles[1].title}
            </span>
            <span>•</span>
            <span className="border-profileTextPrimary text-profileTextPrimary rounded-full border px-4 py-1 text-xs">
              {userBio.roles[2].title}
            </span>
          </div>

          <div className="text-profileTextSecondary flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Calendar className="text-profileIcon h-4 w-4" />
              <span>Membro desde {userBio.joinDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="text-profileIcon h-4 w-4" />
              <span>{userBio.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DiscordLogo className="text-profileIcon h-4 w-4" />
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
