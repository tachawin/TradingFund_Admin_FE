import moment from 'moment';

const data = [
	{
		id: 1,
		name: 'React Admin Template',
		type: 'deposit',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 120.00,
		price: 36,
		count: 982,
		date: moment(),
		note: ''
	},
	{
		id: 2,
		name: 'Omtanke Mobile UI Kit',
		type: 'deposit',
		bankAccount: '2123',
		bankName: 'kbank',
		amount: 500.00,
		price: 32,
		count: 423,
		date: moment().add(-1, 'day'),
		note: 'ยอดเงินไม่เข้า แต่ลูกค้ามีหลักฐานเป็นสลิปครบ กรุณาตรวจสอบวันเวลาและทำรายการแบบ manual'
	},
	{
		id: 3,
		name: 'Presentation Slides',
		type: 'withdraw',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 5000.24,
		price: 24,
		count: 678,
		date: moment().add(-1, 'day'),
		note: 'ถอนไม่สำเร็จ'
	},
	{
		id: 4,
		name: '3D Animation',
		type: 'deposit',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 10999.99,
		price: 24,
		count: 532,
		date: moment().add(-2, 'day'),
		note: ''
	},
	{
		id: 5,
		name: 'Travel Shopping UI Kit',
		type: 'deposit',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 19999999999.11,
		price: 74,
		count: 235,
		date: moment().add(-3, 'day'),
		note: ''
	},
	{
		id: 6,
		name: 'Crypto 3D Icon Set',
		type: 'deposit',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 2000.00,
		price: 58,
		count: 547,
		date: moment().add(-3, 'day'),
		note: ''
	},
	{
		id: 7,
		name: 'E-Learning App UI Kit',
		type: 'withdraw',
		bankAccount: '2123',
		bankName: 'kbank',
		amount: 43544.24,
		price: 39,
		count: 149,
		date: moment().add(-4, 'day'),
		note: ''
	},
	{
		id: 8,
		name: 'Dashboard App UI Kit',
		type: 'deposit',
		bankAccount: '2123',
		bankName: 'kbank',
		amount: 5465555555555.24,
		price: 36,
		count: 132,
		date: moment().add(-4, 'day'),
		note: ''
	},
	{
		id: 9,
		name: 'Angular Dashboard Template',
		type: 'withdraw',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 213230.24,
		price: 78,
		count: 120,
		date: moment().add(-5, 'day'),
		note: ''
	},
	{
		id: 10,
		name: 'React Bootstrap Template',
		type: 'deposit',
		bankAccount: '1124',
		bankName: 'scb',
		amount: 5000.24,
		price: 89,
		count: 112,
		date: moment().add(-7, 'day'),
		note: ''
	},
	{
		id: 11,
		name: 'Dashboard UI Kit',
		type: 'deposit',
		bankAccount: '2123',
		bankName: 'kbank',
		amount: 5000.24,
		price: 24,
		count: 90,
		date: moment().add(-7, 'day'),
		note: ''
	},
	{
		id: 12,
		name: 'Bank App UI Kit',
		type: 'withdraw',
		bankAccount: '2123',
		bankName: 'kbank',
		amount: 5000.24,
		price: 12,
		count: 63,
		date: moment().add(-9, 'day'),
		note: ''
	},
];
export default data;
