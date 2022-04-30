import bankIcons from 'common/banks'
import Button from 'components/bootstrap/Button'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { Check } from 'components/icon/bootstrap'
import useBanks from 'hooks/useBanks'
import React, { useState } from 'react'

interface CommonBanksDropdownInterface {
    selectedBankName: string | string[]
    setSelectedBankName: (value: string | string[]) => void
    disabled?: boolean
    multipleSelect?: boolean
}

const CommonBanksDropdown = ({ selectedBankName, setSelectedBankName, disabled = false, multipleSelect = false }: CommonBanksDropdownInterface) => {
    const { banks } = useBanks()

    const [isOpenBankDropdown, setIsOpenBankDropdown] = useState(false)
    const BANK_PLACEHOLDER = 'เลือกชื่อธนาคาร'

    const BankIcon = bankIcons[selectedBankName as string]?.icon

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
                {selectedBankName !== BANK_PLACEHOLDER && 
                    <span className='p-1' style={{ backgroundColor: bankIcons[selectedBankName as string].color, borderRadius: 3 }}>
                        <BankIcon height={20} width={20} />
                    </span>
                }
                <span
                    style={{ maxWidth: '172px' }}
                    className='mx-3 d-block text-nowrap overflow-hidden text-overflow-ellipsis'
                >
                    {banks && banks[selectedBankName as string].thai_name}
                </span>
            </DropdownToggle>}
            <DropdownMenu
                className='overflow-scroll'
                height='200px'
                isOpen={Boolean(isOpenBankDropdown)} 
                setIsOpen={setIsOpenBankDropdown}
            >
                {banks && Object.keys(banks).map((bank: string) => { 
                    const Icon = bankIcons[bank].icon
                    return <DropdownItem key={bank}>
                        <Button
                            color='link'
                            isActive={!multipleSelect && bank === selectedBankName}
                            onClick={() => multipleSelect ? handleOnChangeMultipleBanks(bank) : setSelectedBankName(bank)}
                        >
                            <div className='p-1' style={{ backgroundColor: bankIcons[bank].color, borderRadius: 3 }}>
                                <Icon height={20} width={20} />
                            </div>
                            <span className='mx-3 mw-75'>{banks[bank].thai_name}</span>
                            {(multipleSelect && selectedBankName.indexOf(bank) > -1) && <Check />}
                        </Button>
                    </DropdownItem>
                })}
            </DropdownMenu>
        </Dropdown>
  )
}

export default CommonBanksDropdown