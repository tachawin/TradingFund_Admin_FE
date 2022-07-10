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
import { CompanyBankStatus, CompanyBankType, STATUS, TYPE } from 'common/apis/companyBank'
import { selectCompanyBankQuery } from 'redux/companyBank/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { SavingsTwoTone, Search } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface BankFilterInterface {
	searchInput: string
    type: string[]
	status: string[]
}

interface BankSubHeaderInterface {
	isOpenBankModal?: BankModalProperties
    setIsOpenBankModal: (value: { type: string, selectedRow: any }) => void
}

const BankSubHeader = ({ setIsOpenBankModal }: BankSubHeaderInterface) => {
	const { t } = useTranslation(['common', 'bank'])
	const dispatch = useDispatch()
	const permission = JSON.parse(localStorage.getItem('features') ?? '')

	const [searchInput, setSearchInput] = useState('')
	const companyBankQuery = useSelector(selectCompanyBankQuery)

	const formik = useFormik<BankFilterInterface>({
		initialValues: {
			searchInput: '',
			type: [],
            status: [],
		},
		onSubmit: (values) => {
			const queryList = { 
				...companyBankQuery,
				type: values.type.length > 0 ? `type=${values.type.join(',')}` : '',
				status: values.status.length > 0 ? `status=${values.status.join(',')}` : '',
			}
			dispatch(storeCompanyBankQuery(queryList))
		},
	})

	const { 
		values,
		setFieldValue,
		initialValues,
		setValues,
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
			onReset={() => setValues({ ...initialValues, type: [], status: [] })}
			submitLabel={t('filter')}
			onSubmit={handleSubmit}
			filters={[
				{
					label: t('filter.payment.type'),
					children: <div>
						{TYPE.map((type: CompanyBankType) => {
							const index = values.type.indexOf(type)
							const label = type === CompanyBankType.Deposit ? t('deposit') : 
											type === CompanyBankType.DepositAndWithdraw ? t('deposit.and.withdraw') : t('withdraw')
							return <Checks
									key={type}
									label={label}
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