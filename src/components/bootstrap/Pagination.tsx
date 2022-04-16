import { forwardRef } from 'react';
import classNames from 'classnames';
import Icon from '../icon/Icon';

interface PaginationItemInterface {
	className?: string,
	isDisabled?: boolean,
	isActive?: boolean,
	isPrev?: boolean,
	isFirst?: boolean,
	isNext?: boolean,
	isLast?: boolean,
	children?: any,
	onClick?: any,
}

export const PaginationItem = forwardRef<HTMLLIElement, PaginationItemInterface>(
	(
		{
			className,
			isDisabled = false,
			isActive = false,
			isPrev = false,
			isFirst = false,
			isNext = false,
			isLast = false,
			children,
			onClick,
			...props
		},
		ref,
	) => {
		return (
			<li
				ref={ref}
				className={classNames(
					'page-item',
					{
						disabled: isDisabled,
						active: isActive,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				<span
					role='button'
					onClick={onClick}
					onKeyDown={onClick}
					className='page-link'
					tabIndex={isDisabled ? -1 : undefined}
					aria-disabled={isDisabled ? true : undefined}
					aria-label={
						(isPrev && 'First Page') || (isNext && 'Last Page') || `${children} page`
					}>
					{isPrev && <Icon icon='ChevronLeft' />}
					{isFirst && <Icon icon='FirstPage' />}
					{isNext && <Icon icon='ChevronRight' />}
					{isLast && <Icon icon='LastPage' />}
					{children}
				</span>
			</li>
		);
	},
);

interface PaginationInterface {
	ariaLabel?: string,
	children: any,
	className?: string,
	size?: string
}

const Pagination = forwardRef<HTMLElement, PaginationInterface>(({ ariaLabel, className, children, size, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<nav ref={ref} aria-label={ariaLabel} className={className} {...props}>
			<ul className={classNames('pagination', { [`pagination-${size}`]: size }, 'm-0')}>
				{children}
			</ul>
		</nav>
	);
});

export default Pagination;
