import SERVICES from './serviceDummyData';

const john = {
	id: 1,
	username: 'john',
	name: 'John',
	surname: 'Doe',
	position: 'CEO, Founder',
	src: '../../assets/img/wanna/wanna1.png',
	srcSet: '../../assets/img/wanna/wanna1.webp',
	isOnline: true,
	isReply: true,
	color: 'primary',
	services: [SERVICES.SURFING, SERVICES.KITE_SURFING, SERVICES.TENNIS],
};

const grace = {
	id: 2,
	username: 'grace',
	name: 'Grace',
	surname: 'Buckland',
	position: 'Staff',
	src: '../../assets/img/wanna/wanna2.png',
	srcSet: '../../assets/img/wanna/wanna2.webp',
	isOnline: true,
	color: 'warning',
	services: [SERVICES.SNOWBOARDING, SERVICES.ICE_SKATING, SERVICES.KITE_SURFING],
};

const jane = {
	id: 3,
	username: 'jane',
	name: 'Jane',
	surname: 'Lee',
	position: 'Staff',
	src: '../../assets/img/wanna/wanna3.png',
	srcSet: '../../assets/img/wanna/wanna3.webp',
	isOnline: true,
	color: 'secondary',
	services: [SERVICES.YOGA, SERVICES.HANDBALL, SERVICES.CRICKET],
};

const ryan = {
	id: 4,
	username: 'ryan',
	name: 'Ryan',
	surname: 'McGrath',
	position: 'Worker',
	src: '../../assets/img/wanna/wanna4.png',
	srcSet: '../../assets/img/wanna/wanna4.webp',
	isOnline: false,
	color: 'info',
	services: [SERVICES.HIKING, SERVICES.FOOTBALL, SERVICES.HANDBALL],
};

const ella = {
	id: 5,
	username: 'ella',
	name: 'Ella',
	surname: 'Oliver',
	position: 'Worker',
	src: '../../assets/img/wanna/wanna5.png',
	srcSet: '../../assets/img/wanna/wanna5.webp',
	isOnline: false,
	color: 'success',
	services: [SERVICES.ICE_SKATING, SERVICES.TENNIS, SERVICES.SNOWBOARDING, SERVICES.YOGA],
};

const chloe = {
	id: 6,
	username: 'chloe',
	name: 'Chloe',
	surname: 'Walker',
	position: 'Staff',
	src: '../../assets/img/wanna/wanna6.png',
	srcSet: '../../assets/img/wanna/wanna6.webp',
	isOnline: true,
	color: 'warning',
	services: [SERVICES.VOLLEYBALL, SERVICES.CRICKET],
};

const sam = {
	id: 7,
	username: 'sam',
	name: 'Sam',
	surname: 'Roberts',
	position: 'Worker',
	src: '../../assets/img/wanna/wanna7.png',
	srcSet: '../../assets/img/wanna/wanna7.webp',
	isOnline: false,
	color: 'danger',
	fullImage: '../../assets/img/wanna/landing1.png',
};

interface UserInterface {
	id: number,
	username: string,
	name: string,
	surname: string,
	position: string,
	src: string,
	srcSet: string,
	isOnline: boolean,
	color: string,
	fullImage?: string,
	services?: any[]
}

const USERS: UserInterface[] = [john, grace, jane, ryan, ella, chloe, sam]

export const getUserDataWithUsername = (username: string): UserInterface[] => {
	return USERS.filter((user) => user.username === username)
}

export function getUserDataWithId(id: string | undefined): UserInterface {
	return USERS.filter((user) => user.id.toString() === id)[0]
}

export default USERS;
