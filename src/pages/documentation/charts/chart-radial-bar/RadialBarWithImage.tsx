import { useState } from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Chart from '../../../../components/extras/Chart';

const RadialBarWithImage = () => {
	const [state] = useState({
		series: [67],
		options: {
			chart: {
				height: 350,
				type: 'radialBar',
			},
			plotOptions: {
				radialBar: {
					hollow: {
						margin: 15,
						size: '70%',
						image: '../../../../assets/img/Alarm Clock.svg',
						imageWidth: 64,
						imageHeight: 64,
						imageClipped: false,
					},
					dataLabels: {
						name: {
							show: false,
							color: '#fff',
						},
						value: {
							show: true,
							color: '#333',
							offsetY: 70,
							fontSize: '22px',
						},
					},
				},
			},
			fill: {
				type: 'image',
				image: {
					src: ['../../../../assets/img/clock.jpeg'],
				},
			},
			stroke: {
				lineCap: 'round',
			},
			labels: ['Volatility'],
		},
	});
	return (
		<div className='col-lg-6'>
			<Card stretch>
				<CardHeader>
					<CardLabel icon='DonutLarge'>
						<CardTitle>
							type <small>radialBar</small>
						</CardTitle>
						<CardSubTitle>Chart</CardSubTitle>
					</CardLabel>
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
		</div>
	);
};

export default RadialBarWithImage;
