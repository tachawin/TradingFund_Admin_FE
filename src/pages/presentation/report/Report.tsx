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
import moment from 'moment'
import { DateRange } from 'react-date-range'
import Button from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import ReportTable from './ReportTable'
import { useDispatch, useSelector } from 'react-redux'
import { selectTransactionQuery, selectTransactionsList } from 'redux/transaction/selector'
import showNotification from 'components/extras/showNotification'
import { getTransactionList } from 'common/apis/report'
import { STATUS, TransactionInterface, TransactionStatus, TransactionType, TYPE } from 'common/apis/transaction'
import { storeTransaction, storeTransactionQuery } from 'redux/transaction/action'
import CompanyBanksDropdown from 'pages/common/CompanyBanksDropdown'
import { CompanyBankInterface } from 'common/apis/companyBank'
import 'moment/locale/th'
import { useNavigate } from 'react-router-dom'
import Spinner from 'components/bootstrap/Spinner'
import { ArticleTwoTone, InfoTwoTone, PrintTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { CommonString } from 'common/data/enumStrings'
import { pages } from 'menu'

interface ReportFilterInterface {
	searchInput: string
	transactionType: TransactionType[]
	status: TransactionStatus[]
	amount: {
		min: string
		max: string
	},
	bank: CompanyBankInterface[]
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
	isCreatedAtDateChanged: boolean
}

const Report = () => {
    const { t } = useTranslation(['common', 'report'])
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [isOpenTimestampDatePicker, setIsOpenTimestampDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const transactions = useSelector(selectTransactionsList)
	const transactionQueryList = useSelector(selectTransactionQuery)

	const permission = JSON.parse(localStorage.getItem('features') ?? '')

	useEffect(() => {
		let queryString = Object.values(transactionQueryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getTransactionList(query, (transactionList: TransactionInterface[]) => {
			dispatch(storeTransaction(transactionList))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>ไม่สามารถเรียกดูธุรกรรมได้</span>
				</span>,
				CommonString.TryAgain,
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionQueryList])

	const formik = useFormik<ReportFilterInterface>({
		initialValues: {
			searchInput: '',
			status: [],
			transactionType: [],
			amount: {
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
			],
			isCreatedAtDateChanged: false
		},
		onSubmit: (values) => {
			dispatch(storeTransactionQuery({ 
				...transactionQueryList,
				bank: values.bank.length > 0 ? `companyBankId=${values.bank.map(bank => bank.bankId).join(',')}` : '',
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
				transactionType: values.transactionType.length > 0 ? `transactionType=${values.transactionType.join(',')}` : '',
				min: values.amount.min ? `min=${values.amount.min}` : '',
				max: values.amount.max ? `max=${values.amount.max}` : '',
				startCreated: values.isCreatedAtDateChanged ? `start=${moment(values.timestamp[0].startDate).format('YYYY-MM-DD')}` : '',
				endCreated: values.isCreatedAtDateChanged ?`end=${moment(values.timestamp[0].endDate).format('YYYY-MM-DD')}` : '',
			}))
		},
	})

	const { 
		values,
		initialValues,
		setFieldValue,
		setValues,
		handleSubmit,
		handleChange
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
			dispatch(storeTransactionQuery({ ...transactionQueryList, keyword: `keyword=${value}` }))
		}, 1000), []
	)

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		setSearchInput(value)
		debounceSearchChange(value)
	}

	const handleExportExcel = () => {
		let queryString = Object.values(transactionQueryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		window.open(`http://api.luckynobug.com/transaction/report/list/excel/export${query}`)
	}

	const handlePrint = () => {
		navigate('/print_report')
	}

	const handleOnChangeMultipleSelector = (event: ChangeEvent<HTMLInputElement>, field: string) => {
		let selectedValue = event.target.name
		let index = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newValue = values[field as keyof ReportFilterInterface] as string[]

		if (isSelected) {
			newValue.push(selectedValue)
		} else {
			newValue.splice(index, 1)
		}
		setFieldValue(field, newValue)
	}


	return (
		<PageWrapper title={pages.report.text}>
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
						placeholder={t('report:search.transaction') + '...'}
						onChange={handleSearchChange}
						value={searchInput}
					/>
				</SubHeaderLeft>
				{permission.report[PermissionType.Read] === PermissionValue.Available && <SubHeaderRight>
					<CommonTableFilter
						resetLabel={t('filter.reset')}
						onReset={() => setValues({ ...initialValues, status: [], transactionType: [], bank: [] })}
						submitLabel={t('filter')}
						onSubmit={handleSubmit}
						filters={[
							{
								label: t('filter.payment.type'),
								children: <div>
									{TYPE.map((type: TransactionType) => {
										let indexInTypeFilter = values.transactionType.indexOf(type)
										return <Checks
												key={type}
												label={
													type === TransactionType.Deposit ? t('deposit') 
														: type ===  TransactionType.Withdraw ? t('withdraw') 
														: t('request.withdraw')
												}
												name={type}
												value={indexInTypeFilter}
												onChange={(e) => handleOnChangeMultipleSelector(e, 'transactionType')}
												checked={indexInTypeFilter > -1}
												ariaLabel={type}
											/>
										}
									)}
								</div>
							},
							{
								label: t('filter.status'),
								children: <div>
									{STATUS.map((status: TransactionStatus) => {
										let indexInStatusFilter = values.status.indexOf(status)
										return <Checks
												key={status}
												label={
													status === TransactionStatus.Success ? t('success') 
														: status ===  TransactionStatus.NotFound ? t('not.found') 
														: t('cancel')
												}
												name={status}
												value={indexInStatusFilter}
												onChange={(e) => handleOnChangeMultipleSelector(e, 'status')}
												checked={indexInStatusFilter > -1}
												ariaLabel={status}
											/>
										}
									)}
                                </div>
							},
							{
								label: t('filter.timestamp'),
								children: <div>
									<Checks
										id='isCreatedAtDateChanged'
										type='switch'
										label={t('filter.timestamp')}
										onChange={handleChange}
										checked={values.isCreatedAtDateChanged}
										ariaLabel='Filter Created At Date'
									/>
									{values.isCreatedAtDateChanged && <Dropdown className='mt-2'>
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
									</Dropdown>}
								</div> 
							},
							{
								label: t('filter.amount'),
								children: <div>
									<InputGroup>
										<Input
											id='amount.min'
											ariaLabel='Minimum price'
											placeholder={t('filter.min')}
											onChange={formik.handleChange}
											value={values.amount.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='amount.max'
											ariaLabel='Maximum price'
											placeholder={t('filter.max')}
											onChange={formik.handleChange}
											value={values.amount.max}
											type='number'
										/>
									</InputGroup>
								</div>
							},
							{
								label: t('filter.bank'),
								children: <CompanyBanksDropdown
									selectedBank={values.bank}
									setSelectedBank={(bank: CompanyBankInterface | CompanyBankInterface[]) => setFieldValue('bank', bank)}
									multipleSelect
								/>
							},
						]} 
					/>
					<SubheaderSeparator />
					<Button
						icon={ArticleTwoTone}
						color='primary'
						isLight
						onClick={() => handleExportExcel()}
					>
						{t('report:export.excel')}
					</Button>
					<Button
						icon={PrintTwoTone}
						color='primary'
						isLight
						onClick={() => handlePrint()}
					>
						{t('report:print')}
					</Button>
				</SubHeaderRight>}
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className={`col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} />
							: <ReportTable data={transactions} />
						}
					</div>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default Report
