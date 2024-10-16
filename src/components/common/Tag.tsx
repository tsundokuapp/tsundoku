interface TagProps {
  variant?: 'regular' | 'fill';
  children: React.ReactNode;
}

export function Tag({ variant = 'regular', children }: TagProps) {
  return (
    <span
      data-variant={variant}
      className={
        'inline-block rounded-lg border border-slate-900 px-2 py-[1px] text-sm text-slate-900 data-[variant="fill"]:bg-slate-900 data-[variant="fill"]:text-white dark:border-white dark:text-white data-[variant="fill"]:dark:bg-white data-[variant="fill"]:dark:font-semibold data-[variant="fill"]:dark:text-slate-900'
      }
    >
      {children}
    </span>
  );
}
