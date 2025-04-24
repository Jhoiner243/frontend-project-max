import z from 'zod';

export const facturaCreateSchema = z.object({
  id_cliente: z.string(),
  total: z.number(),
  detalles: z.array(
    z.object({
      id_producto: z.string().min(1, { message: 'El id del producto es requerido' }),
      cantidad: z.number().min(1, { message: 'La cantidad es requerida' }),
      precio_venta: z.number().min(1, { message: 'El precio de venta es requerido'})
    })
  ),
});

export const DetallesFacturaSchema =  z.object({
      id_producto: z.string().min(1, { message: 'El id del producto es requerido' }),
      cantidad: z.number().min(1, { message: 'La cantidad es requerida' }),
      precio_venta: z.number().min(1, { message: 'El precio de venta es requerido'})
});