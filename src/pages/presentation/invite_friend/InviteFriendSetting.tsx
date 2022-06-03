import { OTPSettingType, updateOTPSetting } from 'common/apis/settings'
import Button from 'components/bootstrap/Button'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import Input from 'components/bootstrap/forms/Input'
import { useFormik } from 'formik'
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'


const InviteFriendSetting = () => {
    const { t } = useTranslation('common')
    const [isLoading, setIsLoading] = useState(false)

    const formik = useFormik({
		initialValues: {
            firstLevel: '',
            secondLevel: '',
		},
		onSubmit: (values) => {
            
		},
	})

    const { values, handleChange, setFieldValue, isValid, touched, errors } = formik

	return (<>
		<div className='row h-100'>
			<div className='col-12'>
				<Card stretch className='mx-3 px-3'>
                    <CardHeader>
                        <CardLabel>
                            <CardTitle>{t('otp.setting')}</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody>
                        <div className='d-flex justify-content-between align-items-center w-50' style={{ minWidth: '450px' }}>
                            <div>
                                <h5>{t('first.level')}</h5>
                                <p>{t('first.level.desc')}</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-25'>
                                <Input
                                    placeholder={t('first.level')}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('firstLevel', e.target.value)}
                                    value={values.firstLevel}
                                    type='number'
                                    className='w-75'
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center w-50' style={{ minWidth: '450px' }}>
                            <div>
                                <h5>{t('second.level')}</h5>
                                <p>{t('second.level.desc')}</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-25'>
                                <Input
                                    placeholder={t('second.level')}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('secondLevel', e.target.value)}
                                    value={values.secondLevel}
                                    type='number' 
                                    className='w-75'
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className='w-50' style={{ minWidth: '450px' }}>
                            <Button color='primary' className='float-end'>{t('save')}</Button>
                        </div>
                    </CardBody>
                </Card>
			</div>
		</div>
	</>)
}

export default InviteFriendSetting
