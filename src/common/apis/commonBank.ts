import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export interface CommonBankInterface {
    [key: string]: {
        id: number
        officialName: string
        niceName: string
        thaiName: string
    }
}

export const getCommonBanks = async (
    next: (commonBankList: CommonBankInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: '/bank/list',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})
