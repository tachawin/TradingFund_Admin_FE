import { ReactNode } from 'react';
import classNames from 'classnames';

interface FormTextInterface {
	id?: string
	className?: string
	children?: ReactNode
}

const FormText = ({ id, className, children, ...props }: FormTextInterface) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div id={id} className={classNames('form-text', className)} {...props}>
			{children}
		</div>
	);
};

export default FormText;
