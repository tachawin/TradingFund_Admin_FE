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

interface WithdrawModalProperties {
	selectedRow: any
}

interface WithdrawModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: WithdrawModalProperties
}

const WithdrawCancelModal = ({ id, isOpen, setIsOpen, properties }: WithdrawModalInterface) => {
    const { t } = useTranslation(['common', 'withdraw'])
    const { selectedRow: data } = properties

    const handleReject = () => {
        setIsOpen(false)
        // REJECT

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('withdraw:reject.successfully')}</span>
            </span>,
            t('withdraw:reject.request.successfully', { mobileNumber: data?.mobileNumber }),
        )
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('withdraw:reject.request')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('withdraw:form.reject.request.confirmation')}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('back')}
                </Button>
                <Button isOutline className='w-50'color='info' onClick={handleReject}>
                    {t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default WithdrawCancelModal
