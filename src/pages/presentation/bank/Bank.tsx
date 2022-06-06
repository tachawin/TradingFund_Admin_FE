import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import BankModal from './BankModal'
import BankTable from './BankTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import BankDeleteModal from './BankDeleteModal'
import { CompanyBankInterface, getCompanyBankList } from 'common/apis/companyBank'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanyBankList, selectCompanyBankQuery } from 'redux/companyBank/selector'
import { storeCompanyBank } from 'redux/companyBank/action'
import { InfoTwoTone } from '@mui/icons-material'

export interface BankModalProperties {
	type: string
	selectedRow?: CompanyBankInterface
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
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(true)
	const [isOpenDeleteBankModal, setIsOpenDeleteBankModal] = useState<BankModalProperties>()

	const data = useSelector(selectCompanyBankList)
	const queryList = useSelector(selectCompanyBankQuery)

	useEffect(() => {
		let queryString = Object.values(queryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		getCompanyBankList(query, (companyBankList: CompanyBankInterface[]) => {
			dispatch(storeCompanyBank(companyBankList))
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.company.bank.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryList])

	return (<>
		<div className='row h-100'>
			<div className={`col-12 ${(isLoading || !data) ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
				{isLoading ? <Spinner color='info' isGrow size={60} />
					: <BankTable
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
				}
			</div>
		</div>
		{isOpenBankModal && <BankModal setIsOpen={setIsOpenBankModal} isOpen={Boolean(isOpenBankModal)} properties={isOpenBankModal} />}
		{isOpenDeleteBankModal && <BankDeleteModal setIsOpen={setIsOpenDeleteBankModal} isOpen={Boolean(isOpenDeleteBankModal)} properties={isOpenDeleteBankModal} />}
	</>)
}

export default Bank
