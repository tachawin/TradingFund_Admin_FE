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
import { useFormik } from 'formik'
import * as Yup from 'yup'
import FormGroup from 'components/bootstrap/forms/FormGroup'
import Input from 'components/bootstrap/forms/Input'
import { LevelModalInterface } from './Level'
import { HuePicker, SliderPicker } from 'react-color'

interface LevelFormInterface {
    levelName: string
    minimumDeposit: number
    color: string
}


const LevelModal = ({ id, isOpen, setIsOpen, properties }: LevelModalInterface) => {
    const { t } = useTranslation(['common', 'level'])
    const { type, selectedRow: data } = properties

    const LevelFormSchema = Yup.object().shape({
        levelName: Yup.string().required('โปรดใส่ชื่อขั้น'),
        minimumDeposit: Yup.number().required('โปรดใส่ยอดฝากขั้นต่ำ'),
        color: Yup.string().required('โปรดเลือกสีขั้น'),
	})
	
	const formik = useFormik<LevelFormInterface>({
		initialValues: {
            levelName: data?.levelName || '',
            minimumDeposit: data?.minimumDeposit || '',
            color: data?.color || '#ff0000'
		},
        validationSchema: LevelFormSchema,
		onSubmit: (values) => {
            console.log(values)

            if (type === 'add') {
                // ADD
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{t('level:added.successfully')}</span>
                    </span>,
                    t('level:added.level.successfully', { levelName: data?.levelName }),
                )
            } else {
                // EDIT
                showNotification(
                    <span className='d-flex align-items-center'>
                        <Icon icon='Info' size='lg' className='me-1' />
                        <span>{t('level:edit.successfully')}</span>
                    </span>,
                    t('level:edit.level.successfully', { levelName: data?.levelName }),
                )
            }
			
            setIsOpen(false)
		},
	})

    const { values, handleChange, handleSubmit, setFieldValue, isValid, touched, errors } = formik

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4'>
                <ModalTitle id={id}>{type === 'add' ? t('level:add.level') : t('level:edit.level')}</ModalTitle>
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
                    <FormGroup id='minimumDeposit' label={t('form.minimum.deposit')}>
                        <Input
                            type='number'
                            onChange={handleChange} 
                            value={values.minimumDeposit} 
                            isValid={isValid}
                            isTouched={touched.minimumDeposit && errors.minimumDeposit}
                            invalidFeedback={errors.minimumDeposit}
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
                    {t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default LevelModal
