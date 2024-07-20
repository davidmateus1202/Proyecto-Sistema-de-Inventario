import { useNavigate } from "react-router-dom"


function ItemSideBar({open, text, route, icon}) {
const navigate = useNavigate()
  return (

    <div onClick={() => navigate(route)}
    className={`flex gap-x-6 items-center mt-5 ml-2 ${open === true && 'hover:bg-[#413ec4] hover:py-1 hover:px-1 rounded-md cursor-pointer' }`}>
    <img className={`bg-white py-1 px-1 rounded-md shadow-md ${!open && 'bg-[#0b2446] py-1 px-1 rounded-md hover:bg-[#0d437f] cursor-pointer'}`} src={icon}/>
    <h1 className={`origin-left duration-300 font-medium text-white text-md ${!open && 'scale-0'} cursor-pointer`}>{text}</h1>
    
    </div>

  )
}

export default ItemSideBar
