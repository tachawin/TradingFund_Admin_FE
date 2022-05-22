import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export interface ProductBaseInterface {
    imageURL: string
    name: string
    description?: string
    point: number
    quantity: number
}

export interface ProductInterface extends ProductBaseInterface {
    productId?: string
    adminId?: string
    status?: string
    createdAt?: Date
    updatedAt?: Date
}

export const createProduct = (data: ProductInterface) => 
    axios({
        method: 'post',
        url: '/product/create',
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const updateProduct = (productId: string, data: ProductInterface) => 
    axios({
        method: 'patch',
        url: `/product/update/${productId}`,
        headers: { Authorization: `Bearer ${getAccessToken()}` },
        data
    })

export const getProductList = async (
    query: string,
    next: (productList: ProductInterface[]) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'get',
                url: `/product/list${query}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
            })
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
})

export const deleteProduct = async (
    productId: string,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'delete',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: '/product/delete',
                data: { productId }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })

export const uploadProductImage = async (
    productId: string,
    file: File,
    next: () => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			await axios({
                method: 'post',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                url: '/product/upload/preview',
                data: { productId, file }
            })
            next()
		} catch (error: any) {
			handleError(error)
		}
    })