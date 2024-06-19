import apiServices from "../api/apiService";
import toast from "react-hot-toast";
import { logout } from "../api/apiService";
export const getCategory = async (setCategory, navigate) => {
    try {
        const response = await apiServices.get('category/category/');
        setCategory(response.data);
        console.log(response.data);
    } catch (e) {
        toast.error('Error al cargar las categorías');
        logout(navigate);

    }
};

export const createCategory = async (name_category, setCategory, navigate) => {
    try {
        const response = await apiServices.post('category/category/', { name_category });
        if (response.status === 200 || response.status === 201) {
            toast.success('Categoría creada correctamente');
            getCategory(setCategory, navigate); // Vuelve a cargar las categorías
        } else if (response.status === 401) {
            logout(navigate);
        } else {
            toast.error('Error al crear la categoría');
            console.log(response);
        }
    } catch (e) {
        console.log(e);
        if (e.response && e.response.status === 401) {
            logout(navigate);
        } else {
            toast.error('Error al crear la categoría');
        }
    }
};
