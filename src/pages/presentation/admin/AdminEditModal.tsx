import React, { useEffect, useState } from 'react'
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
import Checks from 'components/bootstrap/forms/Checks'
import { AdminInterface, AdminRole, createAdmin } from 'common/apis/admin'
import * as Yup from 'yup'
import { Status } from 'pages/common/CommonEnums'
import Spinner from 'components/bootstrap/Spinner'

export enum AdminModalType {
    Add = 'add',
    Edit = 'edit'
}

interface AdminEditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    type: AdminModalType
    data?: any
}

const AdminEditModal = ({ id, isOpen, setIsOpen, type, data }: AdminEditModalInterface) => {
    const { t } = useTranslation(['common', 'admin'])
    const [isLoading, setIsLoading] = useState(false)

    const adminSchema = Yup.object().shape({
		username: Yup.string().required('โปรดใส่ชื่อผู้ใช้'),
		password: Yup.string().required('โปรดใส่รหัสผ่าน').test('length', 'รหัสผ่านต้องยาวกว่า 6 อักษร', val => (val?.length ?? 0) > 5),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'รหัสผ่านต้องตรงกัน').required('กรุณายินยันรหัสผ่าน'),
        name: Yup.string().required('กรุณาใส่ชื่อ นามสกุล'),
        mobileNumber: Yup.string().matches(/(\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4})/, 'กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง').required('กรุณาใส่เบอร์โทรศัพท์')
	})

	const formik = useFormik({
		initialValues: {
			username: data?.username || '',
			password: data?.password || '',
            confirmPassword: data?.password || '',
            name: data?.name || '',
            mobileNumber: data?.mobileNumber || '',
            role: data?.role || AdminRole.Admin,
            status: data?.status || Status.Active
		},
        validationSchema: adminSchema,
		onSubmit: (values) => {
            // ADD ADMIN
            setIsLoading(true)
            if (type === AdminModalType.Add) {
                addAdmin(values)
            } else {
                
            }
            // EDIT
		},
	})

    const { values, setFieldValue, initialValues, setValues, resetForm, handleChange, handleSubmit, isValid, touched, errors } = formik

    const addAdmin = (data: AdminInterface) => {
        createAdmin(data).then((response) => {
            console.log(response.data)

            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('admin:save.successfully')}</span>
                </span>,
                t('admin:save.admin.successfully', { adminName: values.name }),
            )
        }).catch((err) => {
            const { response } = err
            const message = response?.data
            console.log(message)
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('admin:save.failed')}</span>
                </span>,
                t('admin:save.admin.failed', { adminName: values.name }),
            )
        }).finally(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
    }

    const editAdmin = (data: AdminInterface) => {
        // createAdmin(data).then((response) => {
        //     console.log(response.data)

        //     showNotification(
        //         <span className='d-flex align-items-center'>
        //             <Icon icon='Info' size='lg' className='me-1' />
        //             <span>{t('admin:save.successfully')}</span>
        //         </span>,
        //         t('admin:save.admin.successfully', { adminName: data?.name }),
        //     )
        // }).catch((err) => {
        //     const { response } = err
        //     const message = response?.data
        //     console.log(message)
        //     showNotification(
        //         <span className='d-flex align-items-center'>
        //             <Icon icon='Info' size='lg' className='me-1' />
        //             <span>{t('admin:save.failed')}</span>
        //         </span>,
        //         t('admin:save.admin.failed', { name: values.name }),
        //     )
        // }).finally(() => {
        //     setIsOpen(false)
        // })
    }

    useEffect(() => {
        if (type === 'edit') {
            setValues(initialValues)
        } else {
            resetForm()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'add' ? t('admin:new.admin') : t('admin:edit.admin', { adminName: data?.name }) }</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
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
                    <FormGroup id='confirmPassword' label={t('form.confirm.password')}>
                        <Input 
                            type='password'
                            onChange={handleChange} 
                            value={values.confirmPassword}
                            isValid={isValid}
                            isTouched={touched.confirmPassword && errors.confirmPassword}
                            invalidFeedback={errors.confirmPassword}
                        />
                    </FormGroup>
                    <div className='row mt-4'>
                        <FormGroup id='name' label={t('form.name')} className='col'>
                            <Input 
                                onChange={handleChange} 
                                value={values.name}
                                isValid={isValid}
                                isTouched={touched.name && errors.name}
                                invalidFeedback={errors.name}
                            />
                        </FormGroup>
                        <FormGroup id='mobileNumber' label={t('form.mobile.number')} className='col'>
                            <Input 
                                onChange={handleChange} 
                                value={values.mobileNumber}
                                isValid={isValid}
                                isTouched={touched.mobileNumber && errors.mobileNumber}
                                invalidFeedback={errors.mobileNumber}
                            />
                        </FormGroup>
                    </div>
                    <div className='row mt-4'>
                        <FormGroup id='role' className='col-8' label={t('form.role')}>
                            <div className='row row-cols-2 g-3'>
                                <div className='col'>
                                    <Button
                                        color={values.role === AdminRole.Admin ? 'dark' : 'light'}
                                        isLight
                                        className='rounded-1 w-100 fs-6'
                                        size='lg'
                                        onClick={() => setFieldValue('role', AdminRole.Admin)}>
                                        {t('admin:admin')}
                                    </Button>
                                </div>
                                <div className='col'>
                                    <Button
                                        color={values.role === AdminRole.SuperAdmin ? 'dark' : 'light'}
                                        isLight
                                        className='rounded-1 w-100 fs-6'
                                        size='lg'
                                        onClick={() => setFieldValue('role', AdminRole.SuperAdmin)}>
                                        {t('admin:super.admin')}
                                    </Button>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup id='status' className='col-4' label={t('form.status')}>
                            <Checks
                                id='status'
                                type='switch'
                                label={values.status === Status.Active ? t('active') : t('inactive')}
                                onChange={handleChange}
                                checked={values.status}
                                ariaLabel='status'
                            />
                        </FormGroup>
                    </div>
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

export default AdminEditModal
