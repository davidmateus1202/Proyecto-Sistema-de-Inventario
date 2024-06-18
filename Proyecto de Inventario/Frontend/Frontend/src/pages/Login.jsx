import { useEffect, useState } from 'react'
import apiServices from '../api/apiService'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../api/constantes'

export function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{

      const response = await apiServices.post('api/user/token/', {username, password})
      console.log(response)
      if(response.status === 200 || response.status === 201) {
        localStorage.setItem(ACCESS_TOKEN, response.data.access)
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh)
        toast.success('Successfully toasted!')
        navigate('/')
      }else{
        toast.error('Datos incorrectos')
      }


    }catch(e){
      console.log(e)
      toast.error('Error')
    }


  }
  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-[#383bbd]">Iniciar Sesion</h1>

            <p className="mt-4 text-gray-500">
              Ingresa tu usuario y contraseña para iniciar sesion.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto mb-0 mt-8 max-w-md space-y-4">
            <div>
              <label className="sr-only">Usuario</label>

              <div className="relative">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  value={username}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingresa tu usuario"
                />

              </div>
            </div>

            <div>
              <label className="sr-only">Contraseña</label>

              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Ingresa tu contraseña"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Aun no tienes una cuenta?
              </p>

              <Link className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
                to='/register'>Registar</Link>
            </div>
            <button
              className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white w-full"
            >
              Iniciar Sesion
            </button>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>



    </div>
  )
}


