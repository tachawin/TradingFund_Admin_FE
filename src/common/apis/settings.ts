import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export enum OTPSettingType {
    Customer = 'customer',
    Admin = 'admin'
}

interface OTPSettingsInterface {
    flagOTP: boolean
}

export const updateOTPSetting = async (
    type: OTPSettingType,
    data: OTPSettingsInterface,
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
        }
    })
    