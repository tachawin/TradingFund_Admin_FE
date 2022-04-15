export interface Bank {
	id: number
	name: string
	label: string
	number: string
	balance: number
	todayWithdraw: number
}

const banks: Bank[] = [
	{
		id: 0,
		name: 'scb',
		label: 'SCB',
		number: '1123',
		balance: 178900.11,
		todayWithdraw: 87900.10
	},
	{
		id: 1,
		name: 'kbank',
		label: 'KBANK',
		number: '1111',
		balance: 234000000.59,
		todayWithdraw: 2400.56,
	},
	{
		id: 2,
		name: 'ttb',
		label: 'ttb',
		number: '5891',
		balance: 12090001002.12,
		todayWithdraw: 234100023.34,
	}
]

export default banks