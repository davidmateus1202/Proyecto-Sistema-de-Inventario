import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getClientes } from "../api/apiClientes"
import { MdDelete } from "react-icons/md";



function TableCliente({ setOpen, setSelectCliente }) {
    const [clientes, setClientes] = useState([]);
    const isDesktop = window.innerWidth > 824;

    const navigate = useNavigate();

    useEffect(() => {
        getClientes((data) => {
            setClientes(data)
        }, navigate);

        console.log(clientes)

    }, [navigate])

    const handleDelete = (id) => {
        setSelectCliente(id);
        setOpen(true);

    }

    const renderPhone = () => {
        return (
    
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {
            clientes.map((clientes, index) => (
              <div key={index} className="bg-white p-2 rounded-md shadow-md">
                <div className="flex justify-between items-center">
                  <h1 className="font-semibold">{clientes.nombre}</h1>
                  <div className="flex items-center">
                    <MdDelete className="text-red-500 cursor-pointer" onClick={() => handleDelete(clientes)} />
                  </div>
                </div>
              </div>
            ))
          }
        </div>
    
        )
      }
    


    const renderTable = () => {
        return (

            <>
                <table className="table-auto border-collapse w-full text-sm text-slate-500">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 bg-slate-300 p-2">Tipo</th>
                            <th className="border border-gray-300 bg-slate-300 p-2">Nombre</th>
                            <th className="border border-gray-300 bg-slate-300 p-2">Identificación</th>
                            <th className="border border-gray-300 bg-slate-300 p-2">Telefono</th>
                            <th className="border border-gray-300 bg-slate-300 p-2">Email</th>
                            <th className="border border-gray-300 bg-slate-300 p-2">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            clientes.map((cliente, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 bg-gray-200 p-2">{cliente.tipo_id}</td>
                                    <td className="border border-gray-300 bg-gray-200 p-2">{cliente.nombre}</td>
                                    <td className="border border-gray-300 bg-gray-200 p-2">{cliente.identificacion}</td>
                                    <td className="border border-gray-300 bg-gray-200 p-2">{cliente.telefono}</td>
                                    <td className="border border-gray-300 bg-gray-200 p-2">{cliente.email}</td>
                                    <td className="border border-gray-300 bg-gray-200">
                                        <button>
                                            {<MdDelete onClick={() => handleDelete(cliente)}
                                                className="text-2xl text-red-600" />}
                                        </button>

                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>


                </table>
            </>

        )

    }
    return (

        <>
            {
                isDesktop ? renderTable() : renderPhone()
            }
        </>
    
  )
}

export default TableCliente
