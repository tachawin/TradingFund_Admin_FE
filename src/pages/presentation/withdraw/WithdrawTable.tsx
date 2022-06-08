import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { WithdrawModalType } from './WithdrawModal'
import { useSelector } from 'react-redux'
import { selectPermission } from 'redux/user/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { TransactionInterface, TransactionType } from 'common/apis/transaction'
import moment from 'moment'
import { selectCompanyBankList } from 'redux/companyBank/selector'
import { FilterList, LabelTwoTone } from '@mui/icons-material'

interface WithdrawTableInterface {
    data: TransactionInterface[]
    setIsOpenWithdrawModal?: (value: { type: WithdrawModalType, bank?: string, selectedRow: any }) => void
    setIsOpenCancelWithdrawModal?: (value: { type: WithdrawModalType, selectedRow: any }) => void
    columns?: any
    cardHeader?: ReactNode
}

const WithdrawTable = ({ 
    data, 
    setIsOpenWithdrawModal,
    setIsOpenCancelWithdrawModal,
    columns, 
    cardHeader 
}: WithdrawTableInterface) => {
    const { t } = useTranslation(['common', 'withdraw'])

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    const permission = useSelector(selectPermission)
    const banks = useSelector(selectCompanyBankList)

    const getStatusText = (status: string): ReactNode => {
        if (status === 'success') {
            return <div className='fw-bold text-success'>{t('success')}</div>
        } else if (status === 'not-found') {
            return <div className='fw-bold text-warning'>{t('not.found')}</div>
        } else {
            return <div className='fw-bold text-danger'>{t('cancel')}</div>
        }
    }

    return (
        <Card stretch>
            {cardHeader}
            <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover'>
                    <thead>
                        <tr>
                            {columns?.id && <th 
                                onClick={() => requestSort('no')}
                                className='cursor-pointer text-decoration-underline text-center'>
                                {t('column.no')}
                            </th>}
                            <th
                                onClick={() => requestSort('timestamp')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.timestamp')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('timestamp')} />
                            </th>
                            {columns?.name &&
                                <th
                                    onClick={() => requestSort('name')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.name')}{' '}
                                    <FilterList fontSize='small' className={getClassNamesFor('name')} />
                                </th>
                            }
                            {columns?.mobileNumber && <th>{t('column.mobile.number')}</th>}
                            {columns?.from && <th
                                onClick={() => requestSort('from')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.from')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('from')} />
                            </th>}
                            <th
                                onClick={() => requestSort('to')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.to')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('to')} />
                            </th>
                            <th
                                onClick={() => requestSort('amount')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.amount')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('amount')} />
                            </th>
                            {columns?.lastDepositAmount &&
                                <th
                                    onClick={() => requestSort('lastDepositAmount')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.last.deposit.amount')}{' '}
                                    <FilterList fontSize='small' className={getClassNamesFor('lastDepositAmount')} />
                                </th>
                            }
                            {columns?.notes && <th>{t('column.notes')}</th>}
                            {columns?.status &&
                                <th
                                    onClick={() => requestSort('status')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.status')}{' '}
                                    <FilterList fontSize='small' className={getClassNamesFor('status')} />
                                </th>
                            }
                            {columns?.operator &&
                                <th
                                    onClick={() => requestSort('operator')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.operator')}{' '}
                                    <FilterList fontSize='small' className={getClassNamesFor('operator')} />
                                </th>
                            }
                            {setIsOpenCancelWithdrawModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((transaction: TransactionInterface, index: number) => (
                            <tr key={transaction.transactionId}>
                                {columns?.id && <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>}
                                <td>
                                    <div>{moment(transaction.createdAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(transaction.createdAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                {columns?.name &&
                                    <td>
                                        <div>{transaction.mobileNumber}</div>
                                    </td>
                                }
                                {columns?.mobileNumber &&
                                    <td>
                                        <div>{transaction.mobileNumber}</div>
                                    </td>
                                }
                                {columns?.from && 
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-grow-1'>
                                                <div className='fs-6 fw-bold'>
                                                    *{transaction.payerBankAccountNumber}
                                                </div>
                                                <div className='text-muted text-nowrap'>
                                                    <LabelTwoTone fontSize='small' />{' '}
                                                    <small>{transaction.payerBankName.toUpperCase()}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                }
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className='fs-6 fw-bold'>
                                                *{transaction.recipientBankAccountNumber}
                                            </div>
                                            <div className='text-muted text-nowrap'>
                                                <LabelTwoTone fontSize='small' />{' '}
                                                <small>{transaction.recipientBankName.split(' ')[0].toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>{transaction.amount.toLocaleString()}</div>
                                </td>
                                {columns?.lastDepositAmount &&
                                    <td>
                                        <div>{transaction.amount.toLocaleString()}</div>
                                    </td>
                                }
                                {columns?.notes &&
                                    <td>
                                        <div>{transaction.notes}</div>
                                    </td>
                                }
                                {columns?.status &&
                                    <td>
                                        <div>{getStatusText(transaction.status)}</div>
                                    </td>
                                }
                                {columns?.operator &&
                                    <td>
                                        <div>{transaction.adminId}</div>
                                    </td>
                                }
                                {(setIsOpenWithdrawModal && setIsOpenCancelWithdrawModal) && <td>
                                    {transaction.transactionType === TransactionType.RequestWithdraw ? <div className='row gap-3'>
                                        {banks.map((bank) => 
                                            <Button
                                                key={bank.bankId}
                                                onClick={() => setIsOpenWithdrawModal({ type: WithdrawModalType.System, bank: bank.bankName, selectedRow: transaction})}
                                                color='primary'
                                                className='col'
                                                isLight
                                            >
                                                {bank.bank?.acronym.toLocaleUpperCase()}
                                            </Button>
                                        )}
                                        <Button
                                            onClick={() => setIsOpenWithdrawModal({ type: WithdrawModalType.Manual, selectedRow: transaction})}
                                            className='text-nowrap col'
                                            color='light-dark'
                                        >
                                            {t('manual')}
                                        </Button>
                                        <Button
                                            onClick={() => setIsOpenCancelWithdrawModal({ type: WithdrawModalType.Delete, selectedRow: transaction})}
                                            color='light-dark'
                                            className='col'
                                        >
                                            {t('reject')}
                                        </Button>
                                    </div> : <></>}
                                </td>}
                            </tr>
                        )) : permission.withdraw[PermissionType.Read] === PermissionValue.Unavailable ?
                        <tr>
                            <td colSpan={9} className='text-center'>ไม่มีสิทธิ์เข้าถึง</td>
                        </tr>
                        : <tr>
                            <td colSpan={9} className='text-center'>ไม่พบข้อมูล</td>
                        </tr>}
                    </tbody>
                </table>
            </CardBody>
            <PaginationButtons
                data={data}
                label={t('withdraw:withdraw.request')}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
            </Card>
    )
}

export default WithdrawTable