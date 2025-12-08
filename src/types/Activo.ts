export type Estado = "En Uso" | "En Mantenimiento" | "Fuera de Servicio";

export interface Activo {
  id: string;
  nombre: string;
  codigo: string;
  ubicacion: string;
  responsable: string;
  estado: Estado;
  fechaCambio?: string;
}
