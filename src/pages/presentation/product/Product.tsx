import React, { useState } from 'react'
import data from '../../../common/data/dummyProductData'
import { useTranslation } from 'react-i18next'
import ProductModal from './ProductModal'
import CommonGridProductItem from 'pages/common/CommonProductItem'
import ProductDeleteModal from './ProductDeleteModal'
export interface ProductModalProperties {
	type: string
	selectedRow: any
}

export interface ProductModalInterface {
	id?: string | number
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
	const [isOpenDeleteProductModal, setIsOpenDeleteProductModal] = useState<ProductModalProperties>()

	return (<>
			<div className='display-6 fw-bold py-3'>
				{t('product:all.products')}{' '}
				<span className='fs-5 fw-normal'>({t('product:no.items', { item: data.length.toLocaleString() })})</span>
			</div>
			<div className='row'>
				{data.map((item) => (
					<div key={item.id} className='col-xxl-3 col-xl-4 col-md-6'>
						<CommonGridProductItem
							id={item.id}
							name={item.name}
							description={item.description}
							remaining={item.quantity}
							points={item.points}
							img={item.image}
							editAction={() => setIsOpenProductModal({ type: 'edit', selectedRow: item })}
							deleteAction={() => setIsOpenDeleteProductModal({ type: 'delete', selectedRow: item })}
						/>
					</div>
				))}
			</div>
			{isOpenProductModal && <ProductModal setIsOpen={setIsOpenProductModal} isOpen={Boolean(isOpenProductModal)} properties={isOpenProductModal} />}
            {isOpenDeleteProductModal && <ProductDeleteModal setIsOpen={setIsOpenDeleteProductModal} isOpen={Boolean(isOpenDeleteProductModal)} properties={isOpenDeleteProductModal} />}
		</>
	)
}

export default Product
