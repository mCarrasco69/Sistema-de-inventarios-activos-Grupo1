import React, { useMemo } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Header } from "./components/Header";
import { SearchAndFilter } from "./components/SearchAndFilter";
import { ActivosTable } from "./components/ActivosTable";
import { Activo, Estado } from "./types";
import {
  mostrarModalAgregarActivo,
  mostrarModalEditarActivo,
  confirmarCambioEstado,
  confirmarEliminar,
  mostrarExito,
} from "./services/ActivosServices";

const ejemplo: Activo[] = [
  {
    id: "la001act",
    nombre: "Laptop ",
    codigo: "LA-001",
    ubicacion: "Oficina 1",
    responsable: "Ana",
    estado: "En Uso",
  },
  {
    id: "im002act",
    nombre: "Impresora B",
    codigo: "IM-002",
    ubicacion: "Oficina 2",
    responsable: "Luis",
    estado: "En Mantenimiento",
    fechaCambio: new Date().toLocaleString(),
  },
  {
    id: "rt003act",
    nombre: "Router C",
    codigo: "RT-003",
    ubicacion: "Sala de Redes",
    responsable: "Sergio",
    estado: "Fuera de Servicio",
    fechaCambio: new Date().toLocaleString(),
  },
];

export default function App() {
  const [activos, setActivos] = useLocalStorage<Activo[]>("activos", ejemplo);
  const [filtro, setFiltro] = useLocalStorage<"Todos" | Estado>("filtro", "Todos");
  const [search, setSearch] = useLocalStorage<string>("search", "");

  const filtered = useMemo(() => {
    return activos.filter((a) => {
      const q = search.trim().toLowerCase();
      if (filtro !== "Todos" && a.estado !== filtro) return false;
      if (!q) return true;
      return [a.nombre, a.codigo, a.ubicacion, a.responsable].some((field) =>
        field.toLowerCase().includes(q)
      );
    });
  }, [activos, filtro, search]);

  async function agregarActivo() {
    const formValues = await mostrarModalAgregarActivo();

    if (formValues) {
      const nuevo: Activo = {
        id: `act-${Date.now()}`,
        nombre: formValues.nombre,
        codigo: formValues.codigo,
        ubicacion: formValues.ubicacion || "",
        responsable: formValues.responsable || "",
        estado: formValues.estado,
        fechaCambio:
          formValues.estado === "En Mantenimiento" ||
          formValues.estado === "Fuera de Servicio"
            ? new Date().toLocaleString()
            : undefined,
      };
      setActivos((prev) => [nuevo, ...prev]);
      mostrarExito("Registrado", "Activo agregado correctamente");
    }
  }

  async function cambiarEstado(a: Activo, nuevo: Estado) {
    const confirmado = await confirmarCambioEstado(a, nuevo);
    if (confirmado) {
      setActivos((prev) =>
        prev.map((x) => {
          if (x.id !== a.id) return x;
          const fechaCambio =
            nuevo === "En Mantenimiento" || nuevo === "Fuera de Servicio"
              ? new Date().toLocaleString()
              : undefined;
          return { ...x, estado: nuevo, fechaCambio };
        })
      );
      mostrarExito("Actualizado", "Estado cambiado");
    }
  }

  async function editarActivo(a: Activo) {
    const formValues = await mostrarModalEditarActivo(a);

    if (formValues) {
      setActivos((prev) =>
        prev.map((x) => {
          if (x.id !== a.id) return x;
          return {
            ...x,
            nombre: formValues.nombre,
            codigo: formValues.codigo,
            ubicacion: formValues.ubicacion,
            responsable: formValues.responsable,
            estado: formValues.estado,
            fechaCambio:
              formValues.estado === "En Mantenimiento" ||
              formValues.estado === "Fuera de Servicio"
                ? x.fechaCambio || new Date().toLocaleString()
                : undefined,
          };
        })
      );
      mostrarExito("Guardado", "Cambios actualizados");
    }
  }

  async function eliminarActivo(a: Activo) {
    const confirmado = await confirmarEliminar(a);
    if (confirmado) {
      setActivos((prev) => prev.filter((x) => x.id !== a.id));
      mostrarExito("Eliminado", "Activo eliminado");
    }
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <Header onAgregarActivo={agregarActivo} />
        <SearchAndFilter
          search={search}
          filtro={filtro}
          onSearchChange={setSearch}
          onFilterChange={setFiltro}
        />
        <ActivosTable
          activos={filtered}
          onEditar={editarActivo}
          onCambiarEstado={cambiarEstado}
          onEliminar={eliminarActivo}
        />
      </div>
    </div>
  );
}
