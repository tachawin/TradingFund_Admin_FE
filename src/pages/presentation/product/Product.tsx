import { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { pages } from '../../../menu'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import productData from '../../../common/data/dummyProductData'
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import ProductModal from './ProductModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import CommonGridProductItem from 'pages/common/CommonProductItem'

interface ProductFilterInterface {
	searchInput: string
    isApproved: boolean
    isRejected: boolean
	points: {
		min: string
		max: string
	},
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

interface ProductModalProperties {
	type: string
	selectedRow: any
}

interface ProductDeleteModalProperties {
	selectedRow: any
}

const Product = () => {
    const { t } = useTranslation(['common', 'product'])
    const [data, setData] = useState(productData);

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenProductModal, setIsOpenProductModal] = useState<ProductModalProperties>()
	const [isOpenDeleteProductModal, setIsOpenDeleteProductModal] = useState<ProductDeleteModalProperties>()

	const formik = useFormik<ProductFilterInterface>({
		initialValues: {
			searchInput: '',
            isApproved: false,
            isRejected: false,
            points: {
                min: '',
                max: ''
            },
			timestamp: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			]
		},
		onSubmit: (values) => {
			console.log('submit filter')
			console.log(values)

			// Send Filter
		},
	})

	const { 
		values,
		setFieldValue,
		handleChange,
		resetForm,
		handleSubmit
	} = formik

	const datePicker = (selectedDate: any, field: string) => (
		<DateRange
			onChange={(item) => setFieldValue(field, [item.selection])}
			showPreview
			moveRangeOnFirstSelection={false}
			retainEndDateOnFirstSelection={false}
			ranges={selectedDate}
			direction='horizontal'
			rangeColors={['#6c5dd3']}
		/>
	)

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

	return (
		<PageWrapper title={pages.product.text}>
			<SubHeader>
				<SubHeaderLeft>
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
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonTableFilter
						resetLabel={t('filter.reset')}
						onReset={resetForm}
						submitLabel={t('filter')}
						onSubmit={handleSubmit}
						filters={[
							{
								label: t('filter.status'),
								children: <div>
                                    <Checks
                                        id='isApproved'
                                        label={t('approve')}
                                        onChange={handleChange}
                                        checked={values.isApproved}
                                        ariaLabel={t('success')}
                                    />
                                    <Checks
                                        id='isRejected'
                                        label={t('reject')}
                                        onChange={handleChange}
                                        checked={values.isRejected}
                                        ariaLabel={t('not.found')}
                                    />
                                </div>
							},
                            {
								label: t('filter.timestamp'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.timestamp[0].startDate).format('MMM Do YY')} - ${moment(
												values.timestamp[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
										{datePicker(values.timestamp, 'timestamp')}
									</DropdownMenu>
								</Dropdown>
							},
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
							}
						]} 
					/>
				</SubHeaderRight>
			</SubHeader>
			<Page container='fluid'>
                <div className='display-6 fw-bold py-3'>{t('all.products')} <span className='display-6'>({t('no.items', { item: 20 })})</span></div>
                <div className='row'>
					{data.map((item) => (
						<div key={item.id} className='col-xxl-3 col-xl-4 col-md-6'>
							<CommonGridProductItem
								id={item.id}
								name={item.name}
                                description={item.description}
                                remaining={item.remaining}
                                points={item.points}
								img={item.image}
								editAction={() => setIsOpenProductModal({ type: 'edit', selectedRow: item })}
								deleteAction={() => setIsOpenDeleteProductModal({ selectedRow: item })}
							/>
						</div>
					))}
				</div>
			</Page>
			{isOpenProductModal && <ProductModal setIsOpen={setIsOpenProductModal} isOpen={Boolean(isOpenProductModal)} properties={isOpenProductModal} />}
		</PageWrapper>
	)
}

export default Product
