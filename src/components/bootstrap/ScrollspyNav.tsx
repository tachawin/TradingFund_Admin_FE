import React, { FC, useEffect, useState } from 'react';
import Scrollspy from 'react-scrollspy';
import Portal from '../../layout/Portal/Portal';

interface ScrollspyNav {
	items: string[]
	children?: any
	offset?: number
	tag?: string
	setActiveId: any
}

const ScrollspyNav: FC<ScrollspyNav> = ({ tag = 'span', items, children, offset, setActiveId, ...props }) => {
	const [activeElement, setActiveElement] = useState(null);
	useEffect(() => {
		if (setActiveId) setActiveId(activeElement);
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeElement]);

	const _inner = (
		<Scrollspy
			items={items}
			offset={offset}
			currentClassName='active'
			componentTag={tag}
			onUpdate={(e: any) => {
				setActiveElement(e?.attributes.id.value);
			}}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</Scrollspy>
	);

	if (children) {
		return _inner;
	}
	return <Portal>{_inner}</Portal>;
};

export default ScrollspyNav;
