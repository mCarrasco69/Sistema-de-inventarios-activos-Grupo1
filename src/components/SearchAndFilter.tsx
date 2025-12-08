import { Estado } from "../types";

interface SearchAndFilterProps {
  search: string;
  filtro: "Todos" | Estado;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: "Todos" | Estado) => void;
}

export function SearchAndFilter({
  search,
  filtro,
  onSearchChange,
  onFilterChange,
}: SearchAndFilterProps) {
  return (
    <section className="bg-white p-4 rounded shadow mb-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Buscar por nombre, código, ubicación o responsable"
        className="col-span-1 sm:col-span-2 border p-2 rounded w-full text-black"
      />
      <select
        value={filtro}
        onChange={(e) => onFilterChange(e.target.value as any)}
        className="border p-2 rounded w-full text-black"
      >
        <option>Todos</option>
        <option>En Uso</option>
        <option>En Mantenimiento</option>
        <option>Fuera de Servicio</option>
      </select>
    </section>
  );
}