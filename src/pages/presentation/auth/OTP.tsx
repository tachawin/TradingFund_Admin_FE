import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import * as Yup from 'yup'

import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import Card, { CardBody } from '../../../components/bootstrap/Card'
import FormGroup from '../../../components/bootstrap/forms/FormGroup'
import Input from '../../../components/bootstrap/forms/Input'
import Button from '../../../components/bootstrap/Button'
import { Form, FormikProvider, useFormik } from 'formik'
import { sendOTP } from 'common/apis/auth'

const OTP = () => {
	const { t } = useTranslation('login')

	const navigate = useNavigate()

    const [error, setError] = useState('')

	const formik = useFormik<{ otp: string}>({
		initialValues: {
		  	otp: ''
		},
		onSubmit: (values, { setSubmitting, resetForm }) => {
			const { otp } = values
            if (otp.length !== 6) {
                const message = t('require.otp')
                setError(message)
                return
            }
            navigate('/')
			// sendOTP(otp)
			// 	.then((res: any) => {
			// 		navigate('/')
			// 		resetForm()
			// 	})
			// 	.catch((err) => {
			// 		// error
			// })
			// .finally(() => setSubmitting(false))
		},
	})

    const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik

	return (
		<PageWrapper
			title='Login'
			className={classNames({ 'bg-info': true })}>
			<Page className='p-0 align-items-center'>
				<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container row h-100 align-items-center justify-content-center'>
					<Card className='shadow-3d-dark' data-tour='login-page'>
						<CardBody className='m-4'>
							<div className='mb-5'>
								<div className='text-center h1 fw-bold'>{t('verification')}</div>
								<div className='text-center h4 text-muted'>{t('you.will.get.otp')}</div>
							</div>
							<form className='row g-4'>
								<div className='col-12'>
                                    <FormikProvider value={formik}>
										<Form autoComplete="off" noValidate onSubmit={handleSubmit}>
											<FormGroup
												id='login-otp'
												isFloating
												label={t('otp')}>
												<Input 
													autoComplete='otp' 
													isValid={Boolean(error)}
													isTouched={Boolean(error)}
													invalidFeedback={error}
													{...getFieldProps('otp')} 
												/>
											</FormGroup>
										</Form>
									</FormikProvider>
								</div>
								<Button
									color='info'
									className='w-100 py-3 mt-5'
									onClick={handleSubmit}>
									{t('continue')}
								</Button>
							</form>
						</CardBody>
					</Card>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default OTP
