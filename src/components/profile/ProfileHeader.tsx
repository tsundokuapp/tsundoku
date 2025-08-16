import { Heart, PencilSimple } from '@phosphor-icons/react/dist/ssr';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/common/button/Button';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/shadcn/avatar';

interface ProfileHeaderProps {
  avatarFallback: string;
  allowEdit?: boolean;
  avatarImage?: string;
}

export function ProfileHeader({
  avatarFallback,
  avatarImage = '',
  allowEdit = false,
}: ProfileHeaderProps) {
  const router = useRouter();

  function handleEditProfile() {
    router.push('/me/edit');
  }

  function handleFollowUser() {
    // Implementar a lógica de seguir usuário
  }

  return (
    <div className="from-profileHeaderBgFrom to-profileHeaderBgTo h-48 bg-gradient-to-b">
      <div className="mx-auto flex h-48 w-full max-w-[1300px] flex-col justify-between lg:flex-row lg:px-8">
        {allowEdit ? (
          <div className="flex w-full justify-end px-6 py-4 lg:hidden">
            <Button
              onClick={handleEditProfile}
              className="h-10 w-20 border-appButtonBorder bg-transparent text-sm text-appButtonText hover:bg-appButtonHover"
            >
              Editar
            </Button>
          </div>
        ) : (
          <div className="flex w-full justify-end px-6 py-4 lg:hidden">
            <Button
              onClick={handleFollowUser}
              className="h-10 w-20 border-appButtonBorder bg-transparent text-sm text-appButtonText hover:bg-appButtonHover"
            >
              Seguir
            </Button>
          </div>
        )}

        <div className="flex h-full items-end justify-center lg:justify-start">
          <div className="h-32 w-32 translate-y-1/4 rounded-full border-4 border-appBackground">
            <Avatar className="h-full w-full">
              <AvatarImage src={avatarImage} />
              <AvatarFallback className="bg-profileAvatarFallbackBg text-profileAvatarFallbackText text-3xl font-semibold">
                {avatarFallback}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {allowEdit ? (
          <div className="hidden items-end justify-end px-6 py-4 lg:flex">
            <Button
              icon={<PencilSimple className="mr-2 h-4 w-4" />}
              onClick={handleEditProfile}
              className="h-10 w-40 border-appButtonBorder bg-transparent text-appButtonText hover:bg-appButtonHover"
            >
              Editar Perfil
            </Button>
          </div>
        ) : (
          <div className="hidden items-end justify-end px-6 py-4 lg:flex">
            <Button
              icon={<Heart className="mr-2 h-4 w-4" />}
              onClick={handleFollowUser}
              className="w-30 h-10 border-appButtonBorder bg-transparent text-appButtonText hover:bg-appButtonHover"
            >
              Seguir
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
