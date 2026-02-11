import { useFormContext } from 'react-hook-form';

function Ubicacion() {
    const { register, formState: { errors } } = useFormContext();
    const alcaldias = [
        { code: "CDMX-01", name: "Álvaro Obregón" },
        { code: "CDMX-02", name: "Azcapotzalco" },
        { code: "CDMX-03", name: "Benito Juárez" },
        { code: "CDMX-04", name: "Coyoacán" },
        { code: "CDMX-05", name: "Cuajimalpa de Morelos" },
        { code: "CDMX-06", name: "Cuauhtémoc" },
        { code: "CDMX-07", name: "Gustavo A. Madero" },
        { code: "CDMX-08", name: "Iztacalco" },
        { code: "CDMX-09", name: "Iztapalapa" },
        { code: "CDMX-10", name: "La Magdalena Contreras" },
        { code: "CDMX-11", name: "Miguel Hidalgo" },
        { code: "CDMX-12", name: "Milpa Alta" },
        { code: "CDMX-13", name: "Tláhuac" },
        { code: "CDMX-14", name: "Tlalpan" },
        { code: "CDMX-15", name: "Venustiano Carranza" },
        { code: "CDMX-16", name: "Xochimilco" },
    ];
    
    return (
        <>
            <div className='grid grid-cols-12 gap-4 bg-white shadow-lg p-3 rounded-1xl m-5'>

                {/* UBICACIÓN */}
                <div className='sm:col-span-12 col-span-6 flex flex-col'>
                    <p className='font-bold text-lg mb-1'>Ubicación</p>
                    <select className='border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1'
                        {...register("ubicacion",{
                            required:{
                                value:true,
                                message:"Ingresa tu ubicación"
                            }
                        })}
                        >
                        <option value="">Selecciona</option>
                        {alcaldias.map(item => (
                            <option key={item.code} value={item.code}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                    {errors.ubicacion && <span  className="errorMessage"> ❌ {  String(errors.ubicacion.message)}</span>}
                </div>
                {/* EDUCACIÓN */}
                <div className='sm:col-span-12 col-span-6 flex flex-col'>
                    <p className='font-bold text-lg mb-1'>Educación</p>
                    <select
                        className='border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full p-1'
                        {...register("escolaridad",{
                            required:{
                                value:true,
                                message:"Selecciona educación"
                            }
                        })}
                    >
                        <option value="">Selecciona</option>
                        <option value="secundaria">Secundaria</option>
                        <option value="prepa">Preparatoria</option>
                        <option value="uni">Universidad</option>
                    </select>
                    {errors.escolaridad && <span  className="errorMessage"> ❌ {  String(errors.escolaridad.message)}</span>}
                </div>
                
            </div>

        </>
    );
}

export default Ubicacion;