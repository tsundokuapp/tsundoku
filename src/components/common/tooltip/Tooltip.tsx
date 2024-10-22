interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="group relative">
      {children}
      <div className="absolute z-10 m-2 hidden rounded-md bg-black bg-opacity-80 px-2 py-1 text-xs text-white group-hover:block">
        {text}
      </div>
    </div>
  );
};
