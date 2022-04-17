import { ChangeEvent, useCallback, useState } from 'react'
import { useFormik } from 'formik'
import debounce from 'lodash/debounce'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
    SubheaderSeparator
} from '../../../layout/SubHeader/SubHeader'
import Page from '../../../layout/Page/Page'
import { pages } from '../../../menu'
import moment from 'moment'
import { DateRange } from 'react-date-range'
import data from '../../../common/data/dummyLevelsData'
import Icon from '../../../components/icon/Icon'
import Input from '../../../components/bootstrap/forms/Input'
import Dropdown, {
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'
import { useTranslation } from 'react-i18next'
import LevelModal from './LevelModal'
import InputGroup, { InputGroupText } from 'components/bootstrap/forms/InputGroup'
import CommonTableFilter from 'components/common/CommonTableFilter'
import LevelTable from './LevelTable'
import { CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import LevelDeleteModal from './LevelDeleteModal'
import Button from 'components/bootstrap/Button'

interface LevelFilterInterface {
	searchInput: string
	minimumDeposit: {
		min: string
		max: string
	}
	createdAt: {
		startDate: Date
		endDate: Date
		key: string
	}[]
    updatedAt: {
		startDate: Date
		endDate: Date
		key: string
	}[]
}

interface LevelModalProperties {
	type: string
	selectedRow: any
}

interface LevelDeleteModalProperties {
	selectedRow: any
}

const Level = () => {
    const { t } = useTranslation(['common', 'level'])

	const [isOpenCreatedAtDatePicker, setIsOpenCreatedAtDatePicker] = useState(false)
    const [isOpenUpdatedAtDatePicker, setIsOpenUpdatedAtDatePicker] = useState(false)
	const [searchInput, setSearchInput] = useState('')
    const [isOpenLevelModal, setIsOpenLevelModal] = useState<LevelModalProperties>()
    const [isOpenDeleteLevelModal, setIsOpenDeleteLevelModal] = useState<LevelDeleteModalProperties>()

	const formik = useFormik<LevelFilterInterface>({
		initialValues: {
			searchInput: '',
            minimumDeposit: {
                min: '',
                max: ''
            },
			createdAt: [
				{
					startDate: moment().startOf('week').add('-1', 'week').toDate(),
					endDate: moment().endOf('week').toDate(),
					key: 'selection',
				},
			],
            updatedAt: [
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
		<PageWrapper title={pages.level.text}>
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
						placeholder={t('level:search.level') + '...'}
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
								label: t('filter.created.at'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenCreatedAtDatePicker)} setIsOpen={setIsOpenCreatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.createdAt[0].startDate).format('MMM Do YY')} - ${moment(
												values.createdAt[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenCreatedAtDatePicker} setIsOpen={setIsOpenCreatedAtDatePicker}>
										{datePicker(values.createdAt, 'createdAt')}
									</DropdownMenu>
								</Dropdown>
							},
                            {
								label: t('filter.updated.at'),
								children: <Dropdown >
									<DropdownToggle color='dark' isLight hasIcon={false} isOpen={Boolean(isOpenUpdatedAtDatePicker)} setIsOpen={setIsOpenUpdatedAtDatePicker}>
										<span data-tour='date-range'>
											{`${moment(values.updatedAt[0].startDate).format('MMM Do YY')} - ${moment(
												values.updatedAt[0].endDate,
											).format('MMM Do YY')}`}
										</span>
									</DropdownToggle>
									<DropdownMenu isAlignmentEnd isOpen={isOpenUpdatedAtDatePicker} setIsOpen={setIsOpenUpdatedAtDatePicker}>
										{datePicker(values.updatedAt, 'updatedAt')}
									</DropdownMenu>
								</Dropdown>
							},
							{
								label: t('filter.minimum.deposit'),
								children: <div>
									<InputGroup>
										<Input
											id='minimumDeposit.min'
											ariaLabel='Minimum deposit'
											placeholder={t('filter.min')}
											onChange={handleChange}
											value={values.minimumDeposit.min}
											type='number'
										/>
										<InputGroupText>{t('filter.to')}</InputGroupText>
										<Input
											id='minimumDeposit.max'
											ariaLabel='Maximum deposit'
											placeholder={t('filter.max')}
											onChange={handleChange}
											value={values.minimumDeposit.max}
											type='number'
										/>
									</InputGroup>
								</div>
							}
						]} 
					/>
                    <SubheaderSeparator />
					<Button
						icon='PlusLg'
						color='primary'
						isLight
						onClick={() => setIsOpenLevelModal({ type: "add", selectedRow: null})}
					>
						{t('level:add.level')}
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100'>
					<div className='col-12'>
						<LevelTable
                            cardHeader={
                                <CardHeader>
                                    <CardLabel>
                                        <CardTitle>{t('level:level')}</CardTitle>
                                    </CardLabel>
                                </CardHeader>
                            }
                            data={data} 
                            setIsOpenLevelModal={setIsOpenLevelModal}
                            setIsOpenDeleteLevelModal={setIsOpenDeleteLevelModal}
                        />
					</div>
				</div>
			</Page>
			{isOpenLevelModal && <LevelModal setIsOpen={setIsOpenLevelModal} isOpen={Boolean(isOpenLevelModal)} properties={isOpenLevelModal} />}
            {isOpenDeleteLevelModal && <LevelDeleteModal setIsOpen={setIsOpenDeleteLevelModal} isOpen={Boolean(isOpenDeleteLevelModal)} properties={isOpenDeleteLevelModal} />}
		</PageWrapper>
	)
}

export default Level
