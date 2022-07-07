import { InfoTwoTone } from '@mui/icons-material'
import { ServiceType, updateOTPSetting } from 'common/apis/settings'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { CommonString } from 'common/data/enumStrings'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import Checks from 'components/bootstrap/forms/Checks'
import showNotification from 'components/extras/showNotification'
import React, { ChangeEvent, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { toggleOTPSetting } from 'redux/setting/action'
import { selectOTPSetting } from 'redux/setting/selector'


const OTPSettings = () => {
    const { t } = useTranslation(['common', 'setting'])
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const OTPSetting = useSelector(selectOTPSetting)
    const permission = JSON.parse(localStorage.getItem('features') ?? '')
    const readPermission = permission.systemSetting[PermissionType.Read] === PermissionValue.Available

    const handleOTPSettingChange = (type: ServiceType, checked: boolean) => {
        setIsLoading(true)
        updateOTPSetting(type, { flagOTP: checked }, () => {
            dispatch(toggleOTPSetting(type, checked))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('setting:update.otp.setting.successfully')}</span>
                </span>, t(`setting:update.otp.setting.${type}.successfully`)
            )
        }, (error) => {
            const { response } = error
            console.log(response)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('setting:update.otp.setting.failed')}</span>
                </span>, t(`setting:update.otp.setting.${type}.failed`)
            )
        }).finally(() => setIsLoading(false))
    }

	return (<>
		<div className='col-md'>
			<div className='col-12 h-100'>
				<Card stretch>
                    <CardHeader>
                        <CardLabel>
                            <CardTitle>{t('otp.setting')}</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody className={readPermission ? '' : 'd-flex justify-content-center align-items-center'}>
                        {readPermission ? <><div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{t('customer')}</h5>
                                <p>{t('setting:otp.customer.desc')}</p>
                            </div>
                            <Checks
                                key='customer'
                                label={OTPSetting.customer ? t('active') : t('inactive')}
                                name='customer'
                                value={OTPSetting.customer}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOTPSettingChange(ServiceType.Customer, e.target.checked)}
                                checked={OTPSetting.customer}
                                disabled={isLoading}
                                ariaLabel='customer'
                                type='switch'
                            />
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{t('admin')}</h5>
                                <p>{t('setting:otp.admin.desc')}</p>
                            </div>
                            <Checks
                                key='admin'
                                label={OTPSetting.admin ? t('active') : t('inactive')}
                                name='admin'
                                value={OTPSetting.admin}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleOTPSettingChange(ServiceType.Admin, e.target.checked)}
                                disabled={isLoading}
                                checked={OTPSetting.admin}
                                ariaLabel='admin'
                                type='switch'
                            />
                        </div></> : <div>{CommonString.NoPermission}</div>}
                    </CardBody>
                </Card>
			</div>
		</div>
	</>)
}

export default OTPSettings
