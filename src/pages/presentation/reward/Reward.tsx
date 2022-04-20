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
import data from '../../../common/data/dummyRewardData'
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import RewardModal from './RewardModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import RewardTable from './RewardTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'

interface RewardFilterInterface {
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

interface RewardModalProperties {
	type: string
	selectedRow: any
}

enum REWARD_TABLE_STATE {
	REQUEST = 'request',
	WAITLIST = 'waitlist',
	HISTORY = 'history'
}

const Reward = () => {
    const { t } = useTranslation(['common', 'reward'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenRewardModal, setIsOpenRewardModal] = useState<RewardModalProperties>()
    const [rewardTableState, setRewardTableState] = useState(REWARD_TABLE_STATE.REQUEST)

	const formik = useFormik<RewardFilterInterface>({
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
		<PageWrapper title={pages.reward.text}>
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
						placeholder={rewardTableState === REWARD_TABLE_STATE.REQUEST ?
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
								disabled: rewardTableState === REWARD_TABLE_STATE.REQUEST,
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
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<RewardTable
                            cardHeader={
                                <CardHeader>
                                    <CardLabel>
                                        <CardTitle>{rewardTableState === REWARD_TABLE_STATE.REQUEST ? 
										t('reward:reward.request') : t('reward:reward.history')}</CardTitle>
                                    </CardLabel>
                                    <ButtonGroup>
                                        <Button
                                            color={rewardTableState === REWARD_TABLE_STATE.REQUEST ? 'success' : 'dark'}
                                            isLight={rewardTableState !== REWARD_TABLE_STATE.REQUEST}
                                            onClick={() => setRewardTableState(REWARD_TABLE_STATE.REQUEST)}
                                        >
                                            {t('reward:request')}
                                        </Button>
										<Button
                                            color={rewardTableState === REWARD_TABLE_STATE.WAITLIST ? 'success' : 'dark'}
                                            isLight={rewardTableState !== REWARD_TABLE_STATE.WAITLIST}
                                            onClick={() => setRewardTableState(REWARD_TABLE_STATE.WAITLIST)}
                                        >
                                            {t('reward:waitlist')}
                                        </Button>
                                        <Button
                                            color={rewardTableState === REWARD_TABLE_STATE.HISTORY ? 'success' : 'dark'}
                                            isLight={rewardTableState !== REWARD_TABLE_STATE.HISTORY}
                                            onClick={() => setRewardTableState(REWARD_TABLE_STATE.HISTORY)}
                                        >
                                            {t('reward:history')}
                                        </Button>
                                    </ButtonGroup>
                                </CardHeader>
                            }
                            data={rewardTableState !== REWARD_TABLE_STATE.HISTORY ? 
								data.filter((i: any) => rewardTableState === REWARD_TABLE_STATE.REQUEST ?  i.status === 'request' : i.status === 'sending') : 
								data.filter((i: any) => i.status !== 'request')
							} 
                            setIsOpenRewardModal={rewardTableState !== REWARD_TABLE_STATE.HISTORY ? setIsOpenRewardModal : undefined}
                            columns={{ mobileNumber: true, notes: true, status: true, operator: rewardTableState === REWARD_TABLE_STATE.HISTORY }} 
                        />
					</div>
				</div>
			</Page>
			{isOpenRewardModal && <RewardModal setIsOpen={setIsOpenRewardModal} isOpen={Boolean(isOpenRewardModal)} properties={isOpenRewardModal} />}
		</PageWrapper>
	)
}

export default Reward
