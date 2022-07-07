import { updateInviteFriendSetting } from 'common/apis/settings'
import Button from 'components/bootstrap/Button'
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import Input from 'components/bootstrap/forms/Input'
import { useFormik } from 'formik'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { selectReferralSetting } from 'redux/setting/selector'
import { updateReferralSetting } from 'redux/setting/action'
import showNotification from 'components/extras/showNotification'
import { InfoTwoTone } from '@mui/icons-material'
import Spinner from 'components/bootstrap/Spinner'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { CommonString } from 'common/data/enumStrings'

const InviteFriendSetting = () => {
    const { t } = useTranslation(['common', 'setting'])
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const referralSetting = useSelector(selectReferralSetting)
    const permission = JSON.parse(localStorage.getItem('features') ?? '')
    const readPermission = permission.systemSetting[PermissionType.Read] === PermissionValue.Available
    const updatePermission = permission.systemSetting[PermissionType.Update] === PermissionValue.Available

    useEffect(() => {
        setValues(referralSetting)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [referralSetting])

    const formik = useFormik({
		initialValues: {
            firstLevel: referralSetting.firstLevel || 0,
            secondLevel: referralSetting.secondLevel || 0
        },
		onSubmit: (values) => {
            setIsLoading(true)
            updateInviteFriendSetting({
                firstReferralPercentage: values.firstLevel,
                secondReferralPercentage: values.secondLevel
            }, () => {
                dispatch(updateReferralSetting(values))
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('setting:update.referral.setting.successfully')}</span>
                    </span>, t(`setting:update.referral.setting.successfully`)
                )
            }, (error) => {
                const { response } = error
                console.log(response)
                showNotification(
                    <span className='d-flex align-items-center'>
                        <InfoTwoTone className='me-1' />
                        <span>{t('setting:update.referral.setting.failed')}</span>
                    </span>, t(`setting:update.referral.setting.failed`)
                )
            }).finally(() => setIsLoading(false))
		},
	})

    const { values, setValues, setFieldValue, handleSubmit } = formik

	return (<>
		<div className='col-md'>
			<div className='col-12'>
				<Card stretch>
                    <CardHeader>
                        <CardLabel>
                            <CardTitle>{t('setting:invite.friend.setting')}</CardTitle>
                        </CardLabel>
                    </CardHeader>
                    <CardBody className={readPermission ? '' : 'd-flex justify-content-center align-items-center'}>
                        {readPermission ? <><div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{t('setting:first.level')}</h5>
                                <p>{t('setting:first.level.desc')}</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-25'>
                                <Input
                                    placeholder={t('setting:first.level')}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('firstLevel', e.target.value)}
                                    value={values.firstLevel}
                                    type='number'
                                    className='w-75'
                                    disabled={!updatePermission}
                                />
                                <span>%</span>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between align-items-center'>
                            <div>
                                <h5>{t('setting:second.level')}</h5>
                                <p>{t('setting:second.level.desc')}</p>
                            </div>
                            <div className='d-flex align-items-center justify-content-between w-25'>
                                <Input
                                    placeholder={t('setting:second.level')}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setFieldValue('secondLevel', e.target.value)}
                                    value={values.secondLevel}
                                    type='number' 
                                    className='w-75'
                                    disabled={!updatePermission}
                                />
                                <span>%</span>
                            </div>
                        </div>
                        {updatePermission && <div>
                            <Button color='primary' className='float-end' onClick={handleSubmit}>
                                {isLoading ? <Spinner size={16} /> : t('save')}
                            </Button>
                        </div>}
                        </> : <div>{CommonString.NoPermission}</div>}
                    </CardBody>
                </Card>
			</div>
		</div>
	</>)
}

export default InviteFriendSetting
