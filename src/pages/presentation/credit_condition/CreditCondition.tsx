import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import CreditConditionModal, { CreditConditionModalType } from './CreditConditionModal'
import CreditConditionTable from './CreditConditionTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import CreditConditionDeleteModal from './CreditConditionDeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { selectCreditConditionQuery, selectCreditConditions } from 'redux/creditCondition/selector'
import { getCreditConditionList, CreditConditionInterface } from 'common/apis/creditCondition'
import { storeCreditConditions } from 'redux/creditCondition/action'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone } from '@mui/icons-material'
import CreditConditionSubHeader from './CreditConditionSubHeader'

export interface CreditConditionModalProperties {
	type: CreditConditionModalType
	selectedRow?: CreditConditionInterface
}

export interface CreditConditionModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: CreditConditionModalProperties
}

export interface CreditConditionProps {
	isOpenCreditConditionModal?: CreditConditionModalProperties
	setIsOpenCreditConditionModal: (properties: CreditConditionModalProperties) => void
}

const CreditCondition = ({ isOpenCreditConditionModal, setIsOpenCreditConditionModal }: CreditConditionProps) => {
    const { t } = useTranslation(['common', 'creditCondition'])
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
    const [isOpenDeleteCreditConditionModal, setIsOpenDeleteCreditConditionModal] = useState<CreditConditionModalProperties>()
	
	const creditConditions = useSelector(selectCreditConditions)
	const queryList = useSelector(selectCreditConditionQuery)

	useEffect(() => {
		let queryString = Object.values(queryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		getCreditConditionList(query, (creditConditionList: CreditConditionInterface[]) => {
			dispatch(storeCreditConditions(creditConditionList))
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.bank.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		}).finally(() => setIsLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryList])

	return (<>
		<div className='row'>
			<div className={`col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
				{isLoading ? <Spinner color='info' isGrow size={60} /> 
					: <CreditConditionTable
						cardHeader={
							<>
								<CreditConditionSubHeader isOpenCreditConditionModal={isOpenCreditConditionModal} setIsOpenCreditConditionModal={setIsOpenCreditConditionModal}  />
								<CardHeader>
									<CardLabel>
										<CardTitle>{t('creditCondition:creditCondition')}</CardTitle>
									</CardLabel>
								</CardHeader>
							</>
						}
						data={creditConditions} 
						setIsOpenCreditConditionModal={setIsOpenCreditConditionModal}
						setIsOpenDeleteCreditConditionModal={setIsOpenDeleteCreditConditionModal}
					/>
				}
			</div>
		</div>
		{isOpenCreditConditionModal && <CreditConditionModal setIsOpen={setIsOpenCreditConditionModal} isOpen={Boolean(isOpenCreditConditionModal)} properties={isOpenCreditConditionModal} />}
		{isOpenDeleteCreditConditionModal && <CreditConditionDeleteModal setIsOpen={setIsOpenDeleteCreditConditionModal} isOpen={Boolean(isOpenDeleteCreditConditionModal)} properties={isOpenDeleteCreditConditionModal} />}
	</>)
}

export default CreditCondition
