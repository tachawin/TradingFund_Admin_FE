import { createRef, useEffect } from 'react';
import Prism from 'prismjs';
import classNames from 'classnames';
import 'prismjs/components/prism-scss.min';
import 'prismjs/components/prism-jsx.min';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.min';

interface PrismCodeInterface {
	code?: string,
	plugins?: string,
	language?: string,
	className?: string,
	rounded?: number | string,
	style?: any,
}

const PrismCode = (props: PrismCodeInterface) => {
	const ref = createRef<any>();

	useEffect(() => {
		if (ref && ref.current) {
			Prism.highlightElement(ref.current);
		}
		return () => {};
	}, [ref]);

	const { code, plugins, language, className, style, rounded = 2 } = props;
	return (
		<pre
			className={classNames('prismjs-code', plugins, className, {
				[`rounded${rounded !== 'default' ? `-${rounded}` : ''}`]: rounded,
			})}
			style={style}>
			<code ref={ref} className={`language-${language}`}>
				{code?.trim()}
			</code>
		</pre>
	);
};

export default PrismCode;
