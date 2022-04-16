import { forwardRef, ReactNode } from 'react';
import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import TagWrapper from '../TagWrapper';

interface SpinnerInterface {
	children?: ReactNode,
	tag?: string,
	color?: string,
	isGrow?: boolean,
	isSmall?: boolean,
	size?: string | number,
	inButton?: boolean | string,
	className?: string,
}

const useStyles = createUseStyles({
	// stylelint-disable-next-line selector-type-no-unknown
	dynamicSize: (props: { size?: string | number }) => ({
		height: props.size,
		width: props.size,
	}),
});

const Spinner = forwardRef<any, SpinnerInterface>(
	({ tag = 'div', color, isGrow = false, isSmall = false, size, children = 'Loading...', inButton = false, className, ...props }, ref) => {
		const classes = useStyles({ size });

		const _hiddenText = <span className='visually-hidden'>{children}</span>;
		return (
			<>
				<TagWrapper
					ref={ref}
					tag={inButton ? 'span' : tag}
					className={classNames(
						{ 'spinner-border': !isGrow, 'spinner-grow': isGrow },
						{
							'spinner-border-sm': !isGrow && isSmall,
							'spinner-grow-sm': isGrow && isSmall,
						},
						{ [`text-${color}`]: color },
						{ [classes.dynamicSize]: size },
						{ 'me-2': inButton !== 'onlyIcon' && !!inButton },
						className,
					)}
					role='status'
					aria-hidden={inButton ? 'true' : null}
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...props}>
					{inButton !== 'onlyIcon' && !!inButton ? _hiddenText : null}
				</TagWrapper>
				{inButton === 'onlyIcon' ? _hiddenText : null}
			</>
		);
	},
);

export default Spinner;
