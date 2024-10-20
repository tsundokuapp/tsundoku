interface BadgePositionProps {
  position: string;
  color: string;
}

export const BadgePosition = ({ position, color }: BadgePositionProps) => {
  return (
    <span
      className="rounded-md px-2 py-1 text-xs text-black"
      style={{ background: color }}
    >
      {position}
    </span>
  );
};
