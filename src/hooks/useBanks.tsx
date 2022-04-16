import { useState, useEffect } from 'react'
import dummyBanks from './bank.json'

export interface BankType {
	[key: string]: {
		official_name: string
		nice_name: string
		thai_name: string
	}
}

const useBanks = () => {
	const [banks, setBanks] = useState<BankType>()

	useEffect(() => {
		// getBanks().then((response) => {
		// 	setBanks(response.data['th'])
		// })
		setBanks(dummyBanks)
	}, [])

	return { banks }
}

export default useBanks
