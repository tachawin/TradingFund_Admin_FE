import { Children, forwardRef, ReactNode, useState } from 'react';
import classNames from 'classnames';
import TagWrapper from '../TagWrapper';
import Button from './Button';

interface CardLabelInterface {
	tag?: any
	className?: string
	children?: ReactNode
	icon?: any
	iconColor?: string
	pre?: any
	style?: any
}

export const CardLabel = forwardRef<HTMLDivElement, CardLabelInterface>(
	({ tag = 'div', className = null, children = null, icon: CardIcon = null, iconColor = 'primary', pre = null, style, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames('card-label', className)}
				style={style}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{pre}
				{CardIcon && (
					<CardIcon className={classNames('card-icon', { [`text-${iconColor}`]: iconColor })} />
				)}
				<div className='card-title-wrapper w-100'>{children}</div>
			</TagWrapper>
		);
	},
);

interface CardActionsInterface {
	tag?: any
	className?: string
	children: ReactNode
}

export const CardActions = forwardRef<HTMLDivElement, CardActionsInterface>(({ tag = 'div', className = null, children, ...props }, ref) => {
	return (
		<TagWrapper
			ref={ref}
			tag={tag}
			className={classNames('card-actions', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface CardTitleInterface {
	tag?: any
	className?: string
	onClick?: () => void
	children?: ReactNode
}

export const CardTitle = forwardRef<HTMLDivElement, CardTitleInterface>(({ tag = 'h5', className = null, children, ...props }, ref) => {
	return (
		<TagWrapper
			ref={ref}
			tag={tag}
			className={classNames('card-title', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface CardSubTitleInterface {
	tag?: any
	className?: string
	children?: ReactNode
}

export const CardSubTitle = forwardRef<HTMLDivElement, CardSubTitleInterface>(({ tag = 'h6', className = null, children, ...props }, ref) => {
	return (
		<TagWrapper
			ref={ref}
			tag={tag}
			className={classNames('card-subtitle', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface CardHeaderInterface {
	tag?: any
	size?: string | null
	borderSize?: number | null
	borderColor?: string | null
	className?: string
	children: ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderInterface>(
	({ tag = 'div', className = null, children, size = null, borderSize = null, borderColor = null, ...props }, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card-header',
					{
						[`card-header-${size}`]: size,
						[`card-header-border-${borderSize}`]: borderSize,
						[`card-header-border-${borderColor}`]: borderColor,
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

interface CardBodyInterface {
	tag?: any
	isScrollable?: boolean
	className?: string | null
	role?: string
	children: ReactNode
	style?: any
	onSubmit?: any
}

export const CardBody = forwardRef<HTMLDivElement, CardBodyInterface>(({ tag = 'div', className = null, isScrollable = false, children, ...props }, ref) => {
	return (
		<TagWrapper
			ref={ref}
			tag={tag}
			className={classNames('card-body', { 'card-body-scrollable': isScrollable }, className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface CardFooterLeftInterface {
	tag?: any
	className?: string
	children?: ReactNode
}

export const CardFooterLeft = forwardRef<HTMLDivElement, CardFooterLeftInterface>(({ tag = 'div', className = null, children, ...props }, ref) => {
	return (
		<TagWrapper
			ref={ref}
			tag={tag}
			className={classNames('card-footer-left', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface CardFooterRightInterface {
	tag?: any
	className?: string
	children: any
}

export const CardFooterRight = forwardRef<HTMLDivElement, CardFooterRightInterface>(({ tag = 'div', className = null, children, ...props }, ref) => {
	return (
		<TagWrapper
			ref={ref}
			tag={tag}
			className={classNames('card-footer-right', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</TagWrapper>
	);
});

interface CardFooterInterface {
	tag?: any
	size?: string | null
	borderSize?: number | null
	borderColor?: string | null
	className?: string
	children?: ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, CardFooterInterface>(
	(
		{ 
			tag = 'div', 
			className = null, 
			children = null, 
			size = null, 
			borderSize  = null, 
			borderColor  = null, 
			...props 
		}, ref) => {
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card-footer',
					{
						[`card-footer-${size}`]: size,
						[`card-footer-border-${borderSize}`]: borderSize,
						[`card-footer-border-${borderColor}`]: borderColor,
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

interface CardTabInterface {
	id: string | number
	title: string
	icon: any
	children: ReactNode
}

export const CardTabItem = ({ id, title, icon = null, children }: CardTabInterface) => {
	throw new Error(
		`Title ${title} component should be used as a child in the component Card.Id: ${id}, Icon Name: ${icon}, Children: ${children},`,
	);
};

interface CardInterface {
	tag?: any,
	hasTab?: boolean,
	tabButtonColor?: string,
	className?: string
	tabBodyClassName?: string,
	shadow?: string | null,
	borderSize?: number | null,
	borderColor?: string | null,
	stretch?: boolean | string,
	isCompact?: boolean,
	children?: ReactNode
	style?: any
	noValidate?: boolean
	onSubmit?: any
	onClick?: any
	id?: number | string
}

const Card = forwardRef<HTMLDivElement, CardInterface>(
	(
		{
			tag = 'div',
			className = null,
			children,
			hasTab = false,
			tabButtonColor = 'primary',
			tabBodyClassName = null,
			shadow = null,
			borderSize = null,
			borderColor = null,
			stretch = false,
			isCompact = false,
			...props
		},
		ref,
	) => {
		const [activeTab, setActiveTab] = useState(0);
		return (
			<TagWrapper
				ref={ref}
				tag={tag}
				className={classNames(
					'card',
					{
						[`card-stretch-${stretch === 'semi' ? 'semi' : 'full'}`]: stretch,
						'card-compact': isCompact,
						[`shadow${shadow !== 'md' ? `-${shadow}` : ''}`]:
							!!shadow && shadow !== '3d',
						[`u-shadow-3d--primary-sm`]: shadow === '3d',
						[`border-${borderSize}`]: borderSize || borderSize === 0,
						[`border-${borderColor}`]: borderColor,
					},
					className,
				)}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}>
				{!hasTab ? (
					children
				) : (
					<>
						<CardHeader borderSize={1}>
							<CardActions>
								{Children.map(children, (item: any, index) => (
									<Button
										key={item.props.id}
										isLight
										color={index === activeTab ? tabButtonColor : 'light'}
										role='tab'
										aria-controls={item.props.id}
										aria-selected={index === activeTab}
										isActive={index === activeTab}
										icon={item.props.icon || null}
										onClick={() => setActiveTab(index)}>
										{item.props.title}
									</Button>
								))}
							</CardActions>
						</CardHeader>
						{Children.map(children, (item: any, index) => {
							if (activeTab === index) {
								return (
									<CardBody
										key={item.props.id}
										role='tabpanel'
										aria-labelledby={item.props.id}
										className={tabBodyClassName}>
										{item.props.children}
									</CardBody>
								);
							}
							return null;
						})}
					</>
				)}
			</TagWrapper>
		);
	},
);

export default Card;
