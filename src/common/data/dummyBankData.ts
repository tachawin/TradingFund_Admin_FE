import moment, { Moment } from 'moment'

export interface Bank {
	id: number
	name: string
	label: string
	number: string
	bankAccountName: string
	paymentType: string[]
	balance: number
	todayWithdraw: number
	createdAtDate: Moment
	status: number
}

const banks: Bank[] = [
	{
		id: 0,
		name: 'scb',
		label: 'SCB',
		number: '1123',
		bankAccountName: 'Company',
		paymentType: ['ถอนเงิน'],
		balance: 178900.11,
		todayWithdraw: 87900.10,
		createdAtDate: moment().add(-1, 'month'),
		status: 0
	},
	{
		id: 1,
		name: 'kbank',
		label: 'KBANK',
		number: '1111',
		bankAccountName: 'Mike Wasowski',
		paymentType: ['ถอนเงิน'],
		balance: 234000000.59,
		todayWithdraw: 2400.56,
		createdAtDate: moment().add(-1, 'month'),
		status: 1
	},
	{
		id: 2,
		name: 'ttb',
		label: 'ttb',
		number: '5891',
		bankAccountName: 'Company',
		paymentType: ['ฝากเงิน', 'ถอนเงิน'],
		balance: 12090001002.12,
		todayWithdraw: 234100023.34,
		createdAtDate: moment().add(-1, 'month'),
		status: 1
	}
]

export default banks