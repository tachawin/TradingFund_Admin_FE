import React, { useEffect, useState } from 'react'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper'
import Page from '../../../layout/Page/Page'
import { demoPages } from '../../../menu'
import CustomerTrafficBoard from './CustomerTrafficBoard'
import MetricBoard, { MetricBoardType } from './MetricBoard'
import { useTranslation } from 'react-i18next'
import { getTransactionMetric, TransactionMetricInterface } from 'common/apis/dashboard'
import showNotification from 'components/extras/showNotification'
import Dropdown, { DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { Calendar as DatePicker } from 'react-date-range'
import { th } from 'date-fns/locale'
import { getLabel } from 'components/extras/calendarHelper'
import { Views } from 'react-big-calendar'
import moment from 'moment'
import { InfoTwoTone } from '@mui/icons-material'

const Dashboard = () => {
	const { t } = useTranslation('dashboard')

	const [date, setDate] = useState<Date>(new Date())
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
	const [transactionMetric, setTransactionMetric] = useState<TransactionMetricInterface>()

    const onDateChange = (item: Date) => {
        setDate(item)
        setIsOpenCalendar(false)
    }

    useEffect(() => {
		setIsLoading(true)
		getTransactionMetric(moment(date).format('YYYY-MM-DD'), (metric: TransactionMetricInterface) => {
			setTransactionMetric(metric)
			setIsLoading(false)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			setIsLoading(false)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.deposit.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		})
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date])

	return (
		<PageWrapper title={demoPages.crm.subMenu.dashboard.text}>
			<Page className='pt-0'>
				<div className='col px-4'>
                    <div className='d-flex flex-column'>
						<Dropdown className='mb-2 align-self-end'>
							<DropdownToggle color='primary' isLight hasIcon={false} isOpen={isOpenCalendar} setIsOpen={setIsOpenCalendar}>
								<span>{getLabel(date, Views.DAY)}</span>
							</DropdownToggle>
							<DropdownMenu className='p-0' isAlignmentEnd isOpen={isOpenCalendar} setIsOpen={setIsOpenCalendar}>
								<DatePicker
									onChange={onDateChange}
									date={date}
									color={process.env.REACT_APP_PRIMARY_COLOR}
									locale={th}
									maxDate={new Date()}
								/>
							</DropdownMenu>
						</Dropdown>
						<div className='row gap-4'>
							<MetricBoard
								isLoading={isLoading}
								type={MetricBoardType.Day} 
								deposit={transactionMetric?.am.deposit} 
								withdraw={transactionMetric?.am.withdraw} 
							/>
							<MetricBoard
								isLoading={isLoading}
								type={MetricBoardType.Night} 
								deposit={transactionMetric?.pm.deposit} 
								withdraw={transactionMetric?.pm.withdraw} 
							/>
						</div>
                    </div>
					<div className='row'>
						<CustomerTrafficBoard />
					</div>
				</div>
			</Page>
		</PageWrapper>
	)
}

export default Dashboard
