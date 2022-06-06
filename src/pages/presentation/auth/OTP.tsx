import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'

import * as Yup from 'yup'

import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'
import { useFormik } from 'formik'
import { OTPResponse, sendOTP } from 'common/apis/auth'
import Spinner from 'components/bootstrap/Spinner'
import showNotification from 'components/extras/showNotification'
import { didLogin } from 'common/utils/auth'
import { InfoTwoTone } from '@mui/icons-material'

interface OTPInterface {
	adminId: string
	refCode: string
}

const OTP = ({ adminId, refCode }: OTPInterface) => {
	const { t } = useTranslation('login')
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const OTPScheme = Yup.object().shape({
		otp: Yup.string().required('โปรดใส่รหัส 6 หลัก'),
	})
	
	const formik = useFormik<{ otp: string}>({
		initialValues: {
		  	otp: ''
		},
		validationSchema: OTPScheme,
		onSubmit: (values, { setSubmitting, resetForm }) => {
			const { otp } = values
			setIsLoading(true)
			sendOTP({ adminId, refCode, otpConfirm: otp }, (otpResponse: OTPResponse) => {
				const { accessToken, refreshToken } = otpResponse
				didLogin(accessToken, refreshToken)
				navigate('/')
				resetForm()
			}, (err) => {
				showNotification(
					<span className='d-flex align-items-center'>
						<InfoTwoTone className='me-1' />
						<span>{t('otp.failed')}</span>
					</span>,
					t('please.try.again'),
				)
			}).finally(() => {
				setIsLoading(false)
				setSubmitting(false)
			})
		},
	})

    const { errors, touched, isValid, handleSubmit, handleChange } = formik

	return (<>
		<div className='mb-5'>
			<div className='text-center h1 fw-bold'>{t('verification')}</div>
			<div className='text-center fs-5 text-muted'>{t('you.will.get.otp')}</div>
			<div className='text-center fs-5 text-muted'>{t('ref.code', { refCode })}</div>
		</div>
		<div className='row g-4'>
			<div className='col-12'>
				<FormGroup
					id='otp'
					isFloating
					label={t('otp')}>
					<Input 
						autoComplete='otp' 
						isValid={isValid}
						isTouched={touched.otp}
						invalidFeedback={errors.otp}
						onChange={handleChange}
					/>
				</FormGroup>
			</div>
			<Button
				color='info'
				className='w-100 py-3 mt-5'
				onClick={handleSubmit}>
				{isLoading ? <Spinner size={16} /> : t('continue')}
			</Button>
		</div>
	</>)
}

export default OTP
