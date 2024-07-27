import { deleteCliente } from "../api/apiClientes";

function ModalClientes({ setOpen, clientes }) {
  const handleDelete = (id) => {
    deleteCliente(id);
    setOpen(false);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="relative w-[500px] h-[300px] bg-white shadow-xl p-4 rounded-lg">
        <div className="absolute top-[-100px] left-1/2 transform -translate-x-1/2">
          <img src="./src/assets/alerta.gif" className="w-40 h-40" />
        </div>
        <div className="relative w-full">


          <h1 className="text-center mt-20 text-2xl font-bold text-primary">
            Eliminar Cliente
          </h1>
          <p className="text-center mt-5 text-gray-500">
            ¿Estás seguro de eliminar este cliente?
          </p>
          <h3 className="text-center mt-5 text-slate-500">{clientes.nombre}</h3>
          <div className="flex justify-center gap-20 mt-2">
            <button
              onClick={() => handleDelete(clientes.id)}
              className="bg-primary py-3 px-4 rounded-3xl text-white hover:bg-blue-600"
            >
              Eliminar
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-red-600 py-3 px-4 rounded-3xl text-white hover:bg-red-700"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalClientes;
