import { getAccessToken } from 'common/utils/auth'
import axios, { authorizationHandler } from './axios'

export interface ProductBaseInterface {
    imageURL?: string
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

export interface ProductImageUrlInterface {
    productPreviewPictureURL: string
}

export const createProduct = async (
    data: ProductInterface,
    next: (product: ProductInterface) => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'post',
                url: '/product/create',
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })        
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)
    
export const updateProduct = async (
    productId: string, 
    data: ProductInterface,
    next: (product: ProductInterface) => void,
    handleError: (error: any) => void
) => 
    await authorizationHandler(async () => {
        try {
            const res = await axios({
                method: 'patch',
                url: `/product/update/${productId}`,
                headers: { Authorization: `Bearer ${getAccessToken()}` },
                data
            })      
            next(res.data)
        } catch (error: any) {
            handleError(error)
        }
    }
)

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
    data: FormData,
    next: (imageURL: ProductImageUrlInterface) => void,
    handleError: (error: any) => void
) =>
    await authorizationHandler(async () => {
        try {
			const res = await axios({
                method: 'post',
                headers: { 
                    Authorization: `Bearer ${getAccessToken()}`,
                    "Content-Type": "multipart/form-data",
                },
                url: '/product/upload/preview',
                data
            })
            next(res.data)
		} catch (error: any) {
			handleError(error)
		}
    })