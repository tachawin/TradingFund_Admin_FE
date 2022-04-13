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

interface RewardModalProperties {
	type: string
	selectedRow: any
}

interface RewardModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: RewardModalProperties
}

const RewardModal = ({ id, isOpen, setIsOpen, properties }: RewardModalInterface) => {
    const { t } = useTranslation(['common', 'reward'])
    const { type, selectedRow: data } = properties

    const handleApprove = () => {
        setIsOpen(false)
        // APPROVE

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('reward:approve.successfully')}</span>
            </span>,
            t('reward:approve.request.successfully', { mobileNumber: data?.mobileNumber }),
        )
    }

    const handleReject = () => {
        setIsOpen(false)
        // REJECT

        showNotification(
            <span className='d-flex align-items-center'>
                <Icon icon='Info' size='lg' className='me-1' />
                <span>{t('reward:reject.successfully')}</span>
            </span>,
            t('reward:reject.request.successfully', { mobileNumber: data?.mobileNumber }),
        )
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'approve' ? t('reward:approve.request') : t('reward:reject.request')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {type === 'approve' ? 
                t('reward:form.approve.request.confirmation', { product: data?.product }) 
                : t('reward:form.reject.request.confirmation', { product: data?.product })}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button isOutline={type === 'approve'} className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('cancel')}
                </Button>
                <Button isOutline={type === 'reject'} className='w-50'color='info' onClick={type === 'approve' ? handleApprove : handleReject}>
                    {type === 'approve' ? t('approve') : t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default RewardModal
