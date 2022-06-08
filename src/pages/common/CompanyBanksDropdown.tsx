import React, { useEffect, useState } from 'react'
import bankIcons from 'common/banks'
import Button from 'components/bootstrap/Button'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { useDispatch, useSelector } from 'react-redux'
import { selectCompanyBankList } from 'redux/companyBank/selector'
import { getCompanyBankList, CompanyBankInterface } from 'common/apis/companyBank'
import showNotification from 'components/extras/showNotification'
import { useTranslation } from 'react-i18next'
import Spinner from 'components/bootstrap/Spinner'
import { storeCompanyBank } from 'redux/companyBank/action'
import { Check, InfoTwoTone } from '@mui/icons-material'
import COLORS from 'common/data/enumColors'

interface CompanyBanksDropdownInterface {
    selectedBank: CompanyBankInterface | CompanyBankInterface[] | string
    setSelectedBank: (value: CompanyBankInterface | CompanyBankInterface[]) => void
    disabled?: boolean
    multipleSelect?: boolean
    isValid?: boolean
    touched?: boolean
    error?: string
}

const CompanyBanksDropdown = ({ 
    selectedBank, setSelectedBank, disabled = false, multipleSelect = false, isValid, touched, error
}: CompanyBanksDropdownInterface) => {
    const { t } = useTranslation('bank')
    const dispatch = useDispatch()

    const [isOpenBankDropdown, setIsOpenBankDropdown] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const BANK_PLACEHOLDER = 'เลือกชื่อธนาคาร'

    const BankIcon = bankIcons[(selectedBank as CompanyBankInterface).bankName]?.icon

    const companyBankList = useSelector(selectCompanyBankList)
    
    const handleOnChangeMultipleBanks = (bank: CompanyBankInterface) => {
        let index = (selectedBank as CompanyBankInterface[]).indexOf(bank)
        let isBankSelected = index > -1
        let newValue = selectedBank as CompanyBankInterface[]

        if (isBankSelected) {
            newValue.splice(index, 1)
        } else {
            newValue.push(bank)
        }
        setSelectedBank(newValue)
	}

    useEffect(() => {
        getCompanyBankList('', (companyBankList: CompanyBankInterface[]) => {
            dispatch(storeCompanyBank(companyBankList))
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
                className={{ 'd-flex': true, 'align-items-center': true, 'w-100': true, 'border-danger': error }}
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
                    {(selectedBank as CompanyBankInterface[]).map((bank) => bank.bankName.toUpperCase()).join(', ') || BANK_PLACEHOLDER}
                </span>
            </DropdownToggle> : <DropdownToggle
                className={{ 'd-flex': true, 'align-items-center': true, 'w-100': true, 'border-danger': error && touched }}
                isLight 
                color='dark' 
                isOpen={Boolean(isOpenBankDropdown)} 
                setIsOpen={setIsOpenBankDropdown}
                disabled={disabled}
            >
                {(selectedBank !== BANK_PLACEHOLDER && (selectedBank as CompanyBankInterface).bankName) ? <>
                    <span className='p-1' style={{ backgroundColor: bankIcons[(selectedBank as CompanyBankInterface).bankName]?.color, borderRadius: 3 }}>
                        <BankIcon height={20} width={20} />
                    </span>
                    <span
                        style={{ maxWidth: '172px' }}
                        className='mx-3 d-block text-nowrap overflow-hidden text-overflow-ellipsis'
                    >
                        {(selectedBank as CompanyBankInterface).bankName?.toUpperCase()}{' *'}{(selectedBank as CompanyBankInterface).bankAccountNumber?.slice(-4)}
                    </span>
                </> : BANK_PLACEHOLDER}
            </DropdownToggle>}
            <DropdownMenu
                className='overflow-scroll'
                height='200px'
                isOpen={Boolean(isOpenBankDropdown)} 
                setIsOpen={setIsOpenBankDropdown}
            >
                {!isLoading ? companyBankList && companyBankList.map((bank: CompanyBankInterface) => { 
                    const BankIcon = bankIcons[bank.bankName]?.icon
                    return <DropdownItem key={bank.bankId}>
                        <Button
                            color='link'
                            isActive={!multipleSelect && bank === selectedBank}
                            onClick={() => multipleSelect ? handleOnChangeMultipleBanks(bank) : setSelectedBank(bank)}
                        >
                            <div className='p-1' style={{ backgroundColor: bankIcons[bank.bankName]?.color, borderRadius: 3 }}>
                                <BankIcon height={20} width={20} />
                            </div>
                            <span className='mx-3 mw-75'>{bank.bankName?.toUpperCase()}{' *'}{bank.bankAccountNumber?.slice(-4)}</span>
                            {(multipleSelect && (selectedBank as CompanyBankInterface[]).indexOf(bank) > -1) && <Check htmlColor={COLORS.PRIMARY.code} />}
                        </Button>
                    </DropdownItem>
                }) : <div key='loading' className='d-flex justify-content-center'>
                <Spinner color='primary' size={16} />
            </div>}
            </DropdownMenu>
            {(error && touched) && <div className='d-block invalid-feedback'>{error}</div>}
        </Dropdown>
  )
}

export default CompanyBanksDropdown