
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
                className={`absolute cursor-pointer right-2 top-28 w-7  ${!open && 'transform rotate-180'}`}
            />
            <div className={`flex mb-16 px-4 ${open === true && 'bg-[#413ec4]'} py-3 rounded-md items-center content-center `}>
            <FaHome className="text-white"/>
            <h1 className={`${!open && 'scale-0'} text-white font-semibold ml-2`}>EasyManager</h1>

            </div>
            <hr className="mt-20"/>
            <ItemSideBar open={open} text="Home" route="/home" icon='./src/assets/home (2).png'/>

            <ItemSideBar open={open} text="Categorias" route="/category" icon='./src/assets/Folder.png'/>

            <ItemSideBar open={open} text='Productos' route='/productos' icon='./src/assets/Chart_fill.png'/>
 

            <hr className="mt-4"/>
            <ItemSideBar open={open} text={'Clientes'} route='/clientes' icon='./src/assets/user.png' />
            <ItemSideBar open={open} text={'Factura'} route='/factura' icon='./src/assets/factura.png' />


            
        </div>

    )
}

export default SideBar
