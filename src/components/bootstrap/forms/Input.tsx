import React, {forwardRef } from 'react';
import NumberFormat from 'react-number-format';
import InputMask from 'react-input-mask';
import classNames from 'classnames';
import Portal from '../../../layout/Portal/Portal';
import Validation from './Validation';

interface InputInterface {
	component?: string,
	type?: any,
	id?: string,
	name?: string,
	size?: string,
	className?: string,
	required?: boolean,
	placeholder?: string,
	title?: string,
	list?: any,
	autoComplete?: any,
	disabled?: boolean,
	multiple?: boolean,
	readOnly?: boolean | string,
	ariaDescribedby?: string,
	ariaLabelledby?: string,
	ariaLabel?: string,
	value?: any,
	min?: number,
	max?: number,
	step?: number,
	isTouched?: any,
	isValid?: any,
	invalidFeedback?: any,
	validFeedback?: any,
	isValidMessage?: any,
	isTooltipFeedback?: boolean,
	onBlur?: any,
	onChange?: any,
	onFocus?: any,
	onInput?: any,
	onInvalid?: any,
	onSelect?: any,
	mask?: any,
	format?: any,
	maskChar?: any,
	thousandSeparator?: boolean,
	accept?: string
}

const Input = forwardRef<any, InputInterface>(
	(
		{
			type = 'text',
			id,
			name,
			className,
			required = false,
			placeholder,
			autoComplete,
			ariaDescribedby,
			ariaLabelledby,
			ariaLabel,
			list,
			title,
			size,
			disabled = false,
			readOnly = false,
			multiple = false,
			value = undefined,
			min,
			max,
			step,
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
			component,
			// InputMask & NumberFormat props
			mask,
			// NumberFormat props
			format,
			// InputMask props
			...props
		},
		ref,
	) => {
		const _props = {
			id,
			name: name === null ? id : name,
			type: !list ? type : null,
			className: classNames(
				{
					'form-control': readOnly !== 'plaintext' && type !== 'range',
					'form-range': type === 'range',
					'form-control-plaintext': readOnly === 'plaintext',
					'form-control-color': type === 'color',
					[`form-control-${size}`]: size,
					'is-invalid': !isValid && isTouched && invalidFeedback,
					'is-valid': !isValid && isTouched && !invalidFeedback,
				},
				className,
			),
			required,
			placeholder,
			title,
			list: list ? `${id}-list` : undefined,
			disabled,
			readOnly: !!readOnly,
			multiple,
			autoComplete,
			'aria-describedby': ariaDescribedby,
			'aria-label': ariaLabel,
			'aria-labelledby': ariaLabelledby,
			value,
			min,
			max,
			step,
			onBlur,
			onChange: readOnly ? undefined : onChange,
			onFocus,
			onInput,
			onInvalid,
			onSelect,
			...props,
		};
		const _numberFormatProps = {
			mask,
			format,
			onBlur: () => onBlur,
			onChange: readOnly ? undefined : () => onChange,
			onFocus: () => onFocus,
			onInput: () => onInput,
			onInvalid: () => onInvalid,
			onSelect: () => onSelect,
		};
		const _maskProps = { mask };

		const _list = list && (
			<Portal>
				<datalist id={`${id}-list`}>
					{list.map((option: any) => (
						<option key={option} aria-labelledby={option} value={option} />
					))}
				</datalist>
			</Portal>
		);

		const _validation = <Validation
			isTouched={isTouched}
			invalidFeedback={invalidFeedback}
			validFeedback={validFeedback}
			isTooltip={isTooltipFeedback}
		/>

		if (component === 'NumberFormat' || format) {
			return (
				<>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<NumberFormat ref={ref} {..._props} {..._numberFormatProps} />
					{_list}
					{_validation}
				</>
			);
		}
		if (component === 'InputMask' || mask) {
			return (
				<>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<InputMask ref={ref} {..._props} {..._maskProps} />
					{_list}
					{_validation}
				</>
			);
		}
		return (
			<>
				{/* eslint-disable-next-line react/jsx-props-no-spreading */}
				<input ref={ref} {..._props} />
				{_list}
				{_validation}
			</>
		);
	},
);

export default Input;
