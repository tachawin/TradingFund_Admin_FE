import React, { ReactNode, useEffect, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { TransactionInterface, TransactionStatus } from 'common/apis/transaction'
import moment from 'moment'
import 'moment/locale/th'
import { DepositModalProperties, DepositModalType } from './DepositModal'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { FilterList, LabelTwoTone } from '@mui/icons-material'

interface DepositTableInterface {
    data: TransactionInterface[]
    setIsOpenDepositModal?: (value: DepositModalProperties) => void
    disabledColumns?: string[]
    cardHeader?: ReactNode
}

const DepositTable = ({ data, setIsOpenDepositModal, disabledColumns, cardHeader }: DepositTableInterface) => {
    const { t } = useTranslation('common')

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    useEffect(() => {
        setCurrentPage(1)
    }, [items])

    const permission = JSON.parse(localStorage.getItem('features') ?? '')
    const updatePermission = permission.deposit[PermissionType.Update] === PermissionValue.Available

    const getStatusText = (status: string): ReactNode => {
        if (status === TransactionStatus.Success) {
            return <div className='fw-bold text-success'>{t('success')}</div>
        } else if (status === TransactionStatus.NotFound) {
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
                            <th className='text-center'>
                                {t('column.no')}
                            </th>
                            <th
                                onClick={() => requestSort('status')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.status')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('status')} />
                            </th>
                            <th
                                onClick={() => requestSort('transactionTimestamp')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.timestamp')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('transactionTimestamp')} />
                            </th>
                            <th
                                onClick={() => requestSort('payerBankAccountNumber')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.from')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('payerBankAccountNumber')} />
                            </th>
                            <th
                                onClick={() => requestSort('payerBankAccountNumber')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.to')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('payerBankAccountNumber')} />
                            </th>
                            <th
                                onClick={() => requestSort('amount')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.amount')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('amount')} />
                            </th>
                            {!disabledColumns?.includes('mobile-number') && <th>{t('column.mobile.number')}</th>}
                            {!disabledColumns?.includes('notes') && <th>{t('column.notes')}</th>}
                            {(setIsOpenDepositModal && updatePermission) && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((transaction: TransactionInterface, index: number) => (
                            <tr key={transaction.transactionId}>
                                <td className='text-center'>
                                    <div>{perPage * (currentPage - 1) + (index + 1)}</div>
                                </td>
                                <td>
                                    <div>{getStatusText(transaction.status)}</div>
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
                                    <div>{transaction.payerBankAccountNumber ? `*${transaction.payerBankAccountNumber.slice(-4)}` : t('not.specify')}</div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className='fs-6 fw-bold'>
                                                *{transaction.recipientBankAccountNumber.slice(-4)}
                                            </div>
                                            <div className='text-muted'>
                                                <LabelTwoTone fontSize='small' />{' '}
                                                <small>{transaction.recipientBank?.acronym.toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>{transaction.amount.toLocaleString()}</div>
                                </td>
                                {!disabledColumns?.includes('mobile-number') &&
                                    <td>
                                        <div>{transaction.mobileNumber}</div>
                                    </td>
                                }
                                {!disabledColumns?.includes('notes') &&
                                    <td>
                                        <div>{transaction.notes}</div>
                                    </td>
                                }
                                {(setIsOpenDepositModal && updatePermission) && <td>
                                    <div className='row gap-3 w-100'>
                                        {transaction.status === TransactionStatus.Success ? 
                                            <Button
                                                onClick={() => setIsOpenDepositModal({ type: DepositModalType.Refund, selectedRow: transaction})}
                                                color='light-dark'
                                                className='col fit-content text-nowrap'
                                            >
                                                {t('refund')}
                                            </Button>
                                            : transaction.status === TransactionStatus.NotFound ? <Button
                                                onClick={() => setIsOpenDepositModal({ type: DepositModalType.SelectPayer, selectedRow: transaction})}
                                                color='light-dark'
                                                className='col fit-content text-nowrap'
                                            >
                                                {t('select.payer')}
                                            </Button> : <></>
                                        } {(transaction.status === TransactionStatus.Success || transaction.status === TransactionStatus.Cancel) && <Button
                                                onClick={() => setIsOpenDepositModal({ type: DepositModalType.Edit, selectedRow: transaction})}
                                                color='light-dark'
                                                className='col fit-content text-nowrap'
                                            >
                                            {t('edit')}
                                        </Button>}
                                    </div>
                                </td>}
                            </tr>
                        )) : permission.deposit[PermissionType.Read] === PermissionValue.Unavailable ?
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
            </Card>
    )
}

export default DepositTable