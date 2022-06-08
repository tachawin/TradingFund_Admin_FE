import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { demoPages } from '../../../menu'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import { useTranslation } from 'react-i18next'
import WithdrawCancelModal from './WithdrawCancelModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import WithdrawTable from './WithdrawTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import WithdrawModal, { WithdrawModalType } from './WithdrawModal'
import BankBalanceCard from './BankBalanceCard'
import { getWithdrawList } from 'common/apis/withdraw'
import showNotification from 'components/extras/showNotification'
import { useDispatch, useSelector } from 'react-redux'
import { selectWithdrawList, selectWithdrawQuery } from 'redux/withdraw/selector'
import { TransactionInterface } from 'common/apis/transaction'
import { storeWithdrawList, storeWithdrawQuery } from 'redux/withdraw/action'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'
import CompanyBanksDropdown from 'pages/common/CompanyBanksDropdown'
import { CompanyBankInterface, getCompanyBankList } from 'common/apis/companyBank'
import Spinner from 'components/bootstrap/Spinner'
import { selectCompanyBankList } from 'redux/companyBank/selector'
import { storeCompanyBank } from 'redux/companyBank/action'
import { InfoTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface WithdrawFilterInterface {
	searchInput: string
	amount: {
		min: string
		max: string
	},
    lastDepositAmount: {
		min: string
		max: string
	},
	bank: string[]
	companyBank: CompanyBankInterface[]
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

interface WithdrawModalProperties {
	type: WithdrawModalType
	selectedRow: any
}

export enum WithdrawTableState {
	Request = 'request_withdraw',
	History = 'withdraw'
}

const Withdraw = () => {
    const { t } = useTranslation(['common', 'withdraw'])
	const dispatch = useDispatch()

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenCancelWithdrawModal, setIsOpenCancelWithdrawModal] = useState<WithdrawModalProperties>()
	const [isOpenWithdrawModal, setIsOpenWithdrawModal] = useState<WithdrawModalProperties>()
    const [withdrawTableState, setWithdrawTableState] = useState(WithdrawTableState.Request)
	const [isLoading, setIsLoading] = useState(false)

	const banks = useSelector(selectCompanyBankList)
	const withdrawList = useSelector(selectWithdrawList)
	const withdrawQueryList = useSelector(selectWithdrawQuery)

	useEffect(() => {
		let queryString = Object.values(withdrawQueryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getWithdrawList(query, withdrawTableState, (withdrawList: TransactionInterface[]) => {
			dispatch(storeWithdrawList(withdrawList))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.withdraw.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		})

		banks.length === 0 && getCompanyBankList('?type=withdraw,deposit_and_withdraw', (companyBankList: CompanyBankInterface[]) => {
			dispatch(storeCompanyBank(companyBankList))
			setIsLoading && setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading && setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.company.bank.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [withdrawQueryList, withdrawTableState])

	const formik = useFormik<WithdrawFilterInterface>({
		initialValues: {
			searchInput: '',
            amount: {
                min: '',
                max: ''
            },
            lastDepositAmount: {
                min: '',
                max: ''
            },
			timestamp: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
            bank: [],
			companyBank: []
		},
		onSubmit: (values) => {
			const defaultWithdrawQuery = {
				...withdrawQueryList,
				startCreated: `startCreated=${moment(values.timestamp[0].startDate).format('YYYY-MM-DD')}`,
				endCreated: `endCreated=${moment(values.timestamp[0].endDate).format('YYYY-MM-DD')}`,
				min: values.amount.min ? `min=${values.amount.min}` : '',
				max: values.amount.max ? `max=${values.amount.max}` : '',
			}

			if (withdrawTableState === WithdrawTableState.Request) {
				dispatch(storeWithdrawQuery({
					...defaultWithdrawQuery,
					minLastDeposit: values.lastDepositAmount.min ? `minLastDeposit=${values.lastDepositAmount.min}` : '',
					maxLastDeposit: values.lastDepositAmount.max ? `maxLastDeposit=${values.lastDepositAmount.max}` : '',
					bank: values.bank.length > 0 ? `bank=${values.bank.join(',')}` : '',
				}))
			} else {
				dispatch(storeWithdrawQuery({
					...defaultWithdrawQuery,
					companyBankId: values.companyBank.length > 0 ? `companyBankId=${values.companyBank.map((bank) => bank.bankId).join(',')}` : '',
				}))
			}
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
			dispatch(storeWithdrawQuery({ ...withdrawQueryList, keyword: `keyword=${value}` }))
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		setSearchInput(value)
		debounceSearchChange(value)
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
						placeholder={t('withdraw:search.withdraw.transaction') + '...'}
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
								label: t('filter.amount'),
								children: <div>
									<InputGroup>
										<Input
											id='amount.min'
											ariaLabel='Minimum price'
											placeholder={t('filter.min')}
											onChange={handleChange}
											value={values.amount.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='amount.max'
											ariaLabel='Maximum price'
											placeholder={t('filter.max')}
											onChange={handleChange}
											value={values.amount.max}
											type='number'
										/>
									</InputGroup>
								</div>
							},
                            {
								label: t('filter.last.deposit.amount'),
								disabled: withdrawTableState === WithdrawTableState.History,
								children: <div>
									<InputGroup>
										<Input
											id='lastDepositAmount.min'
											ariaLabel='Minimum price'
											placeholder={t('filter.min')}
											onChange={handleChange}
											value={values.lastDepositAmount.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='lastDepositAmount.max'
											ariaLabel='Maximum price'
											placeholder={t('filter.max')}
											onChange={handleChange}
											value={values.lastDepositAmount.max}
											type='number'
										/>
									</InputGroup>
								</div>
							},
							{
								label: t('filter.payer.bank'),
								disabled: withdrawTableState === WithdrawTableState.Request,
								children: <CompanyBanksDropdown
									multipleSelect
									selectedBank={values.companyBank}
									setSelectedBank={(bank: CompanyBankInterface | CompanyBankInterface[]) => setFieldValue('companyBank', bank)}
								/>
							},
							{
								label: t('filter.recipient.bank'),
								disabled: withdrawTableState === WithdrawTableState.History,
								children: <CommonBanksDropdown
									multipleSelect
									selectedBankName={values.bank}
									setSelectedBankName={(bank: string | string[]) => setFieldValue('bank', bank)}
								/>
							},
						]} 
					/>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='col h-100 px-3'>
					<BankBalanceCard />
					<div className={`h-100 col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : ''}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} /> 
							: <WithdrawTable
								cardHeader={
									<CardHeader>
										<CardLabel>
											<CardTitle>{
												withdrawTableState === WithdrawTableState.Request ?
												t('withdraw:withdraw.request') : t('withdraw:withdraw.history')
											}</CardTitle>
										</CardLabel>
										<ButtonGroup>
											<Button
												color={withdrawTableState === WithdrawTableState.Request ? 'success' : 'dark'}
												isLight={withdrawTableState !== WithdrawTableState.Request}
												onClick={() => setWithdrawTableState(WithdrawTableState.Request)}
											>
												{t('withdraw:request')}
											</Button>
											<Button
												color={withdrawTableState === WithdrawTableState.History ? 'success' : 'dark'}
												isLight={withdrawTableState !== WithdrawTableState.History}
												onClick={() => setWithdrawTableState(WithdrawTableState.History)}
											>
												{t('withdraw:history')}
											</Button>
										</ButtonGroup>
									</CardHeader>
								}
								data={withdrawList}
								setIsOpenWithdrawModal={withdrawTableState === WithdrawTableState.Request ? setIsOpenWithdrawModal : undefined} 
								setIsOpenCancelWithdrawModal={withdrawTableState === WithdrawTableState.Request ? setIsOpenCancelWithdrawModal : undefined}
								columns={{ 
									id: false,
									status: withdrawTableState === WithdrawTableState.History, 
									mobileNumber: true, 
									notes: withdrawTableState === WithdrawTableState.History, 
									lastDepositAmount: withdrawTableState === WithdrawTableState.Request, 
									from: withdrawTableState === WithdrawTableState.History,
									operator: withdrawTableState === WithdrawTableState.History,
									name: true 
								}} 
							/>
						}
					</div>
				</div>
			</Page>
			{isOpenCancelWithdrawModal && <WithdrawCancelModal setIsOpen={setIsOpenCancelWithdrawModal} isOpen={Boolean(isOpenCancelWithdrawModal)} properties={isOpenCancelWithdrawModal} />}
			{isOpenWithdrawModal && <WithdrawModal setIsOpen={setIsOpenWithdrawModal} isOpen={Boolean(isOpenWithdrawModal)} properties={isOpenWithdrawModal} />}
		</PageWrapper>
	)
}

export default Withdraw
