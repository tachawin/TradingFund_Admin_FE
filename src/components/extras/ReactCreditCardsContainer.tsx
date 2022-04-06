import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useMeasure } from 'react-use';
import { createUseStyles } from 'react-jss';

interface ReactCreditCardsContainerInterface {
	className?: string,
	children: ReactNode,
	is3dShadow?: boolean,
	issuer?: string,
	scale?: number,
}

const useStyles = createUseStyles({
	// stylelint-disable-next-line selector-type-no-unknown
	scale: {
		// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
		'& .rccs': {
			zoom: (data: any) => (data.width / 290) * data.scale,
		},
	},
	// stylelint-disable-next-line selector-type-no-unknown
	fluid: {
		// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
		'& .rccs': {
			zoom: (data: any) => data.width / 290,
		},
	},
});

const ReactCreditCardsContainer = ({
	className,
	is3dShadow = true,
	issuer,
	scale = 0,
	children,
	...props
}: ReactCreditCardsContainerInterface) => {
	const [ref, { width }] = useMeasure<any>();
	const classes = useStyles({ width, scale });
	return (
		<div
			ref={ref}
			className={classNames(
				{
					[`rccs-shadow-3d-${
						(issuer === 'visa' && 'info') ||
						(issuer === 'mastercard' && 'warning') ||
						(issuer === 'amex' && 'success') ||
						(issuer === 'hipercard' && 'danger') ||
						'dark'
					}`]: is3dShadow,
				},
				{ [classes.scale]: !!scale, [classes.fluid]: width < 290 },
				className,
			)}
			// eslint-disable-next-line react/jsx-props-no-spreading
			{...props}>
			{children}
		</div>
	);
};

export default ReactCreditCardsContainer;
