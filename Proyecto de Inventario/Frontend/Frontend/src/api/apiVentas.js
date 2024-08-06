import toast from "react-hot-toast";
import apiServices from "./apiService";


export const ventas = async (total, cliente) => {
    try {
        const response = await apiServices.post('venta/venta/', { cliente: cliente, total: total });
        console.log(response);
        return response;

    }catch(e){
        console.log(e)
    }
}

export const ventasDetalle = async (venta, producto) => {
    try {

        for (let i = 0; i < producto.length; i++) {
            const response = await apiServices.post(`venta/detalle_venta/${venta}/`, { producto: producto[i].id, cantidad: producto[i].cantidad, precio: producto[i].precio });
            console.log(response);
        }
        toast.success('Venta realizada correctamente');

    }catch(e){
        console.log(e)
        toast.error('Error al realizar la venta');
    }
}

export const facuras = async (venta) => {

    try{
        const response = await apiServices.get(`venta/create_factura_pdf/${venta}/`, {
            responseType: 'blob'
        });
        const blob = new Blob([response.data], {type: 'application/pdf'});
        const url = window.URL.createObjectURL(blob);
        window.open(url);


    }catch(e){
        console.log(e)
    }


}