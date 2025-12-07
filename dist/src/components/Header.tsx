import React from "react";

interface HeaderProps {
  onAgregarActivo: () => void;
}

export function Header({ onAgregarActivo }: HeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
      <h1 className="text-2xl font-bold">Sistema de Inventario de Activos</h1>
      <div className="flex gap-3">
        <button
          onClick={onAgregarActivo}
          className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-4 py-2 rounded-md shadow-sm hover:from-purple-700 hover:to-purple-600 transition"
        >
          + Nuevo Activo
        </button>
      </div>
    </header>
  );
}