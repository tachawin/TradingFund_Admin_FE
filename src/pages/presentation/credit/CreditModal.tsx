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
import { RedeemAction, RedeemInterface, updateRedeemCredit } from 'common/apis/redeem'
import { useDispatch } from 'react-redux'
import { removeRedeemCreditById } from 'redux/redeemCredit/action'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone } from '@mui/icons-material'

export enum CreditModalType {
    Approve = 'approve',
    Reject = 'reject'
}
interface CreditModalProperties {
	type: CreditModalType
	selectedRow: RedeemInterface
}

interface CreditModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: CreditModalProperties
}

const CreditModal = ({ id, isOpen, setIsOpen, properties }: CreditModalInterface) => {
    const { t } = useTranslation(['common', 'credit'])
    const dispatch = useDispatch()
    const { type, selectedRow: data } = properties
    const [isLoading, setIsLoading] = useState(false)

    const handleApprove = () => {
        setIsLoading(true)
        data.redeemId && updateRedeemCredit(data.redeemId, RedeemAction.Accept, {}, () => {
            data.redeemId && dispatch(removeRedeemCreditById(data.redeemId))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('credit:approve.successfully')}</span>
                </span>,
                t('credit:approve.request.successfully', { mobileNumber: data?.mobileNumber }),
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('credit:approve.failed')}</span>
                </span>,
                t('credit:approve.request.failed', { mobileNumber: data?.mobileNumber }),
            )
        }).finally(() => {
            setIsOpen(false)
            setIsLoading(false)
        })
    }

    const handleReject = () => {
        setIsLoading(true)
        data.redeemId && updateRedeemCredit(data.redeemId, RedeemAction.Reject, {}, () => {
            data.redeemId && dispatch(removeRedeemCreditById(data.redeemId))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('credit:reject.successfully')}</span>
                </span>,
                t('credit:reject.request.successfully', { mobileNumber: data?.mobileNumber }),
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('credit:reject.failed')}</span>
                </span>,
                t('credit:reject.request.failed', { mobileNumber: data?.mobileNumber }),
            )
        }).finally(() => {
            setIsOpen(false)
            setIsLoading(false)
        })
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === CreditModalType.Approve ? t('credit:approve.request') : t('credit:reject.request')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {type === CreditModalType.Approve ? 
                t('credit:form.approve.request.confirmation', { credit: data?.credit }) 
                : t('credit:form.reject.request.confirmation', { credit: data?.credit })}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button isOutline={type === CreditModalType.Approve} className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('back')}
                </Button>
                <Button isOutline={type === CreditModalType.Reject} className='w-50'color='info' onClick={type === CreditModalType.Approve ? handleApprove : handleReject}>
                    {isLoading ? <Spinner size={16} /> : type === CreditModalType.Approve ? t('approve') : t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreditModal
