import apiServices from "./apiService";
import toast from "react-hot-toast";
import { logout } from "../api/apiService"



export const getClientes = async (setClientes, navigate) => {
    try {
        const response = await apiServices.get('cliente/cliente/');
        if (response.status === 200) {
            setClientes(response.data);
        } else{
            toast.error('Error al obtener los productos')
        }
    }catch(e){
        logout(navigate);
        console.log(e)
    }
}


export const postProducto = async (data, tipo) => {

    try {

        const formdata = new FormData();

        formdata.append('nombre', data.nombre);
        formdata.append('tipo_id', tipo);
        formdata.append('identificacion', data.numeroTipo);
        formdata.append('telefono', data.telefono);
        formdata.append('email', data.email);

        const response = await apiServices.post('cliente/cliente/', formdata)

        if (response.status === 200 || response.status === 201) {
            return response.status

        } else {
            toast.error('Error al crear el producto')
            console.log(response)
            return response.status
        }

    } catch (error) {
        toast.error('Error al crear el producto')
        console.log(error.response.data)
    }

}

export const deleteCliente = async (id) => {
    try {

        const response = await apiServices.delete(`cliente/cliente/delete/${id}/`)

        if (response.status === 200 || response.status === 204) {
            toast.success('Cliente eliminado correctamente');
            window.location.reload();
        } else {
            toast.error('Error al eliminar el cliente')
            console.log(response)
        }



    }catch(e){
        logout(navigate);
        console.log(e)
    }
}