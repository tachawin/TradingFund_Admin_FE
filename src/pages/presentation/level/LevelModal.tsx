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
import { LevelModalInterface } from './Level'
import { HuePicker } from 'react-color'
import { InfoTwoTone } from '@mui/icons-material'
import { createLevel, LevelBaseInterface, LevelInterface, updateLevel } from 'common/apis/level'
import { useDispatch } from 'react-redux'
import { addLevel, updateLevelById } from 'redux/level/action'
import Spinner from 'components/bootstrap/Spinner'

export enum LevelModalType {
    Add = 'add',
    Edit = 'edit',
    Delete = 'delete'
}


const LevelModal = ({ id, isOpen, setIsOpen, properties }: LevelModalInterface) => {
    const { t } = useTranslation(['common', 'level'])
    const { type, selectedRow: data } = properties
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const LevelFormSchema = Yup.object().shape({
        levelName: Yup.string().required('โปรดใส่ชื่อขั้น'),
        minimumCredit: Yup.number().required('โปรดใส่ยอดฝากขั้นต่ำ'),
        color: Yup.string().required('โปรดเลือกสีขั้น'),
	})
	
	const formik = useFormik<LevelBaseInterface>({
		initialValues: {
            levelName: data?.levelName || '',
            minimumCredit: data?.minimumCredit || 0,
            color: data?.color || '#ff0000'
		},
        validationSchema: LevelFormSchema,
		onSubmit: (values) => {
            setIsLoading(true)
            if (type === LevelModalType.Add) {
                createLevel(values, (level: LevelInterface) => {
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
            } else {
                data?.levelId && updateLevel(data.levelId, values, (level: LevelInterface) => {
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
		},
	})

    const { values, handleChange, handleSubmit, setFieldValue, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id}>{type === LevelModalType.Add ? t('level:add.level') : t('level:edit.level')}</ModalTitle>
            </ModalHeader>
            <ModalBody className='px-4'>
                <div className='row g-4'>
                    <FormGroup id='levelName' label={t('form.level.name')}>
                        <Input 
                            onChange={handleChange} 
                            value={values.levelName}
                            isValid={isValid}
                            isTouched={touched.levelName && errors.levelName}
                            invalidFeedback={errors.levelName}
                        />
                    </FormGroup>
                    <FormGroup id='minimumCredit' label={t('form.minimum.credit')}>
                        <Input
                            type='number'
                            onChange={handleChange} 
                            value={values.minimumCredit} 
                            isValid={isValid}
                            isTouched={touched.minimumCredit && errors.minimumCredit}
                            invalidFeedback={errors.minimumCredit}
                        />
                    </FormGroup>
                    <FormGroup id='color' label={t('form.level.color')}>
                        <div className='d-flex gap-3 align-items-center'>
                            <Input
                                className='w-25'
                                value={values.color}
                                isValid={isValid}
                                isTouched={touched.color && errors.color}
                                invalidFeedback={errors.color}
                                disabled
                            />
                            <div style={{ backgroundColor: values.color, width: 60, height: 20, borderRadius: 4 }}></div>
                            <HuePicker color={values.color} onChangeComplete={(color) => setFieldValue('color', color.hex)} />
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

export default LevelModal
