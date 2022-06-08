import React, { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import { useTranslation } from 'react-i18next'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import Button from 'components/bootstrap/Button'
import { LevelProps } from './Level'
import { Add, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import { LevelModalType } from './LevelModal'
import { useDispatch, useSelector } from 'react-redux'
import { storeLevelQuery } from 'redux/level/action'
import { selectCompanyLevelQuery } from 'redux/level/selector'
import 'moment/locale/th'
import Checks from 'components/bootstrap/forms/Checks'

interface LevelFilterInterface {
	searchInput: string
	minimumDeposit: {
		min: string
		max: string
	}
	maximumDeposit: {
		min: string
		max: string
	}
	investmentAmount: {
		min: string
		max: string
	}
	cashback: {
		min: string
		max: string
	}
	createdAt: {
		startDate: Date
		endDate: Date
		key: string
	}[]
    updatedAt: {
		startDate: Date
		endDate: Date
		key: string
	}[]
	isCreatedAtDateChanged: boolean
	isUpdatedAtDateChanged: boolean
}

const LevelSubHeader = ({ setIsOpenLevelModal }: LevelProps) => {
	const { t } = useTranslation(['common', 'level'])
	const dispatch = useDispatch()

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
    const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')

	const queryList = useSelector(selectCompanyLevelQuery)

	const formik = useFormik<LevelFilterInterface>({
		initialValues: {
			searchInput: '',
            minimumDeposit: {
                min: '',
                max: ''
            },
			maximumDeposit: {
                min: '',
                max: ''
            },
			investmentAmount: {
                min: '',
                max: ''
            },
			cashback: {
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
            updatedAt: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
			isCreatedAtDateChanged: false,
			isUpdatedAtDateChanged: false,
		},
		onSubmit: (values) => {
			dispatch(storeLevelQuery({
				...queryList,
				minMinimumDepositAmount: values.minimumDeposit.min !== '' ? `minMinimumDepositAmount=${values.minimumDeposit.min}` : '',
				maxMinimumDepositAmount: values.minimumDeposit.max !== '' ? `maxMinimumDepositAmount=${values.minimumDeposit.max}` : '',
				minMaximumDepositAmount: values.maximumDeposit.min !== '' ? `minMaximumDepositAmount=${values.maximumDeposit.min}` : '',
				maxMaximumDepositAmount: values.maximumDeposit.max !== '' ? `maxMaximumDepositAmount=${values.maximumDeposit.max}` : '',
				minInvestment: values.investmentAmount.min !== '' ? `minInvestment=${values.investmentAmount.min}` : '',
				maxInvestment: values.investmentAmount.max !== '' ? `maxInvestment=${values.investmentAmount.max}` : '',
				minCashback: values.cashback.min !== '' ? `minCashback=${values.cashback.min}` : '',
				maxCashback: values.cashback.max !== '' ? `maxCashback=${values.cashback.max}` : '',
				startCreated: values.isCreatedAtDateChanged ? `startCreated=${moment(values.createdAt[0].startDate).format('YYYY-MM-DD')}` : '',
				endCreated: values.isCreatedAtDateChanged ?`endCreated=${moment(values.createdAt[0].endDate).format('YYYY-MM-DD')}` : '',
				startUpdated: values.isUpdatedAtDateChanged ? `startUpdated=${moment(values.updatedAt[0].startDate).format('YYYY-MM-DD')}` : '',
				endUpdated: values.isUpdatedAtDateChanged ? `endUpdated=${moment(values.updatedAt[0].endDate).format('YYYY-MM-DD')}` : ''
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
			dispatch(storeLevelQuery({ ...queryList, keyword: `keyword=${value}` }))
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		setSearchInput(value)
		debounceSearchChange(value)
	}

	return (<SubHeader className='pt-3 mx-3' style={{ boxShadow: 'none' }}>
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
				placeholder={t('level:search.level') + '...'}
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
						label: t('filter.created.at'),
						children: <div>
							<Checks
								id='isCreatedAtDateChanged'
								type='switch'
								label={t('filter.created.at')}
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
						label: t('filter.updated.at'),
						children: <div>
							<Checks
								id='isUpdatedAtDateChanged'
								type='switch'
								label={t('filter.updated.at')}
								onChange={handleChange}
								checked={values.isUpdatedAtDateChanged}
								ariaLabel='Filter Updated At Date'
							/>
							{values.isCreatedAtDateChanged && <Dropdown className='mt-2'>
								<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenUpdatedAtDatePicker)} setIsOpen={setIsOpenUpdatedAtDatePicker}>
									<span data-tour='date-range'>
										{`${moment(values.updatedAt[0].startDate).format('MMM Do YY')} - ${moment(
											values.updatedAt[0].endDate,
										).format('MMM Do YY')}`}
									</span>
								</DropdownToggle>
								<DropdownMenu isAlignmentEnd isOpen={isOpenUpdatedAtDatePicker} setIsOpen={setIsOpenUpdatedAtDatePicker}>
									{datePicker(values.updatedAt, 'updatedAt')}
								</DropdownMenu>
							</Dropdown>}
						</div>
					},
					{
						label: t('filter.minimum.deposit.amount'),
						children: <div>
							<InputGroup>
								<Input
									id='minimumDeposit.min'
									ariaLabel='Min minimum deposit'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.minimumDeposit.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='minimumDeposit.max'
									ariaLabel='Max minimum deposit'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.minimumDeposit.max}
									type='number'
								/>
							</InputGroup>
						</div>
					},
					{
						label: t('filter.maximum.deposit.amount'),
						children: <div>
							<InputGroup>
								<Input
									id='maximumDeposit.min'
									ariaLabel='Min maximum deposit'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.maximumDeposit.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='maximumDeposit.max'
									ariaLabel='Max maximum deposit'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.maximumDeposit.max}
									type='number'
								/>
							</InputGroup>
						</div>
					},
					{
						label: t('filter.investment.amount'),
						children: <div>
							<InputGroup>
								<Input
									id='investmentAmount.min'
									ariaLabel='Minimum invesment amount'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.investmentAmount.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='investmentAmount.max'
									ariaLabel='Maximum invesment amount'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.investmentAmount.max}
									type='number'
								/>
							</InputGroup>
						</div>
					},

					{
						label: t('filter.cashback'),
						children: <div>
							<InputGroup>
								<Input
									id='cashback.min'
									ariaLabel='Minimum cashback'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.cashback.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='cashback.max'
									ariaLabel='Maximum cashback'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.cashback.max}
									type='number'
								/>
							</InputGroup>
						</div>
					}
				]} 
			/>
			<SubheaderSeparator />
			<Button
				className='text-nowrap'
				icon={Add}
				color='primary'
				isLight
				onClick={() => setIsOpenLevelModal({ type: LevelModalType.Add, selectedRow: undefined})}
			>
				{t('level:add.level')}
			</Button>
		</SubHeaderRight>
	</SubHeader>)
}

export default LevelSubHeader