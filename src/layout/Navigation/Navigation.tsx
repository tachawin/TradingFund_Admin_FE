import React, { useContext, forwardRef, useState, useRef, useCallback, DetailedHTMLProps, HTMLAttributes } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { NavHashLink } from 'react-router-hash-link'
import { Manager, Popper, Reference } from 'react-popper'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/icon/Icon'
import { ThemeContext } from '../../contexts/themeContext'
import useDarkMode from '../../hooks/useDarkMode'

interface ListInterface extends DetailedHTMLProps<HTMLAttributes<HTMLUListElement>, HTMLUListElement> {
	ariaLabelledby?: string,
	parentId?: string,
	rootId?: string | number,
	horizontal?: boolean,
}

export const List = forwardRef<any, ListInterface>(
	({ id, children, className, ariaLabelledby, parentId, rootId, horizontal = false, ...props }, ref) => {
		return (
			<ul
				ref={ref}
				id={id}
				className={classNames('navigation', { 'navigation-menu': horizontal }, className)}
				aria-labelledby={ariaLabelledby}
				data-bs-parent={
					parentId === `${rootId}__${rootId}`
						? `#${rootId}`
						: (parentId && `#${parentId}`) || null
				}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
			>
				{children}
			</ul>
		)
	},
)

interface ItemInterface {
	children: any,
	to?: any,
	title: string,
	icon: string,
	id?: string,
	parentId?: string | number,
	isHorizontal: boolean,
	notification?: boolean,
	isMore?: boolean,
	hide?: boolean,
	rootId: string | number,
	activeItem?: string,
	setActiveItem?: any
}

export const Item = ({
	children,
	to,
	title,
	icon,
	id,
	parentId,
	rootId,
	isHorizontal = false,
	notification = false,
	isMore = false,
	hide = false,
	...props
}: ItemInterface) => {
	const { darkModeStatus } = useDarkMode()
	const { setLeftMenuStatus, setRightMenuStatus } = useContext(ThemeContext)

	
	const _active = props.activeItem === id

	const handleClick = () => {
		_active ? props.setActiveItem(null) : props.setActiveItem(id)
	}

	const linkHandleClick = () => {
		setLeftMenuStatus(false)
		setRightMenuStatus(false)
	}

	const _anchorLinkPattern = /^#/i
	const location = useLocation()

	// For aside menu
	const here = to !== '/' && location.pathname.includes(to)
	// For top menu
	const match = to !== '/' && location.pathname === to

	const { t } = useTranslation('menu')

	const _LinkClass = classNames('navigation-link', 'navigation-link-pill', {
		collapsed: !!children && !isHorizontal,
		active: isHorizontal ? match : here,
	})

	const _Inner = (
		<>
			<span className='navigation-link-info'>
				{icon && <Icon className='navigation-icon' icon={icon} />}
				<span className='navigation-text'>{t(title)}</span>
			</span>
			{(!!children || !!notification) && (
				<span className='navigation-link-extra'>
					{!!notification && (
						<Icon
							icon='Circle'
							className={classNames(
								'navigation-notification',
								{
									[`text-${notification}`]: typeof notification === 'string',
									'text-danger': typeof notification !== 'string',
								},
								'animate__animated animate__heartBeat animate__infinite animate__slower',
							)}
						/>
					)}
					{!!children && <Icon className='navigation-arrow' icon='ChevronRight' />}
				</span>
			)}
		</>
	)

	const _withoutChild =
		!children &&
		!hide &&
		((_anchorLinkPattern.test(to) && (
			<NavHashLink className={_LinkClass} to={to} onClick={linkHandleClick}>
				{_Inner}
			</NavHashLink>
		)) || (
			<NavLink
				className={classNames(_LinkClass, ({ isActive }: { isActive: boolean }) => (isActive ? 'active' : ''))}
				to={`../${to}`}
				onClick={linkHandleClick}>
				{_Inner}
			</NavLink>
		))

	// Dropdown
	const dropdownRef = useRef(null)

	const dropdownButtonRef = useRef(null)
	const setButtonRef = useCallback((node, ref) => {
		dropdownButtonRef.current = node
		return ref(node)
	}, [])

	const dropdownListRef = useRef(null)
	const setListRef = useCallback((node, ref) => {
		dropdownListRef.current = node
		return ref(node)
	}, [])

	const [dropdownStatus, setDropdownStatus] = useState(false)

	const dropdownButtonHandleClick = () => {
		setDropdownStatus(!dropdownStatus)
	}

	if (children) {
		// submenu && in header
		if (isHorizontal) {
			return (
				<Manager>
					<li
						ref={dropdownRef}
						className={classNames('navigation-item', 'dropdown', {
							'navigation-item-more': isMore,
						})}>
						<Reference>
							{({ ref }) => (
								<span
									ref={(node) => setButtonRef(node, ref)}
									id={`${rootId}__${id}--link`}
									className={_LinkClass}
									// data-bs-toggle='dropdown'
									// data-bs-target={`#${rootId}__${id}`}
									aria-expanded={dropdownStatus}
									aria-controls={`${rootId}__${id}`}
									role='button'
									tabIndex={-1}
									onClick={dropdownButtonHandleClick}
									onKeyDown={dropdownButtonHandleClick}>
									{_Inner}
								</span>
							)}
						</Reference>
						{dropdownStatus && (
							<Popper
								placement='bottom-start'
								modifiers={[
									{
										name: 'flip',
										options: {
											fallbackPlacements: [`bottom-end`, `bottom-start`],
										},
									},
								]}>
								{({ ref, style, placement }) => (
									<List
										ref={(node) => setListRef(node, ref)}
										style={style}
										data-placement={placement}
										id={`${rootId}__${id}`}
										className={classNames(
											'dropdown-menu',
											{
												'dropdown-menu-dark': darkModeStatus,
											},
											'show',
										)}
										ariaLabelledby={`${rootId}__${id}--link`}
										rootId={rootId}
										parentId={`${rootId}__${parentId}`}
										onMouseLeave={() => setDropdownStatus(false)}>
										{children}
									</List>
								)}
							</Popper>
						)}
					</li>
				</Manager>
			)
		}
		// submenu && in aside
		return (
			<li className='navigation-item'>
				<span
					id={`${rootId}__${id}--link`}
					className={_LinkClass}
					// data-bs-toggle='collapse'
					// data-bs-target={`#${rootId}__${id}`}
					aria-expanded={_active}
					aria-controls={`${rootId}__${id}`}
					role='button'
					tabIndex={-1}
					onClick={handleClick}
					onKeyDown={handleClick}>
					{_Inner}
				</span>
			</li>
		)
	}
	// without submenu
	return <li className='navigation-item'>{_withoutChild}</li>
}

interface NavigationLineInterface {
	className?: string
}

export const NavigationLine = ({ className }: NavigationLineInterface) => {
	return <hr className={classNames('navigation-line', className)} />
}

interface NavigationTitleInterface {
	className?: string
	children: any
}

export const NavigationTitle = ({ className, children, ...props }: NavigationTitleInterface) => {
	return (
		<li className='navigation-item'>
			{/* eslint-disable-next-line react/jsx-props-no-spreading */}
			<span className={classNames('navigation-title', className)} {...props}>
				{children}
			</span>
		</li>
	)
}

interface NavigationInterface extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {
	horizontal?: boolean,
	menu?: any,
	className?: string,
}

const Navigation = forwardRef<any, NavigationInterface>(({ menu, horizontal = false, id, className, ...props }, ref) => {
	const [activeItem, setActiveItem] = useState<any>(null)

	const { t } = useTranslation('menu')

	function fillMenu(data: any, parentId: string | number, rootId: string | number, isHorizontal: boolean, isMore?: boolean) {
		return Object.values(data).map((item: any) =>
			item.path ? (
				<Item
					key={item.id}
					rootId={rootId}
					id={item.id}
					title={item.text}
					icon={item.icon}
					to={`${item.path}`}
					parentId={parentId}
					isHorizontal={isHorizontal}
					setActiveItem={setActiveItem}
					activeItem={activeItem}
					notification={item.notification}
					hide={item.hide}>
					{!!item.subMenu &&
						fillMenu(item.subMenu, item.id, rootId, isHorizontal)}
				</Item>
			) : (
				!isMore &&
				!isHorizontal && (
					<NavigationTitle key={item.id}>{t(item.text)}</NavigationTitle>
				)
			),
		)
	}

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<nav ref={ref} aria-label={id} className={className} {...props}>
			<List id={id} horizontal={horizontal}>
				{id && fillMenu(menu, id, id, horizontal)}
				{horizontal && (
					<Item
						rootId={`other-${id}`}
						title={t('More')}
						icon='MoreHoriz'
						isHorizontal
						isMore>
						{fillMenu(menu, `other-${id}`, `other-${id}`, false, true)}
					</Item>
				)}
			</List>
		</nav>
	)
})

export default Navigation
