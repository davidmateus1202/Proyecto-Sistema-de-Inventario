import { Link } from 'react-router-dom';


export function Error404() {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <div className="text-center">
        <img src="./src/assets/error.jpg" className='md:w-[500px] md:h-[500px]'/>

        <Link to='/home' className='mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring'>Voler al inicio</Link>
      </div>
    </div>


  )
}

