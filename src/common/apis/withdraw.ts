import { getAccessToken } from 'common/utils/auth'
import { WithdrawTableState } from 'pages/presentation/withdraw/Withdraw'
import axios, { authorizationHandler } from './axios'
import { TransactionInterface } from './transaction'

export interface WithdrawUpdateInterface {
    notes?: string
}

export interface WithdrawUpdateCustomerInterface {
    mobileNumber: string
    notes?: string
}

export interface WithdrawCreateInterface {
    transactionTimestamp: string
    mobileNumber: string
    amount: number
    payerBankAccountNumber: string
    payerBankName: string
    companyBankId: string
    notes?: string
}

// export const requestWithdraw = (data: TransactionInterface) => 
//     axios({
//         method: 'post',
//         url: '/transaction/withdraw/request',
//         headers: { Authorization: `Bearer ${getAccessToken()}` },
//         data
//     })
 

// export const updateWithdraw = async (
//     transactionId: string,
//     data: WithdrawUpdateInterface,
//     next: () => void,
//     handleError: (error: any) => void
// ) =>
//     await authorizationHandler(async () => {
//         try {
//             await axios({
//                 method: 'patch',
//                 headers: { Authorization: `Bearer ${getAccessToken()}` },
//                 url: `/transaction/withdraw/note/${transactionId}`,
//                 data
//             })
//             next()
//         } catch (error: any) {
//             handleError(error)
//         }
//     })

// export const updateWithdrawCustomer = async (
//     transactionId: string,
//     data: WithdrawUpdateCustomerInterface,
//     next: () => void,
//     handleError: (error: any) => void
// ) =>
//     await authorizationHandler(async () => {
//         try {
//             await axios({
//                 method: 'patch',
//                 headers: { Authorization: `Bearer ${getAccessToken()}` },
//                 url: `/transaction/withdraw/pick/customer/${transactionId}`,
//                 data
//             })
//             next()
//         } catch (error: any) {
//             handleError(error)
//         }
//     })

// export const waiveWithdraw = async (
//     transactionId: string,
//     data: WithdrawUpdateInterface,
//     next: () => void,
//     handleError: (error: any) => void
// ) =>
//     await authorizationHandler(async () => {
//         try {
//             await axios({
//                 method: 'patch',
//                 headers: { Authorization: `Bearer ${getAccessToken()}` },
//                 url: `/transaction/withdraw/waive/${transactionId}`,
//                 data
//             })
//             next()
//         } catch (error: any) {
//             handleError(error)
//         }
//     })

export const getWithdrawList = async (
    query: string,
    type: WithdrawTableState | string,
    next: (withdrawList: TransactionInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/transaction/withdraw/admin/list/${type}${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            console.log(res)
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})


// export const deleteTransaction = async (
//     transactionId: string,
//     next: () => void,
//     handleError: (error: any) => void
// ) =>
//     await authorizationHandler(async () => {
//         try {
// 			await axios({
//                 method: 'delete',
//                 headers: { Authorization: `Bearer ${getAccessToken()}` },
//                 url: '/transaction/delete/soft',
//                 data: { transactionId }
//             })
//             next()
// 		} catch (error: any) {
// 			handleError(error)
// 		}
//     })
