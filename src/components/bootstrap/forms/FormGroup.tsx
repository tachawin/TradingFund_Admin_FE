import { cloneElement } from 'react';
import classNames from 'classnames';
import TagWrapper from '../../TagWrapper';
import Label from './Label';
import FormText from './FormText';

interface FormGroupInterface {
	className?: string,
	labelClassName?: string,
	childWrapperClassName?: string,
	tag?: string,
	isFloating?: boolean,
	id?: string,
	label?: string,
	size?: string,
	isHiddenLabel?: boolean,
	isColForLabel?: boolean,
	formText?: any,
	children: any
	name?: string
	errorText?: any
}

const FormGroup = ({
	children,
	tag = 'div',
	className,
	labelClassName,
	childWrapperClassName,
	label,
	id,
	isFloating = false,
	size,
	isColForLabel = false,
	isHiddenLabel = false,
	formText,
	errorText,
	...props
}: FormGroupInterface) => {
	const _label = (
		<Label
			className={labelClassName}
			htmlFor={id}
			isHidden={isHiddenLabel}
			isColForLabel={isColForLabel}
			errorText={errorText}
			size={size}>
			{label}
		</Label>
	);

	const _children = id
		? cloneElement(children, {
				id,
				size: size || children.props.size,
				placeholder: isFloating ? label : children.props.placeholder,
				'aria-describedby': formText ? `${id}-text` : null,
		  })
		: children;

	const _formText = formText && <FormText id={`${id}-text`}>{formText}</FormText>;
	return (
		<TagWrapper
			tag={tag}
			className={classNames({ 'form-floating': isFloating, row: isColForLabel }, className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{label && !isFloating && _label}

			{childWrapperClassName ? (
				<div className={childWrapperClassName}>
					{_children}
					{_formText}
				</div>
			) : (
				_children
			)}

			{label && isFloating && _label}

			{!childWrapperClassName && _formText}
		</TagWrapper>
	);
};

export default FormGroup;
