import React, { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import { SubheaderSeparator } from '../../../layout/SubHeader/SubHeader'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import { useTranslation } from 'react-i18next'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import Button from 'components/bootstrap/Button'
import { ProductProps } from './Product'

interface ProductFilterInterface {
	searchInput: string
	points: {
		min: string
		max: string
	},
    remaining: {
		min: string
		max: string
	}
}

const ProductSubHeader = ({ setIsOpenProductModal }: ProductProps) => {
	const { t } = useTranslation(['common', 'product'])
	const [searchInput, setSearchInput] = useState('')

	const formik = useFormik<ProductFilterInterface>({
		initialValues: {
			searchInput: '',
            points: {
                min: '',
                max: ''
            },
            remaining: {
                min: '',
                max: ''
            }
		},
		onSubmit: (values) => {
			console.log('submit filter')
			console.log(values)

			// Send Filter
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
			// Send search filter
			console.log(value)
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		if (value) {
			setSearchInput(value)
			debounceSearchChange(value)
		}
	}

	return (<>
		<label
			className='border-0 bg-transparent cursor-pointer me-0'
			htmlFor='searchInput'>
			<Icon icon='Search' size='2x' color='primary' />
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
								id='points.min'
								ariaLabel='Minimum points'
								placeholder={t('filter.min')}
								onChange={handleChange}
								value={values.points.min}
								type='number'
							/>
							<InputGroupText>{t('filter.to')}</InputGroupText>
							<Input
								id='points.max'
								ariaLabel='Maximum points'
								placeholder={t('filter.max')}
								onChange={handleChange}
								value={values.points.max}
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
								id='remaining.min'
								ariaLabel='Minimum remaining'
								placeholder={t('filter.min')}
								onChange={handleChange}
								value={values.remaining.min}
								type='number'
							/>
							<InputGroupText>{t('filter.to')}</InputGroupText>
							<Input
								id='remaining.max'
								ariaLabel='Maximum remaining'
								placeholder={t('filter.max')}
								onChange={handleChange}
								value={values.remaining.max}
								type='number'
							/>
						</InputGroup>
					</div>
				}
			]} 
		/>
		<SubheaderSeparator />
			<Button
				icon='PlusLg'
				color='primary'
				isLight
				onClick={() => setIsOpenProductModal({ type: "add", selectedRow: null})}
				className='text-nowrap'
			>
			{t('product:add.product')}
		</Button>
	</>)
}

export default ProductSubHeader