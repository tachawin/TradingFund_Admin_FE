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
import { LevelModalInterface } from './Level'

const LevelDeleteModal = ({ id, isOpen, setIsOpen, properties }: LevelModalInterface) => {
    const { t } = useTranslation(['common', 'level'])
    const { selectedRow: data } = properties

    const handleDelete = () => {
        setIsOpen(false)
        // DELETE

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('level:delete.successfully')}</span>
            </span>,
            t('level:delete.level.successfully', { levelName: data?.levelName }),
        )
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('level:delete.level', { levelName: data?.levelName })}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('level:form.delete.confirmation')}
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

export default LevelDeleteModal
