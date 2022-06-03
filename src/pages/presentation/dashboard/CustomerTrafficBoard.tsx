import { useEffect, useState } from 'react'
import moment from 'moment'
import 'moment/locale/th'
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card'
import Button from '../../../components/bootstrap/Button'
import Chart from '../../../components/extras/Chart'
import { useTranslation } from 'react-i18next'
import { CustomerMetricInterface, getCustomerRegisterAndActionMetric } from 'common/apis/dashboard'
import showNotification from 'components/extras/showNotification'
import Spinner from 'components/bootstrap/Spinner'
import { InfoTwoTone } from '@mui/icons-material'

enum DateRange {
	Week = 'week',
	Month = 'month',
}

const CustomerTrafficBoard = () => {
    const { t } = useTranslation('dashboard')
	const [activeDateRangeTab, setActiveDateRangeTab] = useState<DateRange>(DateRange.Week)
	const [trafficData, setTrafficData] = useState<CustomerMetricInterface>({})
	const [isLoading, setIsLoading] = useState(true)

	const dateRange = {
		week: {
			start: moment().subtract(7,'d').format('YYYY-MM-DD'),
			end: moment().format('YYYY-MM-DD')
		},
		month: {
			start: moment().subtract(1, 'months').format('YYYY-MM-DD'),
			end: moment().format('YYYY-MM-DD')
		}
	}

	useEffect(() => {
		setIsLoading(true)
		const selectedDateRange = dateRange[activeDateRangeTab]
		getCustomerRegisterAndActionMetric(selectedDateRange.start, selectedDateRange.end, (metric: CustomerMetricInterface) => {
			setTrafficData(metric)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.dashboard.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		}).finally(() => setIsLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeDateRangeTab])

	const chartOptions = {
		chart: {
			height: 400,
			type: 'area',
			toolbar: {
				show: false,
			},
		},
		colors: [process.env.REACT_APP_INFO_COLOR, process.env.REACT_APP_SUCCESS_COLOR],
		dataLabels: {
			enabled: false,
		},
		stroke: {
			curve: 'smooth',
		},
		tooltip: {
			x: {
				format: 'dd/MM/yy HH:mm',
			},
			theme: 'dark',
		},
		fill: {
			type: 'gradient',
			gradient: {
				shadeIntensity: 1,
				opacityFrom: 0.5,
				opacityTo: 0,
				stops: [0, 100],
			},
		},
	};

	const getLineChartData = () => {
		const trafficDateList = Object.keys(trafficData).map((date) => 
			moment(date).locale('th').format('ll')
		)
		const trafficValueList = Object.values(trafficData)
		const totalRegisterList: number[] = []
		const totalRegisterAndActionList: number[] = []
		trafficValueList.forEach((trafficValue) => {
			totalRegisterList.push(trafficValue.totalRegister)
			totalRegisterAndActionList.push(trafficValue.totalRegisterAndAction)
		})

		return { 
			series: [
				{
					name: 'จำนวนผู้ใช้ใหม่',
					data: totalRegisterList,
				},
				{
					name: 'จำนวนผู้ใช้ใหม่ที่ทำรายการ',
					data: totalRegisterAndActionList,
				},
			],
			options: {
				...chartOptions,
				xaxis: {
					categories: trafficDateList,
				},
				yaxis: {
					labels: {
						formatter: function(val: number) {
							return val.toFixed(0);
						}
					}
				}
			},
		};
	}

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle>{t('customer.traffic')}</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						onClick={() => setActiveDateRangeTab(DateRange.Week)}
						isLink={activeDateRangeTab !== DateRange.Week}
						isLight={activeDateRangeTab === DateRange.Week}>
						{t('week')}
					</Button>
					<Button
						color='info'
						onClick={() => setActiveDateRangeTab(DateRange.Month)}
						isLink={activeDateRangeTab !== DateRange.Month}
						isLight={activeDateRangeTab === DateRange.Month}>
						{t('month')}
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody className='w-100 d-flex justify-content-center'>
				{isLoading ? <Spinner color='primary' isGrow size={50} />
					: <Chart
						className='w-100'
						series={getLineChartData().series}
						options={getLineChartData().options}
						type={getLineChartData().options.chart.type}
						height={getLineChartData().options.chart.height}
					/>
				}
			</CardBody>
		</Card>
	)
}

export default CustomerTrafficBoard
