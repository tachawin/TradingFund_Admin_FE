import { setAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export interface OTPResponse {
    accessToken: string
    refreshToken: string
}
export interface LoginResponse {
    useOTP?: string
    adminId: string
    refCode: string
}

export interface OTPRequest extends LoginResponse {
    otpConfirm: string
}

export const login = async (
    username: string, 
    password: string,
    next: (response: LoginResponse & OTPResponse) => void,
    handleError: (error: any) => void
) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/auth/admin/login',
            data: {
                username,
                password,
            },
        })
        next(res.data)
    } catch (error: any) {
        handleError(error)
    }
}

export const logout = async (
    next: () => void,
    handleError: (error: any) => void
) => {
    try {
        await axios({
            method: 'post',
            url: '/auth/admin/logout'
        })
        next()
    } catch (error) {
        handleError(error)
    }
}

export const sendOTP = async (
    data: OTPRequest,
    next: (response: OTPResponse) => void,
    handleError: (error: any) => void
) => {
    try {
        const res = await axios({
            method: 'post',
            url: '/auth/admin/2fa/verify/otp',
            data
        })
        next(res.data)
    } catch (error: any) {
        handleError(error)
    }
}

export const sendOTPold = (data: OTPRequest) => 
axios({
    method: 'post',
    url: '/auth/admin/2fa/verify/otp',
    data
})

export const renewToken = async () =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/auth/admin/2fa/token/refresh'
            })
            const { accessToken } = res.data
            setAccessToken(accessToken)
            return accessToken
        } catch (error: any) {
            console.log(error.response)
            return false
        }
})