import { useForm, FormProvider } from 'react-hook-form'
import type { SubmitHandler } from 'react-hook-form'
import DatosPersonales from '../components/Componentes.Formulario/DatosPersonales';
import Contacto from '../components/Componentes.Formulario/Contacto';
import Ubicacion from '../components/Componentes.Formulario/Ubicacion';
import logo from "../assets/logoWeb.png";
import '../formulario.css'
import Work from '../components/Componentes.Formulario/Work';
import TrabajosAnteriores from '../components/Componentes.Formulario/TrabajosAnteriores';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

import type  {Vacante} from "../components/Soporte/Interfaz"


function Formulario() {

  const methods = useForm<Vacante>({ mode: "onSubmit" });
  const { reset } = methods;
  const {  formState } = methods
  const { isSubmitting } = formState

  /*  */
  const storageTest = localStorage.getItem("datosFormulario")
  const datoslocal =  storageTest ? JSON.parse(storageTest) : [];
  //console.log( datoslocal  );

  const onSubmit: SubmitHandler<Vacante> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // simula backend

    const dataStatus: Vacante={
      ...data,
      id:crypto.randomUUID(),
      status:""
    }

    const storage = localStorage.getItem("datosFormulario")

    const anteriores: Vacante[] = storage ? JSON.parse(storage) : [];
    const actualizados = [...anteriores, dataStatus];

    localStorage.setItem("datosFormulario", JSON.stringify(actualizados));

    
    try {
      Swal.fire({
        icon: "success",
        title: "!Exitoso¡",
        text: "Formulario enviado correctamente"
      })

      reset({
        nombre: "",
        apePat: "",
        apeMat: "",
        edad: "",
        celular: "",
        email: "",
        empresa: "",
        ubicacion: "",
        escolaridad: "",
        rolarTurnos: "",
        empleo: "",
        trabajoNosotros: "",
        experiencia: "",
        trabajos: []
      })
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "!Error¡",
        text: "No se pudo enviar el formulario"
      })
    }
  }

  const experiencia = methods.watch("experiencia");

  useEffect(() => {
    if (experiencia === "no") {
      methods.resetField("empresa")
    }
  }, [experiencia]);

  const trabajos = methods.watch("trabajos") || [];

  const tarjetaTieneDatos = (index: number) => {
    const trabajo = trabajos[index];
    if (!trabajo) return false;

    return Object.values(trabajo).some(
      (valor) => valor !== undefined && valor !== ""
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 flex justify-center py-10">
        <div className="w-full max-w-6xl bg-gray-200 rounded-2xl shadow-xl p-6">
          <div className='grid grid-cols-12'>
            <div className='col-span-2'>
              <img src={logo} width={150} />
            </div>
            <div className='col-span-10 flex justify-start items-center'>
              <h1 className='font-bold text-4xl uppercase'>Envíanos tu información para la vacante</h1>
            </div>
          </div>

          <fieldset disabled={isSubmitting} className="disabled:opacity-70">
            {/* todo el formulario aquí */}
            <FormProvider  {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                
                <div className='p-4'>
                  <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <DatosPersonales></DatosPersonales>
                    <div>
                      <Contacto></Contacto>
                      <Ubicacion></Ubicacion>
                    </div>
                  </div>
                  <Work></Work>
                    
                </div>
                {/*  por lo pronto se queda igual  */}
                {experiencia === "si" && (
                  <p className="text-sm text-gray-600 mb-4">
                    Si cuentas con experiencia laboral, por favor registra la información de tus
                    empleos más recientes.
                    <br />
                    <br />
                    • Si <strong>no tienes experiencia</strong>, desmarca la opción{" "}
                    <strong>“¿Tienes alguna experiencia laboral?”</strong>.
                    <br />
                    • Si tienes <strong>un solo empleo</strong>, llena únicamente la primera tarjeta.
                    <br />
                    • Si tienes <strong>más de uno</strong>, puedes completar hasta un máximo de{" "}
                    <strong>tres empleos</strong>.
                  </p>
                )}
                
                {
                  experiencia === "si" && (
                    <div className="grid grid-cols-12 gap-4">
                      {
                        [0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className={`col-span-12 lg:col-span-4 rounded-lg transition-all duration-200
                              ${index > 0 && !tarjetaTieneDatos(index)
                                ? "bg-zinc-100 opacity-60 border border-dashed border-zinc-300"
                                : "bg-white shadow-md"
                              }`
                              }>
                                <p className='flex justify-center mt-5 font-bold'>
                                  TRABAJO  {index+1}
                                </p>
                            <TrabajosAnteriores index={index} />
                            
                          </div>
                      ))}
                    </div>
                  )
                }

                <div>
                  <button className="px-4 py-2 mt-5 bg-zinc-800 text-white rounded-lg font-medium transition-all duration-200 ease-in-outhover:bg-zinc-700
                                  hover:shadow-md active:bg-zinc-900 active:scale-95 focus:outline-none 
                                  focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2"
                    type="submit" disabled={isSubmitting} >
                    {isSubmitting && (
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    )}
                    
                    {isSubmitting ? "Guardando..." : "Enviar información"}
                  </button>
                </div>
              </form>
            </FormProvider>
          </fieldset>
        </div>
      </div>
    </>
  )
}

export default Formulario;
