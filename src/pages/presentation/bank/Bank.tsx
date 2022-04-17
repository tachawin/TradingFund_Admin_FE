import { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { pages } from '../../../menu'
import data from '../../../common/data/dummyBankData'
import Button from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import BankModal from './BankModal'
import CommonTableFilter from 'components/common/CommonTableFilter'
import BankTable from './BankTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import BankDeleteModal from './BankDeleteModal'

interface BankFilterInterface {
	searchInput: string
    paymentType: string[]
	isActive: boolean
	bank: string[]
}

export interface BankModalProperties {
	type: string
	selectedRow: any
}

interface BankDeleteModalProperties {
	selectedRow: any
}

interface BankProps {
	isOpenBankModal?: BankModalProperties
	setIsOpenBankModal: (properties: BankModalProperties) => void
}

export const BankSubHeader = ({ setIsOpenBankModal }: BankProps) => {
	const { t } = useTranslation(['common', 'bank'])

	const PAYMENT_TYPE = [
        {
            id: 0,
            name: t('deposit')
        },
        {
            id: 0,
            name: t('withdraw')
        }
    ]

	const [searchInput, setSearchInput] = useState('')

	const formik = useFormik<BankFilterInterface>({
		initialValues: {
			searchInput: '',
			paymentType: [],
            isActive: false,
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
		handleSubmit,
	} = formik

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
			<Icon icon='Search' size='2x' color='primary' />
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
						{PAYMENT_TYPE.map((paymentType: any) => {
							let index = values.paymentType.indexOf(paymentType.name)
							return <Checks
									key={paymentType.id}
									label={paymentType.name}
									name={paymentType.name}
									value={index}
									onChange={(e) => handleOnChangeMultipleSelector(e, 'paymentType')}
									checked={index > -1}
									ariaLabel={paymentType.name}
								/>
							}
						)}
					</div>
				},
				{
					label: t('filter.bank'),
					children: <div>
						{data.map((bank: any) => {
							let indexInBankFilter = values.bank.indexOf(bank.label)
							return <Checks
									key={bank.id}
									label={bank.label}
									name={bank.label}
									value={indexInBankFilter}
									onChange={(e) => handleOnChangeMultipleSelector(e, 'bank')}
									checked={indexInBankFilter > -1}
									ariaLabel={bank.label}
								/>
							}
						)}
					</div>
				},
				{
					label: t('filter.status'),
					children: <Checks
						id='isActive'
						type='switch'
						label={values.isActive ? t('active') : t('inactive')}
						onChange={handleChange}
						checked={values.isActive}
						ariaLabel='Available status'
					/>
				},
			]} 
		/>
		<SubheaderSeparator />
		<Button
			className='text-nowrap'
			icon='PiggyBank'
			color='primary'
			isLight
			onClick={() => setIsOpenBankModal({ type: "add", selectedRow: null})}
		>
			{t('bank:add.bank')}
		</Button>
	</>)
}

const Bank = ({ isOpenBankModal, setIsOpenBankModal }: BankProps) => {
    const { t } = useTranslation(['common', 'bank'])

	const [isOpenDeleteBankModal, setIsOpenDeleteBankModal] = useState<BankDeleteModalProperties>()

	return (<>
		<div className='row h-100'>
			<div className='col-12'>
				<BankTable
					cardHeader={
						<CardHeader>
							<CardLabel>
								<CardTitle>{t('bank')}</CardTitle>
							</CardLabel>
						</CardHeader>
					}
					data={data} 
					setIsOpenBankModal={setIsOpenBankModal}
					setIsOpenDeleteBankModal={setIsOpenDeleteBankModal}
					columns={{ mobileNumber: true, notes: true }} 
				/>
			</div>
		</div>
		{isOpenBankModal && <BankModal setIsOpen={setIsOpenBankModal} isOpen={Boolean(isOpenBankModal)} properties={isOpenBankModal} />}
		{isOpenDeleteBankModal && <BankDeleteModal setIsOpen={setIsOpenDeleteBankModal} isOpen={Boolean(isOpenDeleteBankModal)} properties={isOpenDeleteBankModal} />}
	</>)
}

export default Bank
