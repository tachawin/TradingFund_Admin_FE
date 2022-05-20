import { getLevelList, LevelInterface } from 'common/apis/level'
import Button from 'components/bootstrap/Button'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { Check } from 'components/icon/bootstrap'
import Icon from 'components/icon/Icon'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLevels } from 'redux/level/selector'
import { storeLevels } from 'redux/level/action'
import showNotification from 'components/extras/showNotification'
import { useTranslation } from 'react-i18next'
import Spinner from 'components/bootstrap/Spinner'

interface CommonLevelsDropdownInterface {
    selectedLevel: LevelInterface | LevelInterface[] | string
    setSelectedLevel: (value: LevelInterface | LevelInterface[]) => void
    disabled?: boolean
    multipleSelect?: boolean
}

const CommonLevelsDropdown = ({ selectedLevel, setSelectedLevel, disabled = false, multipleSelect = false }: CommonLevelsDropdownInterface) => {
    const { t } = useTranslation('level')
    const dispatch = useDispatch()
    const levels = useSelector(selectLevels)
    const [isLoading, setIsLoading] = useState(true)

    const [isOpenLevelDropdown, setIsOpenLevelDropdown] = useState(false)
    const LEVEL_PLACEHOLDER = 'เลือกขั้น'

    const handleOnChangeMultipleLevels = (level: LevelInterface) => {
        let index = (selectedLevel as LevelInterface[]).indexOf(level)
        let isLevelSelected = index > -1
        let newValue = selectedLevel as LevelInterface[]

        if (isLevelSelected) {
            newValue.splice(index, 1)
        } else {
            newValue.push(level)
        }
        setSelectedLevel(newValue)
	}

    useEffect(() => {
		levels.length === 0 && getLevelList('', (levelList: LevelInterface[]) => {
			dispatch(storeLevels(levelList))
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('get.bank.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		}).finally(() => setIsLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
    
    return (
        <Dropdown>
            {multipleSelect ? <DropdownToggle
                className={{ 'd-flex': true, 'align-items-center': true, 'w-100': true }}
                isLight 
                color='dark' 
                isOpen={Boolean(isOpenLevelDropdown)} 
                setIsOpen={setIsOpenLevelDropdown}
                disabled={disabled}
            >
                <span
                    style={{ maxWidth: '172px' }}
                    className={`${multipleSelect ? 'm-0' : 'mx-3'} d-block text-nowrap overflow-hidden text-overflow-ellipsis`}
                >
                    {(selectedLevel as LevelInterface[]).map((level) => level.levelName).join(', ') || LEVEL_PLACEHOLDER}
                </span>
            </DropdownToggle> : <DropdownToggle
                className={{ 'd-flex': true, 'align-items-center': true, 'w-100': true }}
                isLight 
                color='dark' 
                isOpen={Boolean(isOpenLevelDropdown)} 
                setIsOpen={setIsOpenLevelDropdown}
                disabled={disabled}
            >
                {selectedLevel !== LEVEL_PLACEHOLDER && 
                    <span className='p-1'>
                        <Icon icon='StarFill' />
                    </span>
                }
                <span
                    style={{ maxWidth: '172px' }}
                    className='mx-3 d-block text-nowrap overflow-hidden text-overflow-ellipsis'
                >
                    {(selectedLevel as LevelInterface).levelId}
                </span>
            </DropdownToggle>}
            <DropdownMenu
                className='overflow-scroll'
                height='200px'
                isOpen={Boolean(isOpenLevelDropdown)} 
                setIsOpen={setIsOpenLevelDropdown}
            >
                {!isLoading ? (levels && levels.map((level: LevelInterface) => 
                    <DropdownItem key={level.levelId}>
                        <Button
                            color='link'
                            isActive={!multipleSelect && level === selectedLevel }
                            onClick={() => multipleSelect ? handleOnChangeMultipleLevels(level) : setSelectedLevel(level)}
                        >
                            <Icon icon='StarFill' style={{ fill: level.color, marginRight: 0 }} />
                            <span className='mx-3 mw-75'>{level.levelName}</span>
                            {(multipleSelect && (selectedLevel as LevelInterface[]).indexOf(level) > -1) && <Check />}
                        </Button>
                    </DropdownItem>
                )) : <div key='loading' className='d-flex justify-content-center'>
                    <Spinner color='primary' size={16} />
                </div>}
            </DropdownMenu>
        </Dropdown>
  )
}

export default CommonLevelsDropdown