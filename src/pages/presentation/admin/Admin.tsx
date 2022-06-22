import { ChangeEvent, useCallback, useEffect, useState } from 'react'
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
import { CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import Button from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import AdminEditModal, { AdminModalType } from './components/AdminEditModal'
import AdminDeleteModal from './components/AdminDeleteModal'
import AdminPermissionModal from './components/AdminPermissionModal'
import CommonTableFilter from 'components/common/CommonTableFilter'
import AdminTable from './components/AdminTable'
import { AdminInterface, AdminRole, AdminStatus, getAdminList, ROLES, STATUS } from 'common/apis/admin'
import Spinner from 'components/bootstrap/Spinner'
import showNotification from 'components/extras/showNotification'
import 'moment/locale/th'
import { useDispatch, useSelector } from 'react-redux'
import { selectAdmins } from 'redux/admin/selector'
import { storeAdmins } from 'redux/admin/action'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { InfoTwoTone, PersonAddAlt1TwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'
import { CommonString } from 'common/data/enumStrings'

interface AdminModalProperties {
	type?: AdminModalType
	selectedRow?: any
}

interface AdminFilterInterface {
	status: string[]
	roles: string[]
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
	isCreatedAtDateChanged: boolean
	isUpdatedAtDateChanged: boolean
}

const Admin = () => {
    const { t } = useTranslation(['common', 'admin'])
	const dispatch = useDispatch()
	const admins = useSelector(selectAdmins)
	const permission = JSON.parse(localStorage.getItem('features') ?? '')

	const [isLoading, setIsLoading] = useState(true)
	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isOpenAdminModal, setIsOpenAdminModal] = useState<AdminModalProperties>()
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<AdminModalProperties>()
	const [isOpenPermissionModal, setIsOpenPermissionModal] = useState<AdminModalProperties>()
	const [queryList, setQueryList] = useState<{ [key: string]: string }>({
		status: '',
		role: '',
		startCreated: '',
		endCreated: '',
		startUpdated: '',
		endUpdated: ''
	})

	const formik = useFormik<AdminFilterInterface>({
		initialValues: {
			status: [],
			roles: [],
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
			],
			isCreatedAtDateChanged: false,
			isUpdatedAtDateChanged: false
		},
		onSubmit: (values) => {
			setQueryList({ 
				...queryList,
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
				role: values.roles.length > 0 ? `role=${values.roles.join(',')}` : '',
				startCreated: values.isCreatedAtDateChanged ? `startCreated=${moment(values.createdAtDate[0].startDate).format('YYYY-MM-DD')}` : '',
				endCreated: values.isCreatedAtDateChanged ?`endCreated=${moment(values.createdAtDate[0].endDate).format('YYYY-MM-DD')}` : '',
				startUpdated: values.isUpdatedAtDateChanged ? `startUpdated=${moment(values.updatedAtDate[0].startDate).format('YYYY-MM-DD')}` : '',
				endUpdated: values.isUpdatedAtDateChanged ? `endUpdated=${moment(values.updatedAtDate[0].endDate).format('YYYY-MM-DD')}` : ''
			})
		},
	})

	const { 
		values,
		setFieldValue,
		resetForm,
		handleSubmit,
		handleChange
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
			setQueryList({ ...queryList, keyword: `keyword=${value}` })
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
		let newValue = values[field as keyof AdminFilterInterface] as string[]

		if (isSelected) {
			newValue.push(selectedValue)
		} else {
			newValue.splice(index, 1)
		}
		setFieldValue(field, newValue)
	}

	useEffect(() => {
		let queryString = Object.values(queryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		getAdminList(query, (adminList: AdminInterface[]) => {
			dispatch(storeAdmins(adminList))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>ไม่สามารถเรียกดูแอดมินได้</span>
				</span>,
				CommonString.TryAgain,
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryList])

	return (
		<PageWrapper title={demoPages.crm.subMenu.customersList.text}>
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
								children: <div>
									{STATUS.map((status: string) => {
										let indexInStatusFilter = values.status.indexOf(status)
										return <Checks
												key={status}
												label={status === AdminStatus.Active ? t('active') : t('inactive')}
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
												{`${moment(values.createdAtDate[0].startDate).format('MMM Do YY')} - ${moment(
													values.createdAtDate[0].endDate,
												).format('MMM Do YY')}`}
											</span>
										</DropdownToggle>
										<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
											{datePicker(values.createdAtDate, 'createdAtDate')}
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
									{values.isUpdatedAtDateChanged && <Dropdown className='mt-2'>
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
									</Dropdown>}
								</div>
							},
							{
								label: t('filter.role'),
								children: <div>
									{ROLES.map((role: string) => {
										let indexInRoleFilter = values.roles.indexOf(role)
										return <Checks
												key={role}
												label={role === AdminRole.Admin ? t('admin:admin') : t('admin:super.admin') }
												name={role}
												value={indexInRoleFilter}
												onChange={(e) => handleOnChangeMultipleSelector(e, 'roles')}
												checked={indexInRoleFilter > -1}
												ariaLabel={role}
											/>
										}
									)}
								</div>
							},
						]} 
					/>
					{permission.adminManage[PermissionType.Create] === PermissionValue.Available && <>
						<SubheaderSeparator />
						<Button
							icon={PersonAddAlt1TwoTone}
							color='primary'
							isLight
							onClick={() => setIsOpenAdminModal({ type: AdminModalType.Add })}
						>
							{t('admin:new.admin')}
						</Button>
					</>}
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className={`col-12 ${(isLoading || !admins) ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
						{isLoading ? <Spinner color='info' isGrow size={60} /> 
							: <AdminTable 
								cardHeader={
									<CardHeader>
										<CardLabel>
											<CardTitle>{t('admin')}</CardTitle>
										</CardLabel>
									</CardHeader>
								}
								data={admins} 
								setIsOpenAdminModal={setIsOpenAdminModal}
								setIsOpenDeleteModal={setIsOpenDeleteModal}
								setIsOpenPermissionModal={setIsOpenPermissionModal}
							/>
						}
					</div>
				</div>
			</Page>
			{isOpenAdminModal && <AdminEditModal setIsOpen={setIsOpenAdminModal} isOpen={Boolean(isOpenAdminModal)} properties={isOpenAdminModal} />}
			<AdminPermissionModal setIsOpen={setIsOpenPermissionModal} isOpen={Boolean(isOpenPermissionModal)} id={isOpenPermissionModal?.selectedRow?.adminId} name={isOpenPermissionModal?.selectedRow?.name} permissions={isOpenPermissionModal?.selectedRow?.features} />
			<AdminDeleteModal setIsOpen={setIsOpenDeleteModal} isOpen={Boolean(isOpenDeleteModal)} data={isOpenDeleteModal?.selectedRow} />
		</PageWrapper>
	)
}

export default Admin
