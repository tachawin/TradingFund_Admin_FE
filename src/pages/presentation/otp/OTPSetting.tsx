import { OTPSettingType, updateOTPSetting } from 'common/apis/settings'
import Button from 'components/bootstrap/Button'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import Checks from 'components/bootstrap/forms/Checks'
import showNotification from 'components/extras/showNotification'
import Icon from 'components/icon/Icon'
import { useFormik } from 'formik'
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'


const OTPSettings = () => {
    const { t } = useTranslation('common')
    const [customerOTPSetting, setCustomerOTPSetting] = useState(false)
    const [adminOTPSetting, setAdminOTPSetting] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOTPSettingChange = (type: OTPSettingType, checked: boolean) => {
        setIsLoading(true)

        updateOTPSetting(type, { flagOTP: checked }, () => {
            if (type === OTPSettingType.Customer) {
                setCustomerOTPSetting(checked)
            } else {
                setAdminOTPSetting(checked)
            }
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('update.otp.setting.successfully')}</span>
                </span>, t(`update.otp.setting.${type}.successfully`)
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <Icon icon='Info' size='lg' className='me-1' />
                    <span>{t('update.otp.setting.failed')}</span>
                </span>, t(`update.otp.setting.${type}.failed`)
            )
        }).finally(() => setIsLoading(false))
    }

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
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{t('customer')}</h5>
                                <p>{t('otp.customer.desc')}</p>
                            </div>
                            <Checks
                                key='customer'
                                label={customerOTPSetting ? t('on') : t('off')}
                                name={'customer'}
                                value={customerOTPSetting}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOTPSettingChange(OTPSettingType.Customer, e.target.checked)}
                                checked={customerOTPSetting}
                                disabled={isLoading}
                                ariaLabel='customer'
                                type='switch'
                            />
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{t('admin')}</h5>
                                <p>{t('otp.admin.desc')}</p>
                            </div>
                            <Checks
                                key='admin'
                                label={adminOTPSetting ? t('on') : t('off')}
                                name={'admin'}
                                value={adminOTPSetting}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOTPSettingChange(OTPSettingType.Admin, e.target.checked)}
                                disabled={isLoading}
                                checked={adminOTPSetting}
                                ariaLabel='admin'
                                type='switch'
                            />
                        </div>
                    </CardBody>
                </Card>
			</div>
		</div>
	</>)
}

export default OTPSettings
