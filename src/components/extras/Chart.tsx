import { memo } from 'react';
import ReactApexChart from 'react-apexcharts';
import classNames from 'classnames';

interface ChartInterface {
	id?: string
	series: any,
	options: any,
	type?: any,
	width?: string | number,
	height?: string | number,
	className?: string,
	style?: any
}

const Chart = ({ series, options, type = 'line', width = '100%', height = 'auto', className, ...props }: ChartInterface) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div className={classNames('apex-chart', className)} {...props}>
			<ReactApexChart
				options={{
					colors: [
						process.env.REACT_APP_PRIMARY_COLOR,
						process.env.REACT_APP_SECONDARY_COLOR,
						process.env.REACT_APP_SUCCESS_COLOR,
						process.env.REACT_APP_INFO_COLOR,
						process.env.REACT_APP_WARNING_COLOR,
						process.env.REACT_APP_DANGER_COLOR,
					],
					plotOptions: {
						candlestick: {
							colors: {
								upward: process.env.REACT_APP_SUCCESS_COLOR,
								downward: process.env.REACT_APP_DANGER_COLOR,
							},
						},
						boxPlot: {
							colors: {
								upper: process.env.REACT_APP_SUCCESS_COLOR,
								lower: process.env.REACT_APP_DANGER_COLOR,
							},
						},
					},
					...options,
				}}
				series={series}
				type={type}
				width={width}
				height={height}
			/>
		</div>
	);
};

export default memo(Chart);
