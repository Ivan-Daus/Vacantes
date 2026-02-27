
import { z } from 'zod'


export const statusSchema = z.object({
    status: z.string().min(1, "Debes seleccionar un status"),
    comentario: z.string().min(5, "El comentario debe tener minimo 5 caracteres")
})


export type statusFormData = z.infer<typeof statusSchema>

