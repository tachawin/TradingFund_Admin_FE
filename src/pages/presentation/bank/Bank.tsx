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

export interface BankModalProperties {
	type: string
	selectedRow: any
}

export interface BankModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: BankModalProperties
}


export interface BankProps {
	isOpenBankModal?: BankModalProperties
	setIsOpenBankModal: (properties: BankModalProperties) => void
}

const Bank = ({ isOpenBankModal, setIsOpenBankModal }: BankProps) => {
    const { t } = useTranslation(['common', 'bank'])

	const [isOpenDeleteBankModal, setIsOpenDeleteBankModal] = useState<BankModalProperties>()

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
