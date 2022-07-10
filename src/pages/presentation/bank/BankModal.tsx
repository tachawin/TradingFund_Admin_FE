import React, { ChangeEvent, useState } from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'
import Checks from 'components/bootstrap/forms/Checks'
import { BankModalInterface } from './Bank'
import { CompanyBankBaseInterface, CompanyBankInterface, CompanyBankStatus, CompanyBankType, createCompanyBank, updateCompanyBank } from 'common/apis/companyBank'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { addCompanyBank, updateCompanyBankById } from 'redux/companyBank/action'
import { InfoTwoTone } from '@mui/icons-material'

enum BankModalType {
    Add = 'add',
    Edit = 'edit'
}

interface BankFormInterface {
    bankAccountNumber: string
    bankAccountName: string
    bankName: string
    type: CompanyBankType[]
    status: boolean
}

const BankModal = ({ id, isOpen, setIsOpen, properties }: BankModalInterface) => {
    const { t } = useTranslation(['common', 'bank'])
    const dispatch = useDispatch()
    const { type, selectedRow: data } = properties
    const [isLoading, setIsLoading] = useState(false)

    const BankFormSchema = Yup.object().shape({
        bankAccountNumber: Yup.string().required('กรุณาใส่หมายเลขบัญชี'),
        bankAccountName: Yup.string().required('กรุณาใส่ชื่อบัญชี'),
        type: Yup.array().min(1, 'กรุณาเลือกประเภทธุรกรรม'),
	})
	
	const formik = useFormik<BankFormInterface>({
		initialValues: {
            bankAccountNumber: data?.bankAccountNumber || '',
            bankAccountName: data?.bankAccountName || '',
            bankName: data?.bankName?.acronym || 'scb',
            type: data?.type ? (data?.type === CompanyBankType.DepositAndWithdraw ? [CompanyBankType.Deposit, CompanyBankType.Withdraw] : [data?.type]) : [],
            status: data?.status ? data?.status === CompanyBankStatus.Active : true
		},
        validationSchema: BankFormSchema,
		onSubmit: (values) => {
            setIsLoading(true)
            let typeInString = values.type.length > 1 ? CompanyBankType.DepositAndWithdraw : values.type[0]
            let statusInString = values.status ? CompanyBankStatus.Active : CompanyBankStatus.Inactive
            let requestBody: CompanyBankBaseInterface = {
                ...values,
                type: typeInString,
                status: statusInString
            }
            if (type === BankModalType.Add) {
                createCompanyBank(requestBody, (companyBank: CompanyBankInterface) => {
                    dispatch(addCompanyBank({ 
                        ...companyBank,
                        bankName: {
                            id: 1, 
                            officialName: '', 
                            niceName: '', 
                            thaiName: '',
                            acronym: values.bankName
                        },
                    }))
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('bank:added.successfully')}</span>
                        </span>,
                        t('bank:added.bank.successfully', { bankName: values.bankName.toUpperCase() }),
                    )
                }, (error) => {
                    const { response } = error
                    const message = response?.data
                    console.log(message)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('bank:save.failed')}</span>
                        </span>,
                        t('bank:save.bank.failed', { bankName: values.bankName.toUpperCase() }),
                    )
                }).finally(() => {
                    setIsLoading(false)
                    setIsOpen(false)
                })
            } else {
                data?.bankId && updateCompanyBank(data.bankId, requestBody, () => {
                    data?.bankId && dispatch(updateCompanyBankById(data.bankId, {
                        ...requestBody,
                        bankName: {
                            id: 1, 
                            officialName: '', 
                            niceName: '', 
                            thaiName: '',
                            acronym: values.bankName
                        },
                    }))
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('bank:edit.successfully')}</span>
                        </span>,
                        t('bank:edit.bank.successfully', { bankName: values.bankName.toUpperCase() }),
                    )
                    setIsLoading(false)
                    setIsOpen(false)
                }, (err) => {
                    const { response } = err
                    const message = response?.data
                    console.log(message)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('bank:save.failed')}</span>
                        </span>,
                        t('bank:save.bank.failed', { bankName: values.bankName.toUpperCase() }),
                    )
                    setIsLoading(false)
                    setIsOpen(false)
                })
            }
			
            setIsOpen(false)
		},
	})

    const { values, handleChange, handleSubmit, isValid, touched, errors, setFieldValue } = formik

    const handleOnChangePaymentType = (event: ChangeEvent<HTMLInputElement>) => {
		let paymentType = event.target.name
		let indexInPaymentType = parseInt(event.target.value)
		let isSelected = event.target.checked
		let newPaymentTypeValue = values.type

		if (isSelected) {
			newPaymentTypeValue.push(paymentType as CompanyBankType)
		} else {
			newPaymentTypeValue.splice(indexInPaymentType, 1)
		}
		setFieldValue('type', newPaymentTypeValue)
	}

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === BankModalType.Add ? t('bank:add.bank') : t('bank:edit.bank')}</ModalTitle>
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
                            setSelectedBankName={(bank: string | string[]) => setFieldValue('bankName', bank)} 
                        />
                    </FormGroup>
                    <FormGroup 
                        id='type' 
                        label={t('form.payment.type')} 
                        errorText={touched.type ? <div className='text-danger'>{errors.type}</div> : ''}
                    >
                        <div>
                            {[CompanyBankType.Deposit, CompanyBankType.Withdraw].map((type: CompanyBankType) => {
                            let indexInTypeFilter = values.type.indexOf(type)
                            return <Checks
                                    key={type}
                                    label={type === CompanyBankType.Deposit ? t('deposit') : t('withdraw')}
                                    name={type}
                                    value={indexInTypeFilter}
                                    onChange={handleOnChangePaymentType}
                                    checked={indexInTypeFilter > -1}
                                    ariaLabel={type}
                                />
                            }
                        )}</div>
                    </FormGroup>
                    <FormGroup id='status' label={t('form.status')}>
                        <Checks
                            id='status'
                            type='switch'
                            label={values.status ? t('active') : t('inactive')}
                            onChange={handleChange}
                            checked={values.status}
                            ariaLabel='Available status'
                        />
                    </FormGroup>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button className='w-100' color='info' onClick={handleSubmit}>
                    {isLoading ? <Spinner size={16} /> : t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default BankModal
