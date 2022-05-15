import React, { useState } from 'react'
import { useFormik } from 'formik'
import Modal, {
	ModalBody,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Icon from '../../../components/icon/Icon'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import Button from 'components/bootstrap/Button'
import PlaceholderImage from 'components/extras/PlaceholderImage'
import { ProductModalInterface } from './Product'
import { createProduct, updateProduct, ProductBaseInterface } from 'common/apis/product'
import Spinner from 'components/bootstrap/Spinner'
import Textarea from '../../../components/bootstrap/forms/Textarea'
import { useDispatch } from 'react-redux'
import { addProduct, updateProductById } from 'redux/product/action'

interface ProductForm {
    imageURL: string
    name: string
    description?: string
    quantity: string | number
    point: string | number
}

const ProductModal = ({ isOpen, setIsOpen, properties }: ProductModalInterface) => {
    const { t } = useTranslation(['common', 'product'])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const { selectedRow: data, type } = properties

    const productSchema = Yup.object().shape({
        // imageURL: Yup.string().required('กรุณาอัปโหลดภาพ'),
        name: Yup.string().required('โปรดใส่ชื่อสินค้า'),
        quantity: Yup.string().required('โปรดใส่จำนวนที่มี'),
        point: Yup.string().required('โปรดใส่แต้มที่ใช้แลก'),
	})

    const addNewProduct = (requestBody: ProductBaseInterface) => {
        createProduct(requestBody).then((response) => {    
            dispatch(addProduct(response.data))
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('product:save.product.successfully')}</span>
                </span>,
                t('product:save.product.name.successfully', { name: values.name }),
            )
        }).catch((err) => {
            const { response } = err
            const message = response?.data
            console.log(message)
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('product:save.failed')}</span>
                </span>,
                t('product:save.product.failed', { productName: values.name }),
            )
        }).finally(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
    }

    const editProduct = (requestBody: ProductBaseInterface) => {
        data?.productId && updateProduct(data.productId, requestBody).then((response) => {    
            const { data } = response
            dispatch(updateProductById(data.productId, data))
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('product:save.product.successfully')}</span>
                </span>,
                t('product:save.product.name.successfully', { name: values.name }),
            )
        }).catch((err) => {
            const { response } = err
            const message = response?.data
            console.log(message)
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('product:save.failed')}</span>
                </span>,
                t('product:save.product.failed', { productName: values.name }),
            )
        }).finally(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
    }

	const formik = useFormik<ProductForm>({
		initialValues: {
			imageURL: data?.imageURL || '',
            name: data?.name || '',
            description: data?.description || '',
            quantity: data?.quantity || '',
            point: data?.point || ''
		},
        validationSchema: productSchema,
		onSubmit: (values) => {
            setIsLoading(true)
            let requestBody: ProductBaseInterface = {
                ...values,
                quantity: values.quantity as number,
                point: values.point as number
            }
            if (type === 'add') {
                addNewProduct(requestBody)
            } else {
                editProduct(requestBody)
            }
		},
	})

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0]
            const formData = new FormData()
            formData.append('file', uploadedFile)
    
            setFieldValue('imageURL', URL.createObjectURL(uploadedFile))
        }
    }

    const { errors, touched, values, setFieldValue, handleSubmit, handleChange, isValid } = formik

    return (
        <Modal style={{ maxWidth: '600px' }} isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={data?.productId} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={data?.productId}>{ type === 'add' ? t('product:add.product') : t('product:edit.product')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4 pb-4'>
                <div className='row align-items-start'>
                    <div className='col'>
                        <div className='row g-4'>
                        <FormGroup id='imageURL' label={t('form.image')}>
                            <div className='row'>
                                <div className='col-12 my-3'>
                                    {values.imageURL ? (
                                        <img
                                            src={values.imageURL}
                                            alt=''
                                            width={220}
                                            height={220}
                                            style={{ minHeight: 220, minWidth: 220, objectFit: 'contain' }}
                                            className='mx-auto d-block img-fluid mb-3'
                                        />
                                    ) : (
                                        <PlaceholderImage
                                            width={220}
                                            height={220}
                                            className='mx-auto d-block img-fluid mb-3 rounded'
                                        />
                                    )}
                                </div>
                                <div className='col-12'>
                                    <div className='row g-4'>
                                        <Input
                                            accept="imageURL/*"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUploadImage(e)}
                                            type='file' 
                                            autoComplete='photo'
                                            isValid={isValid}
                                            isTouched={touched.imageURL && errors.imageURL}
                                            invalidFeedback={errors.imageURL}
                                        />
                                    </div>
                                </div>
                            </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row g-4 justify-content-end'>
                            <FormGroup id='name' label={t('form.product.name')}>
                                <Input 
                                    onChange={handleChange}
                                    value={values.name} 
                                    isValid={isValid}
                                    isTouched={touched.name && errors.name}
                                    invalidFeedback={errors.name}
                                />
                            </FormGroup>
                            <FormGroup id='description' label={t('form.description')}>
                                <Textarea 
                                    onChange={handleChange} 
                                    value={values.description}
                                    isValid={isValid}
                                    isTouched={Boolean(touched.description && errors.description)}
                                    invalidFeedback={errors.description}
                                />
                            </FormGroup>
                            <FormGroup id='quantity' label={t('form.quantity')}>
                                <Input 
                                    onChange={handleChange}
                                    type='number'
                                    value={values.quantity}
                                    isValid={isValid}
                                    isTouched={touched.quantity && errors.quantity}
                                    invalidFeedback={errors.quantity}
                                />
                            </FormGroup>
                            <FormGroup id='point' label={t('form.points.to.redeem')}>
                                <Input 
                                    onChange={handleChange}
                                    type='number'
                                    value={values.point}
                                    isValid={isValid}
                                    isTouched={touched.point && errors.point}
                                    invalidFeedback={errors.point}
                                />
                            </FormGroup>
                            <Button color='info' className='w-auto mx-3' onClick={handleSubmit}>
                                {isLoading ? <Spinner size={16} /> : t('save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ProductModal
