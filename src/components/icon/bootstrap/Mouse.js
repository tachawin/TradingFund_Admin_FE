import * as React from 'react';

function SvgMouse(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M8 3a.5.5 0 01.5.5v2a.5.5 0 01-1 0v-2A.5.5 0 018 3zm4 8a4 4 0 01-8 0V5a4 4 0 118 0v6zM8 0a5 5 0 00-5 5v6a5 5 0 0010 0V5a5 5 0 00-5-5z' />
		</svg>
	);
}

export default SvgMouse;
