import { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { demoPages } from '../../../menu'
import Card, { CardBody } from '../../../components/bootstrap/Card'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import data from '../../../common/data/dummySalesData'
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import useSortableData from '../../../hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import banks from 'common/data/dummyBankData'
import ListGroup, { ListGroupItem } from 'components/bootstrap/ListGroup'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'

interface ReportFilterInterface {
	searchInput: string
	deposit: boolean
	withdraw: boolean
	price: {
		min: string
		max: string
	},
	bank: string[]
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

const Report = () => {
    const { t } = useTranslation('report')

	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
	const [isOpenTimestampDatePicker, setIsOpenTimestampDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')

	const formik = useFormik<ReportFilterInterface>({
		initialValues: {
			searchInput: '',
			deposit: false,
			withdraw: false,
			price: {
				min: '',
				max: ''
			},
			bank: [],
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

	const { items, requestSort, getClassNamesFor } = useSortableData(data)

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

	const handleOnChangeBankFilter = (event: ChangeEvent<HTMLInputElement>) => {
		let bank = event.target.name
		let indexInBankFilter = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newBankFilterValue = values.bank

		if (isSelected) {
			newBankFilterValue.push(bank)
		} else {
			newBankFilterValue.splice(indexInBankFilter, 1)
		}
		setFieldValue('bank', newBankFilterValue )
	}

	const handleExportPDF = () => {
		// EXPORT PDF
	}

	const handlePrint = () => {
		// PRINT
	}

	return (
		<PageWrapper title={demoPages.crm.subMenu.customersList.text}>
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
						placeholder={t('search.transaction') + '...'}
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
								label: t('filter.type'),
								children: <div>
									<Checks
										id='deposit'
										label={t('deposit')}
										onChange={handleChange}
										checked={values.deposit}
										ariaLabel={t('deposit')}
									/>
									<Checks
										id='withdraw'
										label={t('withdraw')}
										onChange={handleChange}
										checked={values.withdraw}
										ariaLabel={t('withdraw')}
									/>
								</div>
							},
							{
								label: t('filter.timestamp'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenTimestampDatePicker)} setIsOpen={setIsOpenTimestampDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.timestamp[0].startDate).format('MMM Do YY')} - ${moment(
												values.timestamp[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenTimestampDatePicker} setIsOpen={setIsOpenTimestampDatePicker}>
										{datePicker(values.timestamp, 'timestamp')}
									</DropdownMenu>
								</Dropdown>
							},
							{
								label: t('filter.amount'),
								children: <div>
									<InputGroup>
										<Input
											id='price.min'
											ariaLabel='Minimum price'
											placeholder={t('filter.min')}
											onChange={formik.handleChange}
											value={values.price.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='price.max'
											ariaLabel='Maximum price'
											placeholder={t('filter.max')}
											onChange={formik.handleChange}
											value={values.price.max}
											type='number'
										/>
									</InputGroup>
								</div>
							},
							{
								label: t('filter.bank'),
								children: <CommonBanksDropdown 
											selectedBankName={'scb'} 
											setSelectedBankName={(bank: string) => setFieldValue('bank', bank)} 
										/>
							},
						]} 
					/>
					<SubheaderSeparator />
					<Button
						icon='FilePDF'
						color='primary'
						isLight
						onClick={() => handleExportPDF()}
					>
						{t('export.pdf')}
					</Button>
					<Button
						icon='Print'
						color='primary'
						isLight
						onClick={() => handlePrint()}
					>
						{t('print')}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
                                            <th 
												onClick={() => requestSort('no')}
												className='cursor-pointer text-decoration-underline text-center'>
												{t('column.no')}
											</th>
                                            <th
												onClick={() => requestSort('type')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.type')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('type')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('timestamp')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.timestamp')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('timestamp')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('bank')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.bank')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('bank')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('amount')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.amount')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('amount')}
													icon='FilterList'
												/>
											</th>
											<th>{t('column.notes')}</th>
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
											<tr key={i.id}>
                                                <td className='text-center'>
                                                    <div>{index + 1}</div>
												</td>
                                                <td>
                                                    <div>{i.type}</div>
												</td>
												<td>
													<div>{i.date.format('ll')}</div>
													<div>
														<small className='text-muted'>
															{i.date.fromNow()}
														</small>
													</div>
												</td>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.type === 'deposit' ? `*${i.recipientBankAccountNumber}` : `*${i.payerBankAccountNumber}`}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i.type === 'deposit' ? i.recipientBankName.toUpperCase() : i.payerBankName.toUpperCase()}</small>
															</div>
														</div>
													</div>
												</td>
                                                <td>
                                                    <div>{i.amount.toLocaleString()}</div>
												</td>
												<td className='w-25'>
                                                    <div>{i.note}</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={data}
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default Report
