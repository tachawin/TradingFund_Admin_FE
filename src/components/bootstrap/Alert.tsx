import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import TagWrapper from '../TagWrapper';

interface AlertHeadingInterface {
	children: ReactNode,
	className?: string,
	href?: string,
	to?: string,
	tag?: string,
	id?: string
}

export const AlertHeading = ({ className, children, tag = 'h4', ...props }: AlertHeadingInterface) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<TagWrapper tag={tag} className={classNames('alert-heading', className)} {...props}>
			{children}
		</TagWrapper>
	);
};

interface AlertLinkInterface {
	children: ReactNode,
	className?: string,
	href?: string,
	to?: string,
	target?: string
	rel?: string
}

export const AlertLink = ({ className, children, href, to, ...props }: AlertLinkInterface) => {
	const _LinkClasses = classNames('alert-link', className);
	if (to) {
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<NavLink to={to} className={_LinkClasses} {...props}>
				{children}
			</NavLink>
		);
	}
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<a href={href} className={_LinkClasses} {...props}>
			{children}
		</a>
	);
};

interface AlertInterface {
	borderWidth?: number | null,
	children: ReactNode,
	className?: string,
	color?: string,
	icon?: any,
	isDismissible?: boolean,
	isLight?: boolean,
	isOutline?: boolean,
	shadow?: string | null,
	rounded?: string | number | null,
}

const Alert = ({
	children,
	className,
	color = 'primary',
	isDismissible = false,
	isOutline = false,
	isLight = false,
	shadow,
	icon: AlertIcon,
	rounded,
	borderWidth,
	...props
}: AlertInterface) => {
	const [status, setStatus] = useState(true);
	if (status) {
		return (
			<div
				className={classNames(
					'alert',
					{
						[`alert-${color}`]: color && !(isLight || isOutline),
						'alert-dismissible': isDismissible,
						fade: isDismissible,
						show: isDismissible,
						[`alert-light-${color}`]: isLight,
						[`alert-outline-${color}`]: isOutline,
						[`shadow${shadow !== 'md' ? `-${shadow}` : ''}`]:
							!!shadow && shadow !== '3d',
						[`border-${borderWidth}`]: borderWidth || borderWidth === 0,
						[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]:
							rounded || rounded === 0,
						[`shadow-3d-${color}`]: shadow === '3d',
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
				role='alert'>
				{AlertIcon ? (
					<>
						<div className='alert-icon'>
							<AlertIcon />
						</div>
						<div className='alert-text'>{children}</div>
					</>
				) : (
					children
				)}
				{isDismissible && (
					<button
						type='button'
						className='btn-close'
						aria-label='Close'
						onClick={() => setStatus(false)}
					/>
				)}
			</div>
		);
	}
	return null;
};

export default Alert;
