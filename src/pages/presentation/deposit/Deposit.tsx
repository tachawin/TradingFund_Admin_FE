import { ChangeEvent, MouseEvent, ReactNode, useCallback, useState } from 'react'
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
import Card, { CardBody } from '../../../components/bootstrap/Card'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import data from '../../../common/data/dummySalesData'
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import useSortableData from '../../../hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import DepositModal from './DepositModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'

const BANK_LIST = [
	{
		id: 0,
		name: 'scb',
		label: 'SCB'
	},
	{
		id: 1,
		name: 'kasikorn bank',
		label: 'KBANK'
	},
	{
		id: 2,
		name: 'ttb',
		label: 'TTB'
	}
]

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
    const { t } = useTranslation('deposit')

	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
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

	const { items, requestSort, getClassNamesFor } = useSortableData(data)

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

    const getStatusText = (status: string): ReactNode => {
        if (status === 'success') {
            return <div className='fw-bold text-success'>{t('success')}</div>
        } else if (status === 'not-found') {
            return <div className='fw-bold text-warning'>{t('not.found')}</div>
        } else {
            return <div className='fw-bold text-danger'>{t('cancel')}</div>
        }
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
						placeholder={t('search.deposit.transaction') + '...'}
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
									{BANK_LIST.map((bank: any) => {
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
						<Card stretch>
							<CardBody isScrollable className='table-responsive'>
								<table className='table table-modern table-hover'>
									<thead>
										<tr>
                                            <th 
												onClick={() => requestSort('no')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.no')}
											</th>
                                            <th
												onClick={() => requestSort('status')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.status')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('status')}
													icon='FilterList'
												/>
											</th>
                                            <th
												onClick={() => requestSort('timestamp')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.timestamp')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('timestamp')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('from')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.from')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('from')}
													icon='FilterList'
												/>
											</th>
                                            <th
												onClick={() => requestSort('to')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.to')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('to')}
													icon='FilterList'
												/>
											</th>
                                            <th
												onClick={() => requestSort('amount')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.amount')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('amount')}
													icon='FilterList'
												/>
											</th>
											<th>{t('column.mobile.number')}</th>
                                            <th>{t('column.notes')}</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
											<tr key={i.id}>
                                                <td className='text-center'>
                                                    <div>{index + 1}</div>
												</td>
                                                <td>
                                                    <div>{getStatusText(i.status)}</div>
												</td>
                                                <td>
													<div>{i.date.format('ll')}</div>
													<div>
														<small className='text-muted'>
															{i.date.fromNow()}
														</small>
													</div>
												</td>
                                                <td>
                                                    <div>*{i.payerBankAccountNumber}</div>
												</td>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																*{i.recipientBankAccountNumber}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i.recipientBankName.toUpperCase()}</small>
															</div>
														</div>
													</div>
												</td>
                                                <td>
                                                    <div>{i.amount.toLocaleString()}</div>
												</td>
                                                <td>
                                                    <div>{i.mobileNumber}</div>
												</td>
                                                <td className='w-25'>
                                                    <div>{i.note}</div>
												</td>
												<td>
                                                    {i.status === 'success' ? 
                                                        <><Button
                                                            onClick={() => setIsOpenDepositModal({ type: "refund", selectedRow: i})}
                                                            className='p-0'
                                                            isLight
                                                        >
                                                            {t('refund')}
                                                        </Button> / </>
                                                        : i.status === 'not-found' ? <><Button
                                                            onClick={() => setIsOpenDepositModal({ type: "select-payer", selectedRow: i})}
                                                            className='p-0'
                                                            isLight
                                                        >
                                                            {t('select.payer')}
                                                        </Button> / </> : <></>
                                                    } <Button
                                                            onClick={() => setIsOpenDepositModal({ type: "edit", selectedRow: i})}
                                                            className='p-0'
                                                            isLight
                                                        >
                                                            {t('edit')}
                                                        </Button>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={data}
								label='customers'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
			</Page>
			{isOpenDepositModal && <DepositModal setIsOpen={setIsOpenDepositModal} isOpen={Boolean(isOpenDepositModal)} properties={isOpenDepositModal} />}
		</PageWrapper>
	)
}

export default Deposit
