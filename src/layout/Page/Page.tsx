import { forwardRef } from 'react';
import classNames from 'classnames';

interface PageInterface {
	children: any,
	container?: string | boolean,
	className?: string,
}

const Page = forwardRef<HTMLDivElement, PageInterface>(({ children, className, container, ...props }, ref) => {
	return (
		<div
			ref={ref}
			className={classNames('page', className, {
				[`container${typeof container === 'string' ? `-${container}` : ''}`]: container,
			})}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</div>
	);
});

export default Page;
