import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import TagWrapper from '../TagWrapper';
import Icon from '../icon/Icon';

interface ButtonGroupInterface {
	isToolbar?: boolean
	isVertical?: boolean
	size?: string
	ariaLabel?: string
	className?: string
	children: ReactNode
}

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupInterface>(
	({ children, className, isToolbar, isVertical, size, ariaLabel, ...props }, ref) => {
		const _prefix = isToolbar ? 'toolbar' : 'group';
		return (
			<div
				ref={ref}
				className={classNames(
					{
						[`btn-${_prefix}`]: !isVertical,
						'btn-group-vertical': isVertical && _prefix === 'group',
						[`btn-group-${size}`]: size,
					},
					className,
				)}
				role={_prefix}
				aria-label={ariaLabel}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</div>
		);
	},
);

interface ButtonInterface {
	children?: ReactNode,
	tag?: string,
	type?: string,
	to?: string,
	href?: string,
	isActive?: boolean,
	color?: any,
	isOutline?: boolean,
	isLight?: boolean,
	isLink?: boolean,
	className?: string,
	icon?: string | null,
	rounded?: string | number,
	size?: string,
	isDisable?: boolean,
	shadow?: string,
	hoverShadow?: string,
	target?: string,
	isVisuallyHidden?: boolean,
	role?: string,
	onClick?: any,
	download?: boolean
	id?: string
}

const Button = forwardRef<any, ButtonInterface>(
	(
		{
			children,
			tag,
			type,
			to,
			href,
			isActive,
			color,
			isOutline,
			isLight,
			isLink,
			className,
			icon,
			rounded,
			size,
			isDisable,
			shadow,
			hoverShadow,
			target,
			isVisuallyHidden,
			...props
		},
		ref,
	) => {
		const _btnClass = classNames(
			'btn',
			{
				[`btn-${isOutline || isLink ? `outline-${color}` : color}`]:
					(color && !isLight) || (color && isLink),
				'border-transparent': isLink,
				[`btn-${size}`]: size,
				[`btn-hover-shadow${hoverShadow !== 'default' ? `-${hoverShadow}` : ''}`]:
					hoverShadow,
				[`btn-light-${color}`]: isLight,
				[`shadow${shadow !== 'default' ? `-${shadow}` : ''}`]: !!shadow,
				[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]: rounded,
				'rounded-0':
					rounded === 'bottom' ||
					rounded === 'top' ||
					rounded === 'end' ||
					rounded === 'start' ||
					rounded === 0 ||
					rounded === '0',
				'btn-only-icon': !children || isVisuallyHidden,
				disabled: isDisable,
				active: isActive,
			},
			className,
		);

		const _Inner = (
			<>
				{icon && <Icon icon={icon} className='btn-icon' />}
				{isVisuallyHidden ? (
					<span className='visually-hidden'>Toggle Dropdown</span>
				) : (
					children
				)}
			</>
		);

		const _anchorLinkPattern = /^#/i;

		const disableProps = isDisable && {
			tabIndex: -1,
			'aria-disabled': true,
			disabled: true,
		};

		if (tag === 'a') {
			if (to && _anchorLinkPattern.test(to)) {
				return (
					<HashLink
						ref={ref}
						className={_btnClass}
						to={to}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...disableProps}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...props}>
						{_Inner}
					</HashLink>
				);
			}
			if (to) {
				return (
					<Link
						ref={ref}
						className={_btnClass}
						to={to}
						rel='noopener'
						target={target}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...disableProps}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...props}>
						{_Inner}
					</Link>
				);
			}
			return (
				<a
					ref={ref}
					className={_btnClass}
					href={href}
					role='button'
					rel='noopener'
					target={target}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...disableProps}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}>
					{_Inner}
				</a>
			);
		}
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				type={type}
				className={_btnClass}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...disableProps}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{_Inner}
			</TagWrapper>
		);
	},
);

export default Button;
