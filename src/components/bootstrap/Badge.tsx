import { ReactNode } from 'react';
import classNames from 'classnames';
import useDarkMode from '../../hooks/useDarkMode';

interface BadgeInterface {
	className?: string | null,
	color?: string,
	rounded?: string | number | null,
	shadow?: string | null,
	isLight?: boolean,
	children: ReactNode
};


const Badge = ({ children, className = null, color = 'primary', shadow = null, rounded = null, isLight = false, ...props }: BadgeInterface) => {
	const { darkModeStatus } = useDarkMode();
	return (
		<span
			className={classNames(
				'badge',
				{
					[`bg-${color}`]: !isLight,
					[`bg-l${darkModeStatus ? 'o25' : '10'}-${color}`]: isLight,
					[`text-${color}`]: isLight,
					[`shadow${shadow !== 'default' ? `-${shadow}` : ''}`]: !!shadow,
					[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]: rounded,
					'rounded-0':
						rounded === 'bottom' ||
						rounded === 'top' ||
						rounded === 'end' ||
						rounded === 'start' ||
						rounded === 0 ||
						rounded === '0',
				},
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</span>
	);
};

export default Badge;
