import { useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import SubHeader, {
	SubHeaderLeft
} from '../../../layout/SubHeader/SubHeader';
import Page from '../../../layout/Page/Page';
import { demoPages, pages } from '../../../menu';
import data from '../../../common/data/dummyCustomerData';
import depositData from '../../../common/data/dummySalesData';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import latestSalesData from '../../../common/data/dummySalesData';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import useDarkMode from '../../../hooks/useDarkMode';
import { useTranslation } from 'react-i18next';
import DepositTable from '../deposit/DepositTable';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown';

const CustomerProfile = () => {
    const { t } = useTranslation('common')
	const { darkModeStatus } = useDarkMode();

	const { id } = useParams();
	const itemData = data.filter((item: any) => item.id.toString() === id);
	const item = itemData[0];

	const [transactionState, setTransactionState] = useState('deposit')
    const [isOpenTransactionDropdown, setIsOpenTransactionDropdown] = useState(false)

	return (
		<PageWrapper title={demoPages.crm.subMenu.customer.text}>
			<SubHeader>
				<SubHeaderLeft>
					<Button
						color='primary'
						isLink
						icon='ArrowBack'
						tag='a'
						to={`../${pages.customer.path}`}>
						Back to List
					</Button>
				</SubHeaderLeft>
			</SubHeader>
			<Page className='p-3'>
				<div className='pt-3 pb-5 d-flex align-items-center'>
					<span className='display-4 fw-bold me-3'>{item.name}</span>
					<span className='border border-success border-2 text-success fw-bold px-3 py-2 rounded'>
						{item.level}
					</span>
				</div>
				<div className='row'>
					<div className='col-lg-4'>
						<Card className='shadow-3d-primary'>
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
															{t('mobile.number')}
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
															{item.bankName}
														</div>
														<div className='text-muted'>
															{t('bank.account')}
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
                                                            {t('last.active', { date: item.membershipDate.fromNow() })}
														</div>
														<div className='text-muted'>
															{t('has.joined.at', { date: item.membershipDate })}
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
												<Icon icon='DoneAll' size='3x' color='warning' />
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
												<Icon icon='Savings' size='3x' color='info' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>
													{1260}
												</div>
												<div className='text-muted mt-n2 truncate-line-1'>
                                                    {t('point')}
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
												<Icon icon='Star' size='3x' color='primary' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>4.96</div>
												<div className='text-muted mt-n2 truncate-line-1'>
                                                    {t('bonus')}
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
												<Icon icon='Timer' size='3x' color='success' />
											</div>
											<div className='flex-grow-1 ms-3'>
												<div className='fw-bold fs-3 mb-0'>3 years</div>
												<div className='text-muted mt-n2'>{t('invitation.bonus')}</div>
											</div>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8'>
						<DepositTable 
                            cardHeader={
                                <CardHeader>
                                    <CardLabel icon='Receipt'>
                                        <CardTitle>{t('transaction.history')}</CardTitle>
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
                            }
                            data={depositData} 
                            disabledColumns={['mobile-number', 'notes']} 
                        />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CustomerProfile
