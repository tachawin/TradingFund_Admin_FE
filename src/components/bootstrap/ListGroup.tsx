import { forwardRef } from 'react';
import classNames from 'classnames';
import TagWrapper from '../TagWrapper';
import Button from './Button';

interface ListGroupItemInterface {
	children: any,
	className?: string,
	tag?: string,
	color?: string,
	isActive?: boolean,
	isDisable?: boolean,
	href?: string,
	onClick?: any
}

export const ListGroupItem = forwardRef<any, ListGroupItemInterface>(
	({ tag = "li", children, className, color, isActive = false, isDisable = false, onClick, ...props }, ref) => {
		return (
			<Button
				ref={ref}
				className={classNames(
					'list-group-item',
					{
						'list-group-item-action': tag === 'a' || tag === 'button',
						[`list-group-item-${color}`]: color,
						active: isActive,
						disabled: isDisable,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
				onClick={onClick}
			>
				{children}
			</Button>
		);
	},
);

interface ListGroupInterface {
	children: any,
	className?: string,
	tag?: string,
	isFlush?: boolean,
	isHorizontal?: boolean | string,
	isNumbered?: boolean,
}

const ListGroup = forwardRef<any, ListGroupInterface>(
	({ children, className, tag = "ul", isHorizontal = false, isFlush = false, isNumbered = false, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'list-group',
					{
						'list-group-flush': isFlush,
					},
					{ 'list-group-numbered': isNumbered },
					{
						[`list-group-horizontal${
							typeof isHorizontal === 'string' ? `-${isHorizontal}` : ''
						}`]: isHorizontal,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{children}
			</TagWrapper>
		);
	},
);

export default ListGroup;
