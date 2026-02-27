import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save } from "lucide-react";

import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

const statusSchema = z.object({
    status: z.string().min(1, "Debes seleccionar un status"),
    comentario: z.string().min(5, "El comentario debe tener minimo 5 caracteres")
})


type Trabajos = {
    empresa: string
    puesto: string
    sueldo: string
    telefono: string
    fechaEntrada: string
    fechaSalida: string
    comentario: string
}


type Vacante = {
    id: number
    nombre: string
    apePat: string
    apeMat: string
    edad: number
    celular: string
    email: string
    direccion: string
    ubicacion: string
    empleo: string
    rolarTurnos: string
    trabajoNosotros: string
    escolaridad: string
    experiencia: string
    trabajos: Trabajos[]
    status: string
}



function Tabla() {
    const [vacante, setVacante] = useState<Vacante[]>([])
    const [selectedUser, setSelectedUser] = useState<Vacante | null>(null);
    const [open, setOpen] = useState(false);
    const [valor, setValor] = useState("");
    const [puestoSeleccionado, setPuestoSeleccionado] = useState("");


    /* ******************************************************************************************** */
    const opciones = ["En proceso", "Contratado", "Rechazado", "Cartera"];
    const headRows = ["nombre", "apellido", "edad", "empleo", "status"];
    const puestos = ["Todos", "auxiliar", "Subgerente", "chofer", "Contador", "supervisor", "Cajero", "Reclutador", "Soporte Técnico", "Almacenista"];
    
    useEffect(() => {
        const dataLocal = localStorage.getItem("datosFormulario")
        if (dataLocal) {
            setVacante(JSON.parse(dataLocal))
        }
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Formulario enviado")
    }

    const form = useForm({
        resolver: zodResolver(statusSchema),
        defaultValues: {
            status: "",
            comentario: ""
        }
    })

    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])

    const onSubmit = (data: any) => {
        if (!selectedUser) return;

        // Actualizar array completo
        const actualizados = vacante.map((item) =>
            item.id === selectedUser.id
                ? { ...item, status: data.status }
                : item
        );

        //  Actualizar estado del array
        setVacante(actualizados);
        localStorage.setItem("datosFormulario", JSON.stringify(actualizados));

        if (selectedUser) {
            setSelectedUser({
                ...selectedUser,
                status: data.status
            })

        }
    }

    const datosFiltrados = puestoSeleccionado && puestoSeleccionado !== "Todos" ? vacante.filter((d) => d.empleo === puestoSeleccionado) : vacante


    const statusStyles: Record<string, string> = {
        Rechazado: "bg-red-300 hover:bg-red-200",
        Cartera: "bg-zinc-300 hover:bg-zinc-200",
        Contratado: "bg-green-300 hover:bg-green-200",
        "En proceso": "bg-yellow-300 hover:bg-yellow-200"
    };
    

    return (
        <>
            <div className="m-3">
                <Select value={puestoSeleccionado} onValueChange={(value) => setPuestoSeleccionado(value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona un puesto"></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            puestos.map((i) => (
                                <SelectItem className="uppercase" key={i} value={i}> {i}  </SelectItem>
                            ))
                            
                        }
                    </SelectContent>
                </Select>
            </div>
            
            <div className="p-6 rounded-xl border bg-card shadow-lg">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b hover:bg-muted/50 transition-colors">
                            {
                                headRows.map((item, index) => (
                                    <TableHead key={index} className="text-xs uppercase text-muted-foreground">  {item}  </TableHead>
                                ))
                            }
                        </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                        {datosFiltrados.map((item, index) => (
                            <TableRow
                                key={index}
                                onClick={() => {
                                    setSelectedUser(item)
                                    setOpen(true)
                                }}
                                className={`cursor-pointer hover:bg-muted/50 transition-colors active:scale-[0.99]  
                                ${  statusStyles[item.status] || "hover:bg-muted/50" }
                                
                                ` }>
                                <TableCell>{item.nombre}</TableCell>
                                <TableCell>{item.apePat}</TableCell>
                                <TableCell>{item.edad}</TableCell>
                                <TableCell>{item.empleo}</TableCell>
                                <TableCell> {item.status}  </TableCell>
                            </TableRow>

                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-5xl bg-zinc-100 border shadow-xl">
                    <DialogHeader>
                        <DialogTitle>Información del postulante</DialogTitle>
                        <DialogDescription>
                            Información completa del registro seleccionado.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedUser && (
                        <>
                            <div className=" rounded-3 shadow-lg p-3">
                                <div className="grid grid-cols-12">
                                    <div className="col-span-3 my-3">
                                        <p><strong>Nombre:</strong> {selectedUser.nombre}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Apellido Paterno:</strong> {selectedUser.apePat}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Apellido Materno:</strong> {selectedUser.apeMat}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Edad:</strong> {selectedUser.edad}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Celular:</strong> {selectedUser.celular}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Email:</strong> {selectedUser.email ?? "No registrado"}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Ubicación:</strong> {selectedUser.ubicacion ?? "No registrada"}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Empleo:</strong> {selectedUser.empleo ?? "No registrada"}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>¿Has trabajado con nosotros?:</strong> {selectedUser.trabajoNosotros ?? "No registrada"}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Rolar turnos:</strong> {selectedUser.rolarTurnos ?? "No registrada"}</p>
                                    </div>
                                    <div className="col-span-3 my-3">
                                        <p><strong>Experiencia:</strong> {selectedUser.experiencia ?? "No registrada"}</p>
                                    </div>

                                </div>
                            </div>

                            <p className="font-bold uppercase">Empleos anteriores</p>
                            <div className="grid grid-cols-12">
                                {
                                    selectedUser?.trabajos?.length > 0 ? (

                                        selectedUser?.trabajos?.map((i, index) => (
                                            <div className="border rounded-2xl shadow-lg p-3 m-3 col-span-4 bg-zinc-50" key={index}>
                                                <div className="col-span-3 my-3">
                                                    <p><strong>Empresa: </strong>  {i.empresa || "Sin datos"}  </p>
                                                </div>
                                                <div className="col-span-3 my-3">
                                                    <p> <strong>Puesto: </strong> {i.puesto || "Sin datos"}  </p>
                                                </div>
                                                <div className="col-span-3 my-3">
                                                    <p> <strong>Sueldo: </strong> {i.sueldo || "Sin datos"}  </p>
                                                </div>
                                                <div className="col-span-3 my-3">
                                                    <p><strong>Fecha entrada: </strong>  {i.fechaEntrada || "Sin datos"}  </p>
                                                </div>
                                                <div className="col-span-3 my-3">
                                                    <p> <strong>Fecha salida: </strong> {i.fechaSalida || "Sin datos"}  </p>
                                                </div>
                                                <div className="col-span-3 my-3">
                                                    <p> <strong>Comentarios: </strong> {i.comentario || "Sin datos"}  </p>
                                                </div>
                                                <div className="col-span-3 my-3">
                                                    <p> <strong>Telfono de referencia: </strong> {i.telefono || "Sin datos"}  </p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (<p className="text-muted-foreground col-span-6">  No tiene experiencia previa.  </p>)
                                }
                            </div>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <FormField control={form.control} name="status" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Selecciona una opción"></SelectValue>
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        opciones.map((opcion) => (
                                                            <SelectItem key={opcion} value={opcion}> {opcion}  </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}>
                                    </FormField>
                                    <FormField control={form.control} name="comentario" render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Comentario</FormLabel>

                                            <FormControl>
                                                <Textarea
                                                    placeholder="Escribe un comentario..."
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}>

                                    </FormField>
                                    <Button type="submit" className="w-full mt-5">
                                        <Save className="mr-2 h-4 w-4"></Save> Guardar
                                    </Button>
                                </form>
                            </Form>

                        </>
                    )}

                </DialogContent>
            </Dialog>

        </>
    )
}

export default Tabla;
