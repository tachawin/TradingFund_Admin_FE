import classNames from 'classnames';
import Alert from '../bootstrap/Alert';

interface CommonDescInterface {
	children: any,
	className?: string,
	color?: string,
}

const CommonDesc = ({ children, className, color = "warning" }: CommonDescInterface) => {
	return (
		<Alert
			color={color}
			isLight
			shadow='md'
			borderWidth={0}
			icon='Info'
			className={classNames('flex-nowrap', 'w-100', 'mb-0', className)}>
			{children}
		</Alert>
	);
};

export default CommonDesc;
