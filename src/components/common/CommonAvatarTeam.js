import { memo } from 'react';
import PropTypes from 'prop-types';
import Avatar, { AvatarGroup } from '../Avatar';
import USERS from '../../common/data/userDummyData';

const CommonAvatarTeam = ({ children, isAlignmentEnd }) => {
	return (
		<>
			{children && !isAlignmentEnd && <span className='me-3'>{children}</span>}
			<AvatarGroup>
				<Avatar
					src={USERS[2].src}
					srcSet={USERS[2].srcSet}
					color={USERS[2].color}
					userName={`${USERS[2].name} ${USERS[2].surname}`}
				/>
				<Avatar
					src={USERS[3].src}
					srcSet={USERS[3].srcSet}
					color={USERS[3].color}
					userName={`${USERS[3].name} ${USERS[3].surname}`}
				/>
				<Avatar
					src={USERS[4].src}
					srcSet={USERS[4].srcSet}
					color={USERS[4].color}
					userName={`${USERS[4].name} ${USERS[4].surname}`}
				/>
				<Avatar
					src={USERS[5].src}
					srcSet={USERS[5].srcSet}
					color={USERS[5].color}
					userName={`${USERS[5].name} ${USERS[5].surname}`}
				/>
				<Avatar
					src={USERS[0].src}
					srcSet={USERS[0].srcSet}
					color={USERS[0].color}
					userName={`${USERS[0].name} ${USERS[0].surname}`}
				/>
				<Avatar
					src={USERS[6].src}
					srcSet={USERS[6].srcSet}
					color={USERS[6].color}
					userName={`${USERS[6].name} ${USERS[6].surname}`}
				/>
			</AvatarGroup>
			{children && isAlignmentEnd && <span>{children}</span>}
		</>
	);
};
CommonAvatarTeam.propTypes = {
	children: PropTypes.node,
	isAlignmentEnd: PropTypes.bool,
};
CommonAvatarTeam.defaultProps = {
	children: null,
	isAlignmentEnd: false,
};

export default memo(CommonAvatarTeam);
