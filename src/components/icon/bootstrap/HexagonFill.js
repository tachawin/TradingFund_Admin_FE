import * as React from 'react';

function SvgHexagonFill(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path
				fillRule='evenodd'
				d='M8.5.134a1 1 0 00-1 0l-6 3.577a1 1 0 00-.5.866v6.846a1 1 0 00.5.866l6 3.577a1 1 0 001 0l6-3.577a1 1 0 00.5-.866V4.577a1 1 0 00-.5-.866L8.5.134z'
			/>
		</svg>
	);
}

export default SvgHexagonFill;
