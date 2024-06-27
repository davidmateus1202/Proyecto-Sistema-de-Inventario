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