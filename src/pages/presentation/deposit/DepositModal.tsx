import React, { useState } from 'react'
import { useFormik } from 'formik'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import * as Yup from 'yup'
import { DepositUpdateInterface, updateDeposit, updateDepositCustomer, DepositUpdateCustomerInterface, waiveDeposit, deposit, DepositCreateInterface } from 'common/apis/deposit'
import CustomerMobileNumberDropdown from 'pages/common/CustomerMobileNumberDropdown'
import CompanyBanksDropdown from 'pages/common/CompanyBanksDropdown'
import { CompanyBankInterface, CompanyBankStatus, CompanyBankType } from 'common/apis/companyBank'
import { TransactionInterface, TransactionStatus } from 'common/apis/transaction'
import { useDispatch } from 'react-redux'
import { addNewDeposit, updateDepositById } from 'redux/deposit/action'
import { InfoTwoTone } from '@mui/icons-material'
import Spinner from 'components/bootstrap/Spinner'

export enum DepositModalType {
    Add = 'add',
    Edit = 'edit',
    Refund = 'refund',
    SelectPayer = 'select_payer'
}
export interface DepositModalProperties {
	type: DepositModalType
	selectedRow?: TransactionInterface
}

interface DepositModalInterface {
	isOpen?: boolean
	setIsOpen: any
    properties: DepositModalProperties
    data?: TransactionInterface
}

const DepositModal = ({ isOpen, setIsOpen, properties }: DepositModalInterface) => {
    const { t } = useTranslation(['common', 'deposit'])
    const { type, selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const AddDepositSchema = Yup.object().shape({
        mobileNumber: Yup.string().required('โปรดใส่เบอร์โทรลูกค้า'),
        amount: Yup.string().required('โปรดใส่จำนวนเงิน'),
        payerBankAccountNumber: Yup.string().required('โปรดใส่หมายเลขบัญชีลูกค้า'),
        recipientBank: Yup.object().shape({
            bankId: Yup.string().required('โปรดเลือกบัญชีบริษัท'),
        })
	})

    const RefundDepositSchema = Yup.object().shape({
        notes: Yup.string().required('โปรดใส่เหตุผลที่ดึงเครดิต')
	})

    const SelectPayerDepositSchema = Yup.object().shape({
        mobileNumber: Yup.string().required('โปรดใส่เบอร์โทรลูกค้า')
	})

    const selectValidationSchema = () => {
        if (type === DepositModalType.Add) {
            return AddDepositSchema
        } else if (type === DepositModalType.Refund) {
            return RefundDepositSchema
        } else if (type === DepositModalType.SelectPayer) {
            return SelectPayerDepositSchema
        } else {
            return null
        }
    }

    const addDeposit = (newData: DepositCreateInterface) => {
        deposit(newData, () => {
            setIsOpen(false)
            dispatch(addNewDeposit({
                payerBankAccountNumber: values.payerBankAccountNumber,
                recipientBankAccountNumber: values.recipientBank.bankAccountNumber,
                recipientBankName: values.recipientBank.bankAccountName,
                ...newData
            }))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.successfully')}</span>
                </span>, t('deposit:save.deposit.from.mobile.number.successfully', { mobileNumber: values.mobileNumber })
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.failed')}</span>
                </span>, t('deposit:save.deposit.from.mobile.number.failed', { mobileNumber: values.mobileNumber })
            )
        }).finally(() => setIsLoading(false))
    }

    const editDeposit = (id: string, newData: DepositUpdateInterface) => {
        updateDeposit(id, newData, () => {
            setIsOpen(false)
            dispatch(updateDepositById(id, newData))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.successfully')}</span>
                </span>, t('deposit:edit.deposit.successfully', { mobileNumber: values.mobileNumber })
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.failed')}</span>
                </span>, t('deposit:edit.deposit.failed', { mobileNumber: values.mobileNumber })
            )
        }).finally(() => setIsLoading(false))
    }

    const pickCustomer = (id: string, newData: DepositUpdateCustomerInterface) => {
        updateDepositCustomer(id, newData, () => {
            setIsOpen(false)
            dispatch(updateDepositById(id, { ...newData, status: TransactionStatus.Success }))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.successfully')}</span>
                </span>, t('deposit:edit.deposit.successfully', { mobileNumber: values.mobileNumber })
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.failed')}</span>
                </span>, t('deposit:edit.deposit.failed', { mobileNumber: values.mobileNumber })
            )
        }).finally(() => setIsLoading(false))
    }

    const refundDeposit = (id: string, newData: DepositUpdateInterface) => {
        waiveDeposit(id, newData, () => {
            setIsOpen(false)
            dispatch(updateDepositById(id, { ...newData, status: TransactionStatus.Cancel }))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.successfully')}</span>
                </span>, t('deposit:edit.deposit.successfully', { mobileNumber: values.mobileNumber })
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.failed')}</span>
                </span>, t('deposit:edit.deposit.failed', { mobileNumber: values.mobileNumber })
            )
        }).finally(() => setIsLoading(false))
    }
	
	const formik = useFormik({
		initialValues: {
            date: moment().format('YYYY-MM-DD'),
			time: '10:30',
            mobileNumber: data?.mobileNumber || '',
            amount: data?.amount || '',
            payerBankAccountNumber: data?.payerBankAccountNumber || '',
            recipientBank: {
                bankId: data?.companyBankId || '',
                bankAccountNumber: data?.recipientBankAccountNumber || '',
                bankAccountName: '',
                bankName: {
                    id: data?.recipientBank?.id || 0,
                    officialName: data?.recipientBank?.officialName || '',
                    niceName: data?.recipientBank?.niceName || '',
                    thaiName: data?.recipientBank?.thaiName || '',
                    acronym: data?.recipientBank?.acronym || '',

                },
                balance: 0,
                type: CompanyBankType.Deposit,
                status: CompanyBankStatus.Active
            },
            notes: type === DepositModalType.Edit ? data?.notes : '',
		},
        validationSchema: selectValidationSchema(),
		onSubmit: (values) => {
            setIsLoading(true)
            const transactionTimestamp = moment(`${values.date} ${values.time}`, 'YYYY-MM-DD HH:mm').format()
            if (type === DepositModalType.Refund) {
                data?.transactionId && refundDeposit(data.transactionId, { notes: values.notes })
            } else if (type === DepositModalType.Edit) {
                data?.transactionId && editDeposit(data.transactionId, { notes: values.notes ?? '' })
            } else if (type === DepositModalType.SelectPayer) {
                data?.transactionId && pickCustomer(data.transactionId, { 
                    mobileNumber: values.mobileNumber,
                    notes: values.notes,
                })
            } else {
                values.recipientBank.bankId && addDeposit({
                    mobileNumber: values.mobileNumber,
                    companyBankId: values.recipientBank.bankId,
                    amount: values.amount,
                    notes: values.notes,
                    transactionTimestamp,
                })
            }	
		},
	})

    const { values, handleChange, setFieldValue, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={data?.transactionId} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={data?.transactionId}>
                    {type === DepositModalType.Add ? t('deposit') : type === DepositModalType.Refund ? t('refund') : t('select.payer') }
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    {type !== DepositModalType.Refund && <>
                        <div className='col-6'>
                            <FormGroup id='date' label={t('form.date')} isFloating>
                                <Input
                                    placeholder={t('form.date')}
                                    onChange={handleChange}
                                    value={values.date}
                                    type='date'
                                    disabled={type !== DepositModalType.Add}
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
                                    disabled={type !== DepositModalType.Add}
                                />
                            </FormGroup>
                        </div>
                        <FormGroup id='mobileNumber' label={t('form.mobile.number')}>
                            <CustomerMobileNumberDropdown
                                disabled={type === DepositModalType.Edit}
                                selectedMobileNumber={values.mobileNumber}
                                setSelectedMobileNumber={(mobileNumber: string | string[]) => setFieldValue('mobileNumber', mobileNumber)}
                                isValid={isValid}
                                touched={touched.mobileNumber}
                                error={errors.mobileNumber}
                            />
                        </FormGroup>
                        <FormGroup id='amount' label={t('form.amount')}>
                            <Input 
                                type='number' 
                                onChange={handleChange} 
                                value={values.amount}
                                disabled={type !== DepositModalType.Add}
                                isValid={isValid}
                                isTouched={touched.amount && errors.amount}
                                invalidFeedback={errors.amount}
                                placeholder={t('form.amount.placeholder')}
                            />
                        </FormGroup>
                        <FormGroup id='payerBankAccountNumber' label={t('form.payer.bank.account.number')}>
                            <Input 
                                onChange={handleChange} 
                                value={values.payerBankAccountNumber} 
                                disabled={type !== DepositModalType.Add}
                                isValid={isValid}
                                isTouched={touched.payerBankAccountNumber && errors.payerBankAccountNumber}
                                invalidFeedback={errors.payerBankAccountNumber}
                                placeholder={t('form.payer.bank.account.number.placeholder')}
                            />
                        </FormGroup>
                        <FormGroup id='recipientBank' label={t('form.recipient.bank.account.number')}>
                            <CompanyBanksDropdown
                                disabled={type !== DepositModalType.Add}
                                selectedBank={values.recipientBank}
                                setSelectedBank={(bank: CompanyBankInterface | CompanyBankInterface[]) => setFieldValue('recipientBank', bank)}
                                isValid={isValid}
                                touched={touched.recipientBank?.bankId}
                                error={errors.recipientBank?.bankId}
                                bankType={CompanyBankType.Deposit}
                            />
                        </FormGroup>
                    </>}
                    <FormGroup id='notes' label={t('form.notes')}>
                        <Input 
                            onChange={handleChange} 
                            value={values.notes} 
                            placeholder={type === DepositModalType.Refund ? t('deposit:form.notes.refund.reason.placeholder') : ''}
                            isValid={isValid}
                            isTouched={touched.notes && errors.notes}
                            invalidFeedback={errors.notes}
                        />
                    </FormGroup>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button className='w-100' color='info' onClick={formik.handleSubmit}>
                    {isLoading ? <Spinner size={16} /> : t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default DepositModal
