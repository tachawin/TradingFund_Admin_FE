import { createUseStyles } from 'react-jss';
import Alert from '../bootstrap/Alert';
import PrismCode from '../extras/PrismCode';

const useStyles = createUseStyles({
	// stylelint-disable-next-line selector-type-no-unknown
	prism: {
		padding: '0 !important',
		margin: '0 !important',
		background: 'transparent !important',
		borderRadius: '0 !important',

		// stylelint-disable-next-line scss/selector-no-redundant-nesting-selector
		'& > code': {
			// stylelint-disable-next-line scale-unlimited/declaration-strict-value
			color: '#2e3f96 !important',
			fontSize: '0.875rem !important',
		},
	},
});

interface CommonHowToUseInterface {
	children: any
	isPrism?: boolean
}

const CommonHowToUse = ({ children, isPrism = false }: CommonHowToUseInterface) => {
	const classes = useStyles();

	return (
		<Alert
			color='info'
			isLight
			shadow='md'
			borderWidth={0}
			icon='CustomReact'
			className='flex-nowrap w-100'>
			{isPrism ? (
				<PrismCode code={children} language='jsx' className={classes.prism} />
			) : (
				<code>{children}</code>
			)}
		</Alert>
	);
};

export default CommonHowToUse;
