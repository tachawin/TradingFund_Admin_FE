import React, { useState } from 'react'
import data from '../../../common/data/dummyLevelsData'
import { useTranslation } from 'react-i18next'
import LevelModal from './LevelModal'
import LevelTable from './LevelTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import LevelDeleteModal from './LevelDeleteModal'

export interface LevelModalProperties {
	type: string
	selectedRow: any
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

    const [isOpenDeleteLevelModal, setIsOpenDeleteLevelModal] = useState<LevelModalProperties>()

	return (<>
		<div className='row h-100'>
			<div className='col-12'>
				<LevelTable
					cardHeader={
						<CardHeader>
							<CardLabel>
								<CardTitle>{t('level:level')}</CardTitle>
							</CardLabel>
						</CardHeader>
					}
					data={data} 
					setIsOpenLevelModal={setIsOpenLevelModal}
					setIsOpenDeleteLevelModal={setIsOpenDeleteLevelModal}
				/>
			</div>
		</div>
		{isOpenLevelModal && <LevelModal setIsOpen={setIsOpenLevelModal} isOpen={Boolean(isOpenLevelModal)} properties={isOpenLevelModal} />}
		{isOpenDeleteLevelModal && <LevelDeleteModal setIsOpen={setIsOpenDeleteLevelModal} isOpen={Boolean(isOpenDeleteLevelModal)} properties={isOpenDeleteLevelModal} />}
	</>)
}

export default Level
