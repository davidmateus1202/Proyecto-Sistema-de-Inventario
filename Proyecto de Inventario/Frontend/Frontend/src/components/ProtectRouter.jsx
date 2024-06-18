import apiServices from "../api/apiService";
import {jwtDecode} from 'jwt-decode'
import {Navigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../api/constantes'

export function ProtectRouter({children}) {

    const [isAuthenticated, setIsAuthenticated] = useState(null)
    // We check if the user is authenticated when the component is mounted
    useEffect(() => {
        auth().catch(() => setIsAuthenticated(false))
    }, [])

    // We create a function to refresh the token

    const refreshToken = async () => {
        // We get the refresh token from the local storage
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        try{
            // We send a request to the server to refresh the token
            const response = await apiServices.post('user/token/refresh/', {
                refesh: refreshToken
            });
            // If the request is successful, we save the new token in the local storage
            if(response.status === 200){
                // We save the new token in the local storage
                localStorage.setItem(ACCESS_TOKEN, response.data.access)
                setIsAuthenticated(true)
            }else {
                setIsAuthenticated(false)
            }

        }catch(error){
            console.log(error)
            setIsAuthenticated(false)
        }

    }

    const auth = async () => {
        // Check if the token is in the local storage
        const token = localStorage.getItem(ACCESS_TOKEN)
        // If the token is not in the local storage, the user is not authenticated  
        if(!token){
            setIsAuthenticated(false)
        }

        // If the token is in the local storage, we check if the token is expired

        const decode = jwtDecode(token)
        const tokenExpired = decode.export
        const now = Date.now() / 1000

        // If the token is expired, we refresh the token

        if(tokenExpired < now){
            refreshToken()
        }else{
            setIsAuthenticated(true)
        }

    }
    // We call the auth function when the component is mounted
    if(isAuthenticated === null){
        return <div>Loading....</div>

    }
    // If the user is authenticated, we return the children

    return isAuthenticated ? children : <Navigate to='/login' />

}
