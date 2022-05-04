import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from 'react'
import { getCustomerList, CustomerInterface, getMobileNumberList } from 'common/apis/customer'
import Button from 'components/bootstrap/Button'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { Check } from 'components/icon/bootstrap'
import Icon from 'components/icon/Icon'
import { useDispatch, useSelector } from 'react-redux'
import { storeCustomerMobileNumber, storeCustomers } from 'redux/customer/action'
import showNotification from 'components/extras/showNotification'
import { useTranslation } from 'react-i18next'
import Spinner from 'components/bootstrap/Spinner'
import { selectCustomerMobileNumber } from 'redux/customer/selector'
import Input from 'components/bootstrap/forms/Input'

interface CustomerMobileNumberDropdownInterface {
    selectedMobileNumber: string | string[]
    setSelectedMobileNumber: (value: string | string[]) => void
    disabled?: boolean
    multipleSelect?: boolean
}

const CustomerMobileNumberDropdown = ({ selectedMobileNumber, setSelectedMobileNumber, disabled = false, multipleSelect = false }: CustomerMobileNumberDropdownInterface) => {
    const { t } = useTranslation('customer')
    const dispatch = useDispatch()
    const mobileNumberList = useSelector(selectCustomerMobileNumber)
    const [isLoading, setIsLoading] = useState(false)
    const [filteredMobileNumber, setFilteredMobileNumber] = useState(mobileNumberList)

    useEffect(() => {
        setFilteredMobileNumber(mobileNumberList)
    }, [mobileNumberList])
    
    const [isOpenCustomerDropdown, setIsOpenCustomerDropdown] = useState(false)
    const MOBILE_NUMBER_PLACEHOLDER = 'เลือกเบอร์โทรศัพท์ลูกค้า'

    const handleOnChangeMultipleCustomers = (mobileNumber: string) => {
        let index = (selectedMobileNumber as string[]).indexOf(mobileNumber)
        let isMobileNumberSelected = index > -1
        let newValue = selectedMobileNumber as string[]

        if (isMobileNumberSelected) {
            newValue.splice(index, 1)
        } else {
            newValue.push(mobileNumber)
        }
        setSelectedMobileNumber(newValue)
	}

    const filterMobileNumber = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value

        if (value !== '') {
            let result = mobileNumberList.filter((mobileNumber) => 
                mobileNumber.includes(value)
            )
            setFilteredMobileNumber(result)
        } else {
            setFilteredMobileNumber(mobileNumberList)
        }
        setSelectedMobileNumber(value)
    }

    useEffect(() => {
		mobileNumberList.length === 0 && getMobileNumberList((mobileNumberList: string[]) => {
			dispatch(storeCustomerMobileNumber(mobileNumberList))
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('get.mobile.number.failed')}</span>
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
                isOpen={Boolean(isOpenCustomerDropdown)} 
                setIsOpen={setIsOpenCustomerDropdown}
                disabled={disabled}
            >
                <span
                    style={{ maxWidth: '172px' }}
                    className={`${multipleSelect ? 'm-0' : 'mx-3'} d-block text-nowrap overflow-hidden text-overflow-ellipsis`}
                >
                    {(selectedMobileNumber as string[]).join(', ') || MOBILE_NUMBER_PLACEHOLDER}
                </span>
            </DropdownToggle> 
            : <Input
                onChange={(e: ChangeEvent<HTMLInputElement>) => filterMobileNumber(e)}
                onSelect={() => setIsOpenCustomerDropdown(true)}
                className='border-0'
                value={selectedMobileNumber}
            />}
            <DropdownMenu
                className='overflow-scroll'
                height='200px'
                isOpen={Boolean(isOpenCustomerDropdown)} 
                setIsOpen={setIsOpenCustomerDropdown}
            >
                {!isLoading ? filteredMobileNumber.length > 0 ? (filteredMobileNumber.map((mobileNumber: string) => 
                    <DropdownItem key={mobileNumber}>
                        <Button
                            color='link'
                            isActive={!multipleSelect && mobileNumber === selectedMobileNumber }
                            onClick={() => multipleSelect ? handleOnChangeMultipleCustomers(mobileNumber) : setSelectedMobileNumber(mobileNumber)}
                        >
                            <span className='mw-75'>{mobileNumber}</span>
                            {(multipleSelect && (selectedMobileNumber as string[]).indexOf(mobileNumber) > -1) && <Check />}
                        </Button>
                    </DropdownItem>
                )) : <div className='mx-3'>ไม่พบเบอร์ที่ค้นหา</div> 
                : <div key='loading' className='d-flex justify-content-center'>
                    <Spinner color='primary' size={16} />
                </div>}
            </DropdownMenu>
        </Dropdown>
  )
}

export default CustomerMobileNumberDropdown