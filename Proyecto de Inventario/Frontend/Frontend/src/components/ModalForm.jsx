import { createCategory } from "../api/apiCategorys"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function ModalForm({ setOpen, setCategory }) {

    const [name_category, setNameCategory] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await createCategory(name_category, setCategory)
        setOpen(false)

    }
    
    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            
            <form onSubmit={handleSubmit}
            className="flex flex-col bg-white gap-5 py-16 px-10 md:px-48 md:py-24">
                
                <h1 className="font-bold text-xs md:text-xl text-primary">Registra tu categoria</h1>
                <label
                    htmlFor="Username"
                    className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                >
                    <input
                        onChange={(e) => setNameCategory(e.target.value)}
                        type="text"
                        value={name_category}
                        className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 py-2 ml-2 font-light"
                        placeholder="Username"
                    />

                    <span
                        className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs"
                    >
                        Nombre de categoria
                    </span>
                </label>



                <button type="onSubmit" className="bg-primary text-white py-2 rounded-md shadow-md font-semibold">Guardar</button>
            </form>

        </div>
    )
}

export default ModalForm