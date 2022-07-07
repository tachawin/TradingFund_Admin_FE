import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import ProductModal, { ProductModalType } from './ProductModal'
import CommonGridProductItem from 'pages/presentation/product/ProductItem'
import ProductDeleteModal from './ProductDeleteModal'
import { storeProducts } from '../../../redux/product/action'
import { getProductList, ProductInterface } from 'common/apis/product'
import { selectProducts } from 'redux/product/selector'
import { useDispatch, useSelector } from 'react-redux'
import { selectProductQuery } from '../../../redux/product/selector'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import CommonTableNotFound from 'pages/common/CommonTableNotFound'
import { PermissionType, PermissionValue } from 'common/apis/user'
import CommonUnauthorized from 'pages/common/CommonUnauthorized'
import { InfoTwoTone } from '@mui/icons-material'
import { CommonString } from 'common/data/enumStrings'

export interface ProductModalProperties {
	type: string
	selectedRow?: ProductInterface
}

export interface ProductModalInterface {
	id?: string
	isOpen?: boolean
	setIsOpen: any
    properties: ProductModalProperties
}

export interface ProductProps {
	isOpenProductModal?: ProductModalProperties
	setIsOpenProductModal: (properties: ProductModalProperties) => void
}

const Product = ({ isOpenProductModal, setIsOpenProductModal }: ProductProps) => {
    const { t } = useTranslation(['common', 'product'])
	const dispatch = useDispatch()
	const permission = JSON.parse(localStorage.getItem('features') ?? '')

	const [isOpenDeleteProductModal, setIsOpenDeleteProductModal] = useState<ProductModalProperties>()
	const [isLoading, setIsLoading] = useState(false)

	const products = useSelector(selectProducts)
	const productQueryList = useSelector(selectProductQuery)

	useEffect(() => {
		let queryString = Object.values(productQueryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getProductList(query, (productList: ProductInterface[]) => {
			dispatch(storeProducts(productList))
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>ไม่สามารถเรียกดูสินค้าได้</span>
				</span>,
				CommonString.TryAgain,
			)
		}).finally(() => setIsLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [productQueryList])

	return (<>
			<div className='display-6 fw-bold py-3'>
				{t('product:all.products')}{' '}
				<span className='fs-5 fw-normal'>({t('product:no.items', { item: products.length.toLocaleString() })})</span>
			</div>
			<div className={`row ${(isLoading || products.length <= 0) && 'h-100 justify-content-center align-items-center'}`}>
				{isLoading ? <Spinner color='info' isGrow size={60} /> :
					products.length > 0 ? products.map((product) => (
						<div key={product.productId} className='col-xxl-3 col-xl-4 col-md-6'>
							<CommonGridProductItem
								id={product.productId}
								name={product.name}
								description={product.description}
								remaining={product.quantity}
								points={product.point}
								img={product?.imageURL}
								editAction={() => setIsOpenProductModal({ type: ProductModalType.Edit, selectedRow: product })}
								deleteAction={() => setIsOpenDeleteProductModal({ type: ProductModalType.Delete, selectedRow: product })}
							/>
						</div>
				)) : permission.product[PermissionType.Read] === PermissionValue.Unavailable ? <CommonUnauthorized /> : <CommonTableNotFound />}
			</div>
			{isOpenProductModal && <ProductModal setIsOpen={setIsOpenProductModal} isOpen={Boolean(isOpenProductModal)} properties={isOpenProductModal} />}
            {isOpenDeleteProductModal && <ProductDeleteModal setIsOpen={setIsOpenDeleteProductModal} isOpen={Boolean(isOpenDeleteProductModal)} properties={isOpenDeleteProductModal} />}
		</>
	)
}

export default Product
