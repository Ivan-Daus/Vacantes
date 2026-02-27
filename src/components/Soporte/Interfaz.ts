export type Trabajos = {
    empresa: string
    puesto: string
    sueldo: string
    telefono: string
    fechaEntrada: string
    fechaSalida: string
    comentario: string
}

export type Vacante = {
    id: string
    nombre: string
    apePat: string
    apeMat: string
    edad: string
    celular: string
    email: string
    direccion: string
    ubicacion: string
    empleo: string
    rolarTurnos: string
    trabajoNosotros: string
    escolaridad: string
    experiencia: string
    empresa:string
    trabajos: Trabajos[]
    status: string
}
