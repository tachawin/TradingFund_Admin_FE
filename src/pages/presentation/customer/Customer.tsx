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
import Card, { CardBody } from '../../../components/bootstrap/Card'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import data from '../../../common/data/dummyCustomerData'
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
import { useNavigate } from 'react-router-dom'
import banks from 'common/data/dummyBankData'
import CustomerAddModal from './CustomerAddModal'
import CommonTableFilter from 'components/common/CommonTableFilter'

interface DepositFilterInterface {
	searchInput: string
	bank: string[]
	level: string[]
	createdAtDate: {
		startDate: Date
		endDate: Date
		key: string
	}[]
    updatedAtDate: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

const levels = [
	{
		id: 0,
		name: 'Platinum'
	},
	{
		id: 1,
		name: 'Gold'
	},
	{
		id: 2,
		name: 'Silver'
	},
	{
		id: 3,
		name: 'Bronze'
	}
]

const Customer = () => {
    const { t } = useTranslation(['common', 'customer'])
    const navigate = useNavigate()

	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isOpenCustomerModal, setIsOpenCustomerModal] = useState<"add" | "edit">()

	const formik = useFormik<DepositFilterInterface>({
		initialValues: {
			searchInput: '',
            bank: [],
			level: [],
			createdAtDate: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
			updatedAtDate: [
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

	const { items, requestSort, getClassNamesFor } = useSortableData(data)

	const { 
		values,
		setFieldValue,
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

	const handleOnChangeLevelFilter = (event: ChangeEvent<HTMLInputElement>) => {
		let bank = event.target.name
		let indexInLevelFilter = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newLevelFilterValue = values.level

		if (isSelected) {
			newLevelFilterValue.push(bank)
		} else {
			newLevelFilterValue.splice(indexInLevelFilter, 1)
		}
		setFieldValue('bank', newLevelFilterValue )
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
						placeholder={t('customer:search.customer') + '...'}
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
								label: t('filter.level'),
								children: levels.map((level: any) => {
									let indexInLevelFilter = values.level.indexOf(level.name)
									return <Checks
											key={level.id}
											label={level.name}
											name={level.name}
											value={indexInLevelFilter}
											onChange={handleOnChangeLevelFilter}
											checked={indexInLevelFilter > -1}
											ariaLabel={level.name}
										/>
									}
								)
							},
							{
								label: t('filter.created.at'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.createdAtDate[0].startDate).format('MMM Do YY')} - ${moment(
												values.createdAtDate[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
										{datePicker(values.createdAtDate, 'createdAtDate')}
									</DropdownMenu>
								</Dropdown>
							},
							{
								label: t('filter.updated.at'),
								children: <Dropdown>
									<DropdownToggle hasIcon={false} color='dark' isLight isOpen={Boolean(isOpenUpdatedAtDatePicker)} setIsOpen={setIsOpenUpdatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.updatedAtDate[0].startDate).format('MMM Do YY')} - ${moment(
												values.updatedAtDate[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenUpdatedAtDatePicker} setIsOpen={setIsOpenUpdatedAtDatePicker}>
										{datePicker(values.updatedAtDate, 'updatedAtDate')}
									</DropdownMenu>
								</Dropdown>
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
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setIsOpenCustomerModal('add')}
					>
						{t('customer:new.customer')}
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
												className='cursor-pointer text-decoration-underline text-center'>
												{t('column.no')}
											</th>
											<th
												onClick={() => requestSort('name')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.name')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('name')}
													icon='FilterList'
												/>
											</th>
                                            <th
												className='cursor-pointer text-decoration-underline'>
												{t('column.bank.account.number')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('bankAccountNumber')}
													icon='FilterList'
												/>
											</th>
											<th>{t('column.mobile.number')}</th>
											<th
												onClick={() => requestSort('createdAt')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.created.at')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('createdAt')}
													icon='FilterList'
												/>
											</th>
											<th
												onClick={() => requestSort('lastActiveAt')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.last.active.at')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('lastActiveAt')}
													icon='FilterList'
												/>
											</th>
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
													<div className='d-flex align-items-center'>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.name}
															</div>
															<div className='text-muted'>
																<Icon icon='StarFill' color={i.level === 'Gold' ? 'warning' : i.level === 'Silver' ? 'light' : i.level === 'Platinum' ? 'primary' : 'danger' } />{' '}
																<small>{i.level}</small>
															</div>
														</div>
													</div>
												</td>
                                                <td>
													<div className='d-flex align-items-center'>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.bankAccountNumber}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i.bankName.toUpperCase()}</small>
															</div>
														</div>
													</div>
												</td>
                                                <td>
                                                    <div>{i.mobileNumber}</div>
												</td>
												<td>
													<div>{i.membershipDate.format('ll')}</div>
													<div>
														<small className='text-muted'>
															{i.membershipDate.fromNow()}
														</small>
													</div>
												</td>
                                                <td>
													<div>{i.membershipDate.format('ll')}</div>
													<div>
														<small className='text-muted'>
															{i.membershipDate.fromNow()}
														</small>
													</div>
												</td>
												<td>
                                                    <Button
                                                        icon='Visibility'
                                                        onClick={() => navigate(`${i.id}`)}
                                                        color='primary'
                                                        isLight
                                                    >
                                                        {t('view')}
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
			{ isOpenCustomerModal && <CustomerAddModal 
				setIsOpen={setIsOpenCustomerModal} 
				isOpen={Boolean(isOpenCustomerModal)} 
				type={isOpenCustomerModal} 
			/>}
		</PageWrapper>
	)
}

export default Customer
