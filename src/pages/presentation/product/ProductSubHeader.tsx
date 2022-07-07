import React, { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import { SubheaderSeparator } from '../../../layout/SubHeader/SubHeader'
import Input from '../../../components/bootstrap/forms/Input'
import { useTranslation } from 'react-i18next'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import Button from 'components/bootstrap/Button'
import { ProductProps } from './Product'
import { useDispatch, useSelector } from 'react-redux'
import { storeProductQuery } from 'redux/product/action'
import { selectProductQuery } from 'redux/product/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { ProductModalType } from './ProductModal'
import { Add, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface ProductFilterInterface {
	searchInput: string
	point: {
		min: string
		max: string
	},
    quantity: {
		min: string
		max: string
	}
}

const ProductSubHeader = ({ setIsOpenProductModal }: ProductProps) => {
	const { t } = useTranslation(['common', 'product'])
	const dispatch = useDispatch()
	const permission = JSON.parse(localStorage.getItem('features') ?? '')
	const [searchInput, setSearchInput] = useState('')

	const productQueryList = useSelector(selectProductQuery)

	const formik = useFormik<ProductFilterInterface>({
		initialValues: {
			searchInput: '',
            point: {
                min: '',
                max: ''
            },
            quantity: {
                min: '',
                max: ''
            }
		},
		onSubmit: (values) => {
			dispatch(storeProductQuery({
				...productQueryList,
				minPoint: `minPoint=${values.point.min}`,
				maxPoint: `maxPoint=${values.point.max}`,
				minQuantity: `minQuantity=${values.quantity.min}`,
				maxQuantity: `maxQuantity=${values.quantity.max}`,
			}))
		},
	})

	const { 
		values,
		handleChange,
		resetForm,
		handleSubmit
	} = formik

    // eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearchChange = useCallback(
		debounce((value: string) => {
			dispatch(storeProductQuery({ ...productQueryList, keyword: `keyword=${value}` }))
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		setSearchInput(value)
		debounceSearchChange(value)
	}

	return (<>
		<label
			className='border-0 bg-transparent cursor-pointer me-0'
			htmlFor='searchInput'>
			<Search fontSize='medium' htmlColor={COLORS.PRIMARY.code} />
		</label>
		<Input
			id='searchInput'
			type='search'
			className='border-0 shadow-none bg-transparent'
			placeholder={t('product:search.product') + '...'}
			onChange={handleSearchChange}
			value={searchInput}
		/>
		<CommonTableFilter
			resetLabel={t('filter.reset')}
			onReset={resetForm}
			submitLabel={t('filter')}
			onSubmit={handleSubmit}
			filters={[
				{
					label: t('filter.points'),
					children: <div>
						<InputGroup>
							<Input
								id='point.min'
								ariaLabel='Minimum point'
								placeholder={t('filter.min')}
								onChange={handleChange}
								value={values.point.min}
								type='number'
							/>
							<InputGroupText>{t('filter.to')}</InputGroupText>
							<Input
								id='point.max'
								ariaLabel='Maximum point'
								placeholder={t('filter.max')}
								onChange={handleChange}
								value={values.point.max}
								type='number'
							/>
						</InputGroup>
					</div>
				},
				{
					label: t('filter.remaining'),
					children: <div>
						<InputGroup>
							<Input
								id='quantity.min'
								ariaLabel='Minimum quantity'
								placeholder={t('filter.min')}
								onChange={handleChange}
								value={values.quantity.min}
								type='number'
							/>
							<InputGroupText>{t('filter.to')}</InputGroupText>
							<Input
								id='quantity.max'
								ariaLabel='Maximum quantity'
								placeholder={t('filter.max')}
								onChange={handleChange}
								value={values.quantity.max}
								type='number'
							/>
						</InputGroup>
					</div>
				}
			]} 
		/>
		{permission.product[PermissionType.Create] === PermissionValue.Available && <>
			<SubheaderSeparator />
				<Button
					icon={Add}
					color='primary'
					isLight
					onClick={() => setIsOpenProductModal({ type: ProductModalType.Add })}
					className='text-nowrap'
				>
				{t('product:add.product')}
			</Button>
		</>}
	</>)
}

export default ProductSubHeader