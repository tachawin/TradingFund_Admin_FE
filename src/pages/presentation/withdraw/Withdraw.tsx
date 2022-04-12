import { ChangeEvent, useCallback, useState } from 'react'
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
import data from '../../../common/data/dummySalesData'
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
// import WithdrawModal from './WithdrawModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import banks from 'common/data/dummyBankData'
import WithdrawTable from './WithdrawTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'

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
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

interface WithdrawModalProperties {
	type: string
	selectedRow: any
}

const Withdraw = () => {
    const { t } = useTranslation(['common', 'withdraw'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenWithdrawModal, setIsOpenWithdrawModal] = useState<WithdrawModalProperties>()
    const [withdrawTableState, setWithdrawTableState] = useState('request')

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
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<WithdrawTable
                            cardHeader={
                                <CardHeader>
                                    <CardLabel>
                                        <CardTitle>{t('withdraw:withdraw.request')}</CardTitle>
                                    </CardLabel>
                                    <ButtonGroup>
                                        <Button
                                            color={withdrawTableState === 'request' ? 'success' : 'dark'}
                                            isLight={withdrawTableState !== 'request'}
                                            onClick={() => setWithdrawTableState('request')}
                                        >
                                            {t('withdraw:request')}
                                        </Button>
                                        <Button
                                            color={withdrawTableState === 'history' ? 'success' : 'dark'}
                                            isLight={withdrawTableState !== 'history'}
                                            onClick={() => setWithdrawTableState('history')}
                                        >
                                            {t('withdraw:history')}
                                        </Button>
                                    </ButtonGroup>
                                </CardHeader>
                            }
                            data={data.filter((i: any) => i.status === 'request' )} 
                            setIsOpenWithdrawModal={setIsOpenWithdrawModal}
                            columns={{ status: false, mobileNumber: true, notes: false }} 
                        />
					</div>
				</div>
			</Page>
			{/* {isOpenWithdrawModal && <WithdrawModal setIsOpen={setIsOpenWithdrawModal} isOpen={Boolean(isOpenWithdrawModal)} properties={isOpenWithdrawModal} />} */}
		</PageWrapper>
	)
}

export default Withdraw
