import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from 'components/bootstrap/Modal'
import showNotification from 'components/extras/showNotification'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import Button, { ButtonGroup } from 'components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import Checks from 'components/bootstrap/forms/Checks'
import { AdminStatus, AdminInterface, AdminRole, createAdmin, updateAdmin, AdminUpdateInterface, updateAdminPassword } from 'common/apis/admin'
import * as Yup from 'yup'
import Spinner from 'components/bootstrap/Spinner'
import regEx from 'common/utils/commonRegEx'
import { useDispatch } from 'react-redux'
import { addAdmin, updateAdminById } from 'redux/admin/action'
import { InfoTwoTone } from '@mui/icons-material'

export enum AdminModalType {
    Add = 'add',
    Edit = 'edit'
}

enum AdminModalState {
    Profile = 'profile',
    Password = 'password',
}

interface AdminModalProperties {
    type?: AdminModalType
    selectedRow?: AdminInterface
}

interface AdminEditModalInterface {
	id?: string
	isOpen?: boolean
	setIsOpen: any
    properties: AdminModalProperties
}

const AdminEditModal = ({ id, isOpen, setIsOpen, properties }: AdminEditModalInterface) => {
    const role = localStorage.getItem('role') ?? ''
    const { t } = useTranslation(['common', 'admin'])
    const dispatch = useDispatch()
    const { selectedRow: data, type } = properties
    const [isLoading, setIsLoading] = useState(false)
    const [adminModalState, setAdminModalState] = useState(AdminModalState.Profile)

    const passwordSchema = {
        password: Yup.string().required('โปรดใส่รหัสผ่าน').test('length', 'รหัสผ่านต้องยาวกว่า 6 อักษร', val => (val?.length ?? 0) > 5),
        confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'รหัสผ่านต้องตรงกัน').required('กรุณายินยันรหัสผ่าน'),
    }

    const adminAddSchema = Yup.object().shape({
		username: Yup.string().matches(regEx.username, 'ชื่อผู้ใช้สามารถประกอบด้วยตัวอักษร ตัวเลขและสัญลักษณ์ขีดล่าง (_)').required('โปรดใส่ชื่อผู้ใช้'),
        name: Yup.string().required('กรุณาใส่ชื่อ นามสกุล'),
        mobileNumber: Yup.string().matches(regEx.mobileNumber, 'กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง').required('กรุณาใส่เบอร์โทรศัพท์'),
        ...passwordSchema
	})

    const adminEditProfileSchema = Yup.object().shape({
		username: Yup.string().matches(regEx.username, 'ชื่อผู้ใช้สามารถประกอบด้วยตัวอักษร ตัวเลขและสัญลักษณ์ขีดล่าง (_)').required('โปรดใส่ชื่อผู้ใช้'),
        name: Yup.string().required('กรุณาใส่ชื่อ นามสกุล'),
        mobileNumber: Yup.string().matches(regEx.mobileNumber, 'กรุณาใส่เบอร์โทรศัพท์ให้ถูกต้อง').required('กรุณาใส่เบอร์โทรศัพท์')
	})

    const adminEditPasswordSchema = Yup.object().shape(passwordSchema)

	const formik = useFormik({
		initialValues: {
			username: data?.username || '',
			password: data?.password || '',
            confirmPassword: data?.password || '',
            name: data?.name || '',
            mobileNumber: data?.mobileNumber || '',
            role: data?.role || AdminRole.Admin,
            status: type === AdminModalType.Edit ? data?.status === AdminStatus.Active : true
		},
        validationSchema: type === AdminModalType.Add ? adminAddSchema : (adminModalState === AdminModalState.Profile ? adminEditProfileSchema : adminEditPasswordSchema),
		onSubmit: (values) => {
            setIsLoading(true)
            let status = values.status ? AdminStatus.Active : AdminStatus.Inactive
            if (type === AdminModalType.Add) {
                handleAddAdmin({ ...values, status })
            } else {
                editAdmin({ ...values, status })
            }
		},
	})

    const { values, setFieldValue, initialValues, setValues, resetForm, handleChange, handleSubmit, isValid, touched, errors } = formik

    const handleAddAdmin = (adminData: AdminInterface) => {
        createAdmin(adminData, (admin: AdminInterface) => {
            dispatch(addAdmin(admin))
            setIsOpen(false)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.successfully')}</span>
                </span>,
                t('admin:save.admin.successfully', { adminName: values.name }),
            )
        }, (error) => {
            const { response } = error
            const message = response?.data
            console.log(message)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('save.failed')}</span>
                </span>,
                t('admin:save.admin.failed', { adminName: values.name }),
            )
        }).finally(() => setIsLoading(false))
    }

    const editAdmin = (adminData: AdminInterface) => {
        let dataToUpdate: AdminUpdateInterface = {}
        if (adminModalState === AdminModalState.Password) {
            dataToUpdate = { newPassword: adminData.password }
            data?.adminId && updateAdminPassword(data.adminId, dataToUpdate, () => {
                data.adminId && dispatch(updateAdminById(data.adminId, { ...dataToUpdate, updatedAt: new Date() }))
                setIsOpen(false)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('save.successfully')}</span>
                    </span>,
                    t('admin:save.admin.successfully', { adminName: values.name }),
                )
            }, (error) => {
                const { response } = error
                const message = response?.data
                console.log(message)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('save.failed')}</span>
                    </span>,
                    t('admin:save.admin.failed', { adminName: values.name }),
                )
            }).finally(() => setIsLoading(false))
        } else {
            dataToUpdate = {
                name: adminData.name,
                mobileNumber: adminData.mobileNumber,
                role: adminData.role,
                status: adminData.status
            }
            data?.adminId && updateAdmin(data.adminId, dataToUpdate, () => {
                data.adminId && dispatch(updateAdminById(data.adminId, { ...dataToUpdate, updatedAt: new Date() }))
                setIsOpen(false)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('save.successfully')}</span>
                    </span>,
                    t('admin:save.admin.successfully', { adminName: values.name }),
                )
            }, (error) => {
                const { response } = error
                const message = response?.data
                console.log(message)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('save.failed')}</span>
                    </span>,
                    t('admin:save.admin.failed', { adminName: values.name }),
                )
            }).finally(() => setIsLoading(false))
        }
    }

    useEffect(() => {
        if (type === 'edit') {
            setValues(initialValues)
        } else {
            resetForm()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [type])

    const passwordFields = () => (<>
        <FormGroup id='password' label={t('form.password')}>
            <Input 
                type='password'
                placeholder={t('form.password.placeholder')}
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
                placeholder={t('form.confirm.password.placeholder')}
                onChange={handleChange} 
                value={values.confirmPassword}
                isValid={isValid}
                isTouched={touched.confirmPassword && errors.confirmPassword}
                invalidFeedback={errors.confirmPassword}
            />
        </FormGroup>
    </>)

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-2'>
                <ModalTitle id={id}>{type === 'add' ? t('admin:new.admin') : t('admin:edit.admin', { adminName: data?.name }) }</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    {type === AdminModalType.Edit && <ButtonGroup>
                        <Button
                            color={adminModalState === AdminModalState.Profile ? 'success' : 'dark'}
                            isLight={adminModalState !== AdminModalState.Profile}
                            onClick={() => setAdminModalState(AdminModalState.Profile)}
                        >
                            {t('profile')}
                        </Button>
                        <Button
                            color={adminModalState === AdminModalState.Password ? 'success' : 'dark'}
                            isLight={adminModalState !== AdminModalState.Password}
                            onClick={() => setAdminModalState(AdminModalState.Password)}
                        >
                            {t('password')}
                        </Button>
                    </ButtonGroup>}
                    { adminModalState === AdminModalState.Profile ? <>
                        { type === AdminModalType.Add && <>
                            <FormGroup id='username' label={t('form.username')}>
                                <Input
                                    placeholder={t('form.username.placeholder')}
                                    onChange={handleChange} 
                                    value={values.username}
                                    isValid={isValid}
                                    isTouched={touched.username && errors.username}
                                    invalidFeedback={errors.username}
                                />
                            </FormGroup>
                            {passwordFields()}
                        </>}
                        <div className='row mt-4'>
                            <FormGroup id='name' label={t('form.name')} className='col'>
                                <Input
                                    placeholder={t('form.name.placeholder')}
                                    onChange={handleChange} 
                                    value={values.name}
                                    isValid={isValid}
                                    isTouched={touched.name && errors.name}
                                    invalidFeedback={errors.name}
                                />
                            </FormGroup>
                            <FormGroup id='mobileNumber' label={t('form.mobile.number')} className='col'>
                                <Input
                                    placeholder={t('form.mobile.number.placeholder')}
                                    onChange={handleChange} 
                                    value={values.mobileNumber}
                                    isValid={isValid}
                                    isTouched={touched.mobileNumber && errors.mobileNumber}
                                    invalidFeedback={errors.mobileNumber}
                                />
                            </FormGroup>
                        </div>
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
                                        onClick={() => setFieldValue('role', AdminRole.SuperAdmin)}
                                        isDisable={role === AdminRole.Admin}
                                    >
                                        {t('admin:super.admin')}
                                    </Button>
                                </div>
                            </div>
                        </FormGroup>
                        <FormGroup id='status' className='col-4' label={t('form.status')}>
                            <Checks
                                id='status'
                                type='switch'
                                label={values.status ? t('active') : t('inactive')}
                                onChange={() => setFieldValue('status', !values.status)}
                                checked={values.status}
                                ariaLabel='status'
                            />
                        </FormGroup>
                    </> : passwordFields()}
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
