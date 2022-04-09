import React from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'

interface AdminEditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    data?: any
}

const AdminDeleteModal = ({ id, isOpen, setIsOpen, data }: AdminEditModalInterface) => {
    const { t } = useTranslation('admin')

    const handleDelete = () => {
        setIsOpen(false)
        // DELETE

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('delete.successfully')}</span>
            </span>,
            t('delete.admin.successfully', { adminName: data?.name }),
        )
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('delete.admin', { adminName: data?.name })}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('form.delete.confirmation')}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('cancel')}
                </Button>
                <Button isOutline className='w-50'color='info' onClick={handleDelete}>
                    {t('delete')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AdminDeleteModal
