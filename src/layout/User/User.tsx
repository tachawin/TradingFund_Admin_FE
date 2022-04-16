import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import USERS from '../../common/data/userDummyData';
import { demoPages } from '../../menu';
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown';
import Button from '../../components/bootstrap/Button';
import useDarkMode from '../../hooks/useDarkMode';
import Icon from '../../components/icon/Icon';

const User = () => {
	const navigate = useNavigate();
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();

	const [collapseStatus, setCollapseStatus] = useState(false);

	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					<img
						srcSet={USERS[1].srcSet}
						src={USERS[1].src}
						alt='Avatar'
						width={128}
						height={128}
					/>
				</div>
				<div className='user-info'>
					<div className='user-name d-flex align-items-center'>
						{`${USERS[1].name} ${USERS[1].surname}`}
						<Icon icon='Verified' className='ms-1' color='info' />
					</div>
					<div className='user-sub-title'>{USERS[1].position}</div>
				</div>
			</div>
			<DropdownMenu>
				<DropdownItem>
					<Button
						icon='AccountBox'
						onClick={() =>
							navigate(
								`../${demoPages.appointment.subMenu.employeeID.path}/${USERS[1].id}`,
							)
						}>
						Profile
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
						onClick={() => setDarkModeStatus(!darkModeStatus)}
						aria-label='Toggle fullscreen'>
						{darkModeStatus ? 'Dark Mode' : 'Light Mode'}
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</>
	);
};

export default User;
