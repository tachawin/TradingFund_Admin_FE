import { Children, cloneElement, forwardRef, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Popovers from './bootstrap/Popovers';
import useDarkMode from '../hooks/useDarkMode';

interface AvatarGroupInterface {
	size?: number
	className?: string
	children: any
}

export const AvatarGroup = ({ className, children, size }: AvatarGroupInterface) => {
	const { darkModeStatus } = useDarkMode();

	return (
		<div className={classNames('avatar-group', className)}>
			<div className='avatar-container'>
				{Children.map(children, (child: any, index) =>
					index < 3
						? cloneElement(child, {
								borderColor: darkModeStatus ? 'dark' : 'white',
								border: 2,
								color: child.props.color || 'white',
								size,
						  })
						: null,
				)}
			</div>
			{children.length > 3 && (
				<Popovers
					desc={Children.map(children, (child: any, index) =>
						index >= 3 ? (
							<>
								{child.props.userName}
								<br />
							</>
						) : null,
					)}
					trigger='hover'>
					<div className='avatar-more' style={{ width: size, height: size }}>
						+{children.length - 3}
					</div>
				</Popovers>
			)}
		</div>
	);
};

interface AvatarInterface {
	src?: string,
	srcSet?: string | undefined,
	className?: string,
	size?: number,
	rounded?: string | number,
	color?: string,
	shadow?: string,
	border?: number,
	borderColor?: string,
	userName?: string,
	isOnline?: boolean,
	isReply?: boolean,
	onClick?: any
}

const Avatar = forwardRef<any, AvatarInterface>(
	(
		{
			srcSet,
			src,
			className = null,
			size = 128,
			rounded = 'circle',
			shadow = null,
			color = 'primary',
			border = null,
			borderColor = null,
			userName = null,
			isOnline = false, // Not used
			isReply = false, // Not used
			...props
		},
		ref,
	) => {
		const { darkModeStatus } = useDarkMode();

		const _Inner = (
			<img
				ref={ref}
				className={classNames(
					'avatar',
					{
						[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]: rounded,
						'rounded-0': rounded === 0 || rounded === '0',
						[`shadow${shadow !== 'default' ? `-${shadow}` : ''}`]: !!shadow,
						border: !!border,
						[`border-${border}`]: !!border,
						[`border-${borderColor}`]: borderColor,
					},
					`bg-l${darkModeStatus ? 'o' : ''}25-${color}`,
					className,
				)}
				srcSet={srcSet}
				src={src}
				alt='Avatar'
				width={size}
				height={size}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
			/>
		);

		if (userName) {
			return (
				<Popovers desc={userName} trigger='hover'>
					{_Inner}
				</Popovers>
			);
		}
		return _Inner;
	},
);

export default Avatar;
