import { useState } from 'react';
import { useParams } from 'react-router-dom';
import 'moment/locale/th'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { pages } from '../../../menu';
import data from '../../../common/data/dummyCustomerData';
import depositData from '../../../common/data/dummySalesData';
import rewardData from '../../../common/data/dummyRewardData';
import creditData from '../../../common/data/dummyCreditData';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import DepositTable from '../deposit/DepositTable';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown';
import WithdrawTable from '../withdraw/WithdrawTable';
import RewardTable from '../reward/RewardTable';
import CreditTable from '../credit/CreditTable';

const CustomerProfile = () => {
    const { t } = useTranslation(['common', 'customer'])
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	const itemData = data.filter((item: any) => item.id.toString() === id);
	const item = itemData[0];

	const [transactionState, setTransactionState] = useState('deposit')
    const [isOpenTransactionDropdown, setIsOpenTransactionDropdown] = useState(false)

	const getLevelColor = () => item.level === 'Gold' ? 'warning' : item.level === 'Silver' ? 'light' : item.level === 'Platinum' ? 'primary' : 'danger' 

	const transactionHeader = () => 
		<CardHeader>
			<CardLabel icon='Receipt'>
				<CardTitle>{t('customer:transaction.history')}</CardTitle>
			</CardLabel>
			<Dropdown>
				<DropdownToggle isOpen={Boolean(isOpenTransactionDropdown)} setIsOpen={setIsOpenTransactionDropdown}>
					<span>
						{transactionState === 'deposit' ? t('deposit') :
							transactionState === 'withdraw' ? t('withdraw') :
							transactionState === 'credit' ? t('credit') : t('reward')}
					</span>
				</DropdownToggle>
				<DropdownMenu isAlignmentEnd isOpen={Boolean(isOpenTransactionDropdown)} setIsOpen={setIsOpenTransactionDropdown}>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === 'deposit'}
							onClick={() => setTransactionState('deposit')}>
							{t('deposit')}
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === 'withdraw'}
							onClick={() => setTransactionState('withdraw')}>
							{t('withdraw')}
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === 'credit'}
							onClick={() => setTransactionState('credit')}>
							{t('credit')}
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === 'reward'}
							onClick={() => setTransactionState('reward')}>
							{t('reward')}
						</Button>
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</CardHeader>

	return (
		<PageWrapper title={pages.customerID.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${pages.customer.path}`}>
						{t('back')}
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page className='p-3'>
				<div className='pt-3 pb-5 d-flex align-items-center'>
					<span className='display-4 fw-bold me-3'>{item.name}</span>
					<span className={`border border-${getLevelColor()} border-2 text-${getLevelColor()} fw-bold px-3 py-2 rounded`}>
						<Icon icon='StarFill' color={getLevelColor()} />
						{' ' + item.level}
					</span>
				</div>
				<div className='row'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary'>
							<CardHeader className='pb-0'>
								<CardLabel icon='Person'>
									<CardTitle>{t('profile')}</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-5 py-3'>
									<div className='col-12'>
										<div className='row g-3'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Mail'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.mobileNumber}
														</div>
														<div className='text-muted'>
															{t('column.mobile.number')}
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='Savings'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.bankName.toLocaleUpperCase()}
														</div>
														<div className='text-muted'>
															{t('column.bank.account')}
														</div>
													</div>
                                                    <div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{item.bankAccountNumber}
														</div>
														<div className='text-muted'>
                                                            {item.bankAccountName}
														</div>
													</div>
												</div>
											</div>
                                            <div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<Icon
															icon='CardMembership'
															size='3x'
															color='primary'
														/>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
                                                            {t('last.active.at', { date: item.membershipDate.fromNow() })}
														</div>
														<div className='text-muted'>
															{t('has.joined.at', { date: item.membershipDate.format('ll') })}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='AccountBalanceWallet'>
									<CardTitle>{t('wallet')}</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4 align-items-center'>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-warning rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Cash' size='3x' color='warning' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>135</div>
												<div className='text-muted mt-n2 truncate-line-1'>
													{t('balance')}
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-info rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='Star' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													{1260}
												</div>
												<div className='text-muted mt-n2 truncate-line-1'>
                                                    {t('points')}
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-primary rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='CashCoin' size='3x' color='primary' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>4.96</div>
												<div className='text-muted mt-n2 truncate-line-1'>
                                                    {t('cashback.bonus')}
												</div>
											</div>
										</div>
									</div>
									<div className='col-xl-6'>
										<div
											className={`d-flex align-items-center bg-l${
												darkModeStatus ? 'o25' : '10'
											}-success rounded-2 p-3`}>
											<div className='flex-shrink-0'>
												<Icon icon='People' size='3x' color='success' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>30</div>
												<div className='text-muted mt-n2'>{t('invitation.bonus')}</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						{transactionState === 'deposit' ?
							<DepositTable 
								cardHeader={transactionHeader()}
								data={depositData} 
								disabledColumns={['mobile-number', 'notes']} 
							/> : transactionState === 'withdraw' ?
							<WithdrawTable 
								cardHeader={transactionHeader()}
								data={depositData} 
								columns={{ lastDepositAmount: false, name: false, from: false }}
							/> : transactionState === 'reward' ?
							<RewardTable 
								cardHeader={transactionHeader()}
								data={rewardData} 
							/> : <CreditTable 
								cardHeader={transactionHeader()}
								data={creditData} 
							/>
						}
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CustomerProfile
