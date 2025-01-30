export function HeaderSearch({ ...props }) {
  return (
    <form className="flex w-[320px] items-center gap-3 rounded-md bg-slate-700 px-5 py-3 ring-slate-900">
      <input
        type="text"
        placeholder="Buscar..."
        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
        {...props}
      />
      <div className="flex h-5 w-12 items-center justify-center rounded border border-dashed border-slate-500 text-xs text-slate-500">
        ENTER
      </div>
    </form>
  );
}
