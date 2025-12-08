import React from "react";
import { TableRow } from "./TableRow";
import { Activo, Estado } from "../types";

interface ActivosTableProps {
  activos: Activo[];
  onEditar: (activo: Activo) => void;
  onCambiarEstado: (activo: Activo, estado: Estado) => void;
  onEliminar: (activo: Activo) => void;
}

export function ActivosTable({
  activos,
  onEditar,
  onCambiarEstado,
  onEliminar,
}: ActivosTableProps) {
  return (
    <>
      {/* Mobile: cards */}
      <div className="space-y-4 sm:hidden">
        {activos.length === 0 && (
          <div className="p-6 text-center text-black bg-white rounded shadow">No hay activos que coincidan.</div>
        )}
        {activos.map((a) => (
          <div key={a.id} className="bg-white p-4 rounded shadow">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-lg font-semibold text-black">{a.nombre}</div>
                <div className="text-sm text-black">{a.codigo} • {a.ubicacion}</div>
                <div className="text-sm text-black">Responsable: {a.responsable}</div>
              </div>
              <div>
                <span className={`px-2 py-1 rounded text-sm font-semibold ${
                  a.estado === "En Uso"
                    ? "bg-green-100 text-green-800"
                    : a.estado === "En Mantenimiento"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>{a.estado}</span>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={() => onCambiarEstado(a, "En Uso")} className="bg-gradient-to-r from-green-600 to-green-500 text-white px-3 py-1 rounded text-sm hover:from-green-700 hover:to-green-600 transition">Uso</button>
              <button onClick={() => onCambiarEstado(a, "En Mantenimiento")} className="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white px-3 py-1 rounded text-sm hover:from-yellow-600 hover:to-yellow-500 transition">Mto</button>
              <button onClick={() => onCambiarEstado(a, "Fuera de Servicio")} className="bg-gradient-to-r from-orange-500 to-orange-400 text-white px-3 py-1 rounded text-sm hover:from-orange-600 hover:to-orange-500 transition">Baja</button>
              <button onClick={() => onEditar(a)} className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-3 py-1 rounded text-sm hover:from-blue-700 hover:to-blue-600 transition">Editar</button>
              <button onClick={() => onEliminar(a)} className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1 rounded text-sm hover:from-red-700 hover:to-red-600 transition">Eliminar</button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-3 text-black">Nombre</th>
              <th className="text-left p-3 text-black">Código</th>
              <th className="text-left p-3 text-black">Ubicación</th>
              <th className="text-left p-3 text-black">Responsable</th>
              <th className="text-left p-3 text-black">Estado</th>
              <th className="text-left p-3 text-black">Fecha Últ. Cambio</th>
              <th className="text-left p-3 text-black">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {activos.map((a) => (
              <TableRow
                key={a.id}
                activo={a}
                onEditar={onEditar}
                onCambiarEstado={onCambiarEstado}
                onEliminar={onEliminar}
              />
            ))}
            {activos.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-black">
                  No hay activos que coincidan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
