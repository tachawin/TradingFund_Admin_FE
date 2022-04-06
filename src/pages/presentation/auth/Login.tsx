import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { pages } from 'menu'

import { Form, FormikProvider, useFormik } from 'formik'
import { UserAuth } from 'common/types/user'
import { login } from 'common/apis/auth'
import * as Yup from 'yup'

import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody } from '../../../components/bootstrap/Card'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'

const Login = () => {
	const { t } = useTranslation('login')

	const navigate = useNavigate()

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

			navigate(`../${pages.otp.path}`)

			// login(username, password)
			// 	.then((res: any) => {
			// 		navigate(`../${pages.otp.path}`)
			// 		resetForm()
			// 	})
			// 	.catch((err) => {
			// 		// error
			// })
			// .finally(() => setSubmitting(false))
		},
	})

	const { errors, touched,handleSubmit, getFieldProps } = formik

	return (
		<PageWrapper
			title='Login'
			className={classNames({ 'bg-info': true })}>
			<Page className='p-0 align-items-center'>
				<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container row h-100 align-items-center justify-content-center'>
					<Card className='shadow-3d-dark' data-tour='login-page'>
						<FormikProvider value={formik}>
						<CardBody className='m-4'>
							<div className='mb-5'>
								<div className='text-center h1 fw-bold'>{t('welcome')}</div>
								<div className='text-center h4 text-muted'>{t('sign.in.to.continue')}</div>
							</div>
							<Form id="login-form" className='row g-4' autoComplete="off" noValidate onSubmit={handleSubmit}>
								<div className='col-12'>
									<FormGroup
										id='login-username'
										isFloating
										label={t('your.email.or.username')}>
										<Input 
											autoComplete='username' 
											isValid={Boolean(errors.username)}
											isTouched={Boolean(touched.username)}
											invalidFeedback={errors.username}
											isValidMessage={Boolean(touched.username)}
											{...getFieldProps('username')} 
										/>
									</FormGroup>
									<FormGroup
										className='mt-4'
										id='login-password'
										isFloating
										label={t('password')}>
										<Input
											type='password'
											autoComplete='password'
											isValid={Boolean(errors.password)}
											isTouched={Boolean(touched.password)}
											invalidFeedback={errors.password}
											isValidMessage={Boolean(touched.password)}
											{...getFieldProps('password')}
										/>
									</FormGroup>
								</div>
								<Button
									color='info'
									className='w-100 py-3 mt-5'
									onClick={handleSubmit}>
									{t('continue')}
								</Button>
							</Form>
						</CardBody>
						</FormikProvider>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default Login
