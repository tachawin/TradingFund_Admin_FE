import React, { cloneElement, useState } from 'react';
import { usePopper } from 'react-popper';
import classNames from 'classnames';
import Portal from '../../layout/Portal/Portal';

interface PopoversInterface {
	children: any,
	title?: string | null,
	flip?: string[],
	trigger?: string,
	delay?: number,
	isDisplayInline?: boolean,
	className?: string | null,
	bodyClassName?: string | null,
	modifiers?: any,
	desc?: any,
	placement?: any
}

const Popovers = ({
	children,
	className = null,
	bodyClassName = null,
	title = null,
	desc = null,
	placement = 'top',
	flip = ['top', 'bottom'],
	trigger = 'click',
	delay = 0,
	isDisplayInline = false,
	modifiers = {
		name: 'example',
		enabled: false,
		phase: 'read',
		fn: () => {},
	},
	...props
}: PopoversInterface) => {
	const [referenceElement, setReferenceElement] = useState<any>(null);
	const [popperElement, setPopperElement] = useState<any>(null);
	const [arrowElement, setArrowElement] = useState<any>(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement,
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 6.5],
				},
			},
			{
				name: 'flip',
				enabled: true,
				options: {
					fallbackPlacements: flip,
				},
			},
			{
				name: 'arrow',
				options: {
					element: arrowElement,
				},
			},
			{ ...modifiers },
		],
	});

	const [popoverOpen, setPopoverOpen] = useState(false);
	
	const _onClick = () => {
		if (trigger === 'click') setPopoverOpen(!popoverOpen);
		if (children?.props?.onClick) children.props.onClick();
	};

	const _onMouseOver = () => {
		if (trigger === 'hover') setPopoverOpen(true);
		if (children?.props?.onMouseOver) children.props.onMouseOver();
	};

	const _onMouseLeave = () => {
		if (trigger === 'hover') setTimeout(() => setPopoverOpen(false), delay);
		if (children?.props?.onMouseLeave) children.props.onMouseLeave();
	};

	const _props = {
		className: classNames(
			{ 'd-inline-block': isDisplayInline, 'popover-string': typeof children === 'string' },
			children?.props?.className,
		),
		onClick: _onClick,
		onMouseOver: _onMouseOver,
		onMouseLeave: _onMouseLeave,
	};

	return (
		<>
			{cloneElement(
				typeof children === 'string' ? (
					// eslint-disable-next-line react/jsx-props-no-spreading
					<span ref={setReferenceElement} {..._props}>
						{children}
					</span>
				) : (
					children
				),
				{
					ref: setReferenceElement,
					..._props,
				},
			)}
			{popoverOpen && (
				<Portal>
					<div
						ref={setPopperElement}
						role='tooltip'
						className={classNames('popover', 'bs-popover-auto', className)}
						style={styles.popper}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...props}
						// eslint-disable-next-line react/jsx-props-no-spreading
						{...attributes.popper}>
						<div ref={setArrowElement} className='popover-arrow' style={styles.arrow} />
						{title && <h3 className='popover-header'>{title}</h3>}
						{desc && (
							<div className={classNames('popover-body', bodyClassName)}>{desc}</div>
						)}
					</div>
				</Portal>
			)}
		</>
	);
};

export default Popovers;
