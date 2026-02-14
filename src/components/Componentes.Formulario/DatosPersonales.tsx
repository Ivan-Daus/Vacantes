import { useFormContext } from 'react-hook-form';

function DatosPersonales() {
    const { register, formState: { errors } } = useFormContext();

    return (
        <>
            
            <div className=' bg-white shadow-lg p-3 rounded rounded-1xl m-5'>
                
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    
                    <div className='col-span-12'>
                        <p className='font-bold text-lg'>Datos personales</p>
                    </div>
                    <div className='col-span-12 flex items-center'>
                        <input className=' py-1 border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                        placeholder-gray-400 text-gray-900 w-full'
                            placeholder="Nombre"
                            {...register("nombre", {
                                required: "El nombre es requerido",
                            })}
                        />
                    </div>
                    
                    <div className='col-span-12'>
                        {errors.nombre && <span className="errorMessage"> ❌ {String(errors.nombre.message)}</span>}
                    </div>
                    <div className='col-span-12 flex items-center'>
                        <input type="text" className="py-1 border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                        placeholder-gray-400 text-gray-900 w-full"
                            placeholder='Apellido Paterno'
                            {...register("apePat", {
                                required: {
                                    value: true,
                                    message: "El Primer apellido es requerido"
                                }
                            })} />
                    </div>
                    <div className='col-span-12'>
                        {errors.apePat && <span className="errorMessage">  ❌ {String(errors.apePat.message)}  </span>}
                    </div>
                    
                    <div className='col-span-12 flex items-center'>
                        <input type="text" className="py-1 border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                        placeholder-gray-400 text-gray-900 w-full"
                            placeholder='Apellido materno'
                            {...register("apeMat", {
                                required: {
                                    value: true,
                                    message: "El segundo apellido es requerido"
                                }
                            })} />
                    </div>
                    <div className='col-span-12'>
                        {errors.apeMat && <span className="errorMessage">  ❌ {String(errors.apeMat.message)} </span>}
                    </div>
                    
                    <div className='col-span-12 item-center'>
                        <input type="number" className="py-1 border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                        placeholder-gray-400 text-gray-900 w-full"
                            placeholder='edad'
                            min={18}
                            onKeyDown={(e) => {
                                if (e.key === "-" || e.key === "e") e.preventDefault();
                            }}
                            
                            {...register("edad", {
                                required: {
                                    value: true,
                                    message: "La edad es requerida"
                                },
                                pattern: {
                                    value: /^(1[89]|[2-5]\d|60)$/,
                                    message: "Ingresa tu edad de 18 a 60 años"
                                }
                            })} />
                    </div>
                    <div className='col-span-12'>
                        {errors.edad && <span className="errorMessage"> ❌ {String(errors.edad.message)} </span>}
                    </div>
                </div>
                
            </div>
        </>
    );
}

export default DatosPersonales;