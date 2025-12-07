import React from "react";
import { Activo, Estado } from "../types/Activo";

interface TableRowProps {
  activo: Activo;
  onEditar: (activo: Activo) => void;
  onCambiarEstado: (activo: Activo, estado: Estado) => void;
  onEliminar: (activo: Activo) => void;
}

export function TableRow({
  activo,
  onEditar,
  onCambiarEstado,
  onEliminar,
}: TableRowProps) {
  return (
    <tr className="border-t">
      <td className="p-3 text-black">{activo.nombre}</td>
      <td className="p-3 text-black">{activo.codigo}</td>
      <td className="p-3 text-black">{activo.ubicacion}</td>
      <td className="p-3 text-black">{activo.responsable}</td>
      <td className="p-3">
        <span
          className={`px-2 py-1 rounded text-sm font-semibold ${
            activo.estado === "En Uso"
              ? "bg-green-100 text-green-800"
              : activo.estado === "En Mantenimiento"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {activo.estado}
        </span>
      </td>
      <td className="p-3 text-black">{activo.fechaCambio ?? "—"}</td>
      <td className="p-3 flex gap-2">
        <button
          title="En Uso"
          onClick={() => onCambiarEstado(activo, "En Uso")}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white px-2 py-1 rounded text-sm hover:from-green-700 hover:to-green-600 transition"
        >
          Uso
        </button>
        <button
          title="Mantenimiento"
          onClick={() => onCambiarEstado(activo, "En Mantenimiento")}
          className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-2 py-1 rounded text-sm hover:from-yellow-600 hover:to-yellow-500 transition"
        >
          Mantenimiento
        </button>
        <button
          title="Fuera de Servicio"
          onClick={() => onCambiarEstado(activo, "Fuera de Servicio")}
          className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-2 py-1 rounded text-sm hover:from-orange-600 hover:to-orange-500 transition"
        >
          Baja
        </button>
        <button
          title="Editar"
          onClick={() => onEditar(activo)}
          className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-2 py-1 rounded text-sm hover:from-blue-700 hover:to-blue-600 transition"
        >
          Editar
        </button>
        <button
          title="Eliminar"
          onClick={() => onEliminar(activo)}
          className="bg-gradient-to-r from-red-600 to-red-500 text-white px-2 py-1 rounded text-sm hover:from-red-700 hover:to-red-600 transition"
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
}