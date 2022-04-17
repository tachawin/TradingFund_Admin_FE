import axios from './axios'

export interface LoginResponse {
    adminId: string
    refCode: string
}

export interface OTPRequest extends LoginResponse {
    otpConfirm: string
}

export interface OTPResponse {
    accessToken: string
    refreshToken: string
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


export const sendOTP = (data: OTPRequest) => 
    axios({
        method: 'post',
        url: `/auth/admin/2fa/verify/otp`,
        data
    })
