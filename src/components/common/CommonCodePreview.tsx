import classNames from 'classnames';
import Card, { CardBody } from '../bootstrap/Card';
import PrismCode from '../extras/PrismCode';

interface CommonCodePreviewInterface {
	children?: any,
	className?: string,
	code?: string,
	language?: string,
}

const CommonCodePreview = ({ children, className, code, language = "tsx" }: CommonCodePreviewInterface) => {
	if (children) {
		return (
			<Card shadow='none' borderSize={1} className={classNames('rounded-2', className)}>
				<CardBody>{children}</CardBody>
				<PrismCode
					className='my-0 rounded-bottom'
					code={code}
					language={language}
					rounded={0}
				/>
			</Card>
		);
	}
	return (
		<PrismCode
			className={classNames('my-0', className)}
			code={code}
			language={language}
		/>
	);
};

export default CommonCodePreview;
