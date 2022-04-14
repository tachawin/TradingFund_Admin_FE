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
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import Checks from 'components/bootstrap/forms/Checks'

interface AdminEditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    type: 'add' | 'edit' | undefined
    data?: any
}

const AdminEditModal = ({ id, isOpen, setIsOpen, type, data }: AdminEditModalInterface) => {
    const { t } = useTranslation(['common', 'admin'])

	const formik = useFormik({
		initialValues: {
			username: data?.username || '',
			password: data?.password || '',
            name: data?.name || '',
            mobileNumber: data?.mobileNumber || '',
            role: data?.role || 'Admin',
            status: data?.status || true
		},
		onSubmit: (values) => {
            // EDIT
			setIsOpen(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('admin:edit.successfully')}</span>
				</span>,
				t('admin:edit.admin.successfully', { adminName: data?.name }),
			)
		},
	})

    const { values, setFieldValue, initialValues, setValues, resetForm, handleChange, handleSubmit } = formik

    useEffect(() => {
        if (type === 'edit') {
            setValues(initialValues)
        } else {
            resetForm()
        }
    }, [type])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'add' ? t('admin:new.admin') : t('admin:edit.admin', { adminName: data?.name }) }</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <FormGroup id='username' label={t('form.username')}>
                        <Input onChange={handleChange} value={values.username} />
                    </FormGroup>
                    <FormGroup id='password' label={t('form.password')}>
                        <Input 
                            type='password'
                            onChange={handleChange} 
                            value={values.password} 
                        />
                    </FormGroup>
                    <FormGroup id='name' label={t('form.name')}>
                        <Input onChange={handleChange} value={values.name} />
                    </FormGroup>
                    <FormGroup id='mobile-number' label={t('form.mobile.number')}>
                        <Input onChange={handleChange} value={values.mobileNumber} />
                    </FormGroup>
                    <FormGroup id='role' label={t('form.role')}>
                        <div className='row row-cols-2 g-3'>
                            <div className='col'>
                                <Button
                                    color={values.role === 'Admin' ? 'dark' : 'light'}
                                    isLight
                                    className='rounded-1 w-100'
                                    size='lg'
                                    onClick={() => setFieldValue('role', 'Admin')}>
                                    {t('admin:admin')}
                                </Button>
                            </div>
                            <div className='col'>
                                <Button
                                    color={values.role === 'Super Admin' ? 'dark' : 'light'}
                                    isLight
                                    className='rounded-1 w-100'
                                    size='lg'
                                    onClick={() => setFieldValue('role', 'Super Admin')}>
                                    {t('admin:super.admin')}
                                </Button>
                            </div>
                        </div>
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
                    {t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AdminEditModal
