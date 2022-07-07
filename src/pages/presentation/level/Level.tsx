import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LevelModal from './LevelModal'
import LevelTable from './LevelTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import LevelDeleteModal from './LevelDeleteModal'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanyLevelQuery, selectLevels } from 'redux/level/selector'
import { getLevelList, LevelInterface } from 'common/apis/level'
import { storeLevels } from 'redux/level/action'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone } from '@mui/icons-material'
import LevelSubHeader from './LevelSubHeader'
import { CommonString } from 'common/data/enumStrings'
import { PermissionType, PermissionValue } from 'common/apis/user'

export interface LevelModalProperties {
	type: string
	selectedRow?: LevelInterface
}

export interface LevelModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: LevelModalProperties
}

export interface LevelProps {
	isOpenLevelModal?: LevelModalProperties
	setIsOpenLevelModal: (properties: LevelModalProperties) => void
}

const Level = ({ isOpenLevelModal, setIsOpenLevelModal }: LevelProps) => {
    const { t } = useTranslation(['common', 'level'])
	const dispatch = useDispatch()

	const [isLoading, setIsLoading] = useState(false)
    const [isOpenDeleteLevelModal, setIsOpenDeleteLevelModal] = useState<LevelModalProperties>()

	const permission = JSON.parse(localStorage.getItem('features') ?? '')
    const readPermission = permission.level[PermissionType.Read] === PermissionValue.Available
	
	const levels = useSelector(selectLevels)
	const queryList = useSelector(selectCompanyLevelQuery)

	useEffect(() => {
		let queryString = Object.values(queryList).filter(Boolean).join('&')
		let query = queryString ? `?${queryString}` : ''
		getLevelList(query, (levelList: LevelInterface[]) => {
			dispatch(storeLevels(levelList))
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>ไม่สามารถเรียกดูระดับขั้นได้</span>
				</span>,
				CommonString.TryAgain,
			)
		}).finally(() => setIsLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [queryList])

	return (<>
		<div className='row'>
			<div className={`col-12 ${isLoading ? 'd-flex align-items-center justify-content-center' : 'px-4'}`}>
				{isLoading ? <Spinner color='info' isGrow size={60} /> 
					: <LevelTable
						cardHeader={
							<>
								{readPermission && <LevelSubHeader isOpenLevelModal={isOpenLevelModal} setIsOpenLevelModal={setIsOpenLevelModal}  />}
								<CardHeader>
									<CardLabel>
										<CardTitle>{t('level')}</CardTitle>
									</CardLabel>
								</CardHeader>
							</>
						}
						data={levels} 
						setIsOpenLevelModal={setIsOpenLevelModal}
						setIsOpenDeleteLevelModal={setIsOpenDeleteLevelModal}
					/>
				}
			</div>
		</div>
		{isOpenLevelModal && <LevelModal setIsOpen={setIsOpenLevelModal} isOpen={Boolean(isOpenLevelModal)} properties={isOpenLevelModal} />}
		{isOpenDeleteLevelModal && <LevelDeleteModal setIsOpen={setIsOpenDeleteLevelModal} isOpen={Boolean(isOpenDeleteLevelModal)} properties={isOpenDeleteLevelModal} />}
	</>)
}

export default Level
