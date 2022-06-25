import React, { ChangeEvent, useState } from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal'
import showNotification from '../../../components/extras/showNotification'
import Button from '../../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import { CreditConditionModalInterface } from './CreditCondition'
import { InfoTwoTone } from '@mui/icons-material'
import { createCreditCondition, CreditConditionInterface, updateCreditCondition } from 'common/apis/creditCondition'
import { useDispatch } from 'react-redux'
import { addCreditCondition, updateCreditConditionById } from 'redux/creditCondition/action'
import Spinner from 'components/bootstrap/Spinner'
import Checks from 'components/bootstrap/forms/Checks'

export enum CreditConditionModalType {
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete'
}

interface CreditConditionInputInterface {
    point?: number
    credit?: number
    quantity?: number
}

const CreditConditionModal = ({ id, isOpen, setIsOpen, properties }: CreditConditionModalInterface) => {
    const { t } = useTranslation(['common', 'creditCondition'])
    const { type, selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)
    const [isLimited, setIsLimited] = useState(data?.quantity ? data?.quantity > -1 : false)

    const baseFormSchema = {
        point: Yup.number().min(1, 'โปรดใส่คะแนนที่ใช้แลก').required('โปรดใส่คะแนนที่ใช้แลก'),
        credit: Yup.number().min(1, 'โปรดใส่คะแนนที่ใช้แลก').required('โปรดใส่เครดิตที่ได้รับ'),
	}
    const quantityFormSchema = { quantity: Yup.number().required('โปรดใส่จำนวนที่แลกเงื่อนไขได้') }

    const CreditConditionFormSchema = Yup.object().shape(baseFormSchema)
    const CreditConditionWithQuantityFormSchema = Yup.object().shape({ ...baseFormSchema, ...quantityFormSchema})
	
	const formik = useFormik<CreditConditionInputInterface>({
		initialValues: {
            point: data?.point,
            credit: data?.credit,
            quantity: data?.quantity
		},
        validationSchema: isLimited ? CreditConditionWithQuantityFormSchema : CreditConditionFormSchema,
		onSubmit: (values) => {
            setIsLoading(true)
            if (!isLimited) {
                delete values.quantity
            }
            if (type === CreditConditionModalType.Add) {
                createCreditCondition({
                    ...values,
                    point: values.point || 0,
                    credit: values.credit || 0
                }, (creditCondition: CreditConditionInterface) => {
                    dispatch(addCreditCondition(creditCondition))
                    setIsOpen(false)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:added.successfully')}</span>
                        </span>,
                        t('creditCondition:added.credit.condition.successfully', { credit: data?.credit, point: data?.point }),
                    )
                }, () => {
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:added.failed')}</span>
                        </span>,
                        t('creditCondition:added.credit.condition.failed', { credit: data?.credit, point: data?.point }),
                    )
                }).finally(() => setIsLoading(false))
            } else {
                data?.conditionId && updateCreditCondition(data.conditionId, {
                    ...values,
                    quantity: isLimited ? values.quantity : -1
                }, (creditCondition: CreditConditionInterface) => {
                    data?.conditionId && dispatch(updateCreditConditionById(data.conditionId, creditCondition))
                    setIsOpen(false)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:edit.successfully')}</span>
                        </span>,
                        t('creditCondition:edit.credit.condition.successfully', { credit: data?.credit, point: data?.point }),
                    )
                }, () => {
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:edit.failed')}</span>
                        </span>,
                        t('creditCondition:edit.credit.condition.failed', { credit: data?.credit, point: data?.point }),
                    )
                }).finally(() => setIsLoading(false))
            }
		},
	})

    const { values, handleChange, handleSubmit, setFieldValue, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id}>{type === CreditConditionModalType.Add ? t('creditCondition:add.credit.condition') : t('creditCondition:edit.credit.condition')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <FormGroup id='point' label={t('form.point')}>
                        <Input
                            type='number'
                            onChange={handleChange} 
                            value={values.point}
                            isValid={isValid}
                            isTouched={touched.point && errors.point}
                            invalidFeedback={errors.point}
                            placeholder={t('form.point.placeholder')}
                        />
                    </FormGroup>
                    <FormGroup id='credit' label={t('form.credit')}>
                        <Input
                            type='number'
                            onChange={handleChange} 
                            value={values.credit} 
                            isValid={isValid}
                            isTouched={touched.credit && errors.credit}
                            invalidFeedback={errors.credit}
                            placeholder={t('form.credit.placeholder')}
                        />
                    </FormGroup>
                    <FormGroup id='quantity' label={t('form.quantity')}>
                        <div className='d-flex align-items-center'>
                            <Checks
                                id='isLimited'
                                label={t('limited')}
                                onChange={() => {
                                    setFieldValue('quantity', 0)
                                    setIsLimited(!isLimited)
                                }}
                                checked={isLimited}
                                ariaLabel='Filter isLimited'
                            />
                            <Input
                                type={isLimited ? 'number' : ''}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('quantity', e.target.value)} 
                                value={isLimited ? values.quantity : t('unlimited')}
                                disabled={!isLimited}
                                isValid={isValid}
                                isTouched={touched.quantity && errors.quantity}
                                invalidFeedback={errors.quantity}
                                className='w-50 mx-3'
                            />
                        </div>
                    </FormGroup>
                </div>
            </ModalBody>
            <ModalFooter className='px-4 pb-4'>
                <Button className='w-100' color='info' onClick={handleSubmit}>
                    {isLoading ? <Spinner size={16} /> : t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default CreditConditionModal
