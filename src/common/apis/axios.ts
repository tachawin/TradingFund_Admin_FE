import axios from 'axios'
import { didLogout } from 'common/utils/auth'
import { logout, renewToken } from './auth'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
	// baseURL: REACT_APP_BASE_URL,
	// baseURL: 'http://api.luckynobug.com',
	baseURL: 'http://localhost:8080',
  	withCredentials: true,
})

export interface ErrorResponse {
	code?: number
	err?: string
}

export const authorizationHandler = async (fetcher: any) => {
	try {
		const response = await fetcher()
		return response
	} catch (error: any) {
		if (error.response.data.error.errorCode === 'ERR.ADMIN.AUTH.ACCESS_TOKEN.1') {
			const tokenResponse = await renewToken()
			console.log(tokenResponse)
			if (tokenResponse) {
				try {
					const response = await fetcher()
					return response	
				} catch (error: any) {
					// logout(() => {
					// 	didLogout()
					// }, (error) => {
					// 	console.log(error.response)
					// })
				}
			}
		} else {
			console.log(error.response)
			return error
		}
	}
} 

export default axiosInstance
