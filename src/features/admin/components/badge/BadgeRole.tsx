interface BadgePositionProps {
  role: string;
  color: string;
}

export const BadgeRole = ({ role, color }: BadgePositionProps) => {
  return (
    <>
      <span
        className="rounded-md px-2 py-1 text-xs text-black"
        style={{ background: color }}
      >
        {role}
      </span>
    </>
  );
};
