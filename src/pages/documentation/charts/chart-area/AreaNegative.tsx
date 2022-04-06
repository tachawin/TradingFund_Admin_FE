import { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Chart from '../../../../components/extras/Chart';

const AreaNegative = () => {
	const [state] = useState({
		series: [
			{
				name: 'North',
				data: [
					{
						x: 1996,
						y: 322,
					},
					{
						x: 1997,
						y: 324,
					},
					{
						x: 1998,
						y: 329,
					},
					{
						x: 1999,
						y: 342,
					},
					{
						x: 2000,
						y: 348,
					},
					{
						x: 2001,
						y: 334,
					},
					{
						x: 2002,
						y: 325,
					},
					{
						x: 2003,
						y: 316,
					},
					{
						x: 2004,
						y: 318,
					},
					{
						x: 2005,
						y: 330,
					},
					{
						x: 2006,
						y: 355,
					},
					{
						x: 2007,
						y: 366,
					},
					{
						x: 2008,
						y: 337,
					},
					{
						x: 2009,
						y: 352,
					},
					{
						x: 2010,
						y: 377,
					},
					{
						x: 2011,
						y: 383,
					},
					{
						x: 2012,
						y: 344,
					},
					{
						x: 2013,
						y: 366,
					},
					{
						x: 2014,
						y: 389,
					},
					{
						x: 2015,
						y: 334,
					},
				],
			},
			{
				name: 'South',
				data: [
					{
						x: 1996,
						y: 162,
					},
					{
						x: 1997,
						y: 90,
					},
					{
						x: 1998,
						y: 50,
					},
					{
						x: 1999,
						y: 77,
					},
					{
						x: 2000,
						y: 35,
					},
					{
						x: 2001,
						y: -45,
					},
					{
						x: 2002,
						y: -88,
					},
					{
						x: 2003,
						y: -120,
					},
					{
						x: 2004,
						y: -156,
					},
					{
						x: 2005,
						y: -123,
					},
					{
						x: 2006,
						y: -88,
					},
					{
						x: 2007,
						y: -66,
					},
					{
						x: 2008,
						y: -45,
					},
					{
						x: 2009,
						y: -29,
					},
					{
						x: 2010,
						y: -45,
					},
					{
						x: 2011,
						y: -88,
					},
					{
						x: 2012,
						y: -132,
					},
					{
						x: 2013,
						y: -146,
					},
					{
						x: 2014,
						y: -169,
					},
					{
						x: 2015,
						y: -184,
					},
				],
			},
		],
		options: {
			chart: {
				type: 'area',
				height: 350,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'straight',
			},

			title: {
				text: 'Area with Negative Values',
				align: 'left',
				style: {
					fontSize: '13px',
					fontWeight: 700,
				},
			},
			xaxis: {
				type: 'datetime',
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			yaxis: {
				tickAmount: 4,
				floating: false,

				labels: {
					style: {
						colors: '#8e8da4',
					},
					offsetY: -7,
					offsetX: 0,
				},
				axisBorder: {
					show: false,
				},
				axisTicks: {
					show: false,
				},
			},
			fill: {
				opacity: 0.5,
			},
			tooltip: {
				x: {
					format: 'yyyy',
				},
				fixed: {
					enabled: false,
					position: 'topRight',
				},
			},
			grid: {
				yaxis: {
					lines: {
						offsetX: -30,
					},
				},
				padding: {
					left: 20,
				},
			},
		},
	});
	return (
		<div className='col-lg-6'>
			<Card stretch>
				<CardHeader>
					<CardLabel icon='AreaChart'>
						<CardTitle>
							type <small>area</small>
						</CardTitle>
						<CardSubTitle>Chart</CardSubTitle>
					</CardLabel>
				</CardHeader>
				<CardBody>
					<Chart series={state.series} options={state.options} type='area' height={350} />
				</CardBody>
			</Card>
		</div>
	);
};

export default AreaNegative;
