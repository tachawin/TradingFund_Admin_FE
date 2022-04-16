import { forwardRef } from 'react';

interface TagWrapperInterface {
	id?: any
	tag: any
	role?: string
	children: any
	className?: string
	type?: string
	style?: any
}

const TagWrapper = forwardRef<HTMLDivElement, TagWrapperInterface>(({ tag: Tag = 'div', children, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Tag ref={ref} {...props}>
			{children}
		</Tag>
	);
});

export default TagWrapper
