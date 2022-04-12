import { ChangeEvent, MouseEvent, useCallback, useState } from 'react'
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
import data from '../../../common/data/dummyAdminData'
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import useSortableData from '../../../hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import AdminEditModal from './AdminEditModal'
import AdminDeleteModal from './AdminDeleteModal'
import AdminPermissionModal from './AdminPermissionModal'
import CommonTableFilter from 'components/common/CommonTableFilter'

const mockPermission = { 
    report: '0011',
    customer: '1001',
    deposit: '0000',
    withdraw: '1111',
    bank: '1111',
    reward: '1011',
    credit: '0101',
    chat: '0001',
    product: '1100'
}

interface AdminRowAction {
	icon: string,
	onClick: (value?: number) => void,
	title: string
}

const Admin = () => {
    const { t } = useTranslation(['common', 'admin'])

	const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const [isOpenDropdown, setIsOpenDropdown] = useState<number | null>(null)
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isOpenAdminModal, setIsOpenAdminModal] = useState<"add" | "edit">()
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
	const [isOpenPermissionModal, setIsOpenPermissionModal] = useState(false)
	const [selectedRowData, setSelectedRowData] = useState<any>()

	const ADMIN_ROW_ACTIONS: AdminRowAction[] = [
		{
			icon: 'Edit',
			onClick: () => setIsOpenAdminModal('edit'),
			title: t('edit')
		},
		{
			icon: 'Visibility',
			onClick: () => setIsOpenPermissionModal(true),
			title: t('admin:grant.permission')
		},
		{
			icon: 'Delete',
			onClick: () => setIsOpenDeleteModal(true),
			title: t('delete')
		}
	]

	const formik = useFormik({
		initialValues: {
			searchInput: '',
			available: false,
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

	const handleOnDropdownClick = (onClick: (value?: number) => void, data: any) => {
		setIsOpenDropdown(null)
		setSelectedRowData(data)
		onClick()
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
						placeholder={t('admin:search.admin') + '...'}
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
								children: <Checks
									id='available'
									type='switch'
									label={values.available ? t('active') : t('inactive')}
									onChange={handleChange}
									checked={values.available}
									ariaLabel='Available status'
								/>
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
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenUpdatedAtDatePicker)} setIsOpen={setIsOpenUpdatedAtDatePicker}>
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
							}
						]} 
					/>
					<SubheaderSeparator />
					<Button
						icon='PersonAdd'
						color='primary'
						isLight
						onClick={() => setIsOpenAdminModal('add')}
					>
						{t('admin:new.admin')}
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
												onClick={() => requestSort('username')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.username')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('username')}
													icon='FilterList'
												/>
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
											<th>{t('column.mobile.number')}</th>
											<th
												onClick={() => requestSort('updatedAt')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.updated.at')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('updatedAt')}
													icon='FilterList'
												/>
											</th>
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
												onClick={() => requestSort('status')}
												className='cursor-pointer text-decoration-underline'>
												{t('column.status')}{' '}
												<Icon
													size='lg'
													className={getClassNamesFor('status')}
													icon='FilterList'
												/>
											</th>
											<td />
										</tr>
									</thead>
									<tbody>
										{dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
											<tr key={i.id}>
                                                <td>
                                                    <div>{index + 1}</div>
												</td>
                                                <td>
                                                    <div>{i.username}</div>
												</td>
												<td>
													<div className='d-flex align-items-center'>
														<div className='flex-grow-1'>
															<div className='fs-6 fw-bold'>
																{i.name}
															</div>
															<div className='text-muted'>
																<Icon icon='Label' />{' '}
																<small>{i.role}</small>
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
													<div className='d-flex align-items-center'>
														{ i.status === 1 ?
															<>
																<span className='badge border border-2 border-light rounded-circle bg-success p-2 me-2'>
																	<span className='visually-hidden'>
																		Active status
																	</span>
																</span>
																<span>{t('active')}</span>
															</> : <>
																<span className='badge border border-2 border-light rounded-circle bg-l25-dark p-2 me-2'>
																	<span className='visually-hidden'>
																		Inacctive status
																	</span>
																</span>
																<span>{t('inactive')}</span>
															</>
														}
													</div>
												</td>
												<td>
													<Dropdown>
														<DropdownToggle 
                                                            hasIcon={false} 
                                                            isOpen={Boolean(isOpenDropdown)} 
                                                            setIsOpen={setIsOpenDropdown}
                                                            index={index}
															icon='MoreHoriz'
															color='dark'
															isLight
                                                        />
														<DropdownMenu isAlignmentEnd isOpen={isOpenDropdown === index} setIsOpen={setIsOpenDropdown}>
															{ADMIN_ROW_ACTIONS.map((action: AdminRowAction, index: number) => 
																<DropdownItem key={index}>
																	<Button
																		icon={action.icon}
																		onClick={(e: MouseEvent<HTMLButtonElement>) => handleOnDropdownClick(action.onClick, i)}
																	>
																		{action.title}
																	</Button>
																</DropdownItem>
															)}
															
														</DropdownMenu>
													</Dropdown>
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
			<AdminEditModal setIsOpen={setIsOpenAdminModal} isOpen={Boolean(isOpenAdminModal)} type={isOpenAdminModal} data={selectedRowData} />
			<AdminPermissionModal setIsOpen={setIsOpenPermissionModal} isOpen={Boolean(isOpenPermissionModal)} id={selectedRowData?.id} name={selectedRowData?.name} permissions={mockPermission} />
			<AdminDeleteModal setIsOpen={setIsOpenDeleteModal} isOpen={Boolean(isOpenDeleteModal)} data={selectedRowData} />
		</PageWrapper>
	)
}

export default Admin
