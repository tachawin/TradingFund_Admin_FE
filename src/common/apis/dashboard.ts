import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

interface MetricPeriodInterface {
    withdraw: number
    deposit: number
}

export interface TransactionMetricInterface {
    date: string
    am: MetricPeriodInterface
    pm: MetricPeriodInterface
}

export interface CustomerMetricInterface {
    [date: string]: {
        totalRegister: number
        totalRegisterAndAction: number
    }
}

export const getTransactionMetric = async (
    date: string,
    next: (metric: TransactionMetricInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/transaction/report/dashboard/metric/sum?date=${date}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})

export const getCustomerRegisterAndActionMetric = async (
    dateStart: string,
    dateEnd: string,
    next: (metric: CustomerMetricInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/customer_admin/dashboard/metric/regis_and_action?dateStart=${dateStart}&dateEnd=${dateEnd}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})