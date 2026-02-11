import { useFormContext } from 'react-hook-form';

function Contacto() {
    const { register, formState: { errors } } = useFormContext();
    
    return (
        <>
            
            <div className='grid grid-cols-12 gap-4 bg-white shadow-lg p-3 rounded rounded-1xl m-5'>
                <div className='col-span-5'>
                    <p className='font-bold text-lg'>Contacto</p>
                </div>
                <div className='col-span-12 flex items-center'>
                    <input type="tel" inputMode='numeric' maxLength={10} pattern='[0-9]*' className="py-1 border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                    placeholder-gray-400 text-gray-900 w-full"
                    placeholder='Telefono'
                    onInput={(e) => {
                            e.currentTarget.value =
                                e.currentTarget.value.replace(/\D/g, "");
                        }}
                        
                    {...register("celular", {
                        required: {
                            value: true,
                            message: "Celular requerido"
                        },
                        pattern: {
                                value: /^[0-9]{10}$/,
                                message: "Debe contener exactamente 10 dígitos"
                            },
                        
                    })} />
                    
                </div>
                <div className='col-span-12'>
                    {errors.celular && <span  className="errorMessage"> ❌ {  String(errors.celular.message)}</span>}
                </div>
                
                <div className='col-span-12 flex items-center'>
                    <input type="text" className="py-1 border border-blue-800 rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500
                    placeholder-gray-400 text-gray-900 w-full"
                    placeholder='Correo electronico'
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Correo invalido"
                        },
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Corro invalido"
                        }
                    })} />
                </div>
                <div className='col-span-12'>
                    {errors.email && <span  className="errorMessage"> ❌ {  String(errors.email.message)}</span>}
                </div>
            </div>
            
        </>
    );
}

export default Contacto;