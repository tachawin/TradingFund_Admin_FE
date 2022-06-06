import { Children, cloneElement } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import TagWrapper from '../TagWrapper';
import { ChevronRight, HolidayVillageTwoTone } from '@mui/icons-material';

interface BreadcrumbItemInterface {
	children: any,
	ariaLabel?: string,
	className?: string,
	tag?: string,
	to: string,
	isActive?: boolean,
	divider?: any,
}

export const BreadcrumbItem = ({ children, ariaLabel, className, tag = "li", to, isActive = false, divider }: BreadcrumbItemInterface) => {
	return (
		<TagWrapper
			tag={tag}
			className={classNames('breadcrumb-item', { active: isActive }, className)}
			aria-current={isActive ? 'page' : null}
			aria-label={ariaLabel || children}>
			{divider &&
				typeof divider !== 'string' &&
				cloneElement(divider, {
					className: classNames('breadcrumb-icon', divider.props.className),
				})}
			{isActive ? (
				children
			) : (
				<NavLink to={to} aria-label={ariaLabel || children}>
					{children}
				</NavLink>
			)}
		</TagWrapper>
	);
};

interface BreadcrumbInterface {
	children?: any,
	tag?: string,
	listTag?: string,
	itemTag?: string,
	ariaLabel?: string,
	list?: any,
	autoActive?: boolean,
	isToHome?: any,
	divider?: any,
}

const Breadcrumb = ({
	children,
	list,
	tag = 'nav',
	listTag = 'ol',
	itemTag = 'li',
	ariaLabel = 'breadcrumb',
	autoActive = true,
	isToHome = <HolidayVillageTwoTone />,
	divider = <ChevronRight />,
}: BreadcrumbInterface) => {
	const _divider = divider !== 'string' && divider;
	return (
		<TagWrapper
			tag={tag}
			aria-label={ariaLabel}
			style={
				divider
					? {
							'--bs-breadcrumb-divider':
								typeof divider === 'string' ? `'${divider}'` : 'none',
					  }
					: null
			}>
			<TagWrapper tag={listTag} className='breadcrumb'>
				{isToHome && (
					<BreadcrumbItem to='/' ariaLabel='Home'>
						{isToHome}
					</BreadcrumbItem>
				)}
				{list
					? list.map((item: any, index: number) => (
							<BreadcrumbItem
								key={item.title}
								tag={item.tag || itemTag}
								to={item.to}
								isActive={autoActive && list.length === index + 1}
								divider={_divider}>
								{item.title}
							</BreadcrumbItem>
					  ))
					: Children.map(children, (child, index) =>
							cloneElement(child, {
								tag: child.props.tag || itemTag,
								isActive: autoActive && children.length === index + 1,
								divider: child.props.divider || _divider,
							}),
					  )}
			</TagWrapper>
		</TagWrapper>
	);
};

export default Breadcrumb;
