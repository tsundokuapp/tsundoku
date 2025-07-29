interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  return (
    <div className="group relative inline-flex items-center justify-center text-sm font-medium text-white hover:text-white">
      {children}
      <div className="opacity-0 transition-all duration-300 ease-in group-hover:block group-hover:opacity-100">
        <div className="pointer-events-none absolute left-1/2 z-50 flex -translate-x-1/2 -translate-y-4 flex-col items-center rounded-sm text-center text-sm text-slate-300 transition-all duration-500 ease-in-out before:-top-2 group-hover:-translate-y-16">
          <div className="rounded-sm bg-black px-2 py-1">
            <p className="whitespace-nowrap">{text}</p>
          </div>
          <div className="h-0 w-fit border-l-8 border-r-8 border-t-8 border-transparent border-t-black"></div>
        </div>
      </div>
    </div>
  );
};
