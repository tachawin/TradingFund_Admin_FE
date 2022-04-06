import Header, { HeaderLeft } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { componentsMenu, layoutMenu } from '../../../menu';
import CommonHeaderRight from './CommonHeaderRight';

const DefaultHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<Navigation
					menu={{ ...layoutMenu, ...componentsMenu }}
					id='header-top-menu'
					horizontal={true}
				/>
			</HeaderLeft>
			<CommonHeaderRight />
		</Header>
	);
};

export default DefaultHeader;
