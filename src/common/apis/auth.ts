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

export const logout = () => 
    axios({
        method: 'post',
        url: '/auth/admin/logout'
    })


export const sendOTP = (data: OTPRequest) => 
    axios({
        method: 'post',
        url: '/auth/admin/2fa/verify/otp',
        data
    })

export const renewToken = async () => {
    try {
        const res = await axios({
            method: 'post',
            url: '/auth/admin/2fa/token/refresh',
        })
        console.log(res)
        // const { access_token } = res.data
        // localStorage.setItem("access_token", access_token)
        // return access_token
    } catch (error: any) {
        console.log(error.response)
        // await logout()
        return false
    }
}