import axios from 'axios'
import { didLogout, getAccessToken } from 'common/utils/auth'
import { renewToken } from './auth'

// ----------------------------------------------------------------------

// declare const process: {
//   env: {
//     REACT_APP_API: string
//   }
// }

const axiosInstance = axios.create({
//   baseURL: process.env.REACT_APP_API
	baseURL: 'http://localhost:8080'
})

export const authorizationHandler = async (fetcher: any) => {
	try {
		await fetcher()
	} catch (error: any) {
		if (error.response?.status === 401) {
			didLogout()
		} else {
			console.log('error')
			return error
		}
	}
} 

export default axiosInstance
