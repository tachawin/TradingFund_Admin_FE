import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import banks, { Bank } from '../../../common/data/dummyBankData'
import bankIcons from 'common/banks'
import { useTranslation } from 'react-i18next'

const BankBalanceCard = () => {
    const { t } = useTranslation('common')

    return (
        <Card stretch className='col-3 w-100 h-auto'>
            <CardHeader>
                <CardLabel>
                    <CardTitle>{t('bank.balance')}</CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className='row g-5'>
                    {banks.map((bank: Bank) => {
                        let BankIcon = bankIcons[bank.name].icon
                        return (<div className='col mt-4'>
                            <div className='row'>
                                <div className='col d-flex align-items-center'>
                                    <div className='flex-shrink-0'>
                                        <div className='ratio ratio-1x1 me-3' style={{ width: 32 }}>
                                            <div 
                                                className='p-1 d-flex align-items-center justify-content-center' 
                                                style={{ backgroundColor: bankIcons[bank.name].color, borderRadius: 3 }}
                                            >
                                                <BankIcon height={20} width={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <div className='fs-6'>{bank.label}</div>
                                        <div className='text-muted'>
                                            <small>{t('today.withdraw')}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-auto text-end'>
                                    <div>
                                        <strong>{bank.balance.toLocaleString()}</strong>
                                    </div>
                                    <div className='text-muted'>
                                        <small>{bank.todayWithdraw.toLocaleString()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>)})
                    }
                </div>
            </CardBody>
        </Card>
    )
}

export default BankBalanceCard