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
import { exportExcel, getTransactionList } from 'common/apis/report'
import { TransactionInterface, TransactionType, TYPE } from 'common/apis/transaction'
import { storeTransaction, storeTransactionQuery } from 'redux/transaction/action'
import CompanyBanksDropdown from 'pages/common/CompanyBanksDropdown'
import { CompanyBankInterface } from 'common/apis/companyBank'
import 'moment/locale/th'
import { useNavigate } from 'react-router-dom'
import Spinner from 'components/bootstrap/Spinner'
import { ArticleTwoTone, InfoTwoTone, PrintTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface ReportFilterInterface {
	searchInput: string
	transactionType: TransactionType[]
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
    const { t } = useTranslation('report')
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [isOpenTimestampDatePicker, setIsOpenTimestampDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const transactions = useSelector(selectTransactionsList)
	const transactionQueryList = useSelector(selectTransactionQuery)

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
					<span>{t('get.transaction.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionQueryList])

	const formik = useFormik<ReportFilterInterface>({
		initialValues: {
			searchInput: '',
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
		setFieldValue,
		resetForm,
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
		exportExcel(query, () => {
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('download.transaction.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		})
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
						{t('export.excel')}
					</Button>
					<Button
						icon={PrintTwoTone}
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
