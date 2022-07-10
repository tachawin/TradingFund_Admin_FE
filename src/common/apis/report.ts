import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'
import { TransactionInterface } from './transaction'
import { saveAs } from 'file-saver'
import moment from 'moment'

export const getTransactionList = async (
    query: string,
    next: (reportList: TransactionInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/transaction/report/list${query}`,
                headers: { 
                    Authorization: `Bearer ${getAccessToken()}`     
                },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
            throw error
        }
})

export const exportExcel = async (
    query: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/transaction/report/list/excel/export${query}`,
                headers: { 
                    Authorization: `Bearer ${getAccessToken()}`,
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': 'attachment; filename=report_transaction.xlsx'
                },
                responseType: 'blob',
            })
            saveAs(new Blob([res.data]), `report-${moment().format()}.xlsx`)
            next()
        } catch (error: any) {
            handleError(error)
            throw error
        }
      
})