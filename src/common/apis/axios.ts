import axios from 'axios'

// ----------------------------------------------------------------------

declare const process: {
  env: {
    REACT_APP_API: string
  }
}

const accessToken = () => 
  localStorage.getItem('accessToken')

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: { Authorization: `Bearer ${accessToken()}`, 'Content-Type': 'application/json' },
})

export default axiosInstance
