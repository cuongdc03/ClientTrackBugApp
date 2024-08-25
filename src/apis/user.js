import { customFetch, showError } from "../component/utils/http"
import { ENDPOINTS } from "./constants"

export const login = async (data) =>{
    console.log(ENDPOINTS.LOGIN)
    return await customFetch.post(ENDPOINTS.LOGIN,{
        
        body:{
            signalKey: 'login',
            data
        }
    }).catch(showError)
}
export const register = async(data) =>{
    return await customFetch.post(ENDPOINTS.REGISTER,{
        body:{
            data
        }
    }).catch(showError)
}