import React, { useState } from 'react'
import { useFormik } from 'formik'
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import { useTranslation } from 'react-i18next'
import banks, { Bank } from '../../../common/data/dummyBankData'
import * as Yup from 'yup'
import Button, { ButtonGroup } from 'components/bootstrap/Button'
import PlaceholderImage from 'components/extras/PlaceholderImage'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'

interface WithdrawForm {
    slipImage: string
    bankAccountNumber: string
    bankAccountName: string
    bankName: string
    payerBank: Bank
}

interface WithdrawModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: WithdrawModalProperties
}

export enum WithdrawModalType {
    Manual = 'manual',
    System = 'system',
    Delete = 'delete'
}

interface WithdrawModalProperties {
    type: WithdrawModalType
    bank?: string
	selectedRow: any
}

const WithdrawModal = ({ id, isOpen, setIsOpen, properties }: WithdrawModalInterface) => {
    const { t } = useTranslation(['common', 'withdraw'])
    const { type, bank, selectedRow: data } = properties
    const [withdrawModalState, setWithdrawModalState] = useState(type)
    const [isOpenPayerBankDropdown, setIsOpenPayerBankDropdown] = useState(false)

    const WithdrawSchema = Yup.object().shape({
		slipImage: Yup.string().required('กรุณาอัปโหลดภาพ'),
        bankAccountNumber: Yup.string().required('โปรดใส่เลขบัญชี'),
        bankAccountName: Yup.string().required('โปรดใส่ชื่อบัญชี'),
        bankName: Yup.string().uppercase().required('โปรดระบุบัญชีธนาคาร'),
	})

	const formik = useFormik<WithdrawForm>({
		initialValues: {
			slipImage: '',
            bankAccountNumber: data?.recipientBankAccountNumber || '',
            bankAccountName: data?.recipientBankAccountName || '',
            bankName: data?.recipientBankName || '',
            payerBank: banks[0]
		},
        validationSchema: WithdrawSchema,
		onSubmit: (values) => {
            // EDIT
            console.log(values)

			setIsOpen(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('withdraw:withdraw.successfully')}</span>
				</span>,
				t('withdraw:withdraw.to.account.successfully', { accountName: values.bankAccountName }),
			)
		},
	})

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0]
            const formData = new FormData()
            formData.append('file', uploadedFile)
    
            setFieldValue('slipImage', URL.createObjectURL(uploadedFile))
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
                            <FormGroup id='slipImage' label={t('form.slip.image')}>
                                <div className='row'>
                                    <div className='col-12'>
                                        {values.slipImage ? (
                                            <img
                                                src={values.slipImage}
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
                            <FormGroup id='bankAccountName' label={t('form.bank.account.name')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.bankAccountName}
                                    isValid={isValid}
                                    isTouched={touched.bankAccountName && errors.bankAccountName}
                                    invalidFeedback={errors.bankAccountName}
                                    disabled
                                />
                            </FormGroup>
                            <FormGroup id='bankName' label={t('form.bank.name')}>
                                <CommonBanksDropdown
                                    disabled
                                    selectedBankName={values.bankName} 
                                    setSelectedBankName={(bank: string) => setFieldValue('bankName', bank)} 
                                />
                            </FormGroup>
                            <FormGroup id='payerBank' label={t('form.withdraw.bank')}>
                                {type === WithdrawModalType.System ? 
                                    <CommonBanksDropdown
                                        disabled
                                        selectedBankName={bank ?? 'scb'} 
                                        setSelectedBankName={(bank: string) => setFieldValue('bankName', bank)} 
                                    /> :
                                    <Dropdown className='w-100'>
                                        <DropdownToggle 
                                            className='w-100'
                                            isLight color='dark' isOpen={Boolean(isOpenPayerBankDropdown)} setIsOpen={setIsOpenPayerBankDropdown}>
                                            <span>
                                                {values.payerBank.label.toLocaleUpperCase()}
                                            </span>
                                        </DropdownToggle>
                                        <DropdownMenu isOpen={Boolean(isOpenPayerBankDropdown)} setIsOpen={setIsOpenPayerBankDropdown}>
                                            {banks.map((bank: Bank) =>
                                                <DropdownItem key={bank.id}>
                                                    <Button
                                                        color='link'
                                                        isActive={bank.id === values.payerBank.id}
                                                        onClick={() => setFieldValue('payerBank', bank)}>
                                                        {bank.label.toLocaleUpperCase()}
                                                    </Button>
                                                </DropdownItem>
                                            )}
                                        </DropdownMenu>
                                    </Dropdown>
                                }
                            </FormGroup>
                            <Button color='info' className='w-auto mx-3' onClick={handleSubmit}>
                                {t('save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default WithdrawModal
