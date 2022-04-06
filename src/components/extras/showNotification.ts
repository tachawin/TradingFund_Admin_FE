import { NOTIFICATION_CONTAINER, NOTIFICATION_INSERTION, NOTIFICATION_TYPE, Store } from 'react-notifications-component';

const _settings = {
	insert: 'top' as NOTIFICATION_INSERTION,
	container: 'top-right' as NOTIFICATION_CONTAINER,
	animationIn: ['animate__animated', 'animate__fadeIn'],
	animationOut: ['animate__animated', 'animate__fadeOut'],
	dismiss: {
		duration: 5000,
		pauseOnHover: true,
		onScreen: true,
		showIcon: true,
		waitForAnimation: true,
	},
};

const showNotification = (title: any, message: any, type: NOTIFICATION_TYPE = 'default') => {
	Store.addNotification({
		title,
		message,
		type,
		..._settings,
	});
};

export default showNotification;
