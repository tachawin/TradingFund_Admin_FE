import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum ServiceType {
    Customer = 'customer',
    Admin = 'admin'
}

interface OTPSettingInterface {
    flagOTP: boolean
}

interface ReferralSettingInterface {
    firstReferralPercentage?: number
    secondReferralPercentage?: number
}

export interface SystemSettingResponse extends OTPSettingInterface, ReferralSettingInterface {
    serviceType: ServiceType
}

export interface FlagOTPSettingInterface {
    admin: boolean
    customer: boolean
}

export interface ReferralInterface {
    firstLevel: number
    secondLevel: number
}

export interface SystemSettingInterface {
    flagOTP: FlagOTPSettingInterface
    referral: ReferralInterface
}

export const getSystemSetting = async (
    next: (systemSetting: SystemSettingResponse[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'get',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: '/system/setting'
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
    })

export const updateOTPSetting = async (
    type: ServiceType,
    data: OTPSettingInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            await axios({
                method: 'patch',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: `/system/setting/otp/${type}`,
                data
            })
            next()
        } catch (error: any) {
            handleError(error)
            throw error
        }
    })
    
export const updateInviteFriendSetting = async (
    data: ReferralSettingInterface,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
            await axios({
                method: 'patch',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: `/system/setting/referral/customer`,
                data
            })
            next()
        } catch (error: any) {
            handleError(error)
            throw error
        }
    })
        
