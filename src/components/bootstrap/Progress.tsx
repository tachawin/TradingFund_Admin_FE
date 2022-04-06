import { Children, cloneElement, CSSProperties, forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';

interface ProgressInterface {
	value?: number,
	min?: number,
	max?: number,
	height?: number | string,
	isStriped?: boolean,
	isAnimated?: boolean,
	isAutoColor?: boolean,
	color?: string,
	children?: ReactNode,
	className?: string,
	isOnlyBar?: boolean,
	customStyle?: CSSProperties
}

const useStyles = createUseStyles({
	// stylelint-disable-next-line selector-type-no-unknown
	dynamicHeight: (height: number | string) => ({
		height: height,
	}),
});

const Progress = forwardRef<any, ProgressInterface>(
	(
		{
			value = 0,
			min = 0,
			max = 100,
			height,
			isStriped = false,
			isAnimated = false,
			isAutoColor = false,
			color,
			children,
			className,
			
			isOnlyBar,
			...props
		},
		ref,
	) => {
		const _value = (100 * (value - min)) / (max - min);
		const classes = useStyles(height);

		const _onlyBar = (
			<div
				style={{
					width: `${_value}%`,
				}}
				className={classNames(
					'progress-bar',
					{
						'bg-danger': _value < 25 && isAutoColor,
						'bg-warning': _value >= 25 && _value < 50 && isAutoColor,
						'bg-info': _value >= 50 && _value < 75 && isAutoColor,
						'bg-success': _value >= 75 && isAutoColor,
					},
					{
						[`bg-${color}`]: color && !isAutoColor,
						'progress-bar-striped': isStriped || isAnimated,
						'progress-bar-animated': isAnimated,
					},
				)}
				role='progressbar'
				aria-label={`${value}%`}
				aria-valuenow={value}
				aria-valuemin={min}
				aria-valuemax={max}
			/>
		);

		if (isOnlyBar) {
			return _onlyBar;
		}
		return (
			<div
				ref={ref}
				className={classNames('progress', { [classes.dynamicHeight]: !!height }, className)}
				style={{
					
					...props.customStyle,
				}}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children
					? Children.map(children, (child: any) => cloneElement(child, { isOnlyBar: true }))
					: _onlyBar}
			</div>
		);
	},
);

export default Progress;
