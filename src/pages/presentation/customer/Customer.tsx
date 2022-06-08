import { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons'
import Button from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import useSortableData from '../../../hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import CustomerAddModal from './CustomerAddModal'
import CommonTableFilter from 'components/common/CommonTableFilter'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'
import CommonLevelsDropdown from 'pages/common/CommonLevelsDropdown'
import { LevelInterface } from 'common/apis/level'
import { CustomerInterface, getCustomerList } from 'common/apis/customer'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { selectCustomers } from 'redux/customer/selector'
import { storeCustomerQuery, storeCustomers } from '../../../redux/customer/action'
import { selectCustomerQuery } from '../../../redux/customer/selector'
import { FilterList, InfoTwoTone, LabelTwoTone, PersonAddAlt1TwoTone, Search, VisibilityTwoTone } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import PlaceholderImage from 'components/extras/PlaceholderImage'

interface DepositFilterInterface {
	searchInput: string
	bank: string[]
	level: LevelInterface[]
	createdAtDate: {
		startDate: Date
		endDate: Date
		key: string
	}[]
    lastLoginAtDate: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

const Customer = () => {
    const { t } = useTranslation(['common', 'customer'])
    const navigate = useNavigate()
	const dispatch = useDispatch()

	const customers = useSelector(selectCustomers)
	const customerQueryList = useSelector(selectCustomerQuery)

	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isOpenCustomerModal, setIsOpenCustomerModal] = useState<"add" | "edit">()
	const [isLoading, setIsLoading] = useState(false)

	const formik = useFormik<DepositFilterInterface>({
		initialValues: {
			searchInput: '',
            bank: [],
			level: [],
			createdAtDate: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
			lastLoginAtDate: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			]
		},
		onSubmit: (values) => {
			dispatch(storeCustomerQuery({
				...customerQueryList,
				bank: values.bank.length > 0 ? `bank=${values.bank.join(',')}` : '',
				level: values.level.length > 0 ? `level=${values.level.map((item) => item.levelId).join(',')}` : '',
				startCreated: `startCreated=${moment(values.createdAtDate[0].startDate).format('YYYY-MM-DD')}`,
				endCreated: `endCreated=${moment(values.createdAtDate[0].endDate).format('YYYY-MM-DD')}`,
				startLastLogin: `startLastLogin=${moment(values.lastLoginAtDate[0].startDate).format('YYYY-MM-DD')}`,
				endLastLogin: `endLastLogin=${moment(values.lastLoginAtDate[0].endDate).format('YYYY-MM-DD')}`

			}))
		},
	})

	const { items, requestSort, getClassNamesFor } = useSortableData(customers)

	const { 
		values,
		setFieldValue,
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
			dispatch(storeCustomerQuery({ ...customerQueryList, keyword: `keyword=${value}` }))
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		setSearchInput(value)
		debounceSearchChange(value)
	}

	useEffect(() => {
		let queryString = Object.values(customerQueryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getCustomerList(query, (customerList: CustomerInterface[]) => {
			console.log(customerList)
			dispatch(storeCustomers(customerList))
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.admin.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		}).finally(() => setIsLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [customerQueryList])

	return (
		<PageWrapper title={demoPages.crm.subMenu.customersList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Search fontSize='medium' htmlColor={COLORS.PRIMARY.code} />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder={t('customer:search.customer') + '...'}
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
								label: t('filter.level'),
								children: <CommonLevelsDropdown 
									multipleSelect
									selectedLevel={values.level} 
									setSelectedLevel={(level: LevelInterface | LevelInterface[]) => setFieldValue('level', level)} 
								/>
							},
							{
								label: t('filter.created.at'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.createdAtDate[0].startDate).format('MMM Do YY')} - ${moment(
												values.createdAtDate[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
										{datePicker(values.createdAtDate, 'createdAtDate')}
									</DropdownMenu>
								</Dropdown>
							},
							{
								label: t('filter.updated.at'),
								children: <Dropdown>
									<DropdownToggle hasIcon={false} color='dark' isLight isOpen={Boolean(isOpenUpdatedAtDatePicker)} setIsOpen={setIsOpenUpdatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.lastLoginAtDate[0].startDate).format('MMM Do YY')} - ${moment(
												values.lastLoginAtDate[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenUpdatedAtDatePicker} setIsOpen={setIsOpenUpdatedAtDatePicker}>
										{datePicker(values.lastLoginAtDate, 'lastLoginAtDate')}
									</DropdownMenu>
								</Dropdown>
							},
							{
								label: t('filter.bank'),
								children: <div>
                                    <CommonBanksDropdown
                                        multipleSelect
                                        selectedBankName={values.bank} 
                                        setSelectedBankName={(bank: string | string[]) => setFieldValue('bank', bank)} 
                                    />
								</div>
							},
						]} 
					/>
					<SubheaderSeparator />
					<Button
						icon={PersonAddAlt1TwoTone}
						color='primary'
						isLight
						onClick={() => setIsOpenCustomerModal('add')}
					>
						{t('customer:new.customer')}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className={`col-12 ${(isLoading || !customers) ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} /> 
							: <Card stretch>
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
													onClick={() => requestSort('name')}
													className='cursor-pointer text-decoration-underline'>
													{t('column.name')}{' '}
													<FilterList fontSize='small' className={getClassNamesFor('name')} />
												</th>
												<th
													className='cursor-pointer text-decoration-underline'>
													{t('column.bank.account.number')}{' '}
													<FilterList fontSize='small' className={getClassNamesFor('bankAccountNumber')} />
												</th>
												<th>{t('column.mobile.number')}</th>
												<th
													onClick={() => requestSort('createdAt')}
													className='cursor-pointer text-decoration-underline'>
													{t('column.created.at')}{' '}
													<FilterList fontSize='small' className={getClassNamesFor('createdAt')} />
												</th>
												<th
													onClick={() => requestSort('lastActiveAt')}
													className='cursor-pointer text-decoration-underline'>
													{t('column.last.active.at')}{' '}
													<FilterList fontSize='small' className={getClassNamesFor('lastActiveAt')} />
												</th>
												<td />
											</tr>
										</thead>
										<tbody>
											{dataPagination(items, currentPage, perPage).map((customer: CustomerInterface, index: number) => (
												<tr key={customer.customerId}>
													<td className='text-center'>
														<div>{index + 1}</div>
													</td>
													<td>
														<div className='d-flex align-items-center'>
															{customer.level?.imageURL ? 
																<img 
																	src={customer.level?.imageURL} 
																	alt={customer.level?.levelName}
																	width={32} 
																	height={32} 
																	style={{ minWidth: 32, minHeight: 32, objectFit: 'cover' }} 
																	className='me-2 rounded-circle border border-2 border-light'
																/> : <PlaceholderImage
																	width={40}
																	height={40}
																	className='me-2 rounded-circle border border-2 border-light'
																/>
															}
															{' '}
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{customer.name}
																</div>
																<div className='text-muted'>
																	<small>{customer.level?.levelName}</small>
																</div>
															</div>
														</div>
													</td>
													<td>
														<div className='d-flex align-items-center'>
															<div className='flex-grow-1'>
																<div className='fs-6 fw-bold'>
																	{customer.bankAccountNumber}
																</div>
																<div className='text-muted'>
																	<LabelTwoTone fontSize='small' />{' '}
																	<small>{customer.bank?.acronym.toUpperCase()}</small>
																</div>
															</div>
														</div>
													</td>
													<td>
														<div>{customer.mobileNumber}</div>
													</td>
													<td>
														<div>{moment(customer.createdAt).format('ll')}</div>
														<div>
															<small className='text-muted'>
																{moment(customer.createdAt).fromNow()}
															</small>
														</div>
													</td>
													<td>
														<div>{moment(customer.lastLoginAt).format('ll')}</div>
														<div>
															<small className='text-muted'>
																{moment(customer.lastLoginAt).fromNow()}
															</small>
														</div>
													</td>
													<td>
														<Button
															icon={VisibilityTwoTone}
															onClick={() => navigate(`${customer.customerId}`)}
															color='primary'
															isLight
														>
															{t('view')}
														</Button>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</CardBody>
								<PaginationButtons
									data={customers}
									label='customers'
									setCurrentPage={setCurrentPage}
									currentPage={currentPage}
									perPage={perPage}
									setPerPage={setPerPage}
								/>
							</Card>
						}
					</div>
				</div>
			</Page>
			{ isOpenCustomerModal && <CustomerAddModal 
				setIsOpen={setIsOpenCustomerModal} 
				isOpen={Boolean(isOpenCustomerModal)} 
				type={isOpenCustomerModal} 
			/>}
		</PageWrapper>
	)
}

export default Customer
