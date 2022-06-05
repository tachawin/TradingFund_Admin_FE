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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import { CreditConditionModalInterface } from './CreditCondition'
import { HuePicker } from 'react-color'
import { InfoTwoTone } from '@mui/icons-material'
import { createCreditCondition, CreditConditionBaseInterface, CreditConditionInterface, updateCreditCondition } from 'common/apis/creditCondition'
import { useDispatch } from 'react-redux'
import { addCreditCondition, updateCreditConditionById } from 'redux/creditCondition/action'
import Spinner from 'components/bootstrap/Spinner'

export enum CreditConditionModalType {
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete'
}


const CreditConditionModal = ({ id, isOpen, setIsOpen, properties }: CreditConditionModalInterface) => {
    const { t } = useTranslation(['common', 'creditCondition'])
    const { type, selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const CreditConditionFormSchema = Yup.object().shape({
        creditConditionName: Yup.string().required('โปรดใส่ชื่อขั้น'),
        minimumCredit: Yup.number().required('โปรดใส่ยอดฝากขั้นต่ำ'),
        color: Yup.string().required('โปรดเลือกสีขั้น'),
	})
	
	const formik = useFormik<CreditConditionBaseInterface>({
		initialValues: {
            point: data?.point || '',
            credit: data?.credit || '',
            quantity: data?.quantity || ''
		},
        validationSchema: CreditConditionFormSchema,
		onSubmit: (values) => {
            setIsLoading(true)
            if (type === CreditConditionModalType.Add) {
                createCreditCondition(values, (creditCondition: CreditConditionInterface) => {
                    dispatch(addCreditCondition(creditCondition))
                    setIsOpen(false)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:added.successfully')}</span>
                        </span>,
                        t('creditCondition:added.credit.condition.successfully', { creditConditionName: data?.point }),
                    )
                }, () => {
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:added.failed')}</span>
                        </span>,
                        t('creditCondition:added.credit.condition.failed', { creditConditionName: data?.point }),
                    )
                }).finally(() => setIsLoading(false))
            } else {
                data?.conditionId && updateCreditCondition(data.conditionId, values, (creditCondition: CreditConditionInterface) => {
                    data?.conditionId && dispatch(updateCreditConditionById(data.conditionId, creditCondition))
                    setIsOpen(false)
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:edit.successfully')}</span>
                        </span>,
                        t('creditCondition:edit.credit.condition.successfully', { point: data?.point }),
                    )
                }, () => {
                    showNotification(
                        <span className='d-flex align-items-center'>
                            <InfoTwoTone className='me-1' />
                            <span>{t('creditCondition:edit.failed')}</span>
                        </span>,
                        t('creditCondition:edit.credit.condition.failed', { point: data?.point }),
                    )
                }).finally(() => setIsLoading(false))
            }
		},
	})

    const { values, handleChange, handleSubmit, setFieldValue, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id}>{type === CreditConditionModalType.Add ? t('creditCondition:add.creditCondition') : t('creditCondition:edit.creditCondition')}</ModalTitle>
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
                        />
                    </FormGroup>
                    <FormGroup id='quantity' label={t('form.quantity')}>
                        <Input
                            type='number'
                            onChange={handleChange} 
                            value={values.quantity}
                        />
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