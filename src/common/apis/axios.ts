import axios from 'axios'
import { didLogout, getAccessToken } from 'common/utils/auth'
import { renewToken } from './auth'

const REACT_APP_BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
	baseURL: REACT_APP_BASE_URL,
	// baseURL: 'http://localhost:8080'
  	withCredentials: true,
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
