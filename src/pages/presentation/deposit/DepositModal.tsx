import React from 'react'
import { useFormik } from 'formik'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import banks from 'common/data/dummyBankData'
import * as Yup from 'yup'

interface DepositModalProperties {
	type: string
	selectedRow: any
}

interface DepositModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: DepositModalProperties
    data?: any
}

const DepositModal = ({ id, isOpen, setIsOpen, properties }: DepositModalInterface) => {
    const { t } = useTranslation(['common', 'deposit'])
    const { type, selectedRow: data } = properties

    const AddDepositSchema = Yup.object().shape({
        mobileNumber: Yup.string().required('โปรดใส่เบอร์โทรลูกค้า'),
        amount: Yup.string().required('โปรดใส่จำนวนเงิน'),
        payerBankAccountNumber: Yup.string().required('โปรดใส่หมายเลขบัญชีลูกค้า'),
        recipientBankAccountNumber: Yup.string().required('โปรดใส่หมายเลขบัญชีบริษัท'),
	})

    const RefundDepositSchema = Yup.object().shape({
        notes: Yup.string().required('โปรดใส่เหตุผลที่ดึงเครดิต')
	})

    const SelectPayerDepositSchema = Yup.object().shape({
        mobileNumber: Yup.string().required('โปรดใส่เบอร์โทรลูกค้า')
	})

    const selectValidationSchema = () => {
        if (type === 'add') {
            return AddDepositSchema
        } else if (type === 'refund') {
            return RefundDepositSchema
        } else if (type === 'select-payer') {
            return SelectPayerDepositSchema
        } else {
            return null
        }
    }
	
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
        validationSchema: selectValidationSchema(),
		onSubmit: (values) => {
            // EDIT
            console.log(values)

            if (type === 'refund') {
                // REFUND
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{t('refund.successfully')}</span>
                    </span>, t('refund.deposit.from.mobile.number.successfully', { mobileNumber: data?.mobileNumber })
                )
            } else {
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{type === 'add' ? t('deposit:save.deposit.successfully') : t('deposit:edit.successfully')}</span>
                    </span>, t('deposit:save.deposit.from.mobile.number.successfully', { mobileNumber: values.mobileNumber })
                )
    
            }
			
            setIsOpen(false)
		},
	})

    const { values, handleChange, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id}>
                    {type === 'add' ? t('deposit') : type === 'refund' ? t('refund') : t('select.payer') }
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    {type !== 'refund' && <>
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
                    </>}
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

export default DepositModal
