import { useFormContext } from 'react-hook-form';

type Trabajo = {
    empresa?: string;
    puesto?: string;
    sueldo?: number;
    fechaEntrada?: string;
    fechaSalida?: string;
    comentario?: string;
    telefono?: string;
};

type FormData = {
    trabajos: Trabajo[];
};

function TrabajosAnteriores({ index }: { index: number }) {

    const { register, getValues, formState: { errors } } =
        useFormContext<FormData>();

    const validarCampoTrabajo = (
        value: any,
        index: number,
        getValues: () => FormData
    ) => {
        if (index === 0) {
            return value ? true : "Campo requerido";
        }

        const tarjeta = getValues().trabajos[index];

        const activada = Object.values(tarjeta)
            .some(v => v !== "");

        if (!activada) {
            return true;
        }
        
        return value ? true : "Campo requerido";
    };

    return (
        <>
            
            <div className="grid grid-cols-12 p-3 m-3">
                
                <div className="col-span-12">
                    <input type="text"
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        placeholder='Empresa'
                        {...register(`trabajos.${index}.empresa`, {
                            validate: (value) => validarCampoTrabajo(value, index, getValues)
                        })}
                    />
                    {errors.trabajos?.[index]?.empresa && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].empresa.message}
                        </span>
                    )}
                </div>
                
                <div className="col-span-12">
                    <input type="text"
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        placeholder='Puesto'
                        {...register(`trabajos.${index}.puesto`, {
                            validate: (value) => validarCampoTrabajo(value, index, getValues)

                        })}
                    />
                    {errors.trabajos?.[index]?.puesto && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].puesto.message}
                        </span>
                    )}
                </div>

                <div className="col-span-12">
                    <input type="number" min={0} step={100} placeholder="Sueldo mensual"
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        {...register(`trabajos.${index}.sueldo`, {
                            validate: (value) => validarCampoTrabajo(value, index, getValues)
                        })}
                    />
                    {errors.trabajos?.[index]?.sueldo && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].sueldo.message}
                        </span>
                    )}
                </div>

                <div className="col-span-12">
                    <input type="date"
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        placeholder='Fecha entrada'
                        {...register(`trabajos.${index}.fechaEntrada`, {
                            validate: (value) => validarCampoTrabajo(value, index, getValues)
                        })}
                    />
                    {errors.trabajos?.[index]?.fechaEntrada && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].fechaEntrada.message}
                        </span>
                    )}
                </div>

                <div className="col-span-12">
                    <input type="date"
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        placeholder='Fecha salida'
                        {...register(`trabajos.${index}.fechaSalida`, {
                            validate: (value) => validarCampoTrabajo(value, index, getValues)
                        })}
                    />
                    {errors.trabajos?.[index]?.fechaSalida && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].fechaSalida.message}
                        </span>
                    )}
                </div>

                <div className="col-span-12">
                    <textarea
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        placeholder='Motivo salida'
                        {...register(`trabajos.${index}.comentario`, {
                            validate: (value) => validarCampoTrabajo(value, index, getValues)
                        })}
                    ></textarea>
                    {errors.trabajos?.[index]?.comentario && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].comentario.message}
                        </span>
                    )}
                </div>

                <div className="col-span-12">
                    
                    <input type="tel" inputMode='numeric' maxLength={10} placeholder='Télefono de referencia'
                        className="border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1 my-2"
                        onInput={(e) => {
                            e.currentTarget.value =
                                e.currentTarget.value.replace(/\D/g, "");
                        }}
                        {...register(`trabajos.${index}.telefono`, {
                            pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Debe contener exactamente 10 dígitos"
                            },
                            validate: (value) => validarCampoTrabajo(value, index, getValues)
                        })}
                    />
                    {errors.trabajos?.[index]?.telefono && (
                        <span className="errorMessage">
                            ❌ {errors.trabajos[index].telefono.message}
                        </span>
                    )}
                </div>
            </div>
        </>
    )
}

export default TrabajosAnteriores;