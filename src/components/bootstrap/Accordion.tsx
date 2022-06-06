import { Children, cloneElement, forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TagWrapper from '../TagWrapper';

interface AccordionItemInterface {
	id: string | number,
	parentId?: string | number,
	title: string,
	children: any,
	icon?: any,
	tag?: string,
	headerTag?: string,
	overWriteColor?: string,
	activeItem?: any,
	setActiveItem?: any
}

export const AccordionItem = forwardRef<any, AccordionItemInterface>(
	({ id, icon: AccordionItemIcon, title, children, tag, headerTag, overWriteColor, ...props }, ref) => {
		
		const _active = props.activeItem === id;

		return (
			<TagWrapper tag={tag} ref={ref} className={classNames('accordion-item')}>
				<TagWrapper tag={headerTag} className={classNames('accordion-header')} id={id}>
					<button
						className={classNames('accordion-button', {
							collapsed: !_active,
							[`accordion-button-${overWriteColor}`]: overWriteColor,
						})}
						type='button'
						data-bs-toggle='collapse'
						data-bs-target={`#${id}Collapse`}
						aria-expanded={_active}
						aria-controls={`${id}Collapse`}
						onClick={() =>
							
							_active ? props.setActiveItem(null) : props.setActiveItem(id)
						}>
						{AccordionItemIcon && <AccordionItemIcon className='accordion-icon' />}
						{title}
					</button>
				</TagWrapper>
			</TagWrapper>
		);
	},
);

interface AccordionInterface {
	id: string | number,
	activeItemId?: boolean | string | number,
	children: any,
	isFlush?: boolean,
	className?: string,
	tag?: string,
	shadow?: string | null,
	color?: string,
}

const Accordion = forwardRef<any, AccordionInterface>(
	({ tag = 'div', id, activeItemId, children, shadow = 'default', color = 'primary', isFlush = false, className }, ref) => {
		const [activeItem, setActiveItem] = useState(
			activeItemId === false ? null : activeItemId || children.flat()[0].props.id,
		);

		return (
			<TagWrapper
				tag={tag}
				ref={ref}
				className={classNames(
					'accordion',
					{
						'accordion-flush': isFlush,
						'shadow-none': isFlush,
						[`shadow${shadow !== 'default' ? `-${shadow}` : ''}`]: !!shadow,
					},
					className,
				)}
				id={id}>
				{Children.map(children, (child) =>
					['AccordionItem'].includes(child.type.displayName) ? (
						cloneElement(child, {
							activeItem,
							setActiveItem,
							parentId: id,
							overWriteColor: child?.props?.overWriteColor || color,
						})
					) : (
						<code className='d-block'>
							Only AccordionItem component should be used as a child.
						</code>
					),
				)}
			</TagWrapper>
		);
	},
);
Accordion.propTypes = {
	id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
	/**
	 * By default, the first is enabled, you can enter the AcordionItem ID you want and make it appear active.
	 * If you don't want any of them to be active, you can give it "false".
	 */
	activeItemId: PropTypes.oneOfType([PropTypes.bool, PropTypes.string, PropTypes.number]),
	children: PropTypes.node.isRequired,
	/**
	 * If checked true the shadow is cleared.
	 */
	isFlush: PropTypes.bool,
	className: PropTypes.string,
	tag: PropTypes.oneOf(['div', 'section']),
	shadow: PropTypes.oneOf([null, 'none', 'sm', 'default', 'lg']),
	/**
	 * Active item color
	 */
	color: PropTypes.oneOf([
		'primary',
		'secondary',
		'success',
		'info',
		'warning',
		'danger',
		'light',
		'dark',
	]),
};

export default Accordion;
