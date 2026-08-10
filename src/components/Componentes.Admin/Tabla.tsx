import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { statusSchema } from "../Soporte/Validacion";

import type { Vacante } from "../Soporte/Interfaz";
import { opciones, headRows, empleosVacantes } from "../Soporte/Arrays"

function Tabla() {
    const [vacante, setVacante] = useState<Vacante[]>([])
    const [selectedUser, setSelectedUser] = useState<Vacante | null>(null);
    const [open, setOpen] = useState(false);
    const [puestoSeleccionado, setPuestoSeleccionado] = useState("");
    const [statusSeleccionado, setStatusSeleccionado] = useState("");

    const form = useForm({
        resolver: zodResolver(statusSchema),
        defaultValues: {
            status: "",
            comentario: ""
        }
    })

    useEffect(() => {
        const dataLocal = localStorage.getItem("datosFormulario")
        if (dataLocal) {
            setVacante(JSON.parse(dataLocal))
        }
    }, []);

    useEffect(() => {
        console.log(selectedUser)
    }, [selectedUser])

    const statusStyles: Record<string, string> = {
        Rechazado: "bg-red-300 text-red-700",
        Cartera: "bg-zinc-300 text-zinc-700",
        Contratado: "bg-green-300 text-green-700",
        Proceso: "bg-yellow-300 text-yellow-900",
    };

    

    const onSubmit = (data: any) => {
        console.log(data)
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

    const datosFiltrados = vacante
        .filter(d => !puestoSeleccionado || puestoSeleccionado === "Todos" || d.empleo === puestoSeleccionado)
        .filter(d => !statusSeleccionado || statusSeleccionado === "Todos" || d.status === statusSeleccionado);
        
    //console.log(puestoSeleccionado);
    //console.log(statusSeleccionado);

    return (
        <>
            <div className="mx-10 my-5 grid grid-cols-12">
                <div className="col-span-3">
                    <Select value={puestoSeleccionado} onValueChange={(value) => setPuestoSeleccionado(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Selecciona un puesto"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                empleosVacantes.map((i) => (
                                    <SelectItem className="uppercase" key={i} value={i}> {i}  </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
                <div className="col-span-3">
                    <Select value={statusSeleccionado} onValueChange={(value) => setStatusSeleccionado(value)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Seleccina un estatus"></SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            {
                                opciones.map((i) => (
                                    <SelectItem className="uppercase" key={i} value={i}> {i} </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="p-6 m-10 rounded-2xl border bg-background/60 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <Table>
                    <TableHeader className="bg-muted/30">
                        <TableRow>
                            {
                                headRows.map((item, index) => (
                                    <TableHead key={index} className="text-xs uppercase ">  {item}  </TableHead>
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
                                className={`h-14 border-separate  border-spacing-y-2 cursor-pointer transition-colors hover:bg-muted/90
                                ${index % 2 === 0 ? "bg-muted/20" : ""}
                                ` }>
                                <TableCell className="text-muted-foreground">{item.nombre}</TableCell>
                                <TableCell className="text-muted-foreground">{item.apePat}</TableCell>
                                <TableCell className="text-muted-foreground">{item.edad}</TableCell>
                                <TableCell className="text-muted-foreground">{item.empleo}</TableCell>
                                <TableCell>
                                    <span className={`
                                        px-3 py-1 rounded-full text-xs font-semibold
                                        ${statusStyles[item.status] ?? "bg-gray-200 text-gray-600"}
                                        `}>
                                        {item.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>

                <DialogContent className="sm:max-w-5xl bg-background border-0 shadow-2xl rounded-3xl p-8">
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
