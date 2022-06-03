import { ReactNode, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMeasure } from 'react-use';

interface SubHeaderCommonInterface {
	children: ReactNode
	className?: string
}

export const SubHeaderLeft = ({ children, className }: SubHeaderCommonInterface) => {
	return <div className={classNames('subheader-left', 'col-sm', className)}>{children}</div>;
};

export const SubHeaderRight = ({ children, className }: SubHeaderCommonInterface) => {
	return (
		<div className={classNames('subheader-right', 'col-sm-auto', className)}>{children}</div>
	);
};

interface SubheaderSeparatorInterface {
	className?: string
}

export const SubheaderSeparator = ({ className }: SubheaderSeparatorInterface) => {
	return <div className={classNames('subheader-separator', className)} />;
};

const SubHeader = ({ children, className }: SubHeaderCommonInterface) => {
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
		<div ref={ref} className={classNames('subheader', 'row', className)}>
			{children}
		</div>
	);
};

export default SubHeader;
