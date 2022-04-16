import React from 'react';

interface OptionsInterface {
	list: any[]
}

export const Options = ({ list }: OptionsInterface) => {
	return <>{list?.map((i) => (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<Option key={i.value} value={i.value} {...i}>
			{i.text || i.label}
		</Option>
	))}</>;
};

interface OptionInterface {
	value?: string,
	disabled?: boolean,
	ariaLabelledby?: string,
	children: any
	hidden?: boolean
}

const Option = ({ children, value, disabled = false, ariaLabelledby, ...props }: OptionInterface) => {
	return (
		<option
			value={value}
			disabled={disabled}
			aria-labelledby={ariaLabelledby || children}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</option>
	);
};

export default Option;
