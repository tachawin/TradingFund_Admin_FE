import React, { useEffect, useState } from 'react'
import bankIcons from 'common/banks'
import Button from 'components/bootstrap/Button'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { selectCommonBanksList } from 'redux/bank/selector'
import { getCommonBanks, CommonBankInterface } from 'common/apis/commonBank'
import { storeBank } from 'redux/bank/action'
import showNotification from 'components/extras/showNotification'
import { useTranslation } from 'react-i18next'
import Spinner from 'components/bootstrap/Spinner'
import { Check, InfoTwoTone } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface CommonBanksDropdownInterface {
    selectedBankName: string | string[]
    setSelectedBankName: (value: string | string[]) => void
    disabled?: boolean
    multipleSelect?: boolean
}

const CommonBanksDropdown = ({ selectedBankName, setSelectedBankName, disabled = false, multipleSelect = false }: CommonBanksDropdownInterface) => {
    const { t } = useTranslation('bank')
    const dispatch = useDispatch()

    const [isOpenBankDropdown, setIsOpenBankDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const BANK_PLACEHOLDER = 'เลือกชื่อธนาคาร'

    const BankIcon = bankIcons[selectedBankName as string]?.icon

    const commonBankList = useSelector(selectCommonBanksList)
    
    const handleOnChangeMultipleBanks = (bank: string) => {
        let index = selectedBankName.indexOf(bank)
        let isBankSelected = index > -1
        let newValue = selectedBankName as string[]

        if (isBankSelected) {
            newValue.splice(index, 1)
        } else {
            newValue.push(bank)
        }
        setSelectedBankName(newValue)
	}

    useEffect(() => {
        getCommonBanks((commonBankList: CommonBankInterface) => {
            dispatch(storeBank(commonBankList))
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
	}, [])

    return (
        <Dropdown>
            {multipleSelect ? <DropdownToggle
                className={{ 'd-flex': true, 'align-items-center': true, 'w-100': true }}
                isLight 
                color='dark' 
                isOpen={Boolean(isOpenBankDropdown)} 
                setIsOpen={setIsOpenBankDropdown}
                disabled={disabled}
            >
                <span
                    style={{ maxWidth: '172px' }}
                    className={`${ multipleSelect ? 'm-0' : 'mx-3' } d-block text-nowrap overflow-hidden text-overflow-ellipsis`}
                >
                    {(selectedBankName as string[]).map((bank) => bank.toUpperCase()).join(', ') || BANK_PLACEHOLDER}
                </span>
            </DropdownToggle> : <DropdownToggle
                className={{ 'd-flex': true, 'align-items-center': true, 'w-100': true }}
                isLight 
                color='dark' 
                isOpen={Boolean(isOpenBankDropdown)} 
                setIsOpen={setIsOpenBankDropdown}
                disabled={disabled}
            >
                {selectedBankName !== BANK_PLACEHOLDER && <>
                    <span className='p-1' style={{ backgroundColor: bankIcons[selectedBankName as string].color, borderRadius: 3 }}>
                        <BankIcon height={20} width={20} />
                    </span>
                    <span
                        style={{ maxWidth: '172px' }}
                        className='mx-3 d-block text-nowrap overflow-hidden text-overflow-ellipsis'
                    >
                        {commonBankList && commonBankList[selectedBankName as string]?.thaiName}
                    </span>
                </>}
            </DropdownToggle>}
            <DropdownMenu
                className='overflow-scroll'
                height='200px'
                isOpen={Boolean(isOpenBankDropdown)} 
                setIsOpen={setIsOpenBankDropdown}
            >
                {!isLoading ? commonBankList && Object.keys(commonBankList).map((bank: string) => { 
                    const BankIcon = bankIcons[bank].icon
                    return <DropdownItem key={bank}>
                        <Button
                            color='link'
                            isActive={!multipleSelect && bank === selectedBankName}
                            onClick={() => multipleSelect ? handleOnChangeMultipleBanks(bank) : setSelectedBankName(bank)}
                        >
                            <div className='p-1' style={{ backgroundColor: bankIcons[bank].color, borderRadius: 3 }}>
                                <BankIcon height={20} width={20} />
                            </div>
                            <span className='mx-3 mw-75'>{commonBankList[bank].thaiName}</span>
                            {(multipleSelect && selectedBankName.indexOf(bank) > -1) && <Check htmlColor={COLORS.PRIMARY.code} />}
                        </Button>
                    </DropdownItem>
                }) : <div key='loading' className='d-flex justify-content-center'>
                <Spinner color='primary' size={16} />
            </div>}
            </DropdownMenu>
        </Dropdown>
  )
}

export default CommonBanksDropdown