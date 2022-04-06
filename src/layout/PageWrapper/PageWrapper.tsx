import { useLayoutEffect, forwardRef } from 'react';
import classNames from 'classnames';

interface PageWrapperInterface {
	title?: string,
	description?: string,
	children: any,
	className?: string,
}

const PageWrapper = forwardRef<HTMLDivElement, PageWrapperInterface>(({ title, description, className, children }, ref) => {
	useLayoutEffect(() => {
		document.getElementsByTagName('TITLE')[0].textContent = `${title ? `${title} | ` : ''}${
			process.env.REACT_APP_SITE_NAME
		}`;
		document.querySelector('meta[name="description"]')?.setAttribute('content', description ?? "");
	});

	return (
		<div ref={ref} className={classNames('page-wrapper', 'container-fluid', className)}>
			{children}
		</div>
	);
});

export default PageWrapper;
