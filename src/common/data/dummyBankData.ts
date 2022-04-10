export interface Bank {
	id: number
	name: string
	label: string
	number: string
}

const banks: Bank[] = [
	{
		id: 0,
		name: 'scb',
		label: 'SCB',
		number: '1123'
	},
	{
		id: 1,
		name: 'kasikorn bank',
		label: 'KBANK',
		number: '1111'
	},
	{
		id: 2,
		name: 'ttb',
		label: 'TTB',
		number: '5891'
	}
]

export default banks