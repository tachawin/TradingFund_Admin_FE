import classNames from 'classnames';
import Validation from './Validation';

interface TextAreaInterface {
	id?: string,
	name?: string,
	size?: string,
	className?: string,
	rows?: number,
	placeholder?: string,
	autoComplete?: string,
	ariaDescribedby?: string,
	ariaLabelledby?: string,
	ariaLabel?: string,
	title?: string,
	disabled?: boolean,
	readOnly?: boolean | string,
	value?: string | undefined,
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
	required?: boolean
}

const Textarea = ({
	id,
	name,
	className,
	rows = 3,
	placeholder,
	autoComplete,
	ariaDescribedby,
	ariaLabelledby,
	ariaLabel,
	title,
	size,
	disabled = false,
	readOnly = false,
	value = undefined,
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
}: TextAreaInterface) => {
	return (
		<>
			<textarea
				id={id}
				className={classNames(
					{
						'form-control': readOnly !== 'plaintext',
						'form-control-plaintext': readOnly === 'plaintext',
						[`form-control-${size}`]: size,
						'is-invalid': !isValid && isTouched && invalidFeedback,
						'is-valid': !isValid && isTouched && !invalidFeedback,
					},
					className,
				)}
				rows={rows}
				name={name}
				title={title}
				disabled={disabled}
				readOnly={!!readOnly}
				placeholder={placeholder}
				autoComplete={autoComplete}
				aria-describedby={ariaDescribedby}
				aria-label={ariaLabel}
				aria-labelledby={ariaLabelledby}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				onFocus={onFocus}
				onInput={onInput}
				onInvalid={onInvalid}
				onSelect={onSelect}
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...props}
			/>
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
};

export default Textarea;
