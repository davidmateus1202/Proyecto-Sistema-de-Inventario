import SideBar from "../components/SideBar";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { postProducto } from "../api/apiClientes";
import toast from "react-hot-toast";
import TableCliente from "../components/TableCliente";
import ModalClientes from "../components/ModalClientes";

export default function Clientes() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tipo, setTipo] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [Open, setOpen] = useState(false);


  const { register, handleSubmit, formState: { errors } } = useForm();
  const isDestock = window.innerWidth > 824;

  const toggleDropdown = (event) => {
    event.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  const onSubmit = handleSubmit(async (data) => {
    const response = await postProducto(data, tipo); 
    if(response === 200 || response === 201){
      window.location.reload();
      toast.success('Cliente creado correctamente')
    }else{
      toast.error('Error al crear el cliente')
    }
  });

  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full h-screen bg-gray-100 px-4">
        <div className="flex flex-row w-auto h-[50px] bg-primary my-4 rounded-t-lg border border-blue-300 shadow-md">
          <img src="./src/assets/cliente.png" className="w-[30px] h-[30px] mt-2 ml-2" alt="cliente" />
          <h1 className="text-white font-semibold text-xl m-3">Clientes</h1>
        </div>
          <div className="flex w-auto h-[400px] bg-white shadow-2xl justify-center items-center">
            <div className="w-full xl:w-1/2 p-6 xl:p-36 mb-4">
              <h1 className="font-semibold text-md md:text-2xl text-primary mt-6 ml-6 md:m-5">Registra un nuevo cliente</h1>
              <form onSubmit={onSubmit} className="w-full">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="border border-gray-300 p-2 rounded-md shadow-md w-full my-3"
                  {...register('nombre', {
                    required: {
                      value: true,
                      message: 'Campo requerido'
                    }
                  })}
                />
                {errors.nombre && <span className="text-red-500 text-xs">{errors.nombre.message}</span>}
                <div className={`flex ${isDestock ? 'flex-row' : 'flex-col'} gap-3`}>
                  <div className="h-auto relative flex-col items-center w-full">
                    <button
                      className="w-full border border-white p-2 rounded-md shadow-md bg-primary text-white hover:bg-blue-600"
                      onClick={toggleDropdown}
                    >
                      {tipo ? tipo : 'Tipo'}
                    </button>
                    {dropdownOpen && (
                      <div className="absolute bg-white mt-1 rounded-lg w-full max-h-40">
                        <div onClick={() => { setTipo('C.C'); setDropdownOpen(false) }} className="p-2 hover:bg-gray-200 cursor-pointer">C.C</div>
                        <div onClick={() => { setTipo('T.I'); setDropdownOpen(false) }} className="p-2 hover:bg-gray-200 cursor-pointer">T.I</div>
                        <div onClick={() => { setTipo('NIT'); setDropdownOpen(false) }} className="p-2 hover:bg-gray-200 cursor-pointer">NIT</div>
                        <div onClick={() => { setTipo('C.E'); setDropdownOpen(false) }} className="p-2 hover:bg-gray-200 cursor-pointer">C.E</div>
                      </div>
                    )}
                  </div>
                  <input
                    type="number"
                    placeholder="Número de documento"
                    className="border border-gray-300 p-2 rounded-md shadow-md w-full"
                    {...register('numeroTipo', {
                      required: {
                        value: true,
                        message: 'Campo requerido'
                      }
                    })}
                  />
                  {errors.numeroTipo && <span className="text-red-500 text-xs">{errors.numeroTipo.message}</span>}
                </div>
                <input
                  type="text"
                  placeholder="Telefono (Opcional)"
                  className="border border-gray-300 p-2 rounded-md shadow-md w-full mt-3"
                  {...register('telefono')}
                />
                <input
                  type="email"
                  placeholder="Correo (Opcional)"
                  className="border border-gray-300 p-2 rounded-md shadow-md w-full mt-3"
                  {...register('email')}
                />
                <button
                  type="submit"
                  className="mt-5 text-center w-full bg-primary text-white py-2 rounded-md shadow-md hover:bg-blue-600"
                >
                  Registrar
                </button>
              </form>
            </div>
            {isDestock && (
              <div className="h-full w-1/2 ml-auto">
                <img src="./src/assets/azul.jpg" className="object-cover h-[400px] w-full shadow-md" alt="azul" />
              </div>
            )}
          </div>
          <div className="w-full h-[100px] bg-primary mt-8">
              


            </div>
          <div className="flex flex-col w-full h-screen overflow-y-auto">
               <TableCliente setSelectCliente={setClientes} setOpen={setOpen} />
          </div>

          {Open && <ModalClientes setOpen={setOpen} clientes={clientes}/>}
      </div>
    </div>
  );
}
