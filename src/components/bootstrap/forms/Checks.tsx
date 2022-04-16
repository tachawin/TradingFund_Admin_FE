import { ChangeEventHandler, Children, cloneElement, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import Validation from './Validation';

interface ChecksGroupInterface {
	id?: string,
	className?: string,
	name?: string,
	type?: string,
	label?: string,
	checked?: boolean,
	disabled?: boolean,
	isInline?: boolean,
	isFormCheckInput?: boolean,
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
	ariaLabel?: any,
	children: ReactNode
}

export const ChecksGroup = forwardRef<any, ChecksGroupInterface>(
	(
		{
			id,
			className,
			children,
			invalidFeedback,
			validFeedback,
			isValidMessage = true,
			isTooltipFeedback = false,
			type = 'checkbox',
			checked = false,
			disabled = false,
			isInline = false,
			isFormCheckInput = false,
			isTouched = false,
			isValid = false,
			...props
		},
		ref,
	) => {
		return (
			<>
				<div
					ref={ref}
					id={id}
					className={classNames(
						{
							'is-invalid': !isValid && isTouched && invalidFeedback,
							'is-valid': !isValid && isTouched && !invalidFeedback,
						},
						className,
					)}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}>
					{Children.map(children, (child: any) =>
						cloneElement(child, {
							isInline: child.props.isInline || isInline,
							isValid,
							isTouched,
							invalidFeedback,
							validFeedback,
							isTooltipFeedback,
							isValidMessage: false,
						}),
					)}
				</div>
				<Validation
					isTouched={isTouched}
					invalidFeedback={invalidFeedback}
					validFeedback={validFeedback}
					isTooltip={isTooltipFeedback}
				/>
			</>
		);
	},
);

interface ChecksInterface {
	id?: string,
	className?: string,
	name?: string,
	value?: any,
	type?: string,
	label?: any,
	checked?: boolean,
	disabled?: boolean,
	isInline?: boolean,
	isFormCheckInput?: boolean,
	isTouched?: boolean,
	isValid?: boolean,
	invalidFeedback?: string,
	validFeedback?: string,
	isValidMessage?: boolean,
	isTooltipFeedback?: boolean,
	onBlur?: any,
	onChange?: ChangeEventHandler<HTMLInputElement>,
	onFocus?: any,
	onInput?: any,
	onInvalid?: any,
	onSelect?: any,
	ariaLabel?: any,
	containerClassName?: string
}

const Checks = forwardRef<any, ChecksInterface>(
	(
		{
			id,
			className,
			name,
			type = 'checkbox',
			label,
			value,
			checked = false,
			disabled = false,
			isInline = false,
			isFormCheckInput = false,
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
			ariaLabel,
			containerClassName,
			...props
		},
		ref,
	) => {
		const _inner = (
			<input
				ref={ref}
				className={classNames(
					'form-check-input',
					{
						'mt-0': isFormCheckInput,
						'is-invalid': !isValid && isTouched && invalidFeedback,
						'is-valid': !isValid && isTouched && !invalidFeedback,
					},
					className,
				)}
				name={name === null ? id : name}
				type={type === 'radio' ? 'radio' : 'checkbox'}
				id={id}
				value={value}
				checked={type === 'radio' ? checked === value : checked}
				disabled={disabled}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				onInput={onInput}
				onInvalid={onInvalid}
				onSelect={onSelect}
				aria-label={ariaLabel}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
			/>
		);

		if (isFormCheckInput) {
			return _inner;
		}
		return (
			<div
				className={classNames('form-check', {
					'form-switch': type === 'switch',
					'form-check-inline': isInline,
				}, containerClassName)}>
				{_inner}
				{label && (
					<label className='form-check-label' htmlFor={id}>
						{label}
					</label>
				)}
				{isValidMessage && (
					<Validation
						isTouched={isTouched}
						invalidFeedback={invalidFeedback}
						validFeedback={validFeedback}
						isTooltip={isTooltipFeedback}
					/>
				)}
			</div>
		);
	},
);

export default Checks;
