import React from 'react'
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
import banks from 'common/data/dummyBankData'
import moment from 'moment'

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

const BankModal = ({ id, isOpen, setIsOpen, properties }: BankModalInterface) => {
    const { t } = useTranslation(['common', 'bank'])
    const { type, selectedRow: data } = properties

    const BankFormSchema = Yup.object().shape({
        mobileNumber: Yup.string().required('โปรดใส่เบอร์โทรลูกค้า'),
        amount: Yup.string().required('โปรดใส่จำนวนเงิน'),
        payerBankAccountNumber: Yup.string().required('โปรดใส่หมายเลขบัญชีลูกค้า'),
        recipientBankAccountNumber: Yup.string().required('โปรดใส่หมายเลขบัญชีบริษัท'),
	})
	
	const formik = useFormik({
		initialValues: {
            date: moment().format('YYYY-MM-DD'),
			time: '10:30',
            mobileNumber: data?.mobileNumber || '',
            amount: data?.amount || '',
            payerBankAccountNumber: data?.payerBankAccountNumber || '',
            recipientBankAccountNumber: data?.recipientBankAccountNumber || '',
            notes: data?.notes || '',
		},
        validationSchema: BankFormSchema,
		onSubmit: (values) => {
            // EDIT
            console.log(values)

            if (type === 'add') {
                // REFUND
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{t('bank:added.successfully')}</span>
                    </span>,
                    t('reward:added.bank.successfully', { mobileNumber: data?.mobileNumber }),
                )
            } else {
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

    const { values, handleChange, resetForm, initialValues, isValid, touched, errors, setFieldValue } = formik


    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'approve' ? t('reward:approve.request') : t('reward:reject.request')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    {
                        type !== 'refund' && <>
                            <div className='col-6'>
                                <FormGroup id='date' label={t('form.date')} isFloating>
                                    <Input
                                        placeholder={t('form.date')}
                                        onChange={handleChange}
                                        value={values.date}
                                        type='date'
                                        disabled={type !== 'add'}
                                    />
                                </FormGroup>
                            </div>
                            <div className='col-6'>
                                <FormGroup id='time' label={t('form.time')} isFloating>
                                    <Input
                                        placeholder={t('form.time')}
                                        onChange={handleChange}
                                        value={values.time}
                                        type='time'
                                        disabled={type !== 'add'}
                                    />
                                </FormGroup>
                            </div>
                            <FormGroup id='mobileNumber' label={t('form.mobile.number')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.mobileNumber}
                                    disabled={!['add', 'select-payer'].includes(type)}
                                    isValid={isValid}
                                    isTouched={touched.mobileNumber && errors.mobileNumber}
                                    invalidFeedback={errors.mobileNumber}
                                />
                            </FormGroup>
                            <FormGroup id='amount' label={t('form.amount')}>
                                <Input 
                                    type='number' 
                                    onChange={handleChange} 
                                    value={values.amount}
                                    disabled={type !== 'add'}
                                    isValid={isValid}
                                    isTouched={touched.amount && errors.amount}
                                    invalidFeedback={errors.amount}
                                />
                            </FormGroup>
                            <FormGroup id='payerBankAccountNumber' label={t('form.payer.bank.account.number')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.payerBankAccountNumber} 
                                    disabled={type !== 'add'}
                                    isValid={isValid}
                                    isTouched={touched.payerBankAccountNumber && errors.payerBankAccountNumber}
                                    invalidFeedback={errors.payerBankAccountNumber}
                                />
                            </FormGroup>
                            <FormGroup id='recipientBankAccountNumber' label={t('form.recipient.bank.account.number')}>
                                <Input
                                    name='recipientBankAccountNumber'
                                    ariaLabel={t('form.recipient.bank.account.number')}
                                    placeholder={t('form.recipient.bank.account.number.placeholder')}
                                    list={banks.map(
                                        (bank) => `${bank.label} *${bank.number}`,
                                    )}
                                    onChange={formik.handleChange}
                                    value={values.recipientBankAccountNumber}
                                    disabled={type !== 'add'}
                                    isValid={isValid}
                                    isTouched={touched.recipientBankAccountNumber && errors.recipientBankAccountNumber}
                                    invalidFeedback={errors.recipientBankAccountNumber}
                                />
                            </FormGroup>
                        </>
                    }
                    <FormGroup id='notes' label={t('form.notes')}>
                        <Input 
                            onChange={handleChange} 
                            value={values.notes} 
                            placeholder={type === 'refund' ? t("form.notes.refund.reason.placeholder") : ''}
                            isValid={isValid}
                            isTouched={touched.notes && errors.notes}
                            invalidFeedback={errors.notes}
                        />
                    </FormGroup>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button className='w-100' color='info' onClick={formik.handleSubmit}>
                    {t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default BankModal
