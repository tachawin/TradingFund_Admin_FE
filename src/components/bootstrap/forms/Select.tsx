import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import Option, { Options } from '../Option';
import Validation from './Validation';

interface SelectInterface {
	id?: string,
	className?: string,
	name?: string,
	children?: ReactNode,
	placeholder?: string,
	multiple?: boolean,
	size?: string,
	disabled?: boolean,
	required?: boolean,
	ariaDescribedby?: string,
	ariaLabelledby?: string,
	ariaLabel?: string,
	title?: string,
	value?: any | undefined,
	defaultValue?: string | undefined,
	list?: any,
	isTouched?: boolean,
	isValid?: boolean,
	invalidFeedback?: string,
	validFeedback?: string,
	isValidMessage?: boolean,
	isTooltipFeedback?: boolean,
	onBlur?: any,
	onChange?: any,
	onFocus?: any,
	onInput?: any,
	onInvalid?: any,
	onSelect?: any,
}

const Select = forwardRef<any, SelectInterface>(
	(
		{
			id,
			name,
			className,
			children,
			required = false,
			placeholder,
			ariaDescribedby,
			ariaLabelledby,
			ariaLabel,
			list,
			multiple = false,
			title,
			size,
			disabled = false,
			value = undefined,
			defaultValue = undefined,
			isValid = false,
			isTouched = false,
			invalidFeedback,
			validFeedback,
			isValidMessage = true,
			isTooltipFeedback = false,
			onBlur,
			onChange,
			onFocus,
			onInput,
			onInvalid,
			onSelect,
			...props
		},
		// eslint-disable-next-line no-unused-vars
		ref,
	) => {
		return (
			<>
				<select
					ref={ref}
					id={id}
					className={classNames(
						'form-select',
						{
							[`form-select-${size}`]: size,
							'text-muted': value === '' && placeholder,
							'is-invalid': !isValid && isTouched && invalidFeedback,
							'is-valid': !isValid && isTouched && !invalidFeedback,
						},
						className,
					)}
					name={name}
					aria-label={ariaLabel}
					aria-describedby={ariaDescribedby}
					aria-labelledby={ariaLabelledby}
					multiple={multiple}
					disabled={disabled}
					title={title}
					value={value}
					defaultValue={defaultValue}
					required={required}
					onBlur={onBlur}
					onChange={onChange}
					onFocus={onFocus}
					onInput={onInput}
					onInvalid={onInvalid}
					onSelect={onSelect}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}>
					{placeholder && (
						<Option value='' hidden>
							{placeholder}
						</Option>
					)}
					{children || <Options list={list} />}
				</select>
				{isValidMessage && (
					<Validation
						isTouched={isTouched}
						invalidFeedback={invalidFeedback}
						validFeedback={validFeedback}
						isTooltip={isTooltipFeedback}
					/>
				)}
			</>
		);
	},
);

export default Select;
