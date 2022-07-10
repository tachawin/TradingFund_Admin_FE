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
import { CreditConditionModalInterface } from './CreditCondition'
import { InfoTwoTone } from '@mui/icons-material'
import { deleteCreditCondition } from 'common/apis/creditCondition'
import { useDispatch } from 'react-redux'
import { deleteCreditConditionById } from 'redux/creditCondition/action'
import Spinner from 'components/bootstrap/Spinner'

const CreditConditionDeleteModal = ({ id, isOpen, setIsOpen, properties }: CreditConditionModalInterface) => {
    const { t } = useTranslation(['common', 'creditCondition'])
    const { selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        setIsLoading(true)
        data?.conditionId && deleteCreditCondition(data.conditionId, () => {
            dispatch(deleteCreditConditionById(data.conditionId))
            setIsOpen(false)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('creditCondition:delete.successfully')}</span>
                </span>,
                t('creditCondition:delete.credit.condition.successfully', { point: data?.point, credit: data.credit }),
            )
        }, () => {
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('creditCondition:delete.failed')}</span>
                </span>,
                t('creditCondition:delete.credit.condition.failed', { point: data?.point, credit: data.credit }),
            )
        }).finally(() => setIsLoading(false))
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{t('creditCondition:delete.credit.condition', { point: data?.point })}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('creditCondition:form.delete.confirmation')}
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('cancel')}
                </Button>
                <Button isOutline className='w-50'color='info' onClick={handleDelete}>
                    {isLoading ? <Spinner size={16} /> : t('delete')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreditConditionDeleteModal
