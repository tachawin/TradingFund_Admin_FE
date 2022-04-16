import React, { useEffect } from 'react'
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
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from 'components/bootstrap/Button'
import CommonBanksDropdown from 'pages/common/CommonBanksDropdown'

interface CustomerAddForm {
    username: string
    password: string
    name: string
    mobileNumber: string
    bankAccountNumber: string
    bankAccountName: string
    bankName: string
}

interface CustomerAddModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    type: 'add' | 'edit' | undefined
    data?: any
}

const CustomerAddModal = ({ id, isOpen, setIsOpen, type, data }: CustomerAddModalInterface) => {
    const { t } = useTranslation(['common', 'customer'])

    const CustomerAddScheme = Yup.object().shape({
		username: Yup.string().required('โปรดใส่ชื่อผู้ใช้'),
		password: Yup.string().required('โปรดใส่รหัสผ่าน'),
        mobileNumber: Yup.string().required('โปรดใส่เบอร์โทร'),
        bankAccountNumber: Yup.string().required('โปรดใส่เลขบัญชี'),
        bankAccountName: Yup.string().required('โปรดใส่ชื่อบัญชี'),
        bankName: Yup.string().uppercase().required('โปรดระบุบัญชีธนาคาร'),
	})

	const formik = useFormik<CustomerAddForm>({
		initialValues: {
			username: data?.username || '',
			password: data?.password || '',
            name: data?.name || '',
            mobileNumber: data?.mobileNumber || '',
            bankAccountNumber: data?.bankAccountNumber || '',
            bankAccountName: data?.bankAccountName || '',
            bankName: data?.bankName || 'scb'
		},
        validationSchema: CustomerAddScheme,
		onSubmit: (values) => {
            // EDIT
            console.log(values)

			setIsOpen(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('customer:edit.successfully')}</span>
				</span>,
				t('customer:edit.customer.successfully', { customerName: values.name || values.username }),
			)
		},
	})

    const { errors, touched, values, setValues, initialValues, resetForm, handleSubmit, handleChange, setFieldValue, isValid } = formik

    useEffect(() => {
        if (type === 'edit') {
            setValues(initialValues)
        } else {
            resetForm()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    return (
        <Modal style={{ maxWidth: '600px' }} isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('customer:new.customer')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row'>
                    <div className='col'>
                        <div className='row g-4'>
                            <h5>
                                <Icon icon='Person' className='ms-1' color='info' />{' '}
                                {t('profile')}
                            </h5>
                            <FormGroup id='username' label={t('form.username')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.username} 
                                    isValid={isValid}
                                    isTouched={touched.username && errors.username}
                                    invalidFeedback={errors.username}
                                />
                            </FormGroup>
                            <FormGroup id='password' label={t('form.password')}>
                                <Input 
                                    type='password'
                                    onChange={handleChange} 
                                    value={values.password} 
                                    isValid={isValid}
                                    isTouched={touched.password && errors.password}
                                    invalidFeedback={errors.password}
                                />
                            </FormGroup>
                            <FormGroup id='name' label={t('form.name')}>
                                <Input onChange={handleChange} value={values.name} />
                            </FormGroup>
                            <FormGroup id='mobileNumber' label={t('form.mobile.number')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.mobileNumber} 
                                    isValid={isValid}
                                    isTouched={touched.mobileNumber && errors.mobileNumber}
                                    invalidFeedback={errors.mobileNumber}
                                />
                            </FormGroup>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row g-4'>
                            <h5>
                                <Icon icon='Bank' className='ms-1' color='info' />{' '}
                                {t('bank.account')}
                            </h5>
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
                        </div>
                    </div>
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

export default CustomerAddModal
