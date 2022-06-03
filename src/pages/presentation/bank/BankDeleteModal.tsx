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
import { BankModalInterface } from './Bank'
import { deleteCompanyBank } from 'common/apis/companyBank'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { deleteCompanyBankById } from 'redux/companyBank/action'
import { InfoTwoTone } from '@mui/icons-material'

const BankDeleteModal = ({ id, isOpen, setIsOpen, properties }: BankModalInterface) => {
    const { t } = useTranslation(['common', 'bank'])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { selectedRow: data } = properties

    const handleDelete = () => {
        setIsLoading(true)
        data?.bankId && deleteCompanyBank(
            data.bankId,
            () => {
                data?.bankId && dispatch(deleteCompanyBankById(data.bankId))
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('bank:delete.successfully')}</span>
                    </span>,
                    t('bank:delete.bank.successfully', { bankName: data?.bankName }),
                )
            }, (error: any) => {
                const { response } = error
                console.log(response.data)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('bank:delete.failed')}</span>
                    </span>,
                    t('bank:delete.bank.failed', { bankName: data?.bankName }),
                )
            }
        ).finally(() => {
            setIsOpen(false)
            setIsLoading(false)
        })
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
                {isLoading ? <Spinner size={16} /> : t('delete') }
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default BankDeleteModal
