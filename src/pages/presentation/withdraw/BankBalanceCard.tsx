import Card, { CardBody, CardHeader, CardLabel, CardTitle } from 'components/bootstrap/Card'
import bankIcons from 'common/banks'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { selectCompanyBankList } from 'redux/companyBank/selector'
import { CompanyBankInterface } from 'common/apis/companyBank'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { CommonString } from 'common/data/enumStrings'

const BankBalanceCard = () => {
    const { t } = useTranslation('common')

    const banks = useSelector(selectCompanyBankList)

    const permission = JSON.parse(localStorage.getItem('features') ?? '')
	const readPermission = permission.bank[PermissionType.Read] === PermissionValue.Available

    return (
        <Card stretch className='col-3 w-100 h-auto'>
            <CardHeader>
                <CardLabel>
                    <CardTitle>{t('bank.balance')}</CardTitle>
                </CardLabel>
            </CardHeader>
            <CardBody>
                <div className='row g-5'>
                    {readPermission ? banks.map((bank: CompanyBankInterface) => {
                        let BankIcon = bank.bankName ? bankIcons[bank.bankName?.acronym]?.icon : bankIcons.undefined.icon
                        return (BankIcon && <div className='col mt-4' key={bank.bankId}>
                            <div className='row'>
                                <div className='col d-flex align-items-center'>
                                    <div className='flex-shrink-0'>
                                        <div className='ratio ratio-1x1 me-3' style={{ width: 32 }}>
                                            <div 
                                                className='p-1 d-flex align-items-center justify-content-center' 
                                                style={{ backgroundColor: bank.bankName && bankIcons[bank.bankName.acronym]?.color, borderRadius: 3 }}
                                            >
                                                <BankIcon height={20} width={20} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-grow-1'>
                                        <div className='fs-6'>{bank.bankName?.acronym.toLocaleUpperCase()}</div>
                                        <div className='text-muted'>
                                            <small>{t('today.withdraw')}</small>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-auto text-end'>
                                    <div>
                                        <strong>{bank.balance?.toLocaleString()}</strong>
                                    </div>
                                    <div className='text-muted'>
                                        <small>{bank.totalWithdrawToday?.toLocaleString()}</small>
                                    </div>
                                </div>
                            </div>
                        </div>)})
                    : <div className='text-center'>{CommonString.NoPermission}</div>}
                </div>
            </CardBody>
        </Card>
    )
}

export default BankBalanceCard