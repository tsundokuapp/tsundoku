import Image from 'next/image';
import { useRef, useState } from 'react';

import { cn } from '@/helpers/twUtils';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  name?: string;
  description?: string;
  horizontal?: boolean;
  className?: string;
  menu?: boolean;
}

export const Avatar = ({
  alt = 'Avatar',
  src,
  name,
  description,
  horizontal = false,
  className,
  menu = false,
}: AvatarProps) => {
  const [isOpenDropdown, setisOpenDropdown] = useState(false);
  const ref = useRef(null);
  const toggleDropdown = () => {
    setisOpenDropdown(!isOpenDropdown);
  };

  return (
    <div
      className={`flex items-center justify-center gap-2 ${horizontal ? 'flex-row' : 'flex-col'}`}
    >
      <div className="flex">
        <Image
          id="avatarButton"
          onClick={() => {
            menu && toggleDropdown();
          }}
          data-dropdown-toggle="userDropdown"
          data-dropdown-placement="bottom-start"
          className={cn(
            'h-12 w-12 rounded-full p-1 ring-2 ring-gray-300 dark:ring-gray-500',
            className,
            {
              'hover:ring-primary hover:dark:ring-primary hover:cursor-pointer':
                menu,
            },
          )}
          src={src}
          alt={alt}
          width={100}
          height={100}
          ref={ref}
        />

        <div
          className={cn('relative z-10', {
            hidden: !isOpenDropdown,
          })}
        >
          <div className="absolute z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700">
            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
              <div>Axios</div>
              <div className="font-medium">Admin</div>
            </div>
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="avatarButton"
            >
              <li>
                <a
                  href="#"
                  onClick={() => setisOpenDropdown(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Perfil
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => setisOpenDropdown(false)}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Configurações
                </a>
              </li>
            </ul>
            <div className="py-1">
              <a
                href="#"
                onClick={() => setisOpenDropdown(false)}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>

      {name && (
        <div
          className={cn('flex flex-col items-start justify-center', {
            'items-center': !horizontal,
          })}
        >
          {name && <p className="text-left text-base font-semibold">{name}</p>}
          {description && (
            <p className="text-xs text-slate-500">{description}</p>
          )}
        </div>
      )}
    </div>
  );
};
