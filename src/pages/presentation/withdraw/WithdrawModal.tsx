import React, { useState } from 'react'
import { useFormik } from 'formik'
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button, { ButtonGroup } from 'components/bootstrap/Button'
import PlaceholderImage from 'components/extras/PlaceholderImage'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'
import CompanyBanksDropdown from 'pages/common/CompanyBanksDropdown'
import { BankNameInterface, CompanyBankInterface, CompanyBankStatus, CompanyBankType } from 'common/apis/companyBank'
import { InfoTwoTone } from '@mui/icons-material'
import { SlipImageInterface, uploadSlipImage, withdraw, WithdrawCreateInterface, WithdrawType } from 'common/apis/withdraw'
import Spinner from 'components/bootstrap/Spinner'
import { removeWithdrawById } from 'redux/withdraw/action'
import { useDispatch } from 'react-redux'
import { WithdrawModalProperties } from './Withdraw'

interface WithdrawForm {
    slipImageURL: string
    slipImageFile: FormData | string
    bankAccountNumber: string
    recipientBankName: BankNameInterface
    payerBank: CompanyBankInterface
}

interface WithdrawModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: WithdrawModalProperties
}

export enum WithdrawModalType {
    Manual = 'manual',
    System = 'system'
}

const WithdrawModal = ({ id, isOpen, setIsOpen, properties }: WithdrawModalInterface) => {
    const { t } = useTranslation(['common', 'withdraw'])
    const { type, bank, selectedRow: data } = properties
    const [withdrawModalState, setWithdrawModalState] = useState(type)
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const withdrawCredit = (requestBody: WithdrawCreateInterface, withdrawType: WithdrawType) => {
        withdraw(requestBody, withdrawType, (response) => {
            data.transactionId && dispatch(removeWithdrawById(data.transactionId))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('withdraw:withdraw.successfully')}</span>
                </span>,
                t('withdraw:withdraw.to.account.successfully', { mobileNumber: requestBody.mobileNumber }),
            )
        }, () => {
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('withdraw:withdraw.failed')}</span>
                </span>,
                t('withdraw:withdraw.to.account.failed', { mobileNumber: requestBody.mobileNumber }),
            )
        }).finally(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
    }

    const ManualWithdrawSchema = Yup.object().shape({
		slipImageURL: Yup.string().required('กรุณาอัปโหลดภาพ'),
        payerBank: Yup.object().shape({
            bankId: Yup.string().required('โปรดเลือกบัญชีบริษัท'),
        })
	})

    const AutoWithdrawSchema = Yup.object().shape({
        payerBank: Yup.object().shape({
            bankId: Yup.string().required('โปรดเลือกบัญชีบริษัท'),
        })
	})

	const formik = useFormik<WithdrawForm>({
		initialValues: {
			slipImageURL: '',
            slipImageFile: '',
            bankAccountNumber: data?.recipientBankAccountNumber || '',
            recipientBankName: {
                id: data?.recipientBank?.id || 0,
                officialName: data?.recipientBank?.officialName || '',
                niceName: data?.recipientBank?.niceName || '',
                thaiName: data?.recipientBank?.thaiName || '',
                acronym: data?.recipientBank?.acronym || '',
            },
            payerBank: {
                bankId: bank?.bankId || '',
                bankAccountNumber: bank?.bankAccountNumber || '',
                bankAccountName: bank?.bankAccountName || '',
                bankName: bank?.bankName || {
                    id: 0,
                    officialName: '',
                    niceName: '',
                    thaiName: '',
                    acronym: '',
                },
                balance: bank?.balance || 0,
                type: bank?.type || CompanyBankType.Deposit,
                status: bank?.status || CompanyBankStatus.Active
            },
		},
        validationSchema: type === WithdrawModalType.Manual ? ManualWithdrawSchema : AutoWithdrawSchema,
		onSubmit: (values) => {
            const { slipImageFile } = values
            if (data.mobileNumber && data.amount && values.payerBank.bankId) {
                const requestBody: WithdrawCreateInterface = {
                    mobileNumber: data.mobileNumber,
                    companyBankId: values.payerBank.bankId,
                    amount: parseInt(data.amount),
                }
                setIsLoading(true)
                if (withdrawModalState === WithdrawModalType.Manual) {
                    uploadSlipImage(slipImageFile as FormData, (imageURL: SlipImageInterface) => {
                        withdrawCredit({ ...requestBody, payslipPictureURL: imageURL.payslipPictureURL }, WithdrawType.Manual)
                    }, (err) => {
                        const { response } = err
                        const message = response?.data
                        console.log(message)
                        showNotification(
                            <span className='d-flex align-items-center'>
                                <InfoTwoTone className='me-1' />
                                <span>{t('withdraw:withdraw.failed')}</span>
                            </span>,
                            t('withdraw:withdraw.to.account.failed', { mobileNumber: requestBody.mobileNumber }),
                        )
                    }).finally(() => setIsLoading(false))
                } else {
                    withdrawCredit(requestBody, WithdrawType.Auto)
                }
            }
		},
	})

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0]
            const formData = new FormData()
            formData.append('file', uploadedFile)
    
            setFieldValue('slipImageFile', formData)
            setFieldValue('slipImageURL', URL.createObjectURL(uploadedFile))
        }
    }

    const { errors, touched, values, setFieldValue, handleSubmit, handleChange, isValid } = formik

    return (
        <Modal style={{ maxWidth: '600px' }} isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('withdraw:new.withdraw')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4 pb-4'>
                <div className='row align-items-start'>
                    {withdrawModalState === WithdrawModalType.Manual &&
                        <div className='col'>
                            <div className='row g-4'>
                            <FormGroup id='slipImageURL' label={t('form.slip.image')}>
                                <div className='row'>
                                    <div className='col-12'>
                                        {values.slipImageURL ? (
                                            <img
                                                src={values.slipImageURL}
                                                alt=''
                                                width={220}
                                                height={300}
                                                style={{ minHeight: 300, minWidth: 220, objectFit: 'contain' }}
                                                className='mx-auto d-block img-fluid mb-3'
                                            />
                                        ) : (
                                            <PlaceholderImage
                                                width={220}
                                                height={300}
                                                className='mx-auto d-block img-fluid mb-3 rounded'
                                            />
                                        )}
                                    </div>
                                    <div className='col-12'>
                                        <div className='row g-4'>
                                            <Input
                                                accept="image/*"
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUploadImage(e)}
                                                type='file' 
                                                autoComplete='photo' 
                                                isValid={isValid}
                                                isTouched={touched.slipImageURL && errors.slipImageURL}
                                                invalidFeedback={errors.slipImageURL}
                                            />
                                        </div>
                                    </div>
                                </div>
                                </FormGroup>
                            </div>
                        </div>
                    } 
                    <div className='col'>
                        <div className='row g-4 justify-content-end'>
                            <ButtonGroup>
                                <Button
                                    color={withdrawModalState === WithdrawModalType.System ? 'success' : 'dark'}
                                    isLight={withdrawModalState !== WithdrawModalType.System}
                                    onClick={() => setWithdrawModalState(WithdrawModalType.System)}
                                >
                                    {t('withdraw:withdraw.system')}
                                </Button>
                                <Button
                                    color={withdrawModalState === WithdrawModalType.Manual ? 'success' : 'dark'}
                                    isLight={withdrawModalState !== WithdrawModalType.Manual}
                                    onClick={() => setWithdrawModalState(WithdrawModalType.Manual)}
                                >
                                    {t('withdraw:withdraw.manual')}
                                </Button>
                            </ButtonGroup>
                            <FormGroup id='bankAccountNumber' label={t('form.bank.account.number')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.bankAccountNumber} 
                                    isValid={isValid}
                                    isTouched={touched.bankAccountNumber && errors.bankAccountNumber}
                                    invalidFeedback={errors.bankAccountNumber}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup id='recipientBankName' label={t('form.bank.name')}>
                                <CommonBanksDropdown
                                    selectedBankName={values.recipientBankName.acronym} 
                                    setSelectedBankName={(bank: string | string[]) => setFieldValue('recipientBankName', bank)}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup id='payerBank' label={t('form.withdraw.bank')}>
                                <CompanyBanksDropdown 
                                    selectedBank={values.payerBank}
                                    setSelectedBank={(bank: CompanyBankInterface | CompanyBankInterface[]) => setFieldValue('payerBank', bank)}
                                    isValid={isValid}
                                    touched={touched.payerBank?.bankId}
                                    error={errors.payerBank?.bankId}
                                    bankType={CompanyBankType.Withdraw}
                                />
                            </FormGroup>
                            <Button color='info' className='w-auto mx-3' onClick={handleSubmit}>
                                {isLoading ? <Spinner size={16} /> : t('save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default WithdrawModal
