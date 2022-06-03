import { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import { SubheaderSeparator } from '../../../layout/SubHeader/SubHeader'
import Button from '../../../components/bootstrap/Button'
import Input from '../../../components/bootstrap/forms/Input'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import CommonTableFilter from 'components/common/CommonTableFilter'
import { BankModalProperties } from './Bank'
import { useDispatch, useSelector } from 'react-redux'
import { storeCompanyBankQuery } from 'redux/companyBank/action'
import moment from 'moment'
import { CompanyBankStatus, CompanyBankType, STATUS, TYPE } from 'common/apis/companyBank'
import { selectCompanyBankQuery } from 'redux/companyBank/selector'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'
import { selectPermission } from 'redux/user/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { SavingsTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface BankFilterInterface {
	searchInput: string
    type: string[]
	status: string[]
	bank: string[]
	createdAtDate: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

interface BankSubHeaderInterface {
	isOpenBankModal?: BankModalProperties
    setIsOpenBankModal: (value: { type: string, selectedRow: any }) => void
}

const BankSubHeader = ({ setIsOpenBankModal }: BankSubHeaderInterface) => {
	const { t } = useTranslation(['common', 'bank'])
	const dispatch = useDispatch()
	const permission = useSelector(selectPermission)

	const [searchInput, setSearchInput] = useState('')
	const companyBankQuery = useSelector(selectCompanyBankQuery)

	const formik = useFormik<BankFilterInterface>({
		initialValues: {
			searchInput: '',
			type: [],
            status: [],
			bank: [],
			createdAtDate: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
		},
		onSubmit: (values) => {
			const queryList = { 
				...companyBankQuery,
				type: values.type.length > 0 ? `type=${values.type.join(',')}` : '',
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
				bank: values.bank.length > 0 ? `bank=${values.bank.join(',')}` : '',
				startCreated: `startCreated=${moment(values.createdAtDate[0].startDate).format('YYYY-MM-DD')}`,
				endCreated: `endCreated=${moment(values.createdAtDate[0].endDate).format('YYYY-MM-DD')}`,
			}
			dispatch(storeCompanyBankQuery(queryList))
		},
	})

	const { 
		values,
		setFieldValue,
		resetForm,
		handleSubmit,
	} = formik

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearchChange = useCallback(
		debounce((value: string) => {
			dispatch(storeCompanyBankQuery({ ...companyBankQuery, keyword: `keyword=${value}` }))
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
		let newValue = values[field as keyof BankFilterInterface] as string[]

		if (isSelected) {
			newValue.push(selectedValue)
		} else {
			newValue.splice(index, 1)
		}
		setFieldValue(field, newValue)
	}

	return (<>
		<label
			className='border-0 bg-transparent cursor-pointer me-0'
			htmlFor='searchInput'>
			<Search fontSize='medium' htmlColor={COLORS.PRIMARY.code} />
		</label>
		<Input
			id='searchInput'
			type='search'
			className='border-0 shadow-none bg-transparent'
			placeholder={t('bank:search.bank') + '...'}
			onChange={handleSearchChange}
			value={searchInput}
		/>
		<CommonTableFilter
			resetLabel={t('filter.reset')}
			onReset={resetForm}
			submitLabel={t('filter')}
			onSubmit={handleSubmit}
			filters={[
				{
					label: t('filter.payment.type'),
					children: <div>
						{TYPE.map((type: CompanyBankType) => {
							let index = values.type.indexOf(type)
							return <Checks
									key={type}
									label={type}
									name={type}
									value={index}
									onChange={(e) => handleOnChangeMultipleSelector(e, 'type')}
									checked={index > -1}
									ariaLabel={type}
								/>
							}
						)}
					</div>
				},
				{
					label: t('filter.bank'),
					children: <CommonBanksDropdown 
						selectedBankName={values.bank}
						setSelectedBankName={(bank: string | string[]) => setFieldValue('bank', bank)}
						multipleSelect
					/>
				},
				{
					label: t('filter.status'),
					children: <div>
						{STATUS.map((status: string) => {
							let indexInStatusFilter = values.status.indexOf(status)
							return <Checks
									key={status}
									label={status === CompanyBankStatus.Active ? t('active') : t('inactive')}
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
			]} 
		/>
		{permission.bank[PermissionType.Create] === PermissionValue.Available && <>
			<SubheaderSeparator />
			<Button
				className='text-nowrap'
				icon={SavingsTwoTone}
				color='primary'
				isLight
				onClick={() => setIsOpenBankModal({ type: "add", selectedRow: undefined})}
			>
				{t('bank:add.bank')}
			</Button>
		</>}
	</>)
}

export default BankSubHeader