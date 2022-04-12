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
// import CreditModal from './CreditModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import banks from 'common/data/dummyBankData'
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

interface CreditModalProperties {
	type: string
	selectedRow: any
}

const Credit = () => {
    const { t } = useTranslation(['common', 'credit'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenCreditModal, setIsOpenCreditModal] = useState<CreditModalProperties>()
    const [CreditTableState, setCreditTableState] = useState('request')

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
						placeholder={t('credit:search.credit.transaction') + '...'}
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
                                        <CardTitle>{t('credit:credit.request')}</CardTitle>
                                    </CardLabel>
                                    <ButtonGroup>
                                        <Button
                                            color={CreditTableState === 'request' ? 'success' : 'dark'}
                                            isLight={CreditTableState !== 'request'}
                                            onClick={() => setCreditTableState('request')}
                                        >
                                            {t('credit:request')}
                                        </Button>
                                        <Button
                                            color={CreditTableState === 'history' ? 'success' : 'dark'}
                                            isLight={CreditTableState !== 'history'}
                                            onClick={() => setCreditTableState('history')}
                                        >
                                            {t('credit:history')}
                                        </Button>
                                    </ButtonGroup>
                                </CardHeader>
                            }
                            data={data.filter((i: any) => i.status === 'request' )} 
                            setIsOpenCreditModal={setIsOpenCreditModal}
                            columns={{ mobileNumber: true, notes: true }} 
                        />
					</div>
				</div>
			</Page>
			{/* {isOpenCreditModal && <CreditModal setIsOpen={setIsOpenCreditModal} isOpen={Boolean(isOpenCreditModal)} properties={isOpenCreditModal} />} */}
		</PageWrapper>
	)
}

export default Credit
