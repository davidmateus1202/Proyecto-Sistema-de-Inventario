import apiServices from "./apiService";
import toast from "react-hot-toast";
import { logout } from "../api/apiService"



export const getProducto = async (setProducto, navigate) => {
    try{
        const response = await apiServices.get('product/product/');
        setProducto(response.data);
        console.log(response.data);

    }catch(e){
        logout(navigate);
        console.log(e)
    }

}


export const createProducto = async (data, category, image) => {
    try {

        const formData = new FormData();
        formData.append('categoria', category);
        formData.append('codigo', data.codigo);
        formData.append('nombre', data.nombre);
        formData.append('unidades', data.unidades);
        formData.append('precio', data.precio);
        formData.append('image', image);


        const  response = await apiServices.post('product/product/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })

        if(response.status === 200 || response.status === 201){
            toast.success('Producto creado correctamente')
            console.log(response)
        }else {
            toast.error('Error al crear el producto')
            console.log(response)
        }

    } catch(error){
        console.log(error.response.data)
    }
}