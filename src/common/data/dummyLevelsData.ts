import moment from 'moment'

const levels = [
	{
		id: 'platinum',
		levelName: 'Platinum',
        minimumDeposit: 1500000,
        createdAtDate: moment().add(-2, 'month'),
        updatedAtDate: moment().add(-2, 'month')
	},
	{
		id: 'gold',
		levelName: 'Gold',
        minimumDeposit: 500000,
        createdAtDate: moment().add(-2, 'month'),
        updatedAtDate: moment().add(-2, 'month')
	},
	{
		id: 'silver',
		levelName: 'Silver',
        minimumDeposit: 100000,
        createdAtDate: moment().add(-2, 'month'),
        updatedAtDate: moment().add(-2, 'month')
	},
	{
		id: 'bronze',
		levelName: 'Bronze',
        minimumDeposit: 50000,
        createdAtDate: moment().add(-2, 'month'),
        updatedAtDate: moment().add(-2, 'month')
	},
    {
		id: 'standard',
		levelName: 'Standard',
        minimumDeposit: 0,
        createdAtDate: moment().add(-2, 'month'),
        updatedAtDate: moment().add(-2, 'month')
	}
]

export default levels