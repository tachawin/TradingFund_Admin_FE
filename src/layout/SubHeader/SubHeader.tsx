import { ReactNode, useLayoutEffect } from 'react';
import classNames from 'classnames';
import { useMeasure } from 'react-use';

interface SubHeaderCommonInterface {
	children: ReactNode
	className?: string
	style?: any
}

export const SubHeaderLeft = ({ children, className }: SubHeaderCommonInterface) => {
	return <div className={classNames('subheader-left', 'col-sm', className)}>{children}</div>;
};

export const SubHeaderRight = ({ children, className, style }: SubHeaderCommonInterface) => {
	return (
		<div className={classNames('subheader-right', 'col-sm-auto', className)} style={style}>{children}</div>
	);
};

interface SubheaderSeparatorInterface {
	className?: string
}

export const SubheaderSeparator = ({ className }: SubheaderSeparatorInterface) => {
	return <div className={classNames('subheader-separator', className)} />;
};

const SubHeader = ({ children, className, style }: SubHeaderCommonInterface) => {
	const [ref, { height }] = useMeasure<any>();

	const root = document.documentElement;
	root.style.setProperty('--subheader-height', `${height}px`);

	useLayoutEffect(() => {
		document.body.classList.add('subheader-enabled');
		return () => {
			document.body.classList.remove('subheader-enabled');
		};
	});

	return (
		<div ref={ref} className={classNames('subheader', 'row', className)} style={style}>
			{children}
		</div>
	);
};

export default SubHeader;
