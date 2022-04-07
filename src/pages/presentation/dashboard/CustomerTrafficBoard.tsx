import { useState } from 'react'
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

const CustomerTrafficBoard = () => {
    const { t } = useTranslation('dashboard')

	const chartOptions = {
		chart: {
			height: 400,
			type: 'area',
			toolbar: {
				show: false,
			},
		},
		colors: [process.env.REACT_APP_INFO_COLOR],
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
	}

	function getDate(day: number) {
		const arr = []
		for (let i = 0; i < day; i += 1) {
			arr.push(
				moment()
                    .locale('th')
					.add(-1 * i, 'day')
					.format('ll'),
			)
		}
		return arr.reverse()
	}

	const DUMMY_DATA = {
		WEEK: {
			series: [
				{
					name: 'This Week',
					data: [11, 32, 45, 32, 34, 52, 41],
				},
			],
			options: {
				...chartOptions,
				xaxis: {
					categories: getDate(7),
				},
			},
		},
		MONTH: {
			series: [
				{
					name: 'This Month',
					data: [
						11, 32, 45, 32, 34, 52, 41, 24, 32, 45, 32, 43, 52, 41, 28, 32, 45, 67, 34,
						52, 41, 11, 32, 89, 32, 34, 52, 41,
					],
				},
			],
			options: {
				...chartOptions,
				xaxis: {
					categories: getDate(28),
				},
			},
		},
	}
	const [state, setState] = useState<{
		series: any
		options: any
	}>({
		series: DUMMY_DATA.WEEK.series,
		options: DUMMY_DATA.WEEK.options,
	})

	const SALE_PER_TAB = {
		DAY: t('day'),
		WEEK: t('week'),
		MONTH: t('month'),
	}

	const [activeSalePerTab, setActiveSalePerTab] = useState<string>(t('week'))

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle>{t('customer.traffic')}</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						onClick={() => {
							setActiveSalePerTab(SALE_PER_TAB.WEEK)
							setState({
								series: DUMMY_DATA.WEEK.series,
								options: DUMMY_DATA.WEEK.options,
							})
						}}
						isLink={activeSalePerTab !== SALE_PER_TAB.WEEK}
						isLight={activeSalePerTab === SALE_PER_TAB.WEEK}>
						{t('week')}
					</Button>
					<Button
						color='info'
						onClick={() => {
							setActiveSalePerTab(SALE_PER_TAB.MONTH)
							setState({
								series: DUMMY_DATA.MONTH.series,
								options: DUMMY_DATA.MONTH.options,
							})
						}}
						isLink={activeSalePerTab !== SALE_PER_TAB.MONTH}
						isLight={activeSalePerTab === SALE_PER_TAB.MONTH}>
						{t('month')}
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody>
				<Chart
					series={state.series}
					options={state.options}
					type={state.options.chart.type}
					height={state.options.chart.height}
				/>
			</CardBody>
		</Card>
	)
}

export default CustomerTrafficBoard
