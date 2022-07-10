import React, { ReactNode, useEffect, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import moment from 'moment'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { TransactionInterface, TransactionStatus, TransactionType } from 'common/apis/transaction'
import { FilterList, LabelTwoTone } from '@mui/icons-material'

interface ReportTableInterface {
    data: TransactionInterface[]
}

const ReportTable = ({ data }: ReportTableInterface) => {
    const { t } = useTranslation('common')
    const permission = JSON.parse(localStorage.getItem('features') ?? '')

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    useEffect(() => {
        setCurrentPage(1)
    }, [items])

    const getTypeText = (type: string): ReactNode => {
        if (type === TransactionType.Deposit) {
            return <div className='fw-bold text-success'>{t('deposit')}</div>
        } else if (type === TransactionType.RequestWithdraw) {
            return <div className='fw-bold text-warning'>{t('request.withdraw')}</div>
        } else {
            return <div className='fw-bold text-danger'>{t('withdraw')}</div>
        }
    }

    const getStatusText = (status: string): ReactNode => {
        if (status === TransactionStatus.Success) {
            return <div className='fw-bold text-success'>{t('success')}</div>
        } else if (status === TransactionStatus.NotFound) {
            return <div className='fw-bold text-warning'>{t('not.found')}</div>
        } else {
            return <div className='fw-bold text-danger'>{t('cancel')}</div>
        }
    }

    return (<Card stretch>
        <CardBody isScrollable className='table-responsive'>
            <table className='table table-modern table-hover'>
                <thead>
                    <tr>
                        <th className='text-center'>
                            {t('column.no')}
                        </th>
                        <th
                            onClick={() => requestSort('transactionTimestamp')}
                            className='cursor-pointer text-decoration-underline'>
                            {t('column.timestamp')}{' '}
                            <FilterList fontSize='small' className={getClassNamesFor('transactionTimestamp')} />
                        </th>
                        <th
                            onClick={() => requestSort('transactionType')}
                            className='cursor-pointer text-decoration-underline'>
                            {t('column.type')}{' '}
                            <FilterList fontSize='small' className={getClassNamesFor('transactionType')} />
                        </th>
                        <th>{t('column.mobile.number')}</th>
                        <th>{t('column.bank')}</th>
                        <th
                            onClick={() => requestSort('amount')}
                            className='cursor-pointer text-decoration-underline'>
                            {t('column.amount')}{' '}
                            <FilterList fontSize='small' className={getClassNamesFor('amount')} />
                        </th>
                        <th
                            onClick={() => requestSort('status')}
                            className='cursor-pointer text-decoration-underline'>
                            {t('column.status')}{' '}
                            <FilterList fontSize='small' className={getClassNamesFor('status')} />
                        </th>
                        <th>{t('column.notes')}</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length > 0 ? dataPagination(items, currentPage, perPage).map((transaction: TransactionInterface, index: number) => (
                        <tr key={transaction.transactionId}>
                            <td className='text-center'>
                                <div>{perPage * (currentPage - 1) + (index + 1)}</div>
                            </td>
                            <td>
                                <div>{moment(transaction.transactionTimestamp).format('ll')}</div>
                                <div>
                                    <small className='text-muted'>
                                        {moment(transaction.transactionTimestamp).fromNow()}
                                    </small>
                                </div>
                            </td>
                            <td>
                                <div>{getTypeText(transaction.transactionType)}</div>
                            </td>
                            <td>
                                <div>{transaction.mobileNumber}</div>
                            </td>
                            <td>
                                <div className='d-flex align-items-center'>
                                    { transaction.transactionType !== TransactionType.RequestWithdraw ? <div className='flex-grow-1'>
                                        <div className='fs-6 fw-bold'>
                                            {transaction.transactionType === TransactionType.Deposit ? 
                                                `*${transaction.recipientBankAccountNumber.slice(-4)}` : `*${transaction.payerBankAccountNumber.slice(-4)}`}
                                        </div>
                                        <div className='text-muted'>
                                            <LabelTwoTone fontSize='small' />{' '}
                                            <small>{transaction.transactionType === TransactionType.Deposit ? transaction.recipientBank?.acronym.toUpperCase() : transaction.payerBank?.acronym.toUpperCase()}</small>
                                        </div>
                                    </div> : t('not.specify')}
                                </div>
                            </td>
                            <td>
                                <div>{transaction.amount.toLocaleString()}</div>
                            </td>
                            <td>
                                <div>{getStatusText(transaction.status)}</div>
                            </td>
                            <td>
                                <div>{transaction.notes}</div>
                            </td>
                        </tr>
                    )) : permission.report[PermissionType.Read] === PermissionValue.Unavailable ?
                    <tr>
                        <td colSpan={8} className='text-center'>ไม่มีสิทธิ์เข้าถึง</td>
                    </tr>
                    : <tr>
                        <td colSpan={8} className='text-center'>ไม่พบข้อมูล</td>
                    </tr>}
                </tbody>
            </table>
        </CardBody>
        <PaginationButtons
            data={data}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            perPage={perPage}
            setPerPage={setPerPage}
        />
    </Card>)
}

export default ReportTable