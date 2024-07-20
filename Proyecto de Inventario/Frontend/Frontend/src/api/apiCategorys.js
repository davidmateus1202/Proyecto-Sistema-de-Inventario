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

export const createCategory = async (data, setCategory, navigate) => {
    try {
        const response = await apiServices.post('category/category/', { name_category: data.name_category });
        if (response.status === 200 || response.status === 201) {
            toast.success('Categoría creada correctamente');
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

export const deleteCategory = async (id, setCategory, navigate) => {
    try {
        const response = await apiServices.delete(`category/delete/${id}/`);
        if (response.status === 200 || response.status === 204) {
            toast.success('Categoría eliminada correctamente');
            getCategory(setCategory, navigate); // Vuelve a cargar las categorías
        }else if(response.status === 401){
            logout(navigate)
        }

    }catch(e){
        console.log(e)
    }
}


export const updateCategory = async (id, data, navigate) => {
    console.log(id);
    try {
        const response = await apiServices.put(`category/update/${id}/`, { name_category: data.name_category });
        if (response.status === 200 || response.status === 201) {
            toast.success('Categoría actualizada correctamente'); // Vuelve a cargar las categorías
        } else if (response.status === 401) {
            logout(navigate);
        } else {
            toast.error('Error al actualizar la categoría');
            console.log(response);
        }
    } catch (e) {
        console.log(e);
        toast.error('Error al actualizar la categoría');
    }

}