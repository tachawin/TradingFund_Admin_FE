import React, { useState } from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { InfoTwoTone } from '@mui/icons-material'
import { WithdrawCancelModalProperties } from './Withdraw'
import Spinner from 'components/bootstrap/Spinner'
import { rejectWithdraw } from 'common/apis/withdraw'
import { useDispatch } from 'react-redux'
import { removeWithdrawById } from 'redux/withdraw/action'

interface WithdrawModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: WithdrawCancelModalProperties
}

const WithdrawCancelModal = ({ id, isOpen, setIsOpen, properties }: WithdrawModalInterface) => {
    const { t } = useTranslation(['common', 'withdraw'])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { selectedRow: data } = properties

    const handleReject = () => {
        data.transactionId && rejectWithdraw(data.transactionId, (response) => {
            data.transactionId && dispatch(removeWithdrawById(data.transactionId))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('withdraw:reject.successfully')}</span>
                </span>,
                t('withdraw:reject.request.successfully', { mobileNumber: data?.mobileNumber }),
            )
        }, () => {
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('withdraw:reject.failed')}</span>
                </span>,
                t('withdraw:reject.request.failed', { mobileNumber: data?.mobileNumber }),
            )
        }).finally(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
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
                    {isLoading ? <Spinner size={16} /> : t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default WithdrawCancelModal
