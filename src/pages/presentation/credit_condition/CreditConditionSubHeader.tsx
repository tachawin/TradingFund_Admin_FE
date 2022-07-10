import React from 'react'
import { useFormik } from 'formik'
import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader'
import Input from '../../../components/bootstrap/forms/Input'
import { useTranslation } from 'react-i18next'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import Button from 'components/bootstrap/Button'
import { CreditConditionProps } from './CreditCondition'
import { Add } from '@mui/icons-material'
import { CreditConditionModalType } from './CreditConditionModal'
import { useDispatch, useSelector } from 'react-redux'
import { storeCreditConditionQuery } from 'redux/creditCondition/action'
import 'moment/locale/th'
import Checks from 'components/bootstrap/forms/Checks'
import { selectCreditConditionQuery } from 'redux/creditCondition/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'

interface CreditConditionFilterInterface {
	searchInput: string
	credit: {
		min: string
		max: string
	}
	point: {
		min: string
		max: string
	}
	quantity: {
		min: string
		max: string
	}
	isLimited: boolean
}

const CreditConditionSubHeader = ({ setIsOpenCreditConditionModal }: CreditConditionProps) => {
	const { t } = useTranslation(['common', 'creditCondition'])
	const dispatch = useDispatch()

	const permission = JSON.parse(localStorage.getItem('features') ?? '')
    const createPermission = permission.creditCondition[PermissionType.Create] === PermissionValue.Available

	const queryList = useSelector(selectCreditConditionQuery)

	const formik = useFormik<CreditConditionFilterInterface>({
		initialValues: {
			searchInput: '',
            credit: {
                min: '',
                max: ''
            },
			point: {
                min: '',
                max: ''
            },
			quantity: {
                min: '',
                max: ''
            },
			isLimited: true,
		},
		onSubmit: (values) => {
			dispatch(storeCreditConditionQuery({
				...queryList,
				minCredit: values.credit.min ? `minCredit=${values.credit.min}` : '',
				maxCredit: values.credit.max ? `maxCredit=${values.credit.max}` : '',
				minPoint: values.point.min ? `minPoint=${values.point.min}` : '',
				maxPoint: values.point.max ? `maxPoint=${values.point.max}` : '',
				minQuantity: !values.isLimited ? `minQuantity=-1` : values.quantity.min ? `minQuantity=${values.quantity.min}` : '',
				maxQuantity: !values.isLimited ? `maxQuantity=-1` : values.quantity.max ? `maxQuantity=${values.quantity.max}` : '',
			}))
		},
	})

	const { 
		values,
		handleChange,
		resetForm,
		handleSubmit
	} = formik

	return (<SubHeader className='pt-3 mx-3' style={{ boxShadow: 'none', zIndex: 1 }}>
		<SubHeaderLeft>
		</SubHeaderLeft>
		<SubHeaderRight>
			<CommonTableFilter
				resetLabel={t('filter.reset')}
				onReset={resetForm}
				submitLabel={t('filter')}
				onSubmit={handleSubmit}
				filters={[
					{
						label: t('filter.credit'),
						children: <div>
							<InputGroup>
								<Input
									id='credit.min'
									ariaLabel='Minimum credit'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.credit.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='credit.max'
									ariaLabel='Maximum credit'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.credit.max}
									type='number'
								/>
							</InputGroup>
						</div>
					},
					{
						label: t('filter.points'),
						children: <div>
							<InputGroup>
								<Input
									id='point.min'
									ariaLabel='Minimum point'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.point.min}
									type='number'
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='point.max'
									ariaLabel='Maximum point'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.point.max}
									type='number'
								/>
							</InputGroup>
						</div>
					},
					{
						label: t('filter.quantity'),
						children: <div>
							<Checks
								id='isLimited'
								label={t('limited')}
								onChange={handleChange}
								checked={values.isLimited}
								ariaLabel='Filter isLimited'
							/>
							<InputGroup className='mt-2'>
								<Input
									id='quantity.min'
									ariaLabel='Minimum quantity'
									placeholder={t('filter.min')}
									onChange={handleChange}
									value={values.quantity.min}
									type='number'
									disabled={!values.isLimited}
								/>
								<InputGroupText>{t('filter.to')}</InputGroupText>
								<Input
									id='quantity.max'
									ariaLabel='Maximum quantity'
									placeholder={t('filter.max')}
									onChange={handleChange}
									value={values.quantity.max}
									type='number'
									disabled={!values.isLimited}
								/>
							</InputGroup>
						</div>
					}
				]} 
			/>
			{createPermission && <>
				<SubheaderSeparator />
				<Button
					className='text-nowrap'
					icon={Add}
					color='primary'
					isLight
					onClick={() => setIsOpenCreditConditionModal({ type: CreditConditionModalType.Add, selectedRow: undefined})}
				>
					{t('creditCondition:add.credit.condition')}
				</Button>
			</>}
		</SubHeaderRight>
	</SubHeader>)
}

export default CreditConditionSubHeader