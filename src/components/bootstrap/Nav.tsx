import { forwardRef, cloneElement } from 'react';
import classNames from 'classnames';

interface NavLinkDropdown {
	children: any,
	className?: string,
}

export const NavLinkDropdown = forwardRef<HTMLSpanElement, NavLinkDropdown>(({ children, className, ...props }, ref) => {
	return (
		<span
			ref={ref}
			className={classNames('nav-link', 'cursor-pointer', className)}
			aria-current='page'
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</span>
	);
});

interface NavItem {
	children: any,
	className?: string,
	isActive?: boolean,
	isDisable?: boolean,
}

export const NavItem = forwardRef<HTMLLIElement, NavItem>(({ children, className, isActive = false, isDisable = false, ...props }, ref) => {
	if (children.type.displayName === 'Dropdown') {
		return cloneElement(children, {
			tag: 'li',
			className: classNames(children.props.className, 'nav-item'),
		});
	}
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<li ref={ref} className={classNames('nav-item', className)} {...props}>
			{cloneElement(children, {
				className: classNames(
					children.props.className,
					{ active: isActive, disabled: isDisable },
					'nav-link',
				),
			})}
		</li>
	);
});

interface NavInterface {
	children: any,
	className?: string,
	tag?: any,
	design?: string,
	isFill?: boolean,
	isJustified?: boolean,
	isVertical?: boolean,
	verticalBreakpoint?: string,
}

const Nav = forwardRef<any, NavInterface>(
	(
		{
			tag: Tag = 'ul',
			children,
			className,
			design = 'pills',
			isFill = false,
			isJustified = false,
			isVertical = false,
			verticalBreakpoint,
			...props
		},
		ref,
	) => {
		return (
			<Tag
				ref={ref}
				className={classNames(
					'nav',
					{
						[`nav-${design}`]: design,
						'nav-fill': isFill,
						'nav-justified': isJustified,
					},
					{
						[`flex${verticalBreakpoint ? `-${verticalBreakpoint}` : ''}-column`]:
							isVertical || !!verticalBreakpoint,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</Tag>
		);
	},
);

export default Nav;
