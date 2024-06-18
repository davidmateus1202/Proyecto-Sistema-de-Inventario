
import { useState } from "react"
import { FaHome } from "react-icons/fa";
import { AiFillContainer } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "./ItemSideBar";
function SideBar() {
    const [open, setOpen] = useState(true) 
    const navigate = useNavigate()

    return (

        <div className={`${open === true ? 'w-56' : 'w-20'} pt-8 p-4 duration-300 h-screen bg-[#34339a] relative`}>

            <img onClick={() => setOpen(!open)}
            
            src="./src/assets/control.png"
                className={`absolute cursor-pointer right-2 top-28 w-7   ${!open && 'transform rotate-180'}`}
            />
            <div className={`flex mb-16 px-4 ${open === true && 'bg-[#413ec4]'} py-3 rounded-md items-center content-center`}>
            <FaHome className="text-white"/>
            <h1 className={`${!open && 'scale-0'} text-white font-semibold ml-2`}>EasyManager</h1>

            </div>

            <ItemSideBar open={open} text="Home" route="/"/>

            <ItemSideBar open={open} text="Categorias" route="/category"/>
 




            <div onClick={() => navigate('/category')}
            className={`flex gap-x-6 items-center mt-5 ml-2 ${open === true && 'hover:bg-[#413ec4]  rounded-md cursor-pointer' }`}>
            <img className={`${!open && 'bg-[#0b2446] py-1 px-1 rounded-md hover:bg-[#0d437f] cursor-pointer'}`} src="./src/assets/Folder.png"/>
            <h1 className={`origin-left duration-300 font-medium text-white text-md ${!open && 'scale-0'} cursor-pointer`}>Cateogria</h1>
            
            </div>
            <div onClick={() => navigate('/category')}
            className={`flex gap-x-6 items-center mt-5 ml-2 ${open === true && 'hover:bg-[#413ec4]  rounded-md cursor-pointer' }`}>
            <img className={`${!open && 'bg-[#0b2446] py-1 px-1 rounded-md hover:bg-[#0d437f] cursor-pointer'}`} src="./src/assets/Folder.png"/>
            <h1 className={`origin-left duration-300 font-medium text-white text-md ${!open && 'scale-0'} cursor-pointer`}>Cateogria</h1>
            
            </div>
            <hr className="mt-4"/>


            
        </div>

    )
}

export default SideBar
