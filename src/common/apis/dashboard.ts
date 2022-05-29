import axios, { authorizationHandler } from './axios'

// export const getProductList = async (
//     query: string,
//     next: (productList: ProductInterface[]) => void,
//     handleError: (error: any) => void
// ) =>
//     await authorizationHandler(async () => {
//         try {
// 			const res = await axios({
//                 method: 'get',
//                 url: `/dashboard/metric/register${query}`,
//                 headers: { Authorization: `Bearer ${getAccessToken()}` },
//             })
//             next(res.data)
//         } catch (error: any) {
//             handleError(error)
//         }
// })