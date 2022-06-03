import { AccountCircleTwoTone, DarkModeTwoTone, NoAccountsTwoTone, VisibilityOffTwoTone } from '@mui/icons-material';
import { useState } from 'react';
import Button, { ButtonGroup } from '../../components/bootstrap/Button';

const CommonChatStatus = () => {
	const STATUS = {
		ONLINE: 'Online',
		DONT_DISTURB: "Don't Disturb",
		OFFLINE: 'Offline',
		INVISIBLE: 'Invisible',
	};
	const [status, setStatus] = useState(STATUS.ONLINE);
	return (
		<ButtonGroup>
			<Button isDisable color='dark' isLight>
				Status:
			</Button>
			<Button
				icon={AccountCircleTwoTone}
				color={status === STATUS.ONLINE ? 'success' : 'dark'}
				isLight={status !== STATUS.ONLINE}
				onClick={() => setStatus(STATUS.ONLINE)}
			/>
			<Button
				icon={DarkModeTwoTone}
				color={status === STATUS.DONT_DISTURB ? 'warning' : 'dark'}
				isLight={status !== STATUS.DONT_DISTURB}
				onClick={() => setStatus(STATUS.DONT_DISTURB)}
			/>
			<Button
				icon={NoAccountsTwoTone}
				color={status === STATUS.OFFLINE ? 'danger' : 'dark'}
				isLight={status !== STATUS.OFFLINE}
				onClick={() => setStatus(STATUS.OFFLINE)}
			/>
			<Button
				icon={VisibilityOffTwoTone}
				color={status === STATUS.INVISIBLE ? 'info' : 'dark'}
				isLight={status !== STATUS.INVISIBLE}
				onClick={() => setStatus(STATUS.INVISIBLE)}
			/>
		</ButtonGroup>
	);
};

export default CommonChatStatus;
