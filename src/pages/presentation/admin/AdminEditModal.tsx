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

interface AdminEditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    type: 'add' | 'edit' | undefined
    data?: any
}

const AdminEditModal = ({ id, isOpen, setIsOpen, type, data }: AdminEditModalInterface) => {
    const { t } = useTranslation('admin')

	const formik = useFormik({
		initialValues: {
			username: data?.username || '',
			password: data?.password || '',
            name: data?.name || '',
            mobileNumber: data?.mobileNumber || '',
            role: data?.role || 'Admin'
		},
		onSubmit: (values) => {
            // EDIT
			setIsOpen(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('edit.successfully')}</span>
				</span>,
				t('edit.admin.successfully', { adminName: data?.name }),
			)
		},
	})

    const { values, setFieldValue } = formik

    useEffect(() => {
        if (type === 'edit') {
            formik.setValues({
                username: data?.username || '',
                password: data?.password || '',
                name: data?.name || '',
                mobileNumber: data?.mobileNumber || '',
                role: data?.role || 'Admin'
            })
        } else {
            formik.resetForm()
        }
    }, [type])

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'add' ? t('new.admin') : t('edit.admin', { adminName: data?.name }) }</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <FormGroup id='username' label={t('form.username')}>
                        <Input onChange={formik.handleChange} value={formik.values.username} />
                    </FormGroup>
                    <FormGroup id='password' label={t('form.password')}>
                        <Input 
                            type='password'
                            onChange={formik.handleChange} 
                            value={formik.values.password} 
                        />
                    </FormGroup>
                    <FormGroup id='name' label={t('form.name')}>
                        <Input onChange={formik.handleChange} value={formik.values.name} />
                    </FormGroup>
                    <FormGroup id='mobile-number' label={t('form.mobile.number')}>
                        <Input onChange={formik.handleChange} value={formik.values.mobileNumber} />
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
                                    {t('admin')}
                                </Button>
                            </div>
                            <div className='col'>
                                <Button
                                    color={values.role === 'Super Admin' ? 'dark' : 'light'}
                                    isLight
                                    className='rounded-1 w-100'
                                    size='lg'
                                    onClick={() => setFieldValue('role', 'Super Admin')}>
                                    {t('super.admin')}
                                </Button>
                            </div>
                        </div>
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

export default AdminEditModal
