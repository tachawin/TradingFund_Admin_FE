import axios from './axios'

export interface LoginResponse {
    adminId: string
    refCode: string
}

export const login = (username: string, password: string) => 
    axios({
        method: 'post',
        url: '/auth/admin/login',
        data: {
            username,
            password,
        },
    })


export const sendOTP = (otp: string) => 
    axios({
        method: 'post',
        url: `/login`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: {
            otp
        },
    })
