export interface GananciasEntity {
  tipo_periodo: TipoPeriodo;
  ganancia_total: number;
  fecha_inicio: Date;
  fecha_fin: Date;
  createdAt: Date;
}

export enum TipoPeriodo {
  Diario = "diario",
  Mensual = "mensual",
  Semanal = "semanal",
  Anual = "anual",
}
