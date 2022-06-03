import { useEffect, cloneElement, DetailedHTMLProps, forwardRef, HTMLAttributes, useCallback, useRef } from 'react'
import { Manager, Popper } from 'react-popper'
import classNames from 'classnames'
// import useEventOutside from '@omtanke/react-use-event-outside'
import useDarkMode from '../../hooks/useDarkMode'
import Button from './Button'

interface DropdownToggleInterface {
	children?: any
	isOpen?: boolean
	setIsOpen?: (value?: any) => void
	hasIcon?: boolean
	isStatic?: boolean
	index?: number
	color?: string
	isLight?: boolean
	icon?: any
	className?: any
	disabled?: boolean
}

const useEventOutside = (ref: any, onClickOutSide: any) => {
	useEffect(() => {
		/**
		 * Alert if clicked on outside of element
		 */
		const handleClickOutside = (event: any) => {
			if (ref.current && !ref.current.contains(event.target)) {
				onClickOutSide()
			}
		}
		// Bind the event listener
		document.addEventListener("mousedown", handleClickOutside, true);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener("mousedown", handleClickOutside, true);
		};

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ref]);
}  

export const DropdownToggle = ({ 
	children, 
	icon, 
	isOpen = false, 
	setIsOpen, 
	hasIcon = true, 
	index, 
	color, 
	isLight, 
	className,
	disabled = false
}: DropdownToggleInterface) => {

	return (
		<Button
			icon={icon}
			onClick={(e: any) => setIsOpen && setIsOpen(index ?? !isOpen)}
			color={color || 'primary'}
			isLight={isLight || true}
			className={classNames({
				'dropdown-toggle': hasIcon,
				'dropdown-toggle-split': children?.props?.isButtonGroup,
				...className
 			})}
			isDisable={disabled}
		>
			{children}
		</Button>
	)
}

interface DropdownMenuInterface extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	isOpen?: boolean,
	setIsOpen?: any,
	className?: string,
	isAlignmentEnd?: boolean,
	breakpoint?: string,
	size?: string,
	direction?: string,
	isCloseAfterLeave?: boolean,
	children: any,
	height?: string
}

export const DropdownMenu = ({
	isOpen = false,
	setIsOpen,
	children,
	className,
	isAlignmentEnd = false,
	breakpoint,
	size,
	direction,
	isCloseAfterLeave = true,
	height,
	...props
}: DropdownMenuInterface) => {
	const dropdownListRef = useRef(null)

	const setListRef = useCallback((node, ref) => {
		dropdownListRef.current = node
		return ref(node)
	}, [])

	const yAxis =
		(direction === 'up' && 'top') ||
		(direction === 'end' && 'right') ||
		(direction === 'start' && 'left') ||
		'bottom'

	const xAxis = isAlignmentEnd ? 'end' : 'start'

	const { darkModeStatus } = useDarkMode()

	const closeMenu = useCallback((event: any) => {
		setIsOpen && setIsOpen(false)
	}, [setIsOpen])

	useEventOutside(dropdownListRef, closeMenu)

	if (isOpen) {
		return (
			<Popper
				placement={`${yAxis}-${xAxis}`}
				modifiers={[
					{
						name: 'flip',
						options: {
							fallbackPlacements: [`top-${xAxis}`, `bottom-${xAxis}`],
						},
					},
					{
						name: 'offset',
						options: {
						  offset: [100, 200],
						},
					},
				]}>
				{({ ref, style, placement }) => (
					<ul
						role='presentation'
						ref={(node) => setListRef(node, ref)}
						data-placement={placement}
						style={{ right: `${xAxis === 'end' ? 0 : 'unset'}`, maxHeight: height }}
						className={classNames(
							'dropdown-menu',
							// For Bootstrap
							'show',
							{ 'dropdown-menu-dark': darkModeStatus },
							{
								[`dropdown-menu-${size}`]: size,
								'dropdown-menu-end': !isAlignmentEnd && breakpoint,
								[`dropdown-menu${breakpoint ? `-${breakpoint}` : ''}-${
									isAlignmentEnd ? 'end' : 'start'
								}`]: isAlignmentEnd || breakpoint,
							},
							className,
						)}
						data-bs-popper={breakpoint ? 'static' : null}
						{...props}>
						{children}
					</ul>
				)}
			</Popper>
		)
	}
	return null
}

interface ItemWrapperInterface {
	className?: string
	children: any
}

const ItemWrapper = forwardRef<any, ItemWrapperInterface>(({ children, className, ...props }, ref) => {
	return (
		<li
			ref={ref}
			className={classNames('dropdown-item-wrapper', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</li>
	)
})

interface DropdownItemInterface {
	children?: any,
	isHeader?: boolean,
	isDivider?: boolean,
	isText?: boolean,
}

export const DropdownItem = forwardRef<any, DropdownItemInterface>(
	({ children, isHeader = false, isDivider = false, isText = false, ...props }, ref) => {
		if (isHeader) {
			return (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<ItemWrapper ref={ref} {...props}>
					{cloneElement(typeof children === 'string' ? <h6>{children}</h6> : children, {
						className: classNames('dropdown-header', children?.props?.className),
					})}
				</ItemWrapper>
			)
		}
		if (isDivider) {
			return (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<ItemWrapper ref={ref} {...props}>
					<hr className={classNames('dropdown-divider', children?.props?.className)} />
				</ItemWrapper>
			)
		}
		if (isText) {
			return (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<ItemWrapper ref={ref} {...props}>
					{cloneElement(typeof children === 'string' ? <div>{children}</div> : children, {
						className: classNames(
							'dropdown-item-text',
							'dropdown-item',
							'disabled',
							children?.props?.className,
						),
					})}
				</ItemWrapper>
			)
		}
		return (
			// eslint-disable-next-line react/jsx-props-no-spreading
			<ItemWrapper ref={ref} {...props}>
				{cloneElement(typeof children === 'string' ? <span>{children}</span> : children, {
					className: classNames('dropdown-item', children?.props?.className),
				})}
			</ItemWrapper>
		)
	},
)

interface DropdownInterface {
	tag?: any,
	isOpen?: boolean,
	setIsOpen?: any,
	className?: string,
	direction?: string,
	isButtonGroup?: boolean,
	children: any
}

const Dropdown = ({
	tag: Tag = 'div',
	children,
	direction = 'down',
	isButtonGroup = false,
	className,
}: DropdownInterface) => {
	const dropdownRef = useRef(null)

	return (
		<Manager>
			<Tag
				ref={dropdownRef}
				style={{ width: 'fit-content' }}
				className={classNames(
					{
						[`drop${direction}`]: direction && !isButtonGroup,
						'btn-group': isButtonGroup,
					},
					className,
				)}>
				{children}
			</Tag>
		</Manager>
	)
}

export default Dropdown
