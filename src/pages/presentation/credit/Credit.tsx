import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import CreditModal, { CreditModalType } from './CreditModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import CreditTable from './CreditTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import { useDispatch, useSelector } from 'react-redux'
import { selectRedeemCreditList, selectRedeemCreditQuery } from 'redux/redeemCredit/selector'
import { getRedeemCreditList, RedeemInterface, RedeemStatus } from 'common/apis/redeem'
import { storeRedeemCreditList, storeRedeemCreditQuery } from 'redux/redeemCredit/action'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { CommonString } from 'common/data/enumStrings'
import { pages } from 'menu'

interface CreditFilterInterface {
	searchInput: string
    status: string[],
	points: {
		min: string
		max: string
	},
    credit: {
		min: string
		max: string
	},
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
	isCreatedAtDateChanged: boolean
}

export enum CreditTableState {
	Request = 'request',
	History = 'history'
}

interface CreditModalProperties {
	type: CreditModalType
	selectedRow: RedeemInterface
}

const Credit = () => {
    const { t } = useTranslation(['common', 'credit'])
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenCreditModal, setIsOpenCreditModal] = useState<CreditModalProperties>()
    const [creditTableState, setCreditTableState] = useState(CreditTableState.Request)

	const redeemCreditList = useSelector(selectRedeemCreditList)
	const queryList = useSelector(selectRedeemCreditQuery)

	const permission = JSON.parse(localStorage.getItem('features') ?? '')
	const readPermission = permission.credit[PermissionType.Read] === PermissionValue.Available

	useEffect(() => {
		let queryString = Object.values(queryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getRedeemCreditList(query, creditTableState, (redeemCreditRequest: RedeemInterface[]) => {
			dispatch(storeRedeemCreditList(redeemCreditRequest))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>เรียกดูรายการแลกเครดิตไม่สำเร็จ</span>
				</span>,
				CommonString.NoPermission,
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryList, creditTableState])

	const formik = useFormik<CreditFilterInterface>({
		initialValues: {
			searchInput: '',
            status: [],
            points: {
                min: '',
                max: ''
            },
            credit: {
                min: '',
                max: '',
            },
			timestamp: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
			isCreatedAtDateChanged: false,
		},
		onSubmit: (values) => {
			dispatch(storeRedeemCreditQuery({
				...queryList,
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
				start: values.isCreatedAtDateChanged ? `startCreated=${moment(values.timestamp[0].startDate).format('YYYY-MM-DD')}` : '',
				end: values.isCreatedAtDateChanged ? `endCreated=${moment(values.timestamp[0].endDate).format('YYYY-MM-DD')}`: '',
				minPoint: values.points.min ? `minPoint=${values.points.min}` : '',
				maxPoint: values.points.max ? `maxPoint=${values.points.max}` : '',
				minCredit: values.credit.min ? `minCredit=${values.credit.min}` : '',
				maxCredit: values.credit.max ? `maxCredit=${values.credit.max}` : ''
			}))
		},
	})

	const { 
		values,
		setFieldValue,
		handleChange,
		initialValues,
		setValues,
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
			dispatch(storeRedeemCreditQuery({ ...queryList, keyword: `keyword=${value}` }))
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
		let newValue = values[field as keyof CreditFilterInterface] as string[]

		if (isSelected) {
			newValue.push(selectedValue)
		} else {
			newValue.splice(index, 1)
		}
		setFieldValue(field, newValue)
	}

	return (
		<PageWrapper title={pages.credit.text}>
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
						placeholder={creditTableState === CreditTableState.Request ?
							t('credit:search.credit.request.transaction') + '...' : t('credit:search.credit.history.transaction') + '...'
						}
						onChange={handleSearchChange}
						value={searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					{readPermission && <CommonTableFilter
						resetLabel={t('filter.reset')}
						onReset={() => setValues({ ...initialValues, status: [] })}
						submitLabel={t('filter')}
						onSubmit={handleSubmit}
						filters={[
							{
								label: t('filter.status'),
								disabled: creditTableState !== CreditTableState.History,
								children: <div>
									{[RedeemStatus.Success, RedeemStatus.Reject].map((status: RedeemStatus) => {
										let indexInStatusFilter = values.status.indexOf(status)
										return <Checks
												key={status}
												label={status === RedeemStatus.Success ? t('success') : t('reject')}
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
												{`${moment(values.timestamp[0].startDate).format('MMM Do YY')} - ${moment(
													values.timestamp[0].endDate,
												).format('MMM Do YY')}`}
											</span>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
											{datePicker(values.timestamp, 'timestamp')}
										</DropdownMenu>
									</Dropdown>}
								</div>
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
							},
                            {
								label: t('filter.credit'),
								children: <div>
									<InputGroup>
										<Input
											id='credit.min'
											ariaLabel='Minimum credit'
											placeholder={t('filter.min')}
											onChange={handleChange}
											value={values.credit.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='credit.max'
											ariaLabel='Maximum credit'
											placeholder={t('filter.max')}
											onChange={handleChange}
											value={values.credit.max}
											type='number'
										/>
									</InputGroup>
								</div>
							}
						]} 
					/>}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
				<div className={`col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} /> 
							: <CreditTable
								cardHeader={
									<CardHeader>
										<CardLabel>
										<CardTitle>{creditTableState === CreditTableState.Request ? 
											t('request') : t('history')}</CardTitle>
										</CardLabel>
										<ButtonGroup>
											<Button
												color={creditTableState === CreditTableState.Request ? 'success' : 'dark'}
												isLight={creditTableState !== CreditTableState.Request}
												onClick={() => setCreditTableState(CreditTableState.Request)}
											>
												{t('request')}
											</Button>
											<Button
												color={creditTableState === CreditTableState.History ? 'success' : 'dark'}
												isLight={creditTableState !== CreditTableState.History}
												onClick={() => setCreditTableState(CreditTableState.History)}
											>
												{t('history')}
											</Button>
										</ButtonGroup>
									</CardHeader>
								}
								data={redeemCreditList}
								setIsOpenCreditModal={creditTableState === CreditTableState.Request ? setIsOpenCreditModal : undefined}
								columns={{ mobileNumber: true, notes: true, status: creditTableState === CreditTableState.History, operator: creditTableState === CreditTableState.History }} 
							/>
						}
					</div>
				</div>
			</Page>
			{isOpenCreditModal && <CreditModal setIsOpen={setIsOpenCreditModal} isOpen={Boolean(isOpenCreditModal)} properties={isOpenCreditModal} />}
		</PageWrapper>
	)
}

export default Credit
