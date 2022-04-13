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

interface CreditModalProperties {
	type: string
	selectedRow: any
}

interface CreditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: CreditModalProperties
}

const CreditModal = ({ id, isOpen, setIsOpen, properties }: CreditModalInterface) => {
    const { t } = useTranslation(['common', 'credit'])
    const { type, selectedRow: data } = properties

    const handleApprove = () => {
        setIsOpen(false)
        // APPROVE

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('credit:approve.successfully')}</span>
            </span>,
            t('credit:approve.request.successfully', { mobileNumber: data?.mobileNumber }),
        )
    }

    const handleReject = () => {
        setIsOpen(false)
        // REJECT

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('credit:reject.successfully')}</span>
            </span>,
            t('credit:reject.request.successfully', { mobileNumber: data?.mobileNumber }),
        )
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'approve' ? t('credit:approve.request') : t('credit:reject.request')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {type === 'approve' ? 
                t('credit:form.approve.request.confirmation', { credit: data?.credit }) 
                : t('credit:form.reject.request.confirmation', { credit: data?.credit })}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button isOutline={type === 'approve'} className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('back')}
                </Button>
                <Button isOutline={type === 'reject'} className='w-50'color='info' onClick={type === 'approve' ? handleApprove : handleReject}>
                    {type === 'approve' ? t('approve') : t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreditModal
