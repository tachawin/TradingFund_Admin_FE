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
import * as Yup from 'yup'
import { useFormik } from 'formik'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import { RedeemAction, RedeemInterface, RedeemStatus, updateRedeem } from 'common/apis/redeem'
import { useDispatch } from 'react-redux'
import { removeRedeemProductById } from 'redux/redeemProduct/action'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone } from '@mui/icons-material'
import { ErrorResponse } from 'common/apis/axios'

export enum RewardModalType {
    Approve = 'approve',
    Reject = 'reject'
}

interface RewardModalProperties {
	type: RewardModalType
	selectedRow: RedeemInterface
}

interface RewardModalInterface {
	id?: string | number
	isOpen?: boolean
	setIsOpen: any
    properties: RewardModalProperties
}

const RewardModal = ({ id, isOpen, setIsOpen, properties }: RewardModalInterface) => {
    const { t } = useTranslation(['common', 'reward'])
    const dispatch = useDispatch()
    const { type, selectedRow: data } = properties
    const [isLoading, setIsLoading] = useState(false)

    const handleAccept = () => {
        setIsLoading(true)
        data.redeemId && updateRedeem(data.redeemId, RedeemAction.Accept, {}, (response: ErrorResponse) => {
            if (response.code === 204) {
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>ยืนยันไม่สำเร็จ</span>
                    </span>,
                    'ไม่พบข้อมูลลูกค้าหรือจำนวนแต้มไม่เพียงพอ กรุณายกเลิกรายการ',
                )
            } else {
                setIsOpen(false)
                data.redeemId && dispatch(removeRedeemProductById(data.redeemId))
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('reward:approve.successfully')}</span>
                    </span>,
                    t('reward:approve.request.successfully', { mobileNumber: data?.mobileNumber }),
                )
            }
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>ยืนยันไม่สำเร็จ</span>
                </span>,
                'มีบางอย่างผิดปกติ กรุณาทำรายการใหม่อีกครั้งภายหลัง',
            )
        }).finally(() => setIsLoading(false))
    }

    const handleReject = () => {
        setIsLoading(true)
        data.redeemId && updateRedeem(data.redeemId, RedeemAction.Reject, {}, () => {
            setIsOpen(false)
            data.redeemId && dispatch(removeRedeemProductById(data.redeemId))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('reward:reject.successfully')}</span>
                </span>,
                t('reward:reject.request.successfully', { mobileNumber: data?.mobileNumber }),
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>ยกเลิกไม่สำเร็จ</span>
                </span>,
                'มีบางอย่างผิดปกติ กรุณาทำรายการใหม่อีกครั้งภายหลัง',
            )
        }).finally(() => setIsLoading(false))
    }

    const RewardFormSchema = Yup.object().shape({
        notes: Yup.string().required('โปรดใส่เลขติดตามพัสดุ'),
	})

    const formik = useFormik({
		initialValues: {
			notes: ''
		},
        validationSchema: type === RewardModalType.Approve ? RewardFormSchema : undefined,
		onSubmit: (values) => {
            setIsLoading(true)
            data.redeemId && updateRedeem(data.redeemId, RedeemAction.Sending, { notes: values.notes }, () => {
                data.redeemId && dispatch(removeRedeemProductById(data.redeemId))
                setIsOpen(false)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('reward:sending.successfully')}</span>
                    </span>,
                    t('reward:sending.reward.successfully', { mobileNumber: data?.mobileNumber }),
                )
            }, (error) => {
                const { response } = error
                console.log(response)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>เปลี่ยนสถานะไม่สำเร็จ</span>
                    </span>,
                    'มีบางอย่างผิดปกติ กรุณาทำรายการใหม่อีกครั้งภายหลัง',
                )
            }).finally(() => setIsLoading(false))
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
                    {type === RewardModalType.Reject ? t('reward:reject.request') : data.status === RedeemStatus.Sending ?  t('reward:success.reward') : t('reward:sending.reward')}
                </ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                {type === RewardModalType.Reject ? t('reward:form.reject.request.confirmation', { product: data?.productName })
                    : data.status === RedeemStatus.Sending ? 
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
                        : t('reward:form.sending.request.confirmation', { product: data?.productName })
                }
            </ModalBody>
            <ModalFooter className='px-4 pb-4 flex-nowrap'>
                <Button isOutline={type === RewardModalType.Approve} className='w-50' color='info' onClick={() => setIsOpen(false)}>
                    {t('back')}
                </Button>
                <Button isOutline={type === RewardModalType.Reject} className='w-50'color='info' onClick={type === RewardModalType.Reject ? handleReject : data.status === RedeemStatus.Sending ? handleSubmit : handleAccept}>
                    {isLoading ? <Spinner size={16} /> : type === RewardModalType.Approve ? t('approve') : t('reject')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default RewardModal
