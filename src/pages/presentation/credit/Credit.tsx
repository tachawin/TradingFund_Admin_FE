import { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { demoPages } from '../../../menu'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import data from '../../../common/data/dummyCreditData'
import Button, { ButtonGroup } from '../../../components/bootstrap/Button'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import Checks  from '../../../components/bootstrap/forms/Checks'
import { useTranslation } from 'react-i18next'
import CreditModal from './CreditModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import CreditTable from './CreditTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'

interface CreditFilterInterface {
	searchInput: string
    isApproved: boolean
    isRejected: boolean
	points: {
		min: string
		max: string
	},
    credit: {
		min: string
		max: string
	},
	timestamp: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

enum CREDIT_TABLE_STATE {
	REQUEST = 'request',
	HISTORY = 'history'
}

interface CreditModalProperties {
	type: string
	selectedRow: any
}

const Credit = () => {
    const { t } = useTranslation(['common', 'credit'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenCreditModal, setIsOpenCreditModal] = useState<CreditModalProperties>()
    const [creditTableState, setCreditTableState] = useState(CREDIT_TABLE_STATE.REQUEST)

	const formik = useFormik<CreditFilterInterface>({
		initialValues: {
			searchInput: '',
            isApproved: false,
            isRejected: false,
            points: {
                min: '',
                max: ''
            },
            credit: {
                min: '',
                max: '',
            },
			timestamp: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			]
		},
		onSubmit: (values) => {
			console.log('submit filter')
			console.log(values)

			// Send Filter
		},
	})

	const { 
		values,
		setFieldValue,
		handleChange,
		resetForm,
		handleSubmit
	} = formik

	const datePicker = (selectedDate: any, field: string) => (
		<DateRange
			onChange={(item) => setFieldValue(field, [item.selection])}
			showPreview
			moveRangeOnFirstSelection={false}
			retainEndDateOnFirstSelection={false}
			ranges={selectedDate}
			direction='horizontal'
			rangeColors={['#6c5dd3']}
		/>
	)

	  // eslint-disable-next-line react-hooks/exhaustive-deps
	const debounceSearchChange = useCallback(
		debounce((value: string) => {
			// Send search filter
			console.log(value)
		}, 1000), []
	  )

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		let value = event.target.value

		if (value) {
			setSearchInput(value)
			debounceSearchChange(value)
		}
	}

	return (
		<PageWrapper title={demoPages.crm.subMenu.customersList.text}>
			<SubHeader>
				<SubHeaderLeft>
					<label
						className='border-0 bg-transparent cursor-pointer me-0'
						htmlFor='searchInput'>
						<Icon icon='Search' size='2x' color='primary' />
					</label>
					<Input
						id='searchInput'
						type='search'
						className='border-0 shadow-none bg-transparent'
						placeholder={creditTableState === CREDIT_TABLE_STATE.REQUEST ?
							t('credit:search.credit.request.transaction') + '...' : t('credit:search.credit.history.transaction') + '...'
						}
						onChange={handleSearchChange}
						value={searchInput}
					/>
				</SubHeaderLeft>
				<SubHeaderRight>
					<CommonTableFilter
						resetLabel={t('filter.reset')}
						onReset={resetForm}
						submitLabel={t('filter')}
						onSubmit={handleSubmit}
						filters={[
							{
								label: t('filter.status'),
								disabled: creditTableState === CREDIT_TABLE_STATE.REQUEST,
								children: <div>
                                    <Checks
                                        id='isApproved'
                                        label={t('approve')}
                                        onChange={handleChange}
                                        checked={values.isApproved}
                                        ariaLabel={t('success')}
                                    />
                                    <Checks
                                        id='isRejected'
                                        label={t('reject')}
                                        onChange={handleChange}
                                        checked={values.isRejected}
                                        ariaLabel={t('not.found')}
                                    />
                                </div>
							},
                            {
								label: t('filter.timestamp'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.timestamp[0].startDate).format('MMM Do YY')} - ${moment(
												values.timestamp[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
										{datePicker(values.timestamp, 'timestamp')}
									</DropdownMenu>
								</Dropdown>
							},
							{
								label: t('filter.points'),
								children: <div>
									<InputGroup>
										<Input
											id='points.min'
											ariaLabel='Minimum points'
											placeholder={t('filter.min')}
											onChange={handleChange}
											value={values.points.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='points.max'
											ariaLabel='Maximum points'
											placeholder={t('filter.max')}
											onChange={handleChange}
											value={values.points.max}
											type='number'
										/>
									</InputGroup>
								</div>
							},
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
							}
						]} 
					/>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<CreditTable
                            cardHeader={
                                <CardHeader>
                                    <CardLabel>
									<CardTitle>{creditTableState === CREDIT_TABLE_STATE.REQUEST ? 
										t('credit:credit.request') : t('credit:credit.history')}</CardTitle>
                                    </CardLabel>
                                    <ButtonGroup>
                                        <Button
                                            color={creditTableState === CREDIT_TABLE_STATE.REQUEST ? 'success' : 'dark'}
                                            isLight={creditTableState !== CREDIT_TABLE_STATE.REQUEST}
                                            onClick={() => setCreditTableState(CREDIT_TABLE_STATE.REQUEST)}
                                        >
                                            {t('credit:request')}
                                        </Button>
                                        <Button
                                            color={creditTableState === CREDIT_TABLE_STATE.HISTORY ? 'success' : 'dark'}
                                            isLight={creditTableState !== CREDIT_TABLE_STATE.HISTORY}
                                            onClick={() => setCreditTableState(CREDIT_TABLE_STATE.HISTORY)}
                                        >
                                            {t('credit:history')}
                                        </Button>
                                    </ButtonGroup>
                                </CardHeader>
                            }
                            data={creditTableState === CREDIT_TABLE_STATE.REQUEST ? 
								data.filter((i: any) => i.status === 'request') : 
								data.filter((i: any) => i.status !== 'request')
							}
                            setIsOpenCreditModal={creditTableState === CREDIT_TABLE_STATE.REQUEST ? setIsOpenCreditModal : undefined}
                            columns={{ mobileNumber: true, notes: true, status: creditTableState === CREDIT_TABLE_STATE.HISTORY, operator: creditTableState === CREDIT_TABLE_STATE.HISTORY }} 
                        />
					</div>
				</div>
			</Page>
			{isOpenCreditModal && <CreditModal setIsOpen={setIsOpenCreditModal} isOpen={Boolean(isOpenCreditModal)} properties={isOpenCreditModal} />}
		</PageWrapper>
	)
}

export default Credit
