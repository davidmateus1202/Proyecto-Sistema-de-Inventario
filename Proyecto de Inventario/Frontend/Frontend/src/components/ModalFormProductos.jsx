import React from 'react'
import { useForm } from 'react-hook-form'

function ModalFormProductos({setOpen}) {
    
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
    <form className="flex flex-col bg-white gap-5 py-16 px-10 md:px-80 md:py-80">
        <button type='onSubmit'></button>
    </form>
    </div>
  )
}

export default ModalFormProductos
