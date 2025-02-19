// Color Checked
// Components Checked
export function HeaderSearch({ ...props }) {
  return (
    <form className="bg-appSearchBackground flex w-[320px] items-center gap-3 rounded-md px-5 py-3">
      <input
        type="text"
        placeholder="Buscar..."
        className="text-appSearchText placeholder:text-appSearchPlaceholder flex-1 bg-transparent text-sm outline-none"
        {...props}
      />
      <div className="border-appSearchPlaceholder text-appSearchPlaceholder flex h-5 w-12 items-center justify-center rounded border border-dashed text-xs">
        ENTER
      </div>
    </form>
  );
}
