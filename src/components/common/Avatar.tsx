import Image from 'next/image';

interface AvatarProps {
  src: string;
  alt?: string;
  size?: number;
  name: string;
  inHouse: string;
  horizontal?: boolean;
}

export const Avatar = ({
  src,
  alt = 'Avatar',
  size = 100,
  name,
  inHouse,
  horizontal = false,
}: AvatarProps) => {
  return (
    <div
      className={`flex items-center justify-center gap-2 ${horizontal ? 'flex-row' : 'flex-col'}`}
    >
      <Image
        width={size}
        height={size}
        src={src}
        alt={alt}
        className={`rounded-full border-4 border-white`}
      />
      <div className="flex flex-col items-center justify-center ps-3">
        <div className="text-base font-semibold">{name}</div>
        <div className="font-normal text-gray-500">{inHouse}</div>
      </div>
    </div>
  );
};
