import Swal from "sweetalert2";
import { Activo, Estado } from "../types";
import { escapeHtml } from "../utils/helpers";

interface FormValues {
  nombre: string;
  codigo: string;
  ubicacion: string;
  responsable: string;
  estado: Estado;
}

export async function mostrarModalAgregarActivo(): Promise<FormValues | null> {
  const { value: formValues } = await Swal.fire({
    title: "Registrar Activo",
    html:
      '<input id="swal-nombre" class="swal2-input" placeholder="Nombre">' +
      '<input id="swal-codigo" class="swal2-input" placeholder="Código">' +
      '<input id="swal-ubicacion" class="swal2-input" placeholder="Ubicación">' +
      '<input id="swal-responsable" class="swal2-input" placeholder="Responsable">' +
      '<select id="swal-estado" class="swal2-select">' +
      "<option>En Uso</option><option>En Mantenimiento</option><option>Fuera de Servicio</option></select>",
    focusConfirm: false,
    preConfirm: () => {
      const nombre = (
        document.getElementById("swal-nombre") as HTMLInputElement
      ).value;
      const codigo = (
        document.getElementById("swal-codigo") as HTMLInputElement
      ).value;
      const ubicacion = (
        document.getElementById("swal-ubicacion") as HTMLInputElement
      ).value;
      const responsable = (
        document.getElementById("swal-responsable") as HTMLInputElement
      ).value;
      const estado = (
        document.getElementById("swal-estado") as HTMLSelectElement
      ).value as Estado;
      if (!nombre || !codigo) {
        Swal.showValidationMessage("Nombre y Código son obligatorios");
        return;
      }
      return { nombre, codigo, ubicacion, responsable, estado };
    },
  });

  return formValues || null;
}

export async function mostrarModalEditarActivo(
  activo: Activo
): Promise<FormValues | null> {
  const { value: formValues } = await Swal.fire({
    title: "Editar Activo",
    html:
      `<input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${escapeHtml(
        activo.nombre
      )}">` +
      `<input id="swal-codigo" class="swal2-input" placeholder="Código" value="${escapeHtml(
        activo.codigo
      )}">` +
      `<input id="swal-ubicacion" class="swal2-input" placeholder="Ubicación" value="${escapeHtml(
        activo.ubicacion
      )}">` +
      `<input id="swal-responsable" class="swal2-input" placeholder="Responsable" value="${escapeHtml(
        activo.responsable
      )}">` +
      `<select id="swal-estado" class="swal2-select">` +
      `<option ${activo.estado === "En Uso" ? "selected" : ""}>En Uso</option>` +
      `<option ${
        activo.estado === "En Mantenimiento" ? "selected" : ""
      }>En Mantenimiento</option>` +
      `<option ${
        activo.estado === "Fuera de Servicio" ? "selected" : ""
      }>Fuera de Servicio</option>` +
      `</select>`,
    focusConfirm: false,
    preConfirm: () => {
      const nombre = (
        document.getElementById("swal-nombre") as HTMLInputElement
      ).value;
      const codigo = (
        document.getElementById("swal-codigo") as HTMLInputElement
      ).value;
      const ubicacion = (
        document.getElementById("swal-ubicacion") as HTMLInputElement
      ).value;
      const responsable = (
        document.getElementById("swal-responsable") as HTMLInputElement
      ).value;
      const estado = (
        document.getElementById("swal-estado") as HTMLSelectElement
      ).value as Estado;
      if (!nombre || !codigo) {
        Swal.showValidationMessage("Nombre y Código son obligatorios");
        return;
      }
      return { nombre, codigo, ubicacion, responsable, estado };
    },
  });

  return formValues || null;
}

export async function confirmarCambioEstado(
  activo: Activo,
  nuevoEstado: Estado
): Promise<boolean> {
  const { isConfirmed } = await Swal.fire({
    title: "Confirmar",
    text: `Cambiar estado de "${activo.nombre}" a "${nuevoEstado}"?`,
    icon: "question",
    showCancelButton: true,
  });

  return isConfirmed;
}

export async function confirmarEliminar(activo: Activo): Promise<boolean> {
  const { isConfirmed } = await Swal.fire({
    title: "Eliminar",
    text: `¿Eliminar activo "${activo.nombre}"?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
  });

  return isConfirmed;
}

export function mostrarExito(titulo: string, mensaje: string) {
  Swal.fire(titulo, mensaje, "success");
}
