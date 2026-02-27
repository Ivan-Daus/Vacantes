import { useFormContext } from 'react-hook-form';
import { empleosVacantes  } from "../Soporte/Arrays"

function Work() {
    const { register, formState: { errors } } = useFormContext();
    
    return (
        <>
            <div className='bg-white shadow-lg p-3 rounded rounded-1xl m-5'>
                
                <div className='grid grid-cols-12 gap-4'>
                    
                    <div className='col-span-12 lg:col-span-6'>
                        <p className='font-bold text-lg mb-1'>INFORMACIÓN DE TRABAJO</p>
                        <p className='font-bold text-lg mb-1'>¿Selecciona la vacante que te intereso?</p>
                        <select className='border border-blue-800 rounded-sm shadow-lg focus:outline-none 
                        focus:ring-2 focus:ring-blue-400 focus:border-blue-500 w-full' 
                            {...register("empleo",{
                                required:{
                                    value:true,
                                    message:"ingresa la vacante que te interesa"
                                }
                                
                            })}>
                            <option value="">Selecciona</option>
                            {
                                empleosVacantes.map((em)=>(
                                    <option value={em}> {em}  </option>
                                ))
                            }
                        </select>
                        {errors.empleo && <span  className="errorMessage"> ❌ {  String(errors.empleo.message)}</span>}
                    </div>
                    
                    
                    <div className='col-span-12 lg:col-span-6'>
                        <p className='font-bold text-lg mb-1'>¿Tienes alguna experiencia laboral?</p>
                        
                        <label className='flex items-center gap-2'>
                            Si
                            <input type="radio" value="si"
                            {...register("experiencia", { 
                                required:{
                                    value:true,
                                    message:"Selecciona una opción"
                                }  
                            })}
                            />
                            
                        </label>
                        
                        <label className='flex items-center gap-2'>
                            No <input type="radio"  value="no"
                            {...register("experiencia", { 
                                required:{
                                    value:true,
                                    message:"Selecciona una opción"
                                } 
                            })}
                            />
                        </label>
                        {errors.experiencia && <span  className="errorMessage"> ❌ {  String(errors.experiencia.message)}</span>}
                    </div>
                    
                    
                    <div className='col-span-12 lg:col-span-6'>
                        <p className='font-bold text-lg mb-1'>¿Cuentas con disponibilidad para rolar turnos?</p>
                        
                        <label className='flex items-center gap-2'>
                            Si
                            <input type="radio" value="si"
                            {...register("rolarTurnos", { 
                                required:{
                                    value:true,
                                    message:"Selecciona una opción"
                                }  
                            })}
                            />
                            
                        </label>
                        
                        <label className='flex items-center gap-2'>
                            No <input type="radio"  value="no"
                            {...register("rolarTurnos", { 
                                required:{
                                    value:true,
                                    message:"Selecciona una opción"
                                } 
                            })}
                            />
                        </label>
                        {errors.rolarTurnos && <span  className="errorMessage"> ❌ {  String(errors.rolarTurnos.message)}</span>}
                    </div>
                    
                    <div className='col-span-12 lg:col-span-6'>
                        <p className='font-bold text-lg mb-1'>¿Ya has trabajado con nosotros?</p>
                        
                        <label className='flex items-center gap-2'>
                            Si
                            <input type="radio" value="si"
                            {...register("trabajoNosotros", { 
                                required:{
                                    value:true,
                                    message:"Selecciona una opción"
                                }  
                            })}
                            />
                            
                        </label>
                        
                        <label className='flex items-center gap-2'>
                            No <input type="radio"  value="no"
                            {...register("trabajoNosotros", { 
                                required:{
                                    value:true,
                                    message:"Selecciona una opción"
                                } 
                            })}
                            />
                        </label>
                        {errors.trabajoNosotros && <span  className="errorMessage"> ❌ {  String(errors.trabajoNosotros.message)}</span>}
                    </div>
                    
                </div>
                
            </div>
            
        </>
    );
}

export default Work;



