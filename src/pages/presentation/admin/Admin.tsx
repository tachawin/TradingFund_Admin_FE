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
import { CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import data from '../../../common/data/dummyAdminData'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
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

interface AdminModalProperties {
	type?: AdminModalType
	selectedRow?: any
}

const Admin = () => {
    const { t } = useTranslation(['common', 'admin'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
	const [isOpenAdminModal, setIsOpenAdminModal] = useState<AdminModalProperties>()
	const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<AdminModalProperties>()
	const [isOpenPermissionModal, setIsOpenPermissionModal] = useState<AdminModalProperties>()

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
						onClick={() => setIsOpenAdminModal({ type: AdminModalType.Add })}
					>
						{t('admin:new.admin')}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<AdminTable 
							cardHeader={
                                <CardHeader>
                                    <CardLabel>
                                        <CardTitle>{t('admin')}</CardTitle>
                                    </CardLabel>
                                </CardHeader>
                            }
                            data={data} 
                            setIsOpenAdminModal={setIsOpenAdminModal}
							setIsOpenDeleteModal={setIsOpenDeleteModal}
							setIsOpenPermissionModal={setIsOpenPermissionModal}
						/>
					</div>
				</div>
			</Page>
			{isOpenAdminModal && <AdminEditModal setIsOpen={setIsOpenAdminModal} isOpen={Boolean(isOpenAdminModal)} properties={isOpenAdminModal} />}
			<AdminPermissionModal setIsOpen={setIsOpenPermissionModal} isOpen={Boolean(isOpenPermissionModal)} id={isOpenPermissionModal?.selectedRow.id} name={isOpenPermissionModal?.selectedRow.name} permissions={mockPermission} />
			<AdminDeleteModal setIsOpen={setIsOpenDeleteModal} isOpen={Boolean(isOpenDeleteModal)} data={isOpenDeleteModal?.selectedRow} />
		</PageWrapper>
	)
}

export default Admin
