import React, { ReactNode, useEffect, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { CashbackStatus } from 'common/apis/cashback'
import moment from 'moment'
import { FilterList } from '@mui/icons-material'
import { CashbackInterface } from 'common/apis/cashback'

interface CashbackTableInterface {
    data: CashbackInterface[]
    columns?: any
    cardHeader?: ReactNode
}

const CashbackTable = ({ 
    data,
    cardHeader 
}: CashbackTableInterface) => {
    const { t } = useTranslation(['common', 'cashback'])

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    useEffect(() => {
        setCurrentPage(1)
    }, [items])

    const permission = JSON.parse(localStorage.getItem('features') ?? '')
    console.log(items)

    const getStatusText = (status?: CashbackStatus): ReactNode => {
        if (status === CashbackStatus.Success) {
            return <div className='fw-bold text-success'>{t('success')}</div>
        } else if (status === CashbackStatus.Check) {
            return <div className='fw-bold text-warning'>{t('check')}</div>
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
                                onClick={() => requestSort('investAmount')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.investment.amount')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('investAmount')} />
                            </th>
                            <th
                                onClick={() => requestSort('cashback')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.cashback')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('cashback')} />
                            </th>
                            <th
                                onClick={() => requestSort('createdAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.timestamp')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('createdAt')} />
                            </th>
                            <th
                                onClick={() => requestSort('status')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.status')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('status')} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((cashback: CashbackInterface, index: number) => (
                            <tr key={cashback.cashbackId}>
                                <td className='text-center'>
                                    <div>{perPage * (currentPage - 1) + (index + 1)}</div>
                                </td>
                                <td>
                                    <div>{cashback.investAmount.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{(cashback.cashback * -1).toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{moment(cashback.createdAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(cashback.createdAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div>{getStatusText(cashback.status)}</div>
                                </td>
                            </tr>
                        )) : permission.cashback[PermissionType.Read] === PermissionValue.Unavailable ?
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
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
            </Card>
    )
}

export default CashbackTable