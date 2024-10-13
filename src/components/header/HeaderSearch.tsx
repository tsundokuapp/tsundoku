export function HeaderSearch() {
  return (
    <form className="flex w-[320px] items-center gap-3 rounded-full bg-slate-700 px-5 py-3 ring-slate-900">
      <input
        type="text"
        placeholder="Buscar obra..."
        className="flex-1 bg-transparent text-sm outline-none text-white placeholder:text-slate-500"
      />
    </form>
  );
}
