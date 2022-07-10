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
import DepositModal, { DepositModalProperties, DepositModalType } from './DepositModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import DepositTable from './DepositTable'
import { useDispatch, useSelector } from 'react-redux'
import { selectDepositList, selectDepositQuery } from 'redux/deposit/selector'
import { getDepositList } from 'common/apis/deposit'
import { storeDepositList, storeDepositQuery } from 'redux/deposit/action'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import CompanyBanksDropdown from 'pages/common/CompanyBanksDropdown'
import { CompanyBankInterface } from 'common/apis/companyBank'
import { STATUS, TransactionInterface, TransactionStatus } from 'common/apis/transaction'
import { AttachMoney, InfoTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import { CommonString } from 'common/data/enumStrings'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { pages } from 'menu'

interface DepositFilterInterface {
	searchInput: string
	status: string[]
	bank: CompanyBankInterface[]
	price: {
		min: string
		max: string
	}
	createdAt: {
		startDate: Date
		endDate: Date
		key: string
	}[]
	isCreatedAtDateChanged: boolean
}

const Deposit = () => {
    const { t } = useTranslation(['common', 'deposit'])
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenDepositModal, setIsOpenDepositModal] = useState<DepositModalProperties>()

	const depositList = useSelector(selectDepositList)
	const depositQueryList = useSelector(selectDepositQuery)

	const permission = JSON.parse(localStorage.getItem('features') ?? '')
	const readPermission = permission.deposit[PermissionType.Read] === PermissionValue.Available
	const createPermission = permission.deposit[PermissionType.Create] === PermissionValue.Available

	useEffect(() => {
		let queryString = Object.values(depositQueryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getDepositList(query, (depositList: TransactionInterface[]) => {
			dispatch(storeDepositList(depositList))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>ไม่สามารถเรียกดูรายการฝากเงินได้</span>
				</span>,
				CommonString.TryAgain,
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [depositQueryList])

	const formik = useFormik<DepositFilterInterface>({
		initialValues: {
			searchInput: '',
			status: [],
            price: {
                min: '',
                max: ''
            },
			createdAt: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
            bank: [],
			isCreatedAtDateChanged: false,
		},
		onSubmit: (values) => {
			dispatch(storeDepositQuery({
				...depositQueryList,
				bank: values.bank.length > 0 ? `companyBankId=${values.bank.map((item) => item.bankId).join(',')}` : '',
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
				start: values.isCreatedAtDateChanged ? `start=${moment(values.createdAt[0].startDate).format('YYYY-MM-DD')}` : '',
				end: values.isCreatedAtDateChanged ? `end=${moment(values.createdAt[0].endDate).format('YYYY-MM-DD')}`: '',
				min: values.price.min ? `min=${values.price.min}` : '',
				max: values.price.max ? `max=${values.price.max}` : ''
			}))
		},
	})

	const { 
		values,
		setFieldValue,
		setValues,
		initialValues,
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
			dispatch(storeDepositQuery({ ...depositQueryList, keyword: `keyword=${value}` }))
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		setSearchInput(value)
		debounceSearchChange(value)
	}

	const handleOnChangeMultipleSelector = (event: ChangeEvent<HTMLInputElement>, field: string) => {
		let selectedValue = event.target.name
		let index = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newValue = values[field as keyof DepositFilterInterface] as string[]

		if (isSelected) {
			newValue.push(selectedValue)
		} else {
			newValue.splice(index, 1)
		}
		setFieldValue(field, newValue)
	}

	return (
		<PageWrapper title={pages.deposit.text}>
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
						placeholder={t('deposit:search.deposit.transaction') + '...'}
						onChange={handleSearchChange}
						value={searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					{readPermission && <CommonTableFilter
						resetLabel={t('filter.reset')}
						onReset={() => setValues({ ...initialValues, status: [], bank: [] })}
						submitLabel={t('filter')}
						onSubmit={handleSubmit}
						filters={[
							{
								label: t('filter.status'),
								children: <div>
									{STATUS.map((status: string) => {
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
										<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
											<span data-tour='date-range'>
												{`${moment(values.createdAt[0].startDate).format('MMM Do YY')} - ${moment(
													values.createdAt[0].endDate,
												).format('MMM Do YY')}`}
											</span>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
											{datePicker(values.createdAt, 'createdAt')}
										</DropdownMenu>
									</Dropdown>}
								</div>
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
								label: t('filter.recipient.bank'),
								children: <CompanyBanksDropdown
									selectedBank={values.bank}
									setSelectedBank={(bank: CompanyBankInterface | CompanyBankInterface[]) => setFieldValue('bank', bank)}
									multipleSelect
								/>
							},
						]} 
						/>
					}
					{(readPermission && createPermission) && <SubheaderSeparator />}
					{createPermission && <Button
						icon={AttachMoney}
						color='primary'
						isLight
						onClick={() => setIsOpenDepositModal({ type: DepositModalType.Add, selectedRow: undefined})}
					>
						{t('deposit')}
					</Button>}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className={`col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} /> 
							: <DepositTable data={depositList} setIsOpenDepositModal={setIsOpenDepositModal} />
						}
					</div>
				</div>
			</Page>
			{isOpenDepositModal && <DepositModal setIsOpen={setIsOpenDepositModal} isOpen={Boolean(isOpenDepositModal)} properties={isOpenDepositModal} />}
		</PageWrapper>
	)
}

export default Deposit
