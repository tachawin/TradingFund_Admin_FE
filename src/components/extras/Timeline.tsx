import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Icon from '../icon/Icon';
import Popovers from '../bootstrap/Popovers';

interface TimelineItemInterface {
	children: any,
	className?: string,
	color?: string | null,
	label: string,
}

export const TimelineItem = forwardRef<HTMLDivElement, TimelineItemInterface>(({ className, color, label, children, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('timeline-item', className)} {...props}>
			<div className='timeline-label text-truncate d-inline-block fw-bold'>
				<Popovers desc={label} trigger='hover'>
					<span>{label}</span>
				</Popovers>
			</div>
			<div className='timeline-badge'>
				<Icon icon='Circle' color={color} size='lg' />
			</div>
			<div className='timeline-content ps-3'>{children}</div>
		</div>
	);
});

interface TimelineInterface {
	children: any,
	className?: string,
}

const Timeline = forwardRef<HTMLDivElement, TimelineInterface>(({ className, children, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('timeline', className)} {...props}>
			{children}
		</div>
	);
});

export default Timeline;
