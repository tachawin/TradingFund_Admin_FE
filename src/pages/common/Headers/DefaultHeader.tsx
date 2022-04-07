import User from 'layout/User/User';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import Navigation from '../../../layout/Navigation/Navigation';
import { dashboardMenu } from '../../../menu';

const DefaultHeader = () => {
	return (
		<Header>
			<HeaderLeft>
				<Navigation menu={dashboardMenu} horizontal id='aside-dashboard' />
			</HeaderLeft>
			<HeaderRight>
				<User />
			</HeaderRight>
		</Header>
	);
};

export default DefaultHeader;
