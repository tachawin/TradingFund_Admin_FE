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
import { BankModalInterface } from './Bank'

const BankDeleteModal = ({ id, isOpen, setIsOpen, properties }: BankModalInterface) => {
    const { t } = useTranslation(['common', 'bank'])
    const { selectedRow: data } = properties

    const handleDelete = () => {
        setIsOpen(false)
        // DELETE

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('bank:delete.successfully')}</span>
            </span>,
            t('bank:delete.bank.successfully', { bankName: data?.bankName }),
        )
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('bank:delete.bank', { bankName: data?.bankName })}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('bank:form.delete.confirmation')}
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

export default BankDeleteModal
