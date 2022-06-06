import { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import RewardModal, { RewardModalType } from './RewardModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import RewardTable from './RewardTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import { useDispatch, useSelector } from 'react-redux'
import { selectRedeemProductList, selectRedeemProductQuery } from 'redux/redeemProduct/selector'
import { getRedeemProductList, RedeemInterface, RedeemStatus } from 'common/apis/redeem'
import { storeRedeemProductList, storeRedeemProductQuery } from 'redux/redeemProduct/action'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface RewardFilterInterface {
	searchInput: string
	status: string[]
	points: {
		min: string
		max: string
	}
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
	isCreatedAtDateChanged: boolean
}

interface RewardModalProperties {
	type: RewardModalType
	selectedRow: RedeemInterface
}

export enum RewardTableState {
	Request = 'request',
	Sending = 'sending',
	History = 'history'
}

const Reward = () => {
    const { t } = useTranslation(['common', 'reward'])
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenRewardModal, setIsOpenRewardModal] = useState<RewardModalProperties>()
    const [rewardTableState, setRewardTableState] = useState(RewardTableState.Request)

	const redeemProductList = useSelector(selectRedeemProductList)
	const queryList = useSelector(selectRedeemProductQuery)

	useEffect(() => {
		let queryString = Object.values(queryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		setIsLoading(true)
		getRedeemProductList(query, rewardTableState, (redeemProductRequest: RedeemInterface[]) => {
			dispatch(storeRedeemProductList(redeemProductRequest))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>เรียกดูรายการแลกสินค้าไม่สำเร็จ</span>
				</span>,
				'กรุณาลองใหม่อีกครั้ง',
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryList, rewardTableState])

	const formik = useFormik<RewardFilterInterface>({
		initialValues: {
			searchInput: '',
            status: [],
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
			],
			isCreatedAtDateChanged: false,
		},
		onSubmit: (values) => {
			dispatch(storeRedeemProductQuery({
				...queryList,
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
				start: values.isCreatedAtDateChanged ? `startCreated=${moment(values.timestamp[0].startDate).format('YYYY-MM-DD')}` : '',
				end: values.isCreatedAtDateChanged ? `endCreated=${moment(values.timestamp[0].endDate).format('YYYY-MM-DD')}`: '',
				minPoint: values.points.min ? `minPoint=${values.points.min}` : '',
				maxPoint: values.points.max ? `maxPoint=${values.points.max}` : ''
			}))
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
			dispatch(storeRedeemProductQuery({ ...queryList, keyword: `keyword=${value}` }))
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
		let newValue = values[field as keyof RewardFilterInterface] as string[]

		if (isSelected) {
			newValue.push(selectedValue)
		} else {
			newValue.splice(index, 1)
		}
		setFieldValue(field, newValue)
	}

	return (
		<PageWrapper title={pages.reward.text}>
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
						placeholder={rewardTableState === RewardTableState.Request ?
							t('reward:search.reward.request.transaction') + '...' : t('reward:search.reward.history.transaction') + '...'
						}
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
								disabled: rewardTableState !== RewardTableState.History,
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
							}
						]} 
					/>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className={`col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} /> 
							: <RewardTable
								cardHeader={
									<CardHeader>
										<CardLabel>
											<CardTitle>{rewardTableState === RewardTableState.Request ? 
											t('reward:reward.request') : t('reward:reward.history')}</CardTitle>
										</CardLabel>
										<ButtonGroup>
											<Button
												color={rewardTableState === RewardTableState.Request ? 'success' : 'dark'}
												isLight={rewardTableState !== RewardTableState.Request}
												onClick={() => setRewardTableState(RewardTableState.Request)}
											>
												{t('reward:request')}
											</Button>
											<Button
												color={rewardTableState === RewardTableState.Sending ? 'success' : 'dark'}
												isLight={rewardTableState !== RewardTableState.Sending}
												onClick={() => setRewardTableState(RewardTableState.Sending)}
											>
												{t('reward:waitlist')}
											</Button>
											<Button
												color={rewardTableState === RewardTableState.History ? 'success' : 'dark'}
												isLight={rewardTableState !== RewardTableState.History}
												onClick={() => setRewardTableState(RewardTableState.History)}
											>
												{t('reward:history')}
											</Button>
										</ButtonGroup>
									</CardHeader>
								}
								data={redeemProductList}
								setIsOpenRewardModal={rewardTableState !== RewardTableState.History ? setIsOpenRewardModal : undefined}
								columns={{ mobileNumber: true, notes: true, status: true, operator: rewardTableState === RewardTableState.History }} 
							/>
						}
					</div>
				</div>
			</Page>
			{isOpenRewardModal && <RewardModal setIsOpen={setIsOpenRewardModal} isOpen={Boolean(isOpenRewardModal)} properties={isOpenRewardModal} />}
		</PageWrapper>
	)
}

export default Reward
