import React, { ReactNode } from 'react';
import classNames from 'classnames';

interface LabelInterface {
	htmlFor?: string,
	className?: string,
	children?: ReactNode,
	isColForLabel?: boolean,
	isHidden?: boolean,
	size?: string,
	title?: string,
	ariaLabelledby?: string,
	ariaLabel?: string,
	errorText?: any
}

const Label = ({
	htmlFor,
	className,
	children,
	isColForLabel = false,
	isHidden = false,
	size,
	title,
	ariaLabelledby,
	ariaLabel,
	errorText,
	...props
}: LabelInterface) => {
	return (
		<label
			htmlFor={htmlFor}
			className={classNames(
				'form-label',
				{
					'col-form-label': isColForLabel,
					[`col-form-label-${size}`]: isColForLabel && !!size,
					'visually-hidden': isHidden,
				},
				className,
			)}
			title={title}
			aria-label={ariaLabel}
			aria-labelledby={ariaLabelledby}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
			{errorText}
		</label>
	);
};

export default Label;
