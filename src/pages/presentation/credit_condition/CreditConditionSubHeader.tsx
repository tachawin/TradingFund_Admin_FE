import React, { useState } from 'react'
import { useFormik } from 'formik'
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
import { CreditConditionProps } from './CreditCondition'
import { Add } from '@mui/icons-material'
import { CreditConditionModalType } from './CreditConditionModal'
import { useDispatch, useSelector } from 'react-redux'
import { storeCreditConditionQuery } from 'redux/creditCondition/action'
import 'moment/locale/th'
import Checks from 'components/bootstrap/forms/Checks'
import { selectCreditConditionQuery } from 'redux/creditCondition/selector'

interface CreditConditionFilterInterface {
	searchInput: string
	credit: {
		min: string
		max: string
	}
	point: {
		min: string
		max: string
	}
	quantity: {
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
	isLimited: boolean
}

const CreditConditionSubHeader = ({ setIsOpenCreditConditionModal }: CreditConditionProps) => {
	const { t } = useTranslation(['common', 'creditCondition'])
	const dispatch = useDispatch()

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
    const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)

	const queryList = useSelector(selectCreditConditionQuery)

	const formik = useFormik<CreditConditionFilterInterface>({
		initialValues: {
			searchInput: '',
            credit: {
                min: '',
                max: ''
            },
			point: {
                min: '',
                max: ''
            },
			quantity: {
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
			isLimited: true,
		},
		onSubmit: (values) => {
			dispatch(storeCreditConditionQuery({
				...queryList,
				minCredit: values.credit.min ? `minCredit=${values.credit.min}` : '',
				maxCredit: values.credit.max ? `maxCredit=${values.credit.max}` : '',
				minPoint: values.point.min ? `minPoint=${values.point.min}` : '',
				maxPoint: values.point.max ? `maxPoint=${values.point.max}` : '',
				minQuantity: !values.isLimited ? `minQuantity=-1` : values.quantity.min ? `minQuantity=${values.quantity.min}` : '',
				maxQuantity: !values.isLimited ? `maxQuantity=-1` : values.quantity.max ? `maxQuantity=${values.quantity.max}` : '',
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

	return (<SubHeader className='pt-3 mx-3' style={{ boxShadow: 'none' }}>
		<SubHeaderLeft>
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
					},
					{
						label: t('filter.points'),
						children: <div>
							<InputGroup>
								<Input
									id='point.min'
									ariaLabel='Minimum point'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.point.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='point.max'
									ariaLabel='Maximum point'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.point.max}
									type='number'
								/>
							</InputGroup>
						</div>
					},
					{
						label: t('filter.quantity'),
						children: <div>
							<Checks
								id='isLimited'
								label={t('limited')}
								onChange={handleChange}
								checked={values.isLimited}
								ariaLabel='Filter isLimited'
							/>
							<InputGroup className='mt-2'>
								<Input
									id='quantity.min'
									ariaLabel='Minimum quantity'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.quantity.min}
									type='number'
									disabled={!values.isLimited}
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='quantity.max'
									ariaLabel='Maximum quantity'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.quantity.max}
									type='number'
									disabled={!values.isLimited}
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
				onClick={() => setIsOpenCreditConditionModal({ type: CreditConditionModalType.Add, selectedRow: undefined})}
			>
				{t('creditCondition:add.creditCondition')}
			</Button>
		</SubHeaderRight>
	</SubHeader>)
}

export default CreditConditionSubHeader