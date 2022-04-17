import axios from 'axios'
import { getAccessToken } from 'common/utils/auth'
import { renewToken } from './auth'

// ----------------------------------------------------------------------

declare const process: {
  env: {
    REACT_APP_API: string
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { Authorization: `Bearer ${getAccessToken()}` },
  withCredentials: true
})

export const authorizationHandler = async (fetcher: any) => {
	try {
		const response = await fetcher()
		return response
	} catch (error: any) {
		if (error.response?.status === 401) {
			const isNotReLogin = await renewToken()
			console.log(isNotReLogin)
			if (isNotReLogin){
				try {
					const response = await fetcher()
					return response	
				} catch (error: any) {
					console.log(error.response)
				}
			} 
		} else {
			console.log('error')
			return error
		}
	}
} 

export default axiosInstance
