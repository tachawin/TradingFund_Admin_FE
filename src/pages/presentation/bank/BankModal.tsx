import React, { ChangeEvent } from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'
import Checks from 'components/bootstrap/forms/Checks'

interface BankModalProperties {
	type: string
	selectedRow: any
}

interface BankModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: BankModalProperties
}

interface BankFormInterface {
    bankAccountNumber: string
    bankAccountName: string
    bankName: string
    paymentType: string[]
    isActive: boolean
}


const BankModal = ({ id, isOpen, setIsOpen, properties }: BankModalInterface) => {
    const { t } = useTranslation(['common', 'bank'])
    const { type, selectedRow: data } = properties

    const BankFormSchema = Yup.object().shape({
        bankAccountNumber: Yup.string().required('โปรดใส่หมายเลขบัญชี'),
        bankAccountName: Yup.string().required('โปรดใส่ชื่อบัญชี'),
        paymentType: Yup.array().min(1, 'กรุณาเลือกประเภทธุรกรรม')
	})
	
	const formik = useFormik<BankFormInterface>({
		initialValues: {
            bankAccountNumber: data?.number || '',
            bankAccountName: data?.bankAccountName || '',
            bankName: data?.bankName || 'scb',
            paymentType: data?.paymentType || [],
            isActive: true
		},
        validationSchema: BankFormSchema,
		onSubmit: (values) => {
            console.log(values)

            if (type === 'add') {
                // ADD
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{t('bank:added.successfully')}</span>
                    </span>,
                    t('reward:added.bank.successfully', { mobileNumber: data?.mobileNumber }),
                )
            } else {
                // EDIT
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{t('bank:edit.successfully')}</span>
                    </span>,
                    t('bank:edit.bank.successfully', { mobileNumber: data?.mobileNumber }),
                )
    
            }
			
            setIsOpen(false)
		},
	})

    const { values, handleChange, handleSubmit, isValid, touched, errors, setFieldValue } = formik

    const handleOnChangePaymentType = (event: ChangeEvent<HTMLInputElement>) => {
		let paymentType = event.target.name
		let indexInPaymentType = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newPaymentTypeValue = values.paymentType

		if (isSelected) {
			newPaymentTypeValue.push(paymentType)
		} else {
			newPaymentTypeValue.splice(indexInPaymentType, 1)
		}
		setFieldValue('bank', newPaymentTypeValue)
	}

    const PAYMENT_TYPE = [
        {
            id: 0,
            name: t('deposit')
        },
        {
            id: 0,
            name: t('withdraw')
        }
    ]

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'add' ? t('bank:add.bank') : t('bank:edit.bank')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <FormGroup id='bankAccountNumber' label={t('form.bank.account.number')}>
                        <Input 
                            onChange={handleChange} 
                            value={values.bankAccountNumber} 
                            isValid={isValid}
                            isTouched={touched.bankAccountNumber && errors.bankAccountNumber}
                            invalidFeedback={errors.bankAccountNumber}
                        />
                    </FormGroup>
                    <FormGroup id='bankAccountName' label={t('form.bank.account.name')}>
                        <Input 
                            onChange={handleChange} 
                            value={values.bankAccountName}
                            isValid={isValid}
                            isTouched={touched.bankAccountName && errors.bankAccountName}
                            invalidFeedback={errors.bankAccountName}
                        />
                    </FormGroup>
                    <FormGroup id='bankName' label={t('form.bank.name')}>
                        <CommonBanksDropdown 
                            selectedBankName={values.bankName} 
                            setSelectedBankName={(bank: string) => setFieldValue('bankName', bank)} 
                        />
                    </FormGroup>
                    <FormGroup 
                        id='paymentType' 
                        label={t('form.payment.type')} 
                        errorText={touched.paymentType ? <div className='text-danger'>{errors.paymentType}</div> : ''}
                    >
                        <div>
                            {PAYMENT_TYPE.map((paymentType: any) => {
                            let indexInPaymentTypeFilter = values.paymentType.indexOf(paymentType.name)
                            return <Checks
                                    key={paymentType.name}
                                    label={paymentType.name}
                                    name={paymentType.name}
                                    value={indexInPaymentTypeFilter}
                                    onChange={handleOnChangePaymentType}
                                    checked={indexInPaymentTypeFilter > -1}
                                    ariaLabel={paymentType.name}
                                />
                            }
                        )}</div>
                    </FormGroup>
                    <FormGroup id='isActive' label={t('form.status')}>
                        <Checks
                            id='status'
                            type='switch'
                            label={values.isActive ? t('active') : t('inactive')}
                            onChange={handleChange}
                            checked={values.isActive}
                            ariaLabel='Available status'
                        />
                    </FormGroup>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button className='w-100' color='info' onClick={handleSubmit}>
                    {t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default BankModal
