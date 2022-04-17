import React from 'react'
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

interface ProductForm {
    image: string
    productName: string
    description: string
    quantity: number
    pointsToRedeem: number
}

const ProductModal = ({ id, isOpen, setIsOpen, properties }: ProductModalInterface) => {
    const { t } = useTranslation(['common', 'product'])
    const { selectedRow: data, type } = properties

    const productSchema = Yup.object().shape({
        image: Yup.string().required('กรุณาอัปโหลดภาพ'),
        productName: Yup.string().required('โปรดใส่ชื่อสินค้า'),
        quantity: Yup.string().required('โปรดใส่จำนวนที่มี'),
        pointsToRedeem: Yup.string().required('โปรดใส่แต้มที่ใช้แลก'),
	})

	const formik = useFormik<ProductForm>({
		initialValues: {
			image: data?.image || '',
            productName: data?.name || '',
            description: data?.description || '',
            quantity: data?.quantity || '',
            pointsToRedeem: data?.points || ''
		},
        validationSchema: productSchema,
		onSubmit: (values) => {
            // EDIT
            console.log(values)

			setIsOpen(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<Icon icon='Info' size='lg' className='me-1' />
					<span>{t('product:save.product.successfully')}</span>
				</span>,
				t('product:save.product.name.successfully', { name: values.productName }),
			)
		},
	})

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0]
            const formData = new FormData()
            formData.append('file', uploadedFile)
    
            setFieldValue('image', URL.createObjectURL(uploadedFile))
        }
    }

    const { errors, touched, values, setFieldValue, handleSubmit, handleChange, isValid } = formik

    return (
        <Modal style={{ maxWidth: '600px' }} isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{ type === 'add' ? t('product:add.product') : t('product:edit.product')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4 pb-4'>
                <div className='row align-items-start'>
                    <div className='col'>
                        <div className='row g-4'>
                        <FormGroup id='image' label={t('form.image')}>
                            <div className='row'>
                                <div className='col-12'>
                                    {values.image ? (
                                        <img
                                            src={values.image}
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
                                            accept="image/*"
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleUploadImage(e)}
                                            type='file' 
                                            autoComplete='photo' 
                                        />
                                    </div>
                                </div>
                            </div>
                            </FormGroup>
                        </div>
                    </div>
                    <div className='col'>
                        <div className='row g-4 justify-content-end'>
                            <FormGroup id='productName' label={t('form.product.name')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.productName} 
                                    isValid={isValid}
                                    isTouched={touched.productName && errors.productName}
                                    invalidFeedback={errors.productName}
                                />
                            </FormGroup>
                            <FormGroup id='description' label={t('form.description')}>
                                <Input 
                                    onChange={handleChange} 
                                    value={values.description}
                                    isValid={isValid}
                                    isTouched={touched.description && errors.description}
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
                            <FormGroup id='pointsToRedeem' label={t('form.points.to.redeem')}>
                                <Input 
                                    onChange={handleChange}
                                    type='number'
                                    value={values.pointsToRedeem}
                                    isValid={isValid}
                                    isTouched={touched.pointsToRedeem && errors.pointsToRedeem}
                                    invalidFeedback={errors.pointsToRedeem}
                                />
                            </FormGroup>
                            <Button color='info' className='w-auto mx-3' onClick={handleSubmit}>
                                {t('save')}
                            </Button>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default ProductModal
