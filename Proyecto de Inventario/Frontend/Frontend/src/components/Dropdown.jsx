import { useState, useEffect } from "react"
import { getCategory } from "../api/apiCategorys";
import { useNavigate } from 'react-router-dom';


function Dropdown({setfilterCategory, filterCategory}) {


    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        getCategory(setCategory, navigate);
    }, []);

    


    const toggleDropdown = (e) => {
        e.preventDefault();
        setDropdownOpen(!dropdownOpen);
    }


    return (
        <div className="h-auto flex-col items-center mr-2 w-[200px]">

            <button onClick={toggleDropdown}
            className="bg-primary text-white py-2 px-4 rounded-md shadow-md w-full">
                {filterCategory == null ? 'Categoría' : filterCategory.name_category}
            </button>
            {dropdownOpen && (
            <div className="absolute bg-white border mt-1 rounded shadow-lg w-[200px] max-h-40 overflow-y-auto">
              {category.map((cat) => (
                <div onClick={() => { setfilterCategory(cat); setDropdownOpen(false); console.log(dropdownOpen) }}
                  key={cat.id} className="p-2 hover:bg-gray-200 cursor-pointer">{cat.name_category}</div>
              ))}
            </div>
          )}

        </div>
    )
}


export default Dropdown