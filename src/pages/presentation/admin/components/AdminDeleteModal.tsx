import React, { useState } from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from 'components/bootstrap/Modal'
import showNotification from 'components/extras/showNotification'
import Button from 'components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { AdminInterface, deleteAdmin } from 'common/apis/admin'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { deleteAdminById } from 'redux/admin/action'
import { InfoTwoTone } from '@mui/icons-material'

interface AdminEditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    data?: AdminInterface
}

const AdminDeleteModal = ({ id, isOpen, setIsOpen, data }: AdminEditModalInterface) => {
    const { t } = useTranslation(['common', 'admin'])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        if (data?.adminId) {
            setIsLoading(true)
            deleteAdmin(
                data.adminId, 
                () => {
                    data.adminId && dispatch(deleteAdminById(data.adminId))
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('delete.successfully')}</span>
                        </span>,
                        t('admin:delete.admin.successfully', { adminName: data?.name }),
                    )
                    setIsOpen(false)
                }, (error: any) => {
                    const { response } = error
                    console.log(response.data)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('delete.failed')}</span>
                        </span>,
                        t('admin:delete.admin.failed', { adminName: data?.name }),
                    )
                }
            ).finally(() => setIsLoading(false))
        }
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-2'>
                <ModalTitle id={id}>{t('admin:delete.admin', { adminName: data?.name })}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('admin:form.delete.confirmation')}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('cancel')}
                </Button>
                <Button isOutline className='w-50'color='info' onClick={handleDelete}>
                    {isLoading ? <Spinner size={16} /> : t('delete') }
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AdminDeleteModal
