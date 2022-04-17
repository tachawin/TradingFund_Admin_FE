import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import classNames from 'classnames'

import { useFormik } from 'formik'
import { UserAuth } from 'common/types/user'
import { login, LoginResponse } from 'common/apis/auth'
import * as Yup from 'yup'

import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody } from '../../../components/bootstrap/Card'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'
import OTP from './OTP'
import Spinner from 'components/bootstrap/Spinner'
import showNotification from 'components/extras/showNotification'
import Icon from 'components/icon/Icon'
import { getAccessToken } from 'common/utils/auth'
import { useNavigate } from 'react-router-dom'
import { pages } from 'menu'

enum LoginState {
	Login = 'login',
	OTP = 'otp'
}

const Login = () => {
	const { t } = useTranslation('login')
	const navigate = useNavigate()
	const [loginState, setLoginState] = useState(LoginState.Login)
	const [otp, setOTP] = useState({ adminId: '', refCode: '' })
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		if (getAccessToken()) {
			navigate('/')
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const LoginSchema = Yup.object().shape({
		username: Yup.string().required('โปรดใส่ชื่อผู้ใช้'),
		password: Yup.string().required('โปรดใส่รหัสผ่าน'),
	})
	
	const formik = useFormik<UserAuth>({
		initialValues: {
		  	username: '',
		  	password: '',
		},
		validationSchema: LoginSchema,
		onSubmit: (values, { setSubmitting, resetForm }) => {
			const { username, password } = values
			setIsLoading(true)
			login(username, password)
				.then((response) => {
					const { data }: { data: LoginResponse } = response
					setLoginState(LoginState.OTP)
					setOTP(data)
					resetForm()
				})
				.catch((err) => {
					const { response } = err
					const message = response?.data
           			console.log(message)
					showNotification(
						<span className='d-flex align-items-center'>
							<Icon icon='Info' size='lg' className='me-1' />
							<span>{t('login.failed')}</span>
						</span>,
						t('please.try.again'),
					)
			})
			.finally(() => {
				setIsLoading(false)
				setSubmitting(false)
			})
		},
	})

	const { errors, touched, handleSubmit, isValid, handleChange } = formik

	return (
		<PageWrapper
			id={pages.login.id}
			title={pages.login.text}
			className={classNames({ 'bg-info': true })}>
			<Page className='p-0 align-items-center'>
				<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container row h-100 align-items-center justify-content-center'>
					<Card className='shadow-3d-dark' data-tour='login-page'>
						<CardBody className='m-4'>
							{loginState === LoginState.Login ? <>
								<div className='mb-5'>
									<div className='text-center h1 fw-bold'>{t('welcome')}</div>
									<div className='text-center h4 text-muted'>{t('sign.in.to.continue')}</div>
								</div>
								<div className='col-12'>
									<FormGroup
										id='username'
										isFloating
										label={t('username')}>
										<Input 
											autoComplete='username' 
											isValid={isValid}
											isTouched={touched.username}
											invalidFeedback={errors.username}
											onChange={handleChange}
										/>
									</FormGroup>
									<FormGroup
										className='mt-4'
										id='password'
										isFloating
										label={t('password')}>
										<Input
											type='password'
											autoComplete='password'
											isValid={isValid}
											isTouched={touched.password}
											invalidFeedback={errors.password}
											onChange={handleChange}
										/>
									</FormGroup>
								</div>
								<Button
									color='info'
									className='w-100 py-3 mt-5'
									onClick={handleSubmit}
								>
									{isLoading ? <Spinner size={16} /> : t('continue')}
								</Button>
							</> : <OTP adminId={otp.adminId} refCode={otp.refCode} />}
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default Login
