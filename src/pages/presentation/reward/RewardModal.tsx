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
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'

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

    const handleSuccess = () => {
        setIsOpen(false)
        // REJECT

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

    const RewardFormSchema = Yup.object().shape({
        notes: Yup.string().required('โปรดใส่เลขติดตามพัสดุ'),
	})

    const formik = useFormik({
		initialValues: {
			notes: ''
		},
        validationSchema: type === 'approve' ? RewardFormSchema : undefined,
		onSubmit: (values) => {
			console.log(values)
            setIsOpen(false)
            // APPROVE

            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('reward:sending.successfully')}</span>
                </span>,
                t('reward:sending.reward.successfully', { mobileNumber: data?.mobileNumber }),
            )
		},
	})

	const { 
		values,
		handleSubmit,
		handleChange,
        isValid,
		touched,
		errors
	} = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id}>
                    {type === 'reject' ? t('reward:reject.request') : data.status === 'sending' ?  t('reward:success.reward') : t('reward:sending.reward')}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {type === 'reject' ? t('reward:form.reject.request.confirmation', { product: data?.product })
                    : data.status === 'sending' ? 
                        <FormGroup id='notes' label={t('form.tracking.number')}>
                            <Input 
                                onChange={handleChange} 
                                value={values.notes} 
                                placeholder={t("form.tracking.number.placeholder")}
                                isValid={isValid}
                                isTouched={touched.notes && errors.notes}
                                invalidFeedback={errors.notes}
                            />
                        </FormGroup>
                        : t('reward:form.sending.request.confirmation', { product: data?.product })
                }
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button isOutline={type === 'approve'} className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('back')}
                </Button>
                <Button isOutline={type === 'reject'} className='w-50'color='info' onClick={type === 'reject' ? handleReject : data.status === 'sending' ? handleSubmit : handleSuccess}>
                    {type === 'approve' ? t('approve') : t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default RewardModal
