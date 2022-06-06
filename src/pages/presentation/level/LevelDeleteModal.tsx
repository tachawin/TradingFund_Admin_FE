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
import { LevelModalInterface } from './Level'
import { InfoTwoTone } from '@mui/icons-material'
import { deleteLevel } from 'common/apis/level'
import { useDispatch } from 'react-redux'
import { deleteLevelById } from 'redux/level/action'
import Spinner from 'components/bootstrap/Spinner'

const LevelDeleteModal = ({ id, isOpen, setIsOpen, properties }: LevelModalInterface) => {
    const { t } = useTranslation(['common', 'level'])
    const { selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        setIsLoading(true)
        data?.levelId && deleteLevel(data.levelId, () => {
            dispatch(deleteLevelById(data.levelId))
            setIsOpen(false)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:delete.successfully')}</span>
                </span>,
                t('level:delete.level.successfully', { levelName: data?.levelName }),
            )
        }, () => {
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:delete.failed')}</span>
                </span>,
                t('level:delete.level.failed', { levelName: data?.levelName }),
            )
        }).finally(() => setIsLoading(false))
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
                    {isLoading ? <Spinner size={16} /> : t('delete')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default LevelDeleteModal
