import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'moment/locale/th'
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { pages } from '../../../menu';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardBody,
	CardHeader,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { useTranslation } from 'react-i18next';
import DepositTable from '../deposit/DepositTable';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown';
import { CustomerInterface, getCustomer } from 'common/apis/customer';
import showNotification from 'components/extras/showNotification';
import moment from 'moment';
import { getDepositList } from 'common/apis/deposit';
import { useDispatch, useSelector } from 'react-redux';
import { selectDepositList } from 'redux/deposit/selector';
import { storeDepositList } from 'redux/deposit/action';
import { TransactionInterface } from 'common/apis/transaction';
import { getWithdrawList } from 'common/apis/withdraw';
import { selectWithdrawList } from 'redux/withdraw/selector';
import { storeWithdrawList } from 'redux/withdraw/action';
import WithdrawTable from '../withdraw/WithdrawTable';
import Spinner from 'components/bootstrap/Spinner';
import { getRedeemCreditList, getRedeemProductList, RedeemInterface } from 'common/apis/redeem';
import { storeRedeemProductList } from 'redux/redeemProduct/action';
import RewardTable from '../reward/RewardTable';
import { selectRedeemProductList } from 'redux/redeemProduct/selector';
import { storeRedeemCreditList } from 'redux/redeemCredit/action';
import { selectRedeemCreditList } from 'redux/redeemCredit/selector';
import CreditTable from '../credit/CreditTable';
import { AccountBalanceWalletTwoTone, AccountCircleTwoTone, ArrowBack, CreditCardTwoTone, CurrencyExchangeTwoTone, GroupTwoTone, InfoTwoTone, LocalAtmTwoTone, PhoneIphoneTwoTone, ReceiptTwoTone, StarTwoTone, VpnKeyTwoTone } from '@mui/icons-material';
import COLORS from 'common/data/enumColors';

enum TransactionState {
	Deposit = 'deposit',
	Withdraw = 'withdraw',
	Reward = 'reward',
	Credit = 'credit'
}

const CustomerProfile = () => {
    const { t } = useTranslation(['common', 'customer'])

	const { id } = useParams()
	const [customer, setCustomer] = useState<CustomerInterface>()
	const [isLoading, setIsLoading] = useState(false)
	const [isCustomerLoading, setIsCustomerLoading] = useState(false)

	const [transactionState, setTransactionState] = useState(TransactionState.Deposit)
    const [isOpenTransactionDropdown, setIsOpenTransactionDropdown] = useState(false)

	const dispatch = useDispatch()
	const depositList = useSelector(selectDepositList)
	const withdrawList = useSelector(selectWithdrawList)
	const rewardList = useSelector(selectRedeemProductList)
	const creditList = useSelector(selectRedeemCreditList)

	useEffect(() => {
		setIsLoading(true)
		if (transactionState === TransactionState.Deposit) {
			getDepositList(`?customerId=${id}`, (depositList: TransactionInterface[]) => {
				console.log(depositList)
				dispatch(storeDepositList(depositList))
			}, (error: any) => {
				const { response } = error
				console.log(response.data)
				showNotification(
					<span className='d-flex align-items-center'>
						<InfoTwoTone className='me-1' />
						<span>{t('get.deposit.failed')}</span>
					</span>,
					t('please.refresh.again'),
				)
			}).finally(() => setIsLoading(false))
		} else if (transactionState === TransactionState.Withdraw) {
			getWithdrawList(`?customerId=${id}`, '', (withdrawList: TransactionInterface[]) => {
				dispatch(storeWithdrawList(withdrawList))
			}, (error: any) => {
				const { response } = error
				console.log(response.data)
				showNotification(
					<span className='d-flex align-items-center'>
						<InfoTwoTone className='me-1' />
						<span>{t('get.withdraw.failed')}</span>
					</span>,
					t('please.refresh.again'),
				)
			}).finally(() => setIsLoading(false))
		} else if (transactionState === TransactionState.Reward) {
			getRedeemProductList(`?customerId=${id}`, '', (redeemProductList: RedeemInterface[]) => {
				dispatch(storeRedeemProductList(redeemProductList))
			}, (error: any) => {
				const { response } = error
				console.log(response.data)
				showNotification(
					<span className='d-flex align-items-center'>
						<InfoTwoTone className='me-1' />
						<span>เรียกดูรายการแลกสินค้าไม่สำเร็จ</span>
					</span>,
					'กรุณาลองใหม่อีกครั้ง',
				)
			}).finally(() => setIsLoading(false))
		} else {
			getRedeemCreditList(`?customerId=${id}`, '', (redeemCreditRequest: RedeemInterface[]) => {
				dispatch(storeRedeemCreditList(redeemCreditRequest))
			}, (error: any) => {
				const { response } = error
				console.log(response.data)
				showNotification(
					<span className='d-flex align-items-center'>
						<InfoTwoTone className='me-1' />
						<span>{t('get.deposit.failed')}</span>
					</span>,
					t('please.refresh.again'),
				)
			}).finally(() => setIsLoading(false))
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [transactionState])

	useEffect(() => {
		setIsCustomerLoading(true)
		id && getCustomer(id, (customer: CustomerInterface) => {
			setCustomer(customer)
		}, (error: any) => {
			const { response } = error
			console.log(response.data)
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('get.customer.failed')}</span>
				</span>,
				t('please.refresh.again'),
			)
		}).finally(() => setIsCustomerLoading(false))
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const transactionHeader = () => 
		<CardHeader className='pb-0'>
			<div className='d-flex justify-content-start align-items-center'>
				<ReceiptTwoTone className='me-2' fontSize='large' htmlColor={COLORS.PRIMARY.code} />
				<CardTitle className='mb-0'>{t('customer:transaction.history')}</CardTitle>
			</div>
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
							isActive={transactionState === TransactionState.Deposit}
							onClick={() => setTransactionState(TransactionState.Deposit)}>
							{t('deposit')}
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === TransactionState.Withdraw}
							onClick={() => setTransactionState(TransactionState.Withdraw)}>
							{t('withdraw')}
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === TransactionState.Credit}
							onClick={() => setTransactionState(TransactionState.Credit)}>
							{t('credit')}
						</Button>
					</DropdownItem>
					<DropdownItem>
						<Button
							color='link'
							isActive={transactionState === TransactionState.Reward}
							onClick={() => setTransactionState(TransactionState.Reward)}>
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
						tag='a'
						to={`../${pages.customer.path}`}>
						<ArrowBack htmlColor={COLORS.PRIMARY.code} className='me-2' />
						{t('back')}
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page className='p-3 justify-content-center'>
				{isCustomerLoading ? <Spinner isGrow color='primary' size={50} className='align-self-center' /> : <>
					<div className='p-3 d-flex align-items-center'>
						<span className='display-4 fw-bold me-3'>{customer?.name}</span>
						<span className='border border-primary border-2 text-primary fw-bold px-3 py-2 rounded'>
							<img 
								src={customer?.level?.imageURL} alt={customer?.level?.levelName}
								width={40} 
								height={40} 
								style={{ objectFit: 'contain' }} 
								className='me-2 rounded-circle'
							/>{' '}
							{' ' + customer?.level?.levelName}
						</span>
					</div>
					<div className='row'>
						<div className='col-lg-4'>
							<Card className='shadow-3d-primary'>
								<CardHeader className='d-flex justify-content-start align-items-center'>
									<AccountCircleTwoTone className='me-2' fontSize='large' htmlColor={COLORS.INFO.code} />
									<CardTitle>{t('profile')}</CardTitle>
								</CardHeader>
								<CardBody className='pt-0'>
									<div className='row g-5 p-3'>
										<div className='row g-3'>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<PhoneIphoneTwoTone fontSize='large' htmlColor={COLORS.PRIMARY.code} />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{customer?.mobileNumber}
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
														<CreditCardTwoTone fontSize='large' htmlColor={COLORS.PRIMARY.code} />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{customer?.bank?.acronym.toLocaleUpperCase()}
														</div>
														<div className='text-muted'>
															{t('column.bank.account')}
														</div>
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{customer?.bankAccountNumber}
														</div>
														<div className='text-muted'>
															{customer?.bankAccountName}
														</div>
													</div>
												</div>
											</div>
											<div className='col-12'>
												<div className='d-flex align-items-center'>
													<div className='flex-shrink-0'>
														<VpnKeyTwoTone fontSize='large' htmlColor={COLORS.PRIMARY.code} />
													</div>
													<div className='flex-grow-1 ms-3'>
														<div className='fw-bold fs-5 mb-0'>
															{t('last.active.at', { date: moment(customer?.lastLoginAt).fromNow() })}
														</div>
														<div className='text-muted'>
															{t('has.joined.at', { date: moment(customer?.createdAt).format('ll') })}
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
							<Card>
								<CardHeader className='d-flex justify-content-start align-items-center'>
									<AccountBalanceWalletTwoTone className='me-2' fontSize='large' htmlColor={COLORS.INFO.code} />
									<CardTitle className='mb-0'>{t('wallet')}</CardTitle>
								</CardHeader>
								<CardBody className='pt-0'>
									<div className='row g-4 align-items-center'>
										<div className='col-xl-6'>
											<div
												className={`d-flex align-items-center bg-l10-warning rounded-2 p-3`}>
												<div className='flex-shrink-0'>
													<LocalAtmTwoTone fontSize='large' htmlColor={COLORS.WARNING.code} />
												</div>
												<div className='flex-grow-1 ms-3'>
													<div className='fw-bold fs-3 mb-0'>{customer?.credit?.toLocaleString()}</div>
													<div className='text-muted mt-n2 truncate-line-1'>
														{t('balance')}
													</div>
												</div>
											</div>
										</div>
										<div className='col-xl-6'>
											<div
												className={`d-flex align-items-center bg-l10-info rounded-2 p-3`}>
												<div className='flex-shrink-0'>
													<StarTwoTone fontSize='large' htmlColor={COLORS.INFO.code} />
												</div>
												<div className='flex-grow-1 ms-3'>
													<div className='fw-bold fs-3 mb-0 d-block text-nowrap overflow-hidden text-overflow-ellipsis'>
														{customer?.point?.toLocaleString()}
													</div>
													<div className='text-muted mt-n2 truncate-line-1'>
														{t('points')}
													</div>
												</div>
											</div>
										</div>
										<div className='col-xl-6'>
											<div
												className={`d-flex align-items-center bg-l10-primary rounded-2 p-3`}>
												<div className='flex-shrink-0'>
													<CurrencyExchangeTwoTone fontSize='large' htmlColor={COLORS.PRIMARY.code} />
												</div>
												<div className='flex-grow-1 ms-3'>
													<div className='fw-bold fs-3 mb-0'>{customer?.cashbackBonus?.toLocaleString()}</div>
													<div className='text-muted mt-n2 truncate-line-1'>
														{t('cashback.bonus')}
													</div>
												</div>
											</div>
										</div>
										<div className='col-xl-6'>
											<div
												className={`d-flex align-items-center bg-l10-success rounded-2 p-3`}>
												<div className='flex-shrink-0'>
													<GroupTwoTone fontSize='large' htmlColor={COLORS.SUCCESS.code} />
												</div>
												<div className='flex-grow-1 ms-3'>
													<div className='fw-bold fs-3 mb-0'>{customer?.referralBonus?.toLocaleString()}</div>
													<div className='text-muted mt-n2'>{t('invitation.bonus')}</div>
												</div>
											</div>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
						<div className={`col-lg-8 ${isLoading && 'd-flex justify-content-center'}`}>
							{isLoading ? <Spinner size={50} color='primary' isGrow /> :
								transactionState === 'deposit' ?
									<DepositTable 
										cardHeader={transactionHeader()}
										data={depositList} 
										disabledColumns={['mobile-number', 'notes']} 
										/> : transactionState === 'withdraw' ?
									<WithdrawTable 
										cardHeader={transactionHeader()}
										data={withdrawList} 
										columns={{ lastDepositAmount: false, name: false, from: false, status: true }}
										/> : transactionState === 'reward' ?
									<RewardTable
										cardHeader={transactionHeader()}
										data={rewardList}
										columns={{ status: true }}
									/> : <CreditTable 
										cardHeader={transactionHeader()}
										data={creditList}
										columns={{ status: true }}
									/>
							}
						</div>
					</div>
				</>
				}
			</Page>
		</PageWrapper>
	);
};

export default CustomerProfile
