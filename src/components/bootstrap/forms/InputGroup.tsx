import { Children, cloneElement, forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import TagWrapper from '../../TagWrapper';
import Validation from './Validation';

interface InputGroupTextInterface {
	tag?: string,
	id?: string,
	className?: string,
	children: any,
	htmlFor?: string
}

export const InputGroupText = forwardRef<any, InputGroupTextInterface>(({ tag = 'span', id, className, children, ...props }, ref) => {
	return (
		<TagWrapper
			tag={tag}
			ref={ref}
			id={id}
			className={classNames('input-group-text', className)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children?.props?.type ? cloneElement(children, { isFormCheckInput: true }) : children}
		</TagWrapper>
	);
});

interface InputGroupInterface {
	id?: string,
	className?: string,
	isWrap?: boolean,
	size?: string,
	children: ReactNode
}

const InputGroup = forwardRef<any, InputGroupInterface>(({ id, className, children, isWrap = true, size, ...props }, ref) => {
	let _isValid = false;
	let _isTouched = false;
	let _invalidFeedback = undefined;
	let _validFeedback = undefined;
	let _isTooltipFeedback = false;

	const validClass = (child: any) => {
		for (let i = 0; i < child?.length; i += 1) {
			if (child[i].props.isValid) {
				_isValid = true;
			}
			if (child[i].props.isTouched) {
				_isTouched = true;
			}
			if (child[i].props.invalidFeedback) {
				_invalidFeedback = child[i].props.invalidFeedback;
			}
			if (child[i].props.validFeedback) {
				_validFeedback = child[i].props.validFeedback;
			}
			if (child[i].props.isTooltipFeedback) {
				_isTooltipFeedback = true;
				break;
			}
		}
	};
	validClass(children);

	return (
		<div
			ref={ref}
			id={id}
			className={classNames(
				'input-group',
				{
					'flex-nowrap': !isWrap,
					[`input-group-${size}`]: size,
					'has-validation':
						(!_isValid && _isTouched && (_invalidFeedback || _validFeedback)) ||
						(_isValid && _validFeedback),
				},
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{Children.map(children, (item: any, index) =>
				item?.props?.isValidMessage
					? // eslint-disable-next-line react/no-array-index-key
					  cloneElement(item, { key: index, isValidMessage: false })
					: // eslint-disable-next-line react/no-array-index-key
					  cloneElement(item, { key: index }),
			)}
			<Validation
				isTouched={_isTouched}
				validFeedback={_validFeedback}
				invalidFeedback={_invalidFeedback}
				isTooltip={_isTooltipFeedback}
			/>
		</div>
	);
});

export default InputGroup;
