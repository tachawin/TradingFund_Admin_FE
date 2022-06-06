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
import { ProductModalInterface } from './Product'
import { deleteProduct } from 'common/apis/product'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { deleteProductById } from 'redux/product/action'
import { InfoTwoTone } from '@mui/icons-material'

const ProductDeleteModal = ({ id, isOpen, setIsOpen, properties }: ProductModalInterface) => {
    const { t } = useTranslation(['common', 'product'])
    const dispatch = useDispatch()
    const { selectedRow: data } = properties

    const [isLoading, setIsLoading] = useState(false)

    const handleDelete = () => {
        setIsLoading(true)
        data?.productId && deleteProduct(
            data.productId, 
            () => {
                data?.productId && dispatch(deleteProductById(data.productId))
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('product:delete.successfully')}</span>
                    </span>,
                    t('product:delete.product.successfully', { productName: data?.name }),
                )
            },
            (error: any) => {
                const { response } = error
                console.log(response.data)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('product:delete.failed')}</span>
                    </span>,
                    t('product:delete.product.failed', { productName: data?.name }),
                )
            }
        ).finally(() => {
            setIsOpen(false)
            setIsLoading(false)
        })
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id} className='text-nowrap overflow-hidden text-overflow-ellipsis'>
                    {t('product:delete.product', { productName: data?.name })}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {t('product:form.delete.confirmation')}
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

export default ProductDeleteModal
