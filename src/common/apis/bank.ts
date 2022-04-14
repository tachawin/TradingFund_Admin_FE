import axios from 'axios'

export const getBanks = () => 
    axios({
        method: 'get',
        url: `https://raw.githubusercontent.com/omise/banks-logo/master/banks.json`,
    })
