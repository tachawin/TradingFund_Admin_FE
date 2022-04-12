import { ChangeEvent, useCallback, useState } from 'react'
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
import data from '../../../common/data/dummySalesData'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import DepositModal from './DepositModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import banks from 'common/data/dummyBankData'
import DepositTable from './DepositTable'

interface DepositFilterInterface {
	searchInput: string
	isSuccess: boolean
	isNotFound: boolean
    isCancel: boolean
	price: {
		min: string
		max: string
	},
	bank: string[]
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

interface DepositModalProperties {
	type: string
	selectedRow: any
}

const Deposit = () => {
    const { t } = useTranslation(['common', 'deposit'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenDepositModal, setIsOpenDepositModal] = useState<DepositModalProperties>()

	const formik = useFormik<DepositFilterInterface>({
		initialValues: {
			searchInput: '',
			isSuccess: false,
            isNotFound: false,
            isCancel: false,
            price: {
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
            bank: []
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

    const handleOnChangeBankFilter = (event: ChangeEvent<HTMLInputElement>) => {
		let bank = event.target.name
		let indexInBankFilter = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newBankFilterValue = values.bank

		if (isSelected) {
			newBankFilterValue.push(bank)
		} else {
			newBankFilterValue.splice(indexInBankFilter, 1)
		}
		setFieldValue('bank', newBankFilterValue )
	}

	return (
		<PageWrapper title={demoPages.crm.subMenu.customersList.text}>
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
						placeholder={t('deposit:search.deposit.transaction') + '...'}
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
								children: <div>
                                    <Checks
                                        id='isSuccess'
                                        label={t('success')}
                                        onChange={handleChange}
                                        checked={values.isSuccess}
                                        ariaLabel={t('success')}
                                    />
                                    <Checks
                                        id='isNotFound'
                                        label={t('not.found')}
                                        onChange={handleChange}
                                        checked={values.isNotFound}
                                        ariaLabel={t('not.found')}
                                    />
                                    <Checks
                                        id='isCancel'
                                        label={t('cancel')}
                                        onChange={handleChange}
                                        checked={values.isCancel}
                                        ariaLabel={t('cancel')}
                                    />
                                </div>
							},
							{
								label: t('filter.timestamp'),
								children: <Dropdown >
									<DropdownToggle hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
										<Button color='dark' isLight data-tour='date-range'>
											{`${moment(values.timestamp[0].startDate).format('MMM Do YY')} - ${moment(
												values.timestamp[0].endDate,
											).format('MMM Do YY')}`}
										</Button>
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
								label: t('filter.bank'),
								children: <div>
									{banks.map((bank: any) => {
										let indexInBankFilter = values.bank.indexOf(bank.label)
										return <Checks
												key={bank.id}
												label={bank.label}
												name={bank.label}
												value={indexInBankFilter}
												onChange={handleOnChangeBankFilter}
												checked={indexInBankFilter > -1}
												ariaLabel={bank.label}
											/>
										}
									)}
								</div>
							},
						]} 
					/>
					<SubheaderSeparator />
					<Button
						icon='AttachMoney'
						color='primary'
						isLight
						onClick={() => setIsOpenDepositModal({ type: "add", selectedRow: null})}
					>
						{t('deposit')}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<DepositTable data={data} setIsOpenDepositModal={setIsOpenDepositModal} />
					</div>
				</div>
			</Page>
			{isOpenDepositModal && <DepositModal setIsOpen={setIsOpenDepositModal} isOpen={Boolean(isOpenDepositModal)} properties={isOpenDepositModal} />}
		</PageWrapper>
	)
}

export default Deposit
