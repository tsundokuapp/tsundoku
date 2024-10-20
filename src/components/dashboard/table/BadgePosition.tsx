interface BadgePositionProps {
  position: string;
}

export const BadgePosition = ({ position }: BadgePositionProps) => {
  return (
    <span className="rounded-md bg-green-500 px-2 py-1 text-xs text-white">
      {position}
    </span>
  );
};
