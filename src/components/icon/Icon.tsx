import { forwardRef, memo, ReactElement } from 'react';
import classNames from 'classnames';
import * as SvgIcon from './svg-icons';
import * as Bootstrap from './bootstrap';
import * as Material from './material-icons';
import pascalcase from 'pascalcase';

interface RefWrapperInterface {
	children: ReactElement
}

const RefWrapper = forwardRef<HTMLDivElement, RefWrapperInterface>(({ children }, ref) => {
	if (ref) {
		return (
			<span ref={ref} data-only-ref='true'>
				{children}
			</span>
		);
	}
	return children;
});

interface IconInterface {
	icon: string
	className?: string,
	color?: any,
	size?: string | null,
	forceFamily?: string | null,
	onClick?: any
	style?: any
}

const Icon = forwardRef<HTMLDivElement, IconInterface>(({ icon, className, color, size, forceFamily, ...props }, ref) => {

	const _icon = pascalcase(icon);

	// eslint-disable-next-line import/namespace
	const SvgIconWrapper = (SvgIcon as any)[_icon];
	// eslint-disable-next-line import/namespace
	const BootstrapWrapper = (Bootstrap as any)[_icon];
	// eslint-disable-next-line import/namespace
	const MaterialWrapper = (Material as any)[_icon];

	const _className = classNames(
		'svg-icon',
		{ [`svg-icon-${size}`]: size, [`text-${color}`]: color },
		className,
	);

	const isForceCustom = forceFamily === 'custom';
	const isForceBootstrap = forceFamily === 'bootstrap';
	const isForceMaterial = forceFamily === 'material';

	if (
		isForceCustom ||
		(!isForceBootstrap  && !isForceMaterial && typeof SvgIconWrapper === 'function')
	) {
		return (
			<RefWrapper ref={ref}>
				<SvgIconWrapper
					data-name={`SvgIcon--${_icon}`}
					className={classNames('svg-icon--custom', _className)}
					{...props}
				/>
			</RefWrapper>
		);
	}
	if (
		isForceMaterial ||
		(!isForceCustom && !isForceBootstrap && typeof MaterialWrapper === 'function')
	) {
		return (
			<RefWrapper ref={ref}>
				<MaterialWrapper
					data-name={`Material--${icon}`}
					className={classNames('svg-icon--material', _className)}
					{...props}
				/>
			</RefWrapper>
		);
	}
	if (
		isForceBootstrap ||
		(!isForceCustom && !isForceMaterial && typeof BootstrapWrapper === 'function')
	) {
		return (
			<RefWrapper ref={ref}>
				<BootstrapWrapper
					data-name={`Bootstrap--${_icon}`}
					className={classNames('svg-icon--bootstrap', _className)}
					{...props}
				/>
			</RefWrapper>
		);
	}
	return null;
});

export default memo(Icon);
