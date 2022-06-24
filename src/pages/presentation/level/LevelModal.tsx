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
import { LevelModalInterface } from './Level'
import { InfoTwoTone } from '@mui/icons-material'
import { createLevel, LevelInterface, LevelStatus, updateLevel, LevelBaseInterface, uploadLevelImage, LevelImageUrlInterface } from 'common/apis/level'
import { useDispatch } from 'react-redux'
import { addLevel, updateLevelById } from 'redux/level/action'
import Spinner from 'components/bootstrap/Spinner'
import PlaceholderImage from 'components/extras/PlaceholderImage'

export enum LevelModalType {
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete'
}

export interface LevelFormInterface {
    levelName: string
    imageURL?: string
    imageFile?: FormData | string
    minimumDepositAmount?: number
    maximumDepositAmount?: number
    investmentAmount?: number
    cashback?: number
    status?: LevelStatus
}

const LevelModal = ({ id, isOpen, setIsOpen, properties }: LevelModalInterface) => {
    const { t } = useTranslation(['common', 'level'])
    const { type, selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const LevelFormSchema = Yup.object().shape({
        levelName: Yup.string().required('โปรดใส่ชื่อขั้น'),
        minimumDepositAmount: Yup.number().required('โปรดใส่ยอดฝากขั้นต่ำ'),
        maximumDepositAmount: Yup.number().required('โปรดใส่ยอดฝากสูงสุด'),
        investmentAmount: Yup.number().required('โปรดใส่ยอดเงินลงทุน'),
        cashback: Yup.number().required('โปรดใส่ % เงินคืน'),
	})

    const addNewLevel = (requestBody: LevelBaseInterface) => {
        createLevel(requestBody, (level: LevelInterface) => {
            dispatch(addLevel(level))
            setIsOpen(false)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:added.successfully')}</span>
                </span>,
                t('level:added.level.successfully', { levelName: data?.levelName }),
            )
        }, () => {
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:added.failed')}</span>
                </span>,
                t('level:added.level.failed', { levelName: data?.levelName }),
            )
        }).finally(() => setIsLoading(false))
    }

    const editLevel = (requestBody: LevelBaseInterface) => {
        data?.levelId && updateLevel(data.levelId, requestBody, (level: LevelInterface) => {
            data?.levelId && dispatch(updateLevelById(data.levelId, level))
            setIsOpen(false)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:edit.successfully')}</span>
                </span>,
                t('level:edit.level.successfully', { levelName: data?.levelName }),
            )
        }, () => {
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:edit.failed')}</span>
                </span>,
                t('level:edit.level.failed', { levelName: data?.levelName }),
            )
        }).finally(() => setIsLoading(false))
    }

    const uploadImage = (requestBody: LevelBaseInterface, imageFile: FormData) => {
        uploadLevelImage(imageFile, (image: LevelImageUrlInterface) => {
            if (type === LevelModalType.Add) {
                addNewLevel({ ...requestBody, imageURL: image.imageURL })
            } else {
                editLevel({ ...requestBody, imageURL: image.imageURL })
            }
        }, (err) => {
            const { response } = err
            const message = response?.data
            console.log(message)
            setIsLoading(false)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('level:upload.image.failed')}</span>
                </span>,
                t('level:upload.level.image.failed', { levelName: values.levelName }),
            )
        })
    }
	
	const formik = useFormik<LevelFormInterface>({
		initialValues: {
            levelName: data?.levelName || '',
            imageURL: data?.imageURL || '',
            imageFile: '',
            minimumDepositAmount: data?.minimumDepositAmount,
            maximumDepositAmount: data?.maximumDepositAmount,
            investmentAmount: data?.investmentAmount,
            cashback: data?.cashback
		},
        validationSchema: LevelFormSchema,
		onSubmit: (values) => {
            setIsLoading(true)
            const { imageFile, ...restValue } = values
            let requestBody: LevelBaseInterface = {
                ...restValue,
                minimumDepositAmount: values.minimumDepositAmount || 0,
                maximumDepositAmount: values.maximumDepositAmount || 0,
                investmentAmount: values.investmentAmount || 0,
                cashback: values.cashback || 0
            }
            if (imageFile) {
                uploadImage(requestBody, imageFile as FormData)
            } else {
                const { imageURL, ...restRequestBody } = requestBody
                if (type === LevelModalType.Add) {
                    addNewLevel(restRequestBody)
                } else {
                    editLevel(restRequestBody)
                }
            }
		},
	})

    const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const uploadedFile = e.target.files[0]
            const formData = new FormData()
            formData.append('file', uploadedFile)
    
            setFieldValue('imageFile', formData)
            setFieldValue('imageURL', URL.createObjectURL(uploadedFile))
        }
    }

    const { values, handleChange, handleSubmit, setFieldValue, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id}>{type === LevelModalType.Add ? t('level:add.level') : t('level:edit.level')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <FormGroup id='imageURL' label={t('form.image')}>
                        <div className='row'>
                            <div className='col-12 my-3'>
                                {values.imageURL ? (
                                    <img
                                        src={values.imageURL}
                                        alt=''
                                        width={100}
                                        height={100}
                                        style={{ minHeight: 100, minWidth: 100, objectFit: 'contain' }}
                                        className='mx-auto d-block img-fluid mb-3'
                                    />
                                ) : (
                                    <PlaceholderImage
                                        width={100}
                                        height={100}
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
                                        isValid={isValid}
                                        isTouched={touched.imageURL && errors.imageURL}
                                        invalidFeedback={errors.imageURL}
                                    />
                                </div>
                            </div>
                        </div>
                    </FormGroup>
                    <FormGroup id='levelName' label={t('form.level.name')}>
                        <Input 
                            onChange={handleChange} 
                            value={values.levelName}
                            isValid={isValid}
                            isTouched={touched.levelName && errors.levelName}
                            invalidFeedback={errors.levelName}
                        />
                    </FormGroup>
                    <div className='row mt-4'>
                        <FormGroup id='minimumDepositAmount' label={t('form.minimum.deposit.amount')} className='col'>
                            <Input
                                type='number'
                                onChange={handleChange} 
                                value={values.minimumDepositAmount} 
                                isValid={isValid}
                                isTouched={touched.minimumDepositAmount && errors.minimumDepositAmount}
                                invalidFeedback={errors.minimumDepositAmount}
                            />
                        </FormGroup>
                        <FormGroup id='maximumDepositAmount' label={t('form.maximum.deposit.amount')} className='col'>
                            <Input
                                type='number'
                                onChange={handleChange} 
                                value={values.maximumDepositAmount} 
                                isValid={isValid}
                                isTouched={touched.maximumDepositAmount && errors.maximumDepositAmount}
                                invalidFeedback={errors.maximumDepositAmount}
                            />
                        </FormGroup>
                    </div>
                    <div className='row mt-4'>
                        <FormGroup id='investmentAmount' label={t('form.investment.amount')} className='col'>
                            <Input
                                type='number'
                                onChange={handleChange} 
                                value={values.investmentAmount} 
                                isValid={isValid}
                                isTouched={touched.investmentAmount && errors.investmentAmount}
                                invalidFeedback={errors.investmentAmount}
                            />
                        </FormGroup>
                        <FormGroup id='cashback' label={t('form.cashback')} className='col'>
                            <div className='d-flex align-items-center justify-content-between'>
                                <Input
                                    type='number'
                                    className='me-3'
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('cashback', e.target.value)} 
                                    value={values.cashback} 
                                    isValid={isValid}
                                    isTouched={touched.cashback && errors.cashback}
                                    invalidFeedback={errors.cashback}
                                />
                                <span>%</span>
                            </div>
                        </FormGroup>
                    </div>
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

export default LevelModal
