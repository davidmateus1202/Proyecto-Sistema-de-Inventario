import apiServices from "../api/apiService";
import toast from "react-hot-toast";

export const getCategory = async (setCategory) => {
    apiServices.get('category/category/').then((response) => response.data)
    .then((data) => {setCategory(data); console.log(data)}).catch((e) => console.log(e))
    .catch((e) => { toast.error('Error al cargar las categorias'); console.log(e) })

}

export const createCategory = async (name_category, navigate) => {

    apiServices.post('category/category/', name_category).then((response) => {
        if(response.status === 200 || response.status === 201){
            navigate('/category')
            toast.success('Categoria creada correctamente')

        }else{
            console.log(response)
            toast.error('Error al crear la categoria')
        }
    })
}




