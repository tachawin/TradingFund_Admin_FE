import React, { ReactNode, useEffect, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { FilterList } from '@mui/icons-material'
import { CreditConditionInterface } from 'common/apis/creditCondition'
import { CreditConditionModalType } from './CreditConditionModal'
import moment from 'moment'

interface CreditConditionTableInterface {
    data: CreditConditionInterface[]
    setIsOpenCreditConditionModal?: (value: { type: CreditConditionModalType, selectedRow: CreditConditionInterface }) => void
    setIsOpenDeleteCreditConditionModal?: (value: { type: CreditConditionModalType, selectedRow: CreditConditionInterface }) => void
    columns?: any
    cardHeader?: ReactNode
}

const CreditConditionTable = ({ 
    data, 
    setIsOpenCreditConditionModal, 
    setIsOpenDeleteCreditConditionModal,
    cardHeader 
}: CreditConditionTableInterface) => {
    const { t } = useTranslation(['common', 'creditCondition'])

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    useEffect(() => {
        setCurrentPage(1)
    }, [items])

    const permission = JSON.parse(localStorage.getItem('features') ?? '')
    const updatePermission = permission.creditCondition[PermissionType.Update] === PermissionValue.Available
    const deletePermission = permission.creditCondition[PermissionType.Delete] === PermissionValue.Available

    return (
        <Card stretch className='mx-3' style={{ height: 500 }}>
            {cardHeader}
            <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover'>
                    <thead>
                        <tr>
                            <th className='text-center'>
                                {t('column.no')}
                            </th>
                            <th
                                onClick={() => requestSort('point')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.points')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('creditConditionName')} />
                            </th>
                            <th
                                onClick={() => requestSort('credit')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.credit')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('minumumDeposit')} />
                            </th>
                            <th
                                onClick={() => requestSort('quantity')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.quantity')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('minumumDeposit')} />
                            </th>
                            <th
                                onClick={() => requestSort('createdAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.created.at')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('createdAt')} />
                            </th>
                            <th
                                onClick={() => requestSort('updatedAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.updated.at')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('updatedAt')} />
                            </th>
                            {setIsOpenCreditConditionModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((item: CreditConditionInterface, index: number) => (
                            <tr key={item.conditionId}>
                                <td className='text-center'>
                                    <div>{perPage * (currentPage - 1) + (index + 1)}</div>
                                </td>
                                <td>
                                    <div>{item.point.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{item.credit.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{item.quantity && (item.quantity !== -1 ? item.quantity?.toLocaleString() : 'ไม่จำกัด')}</div>
                                </td>
                                <td>
                                    <div>{moment(item.createdAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(item.createdAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div>{moment(item.updatedAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(item.updatedAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                {(setIsOpenCreditConditionModal && setIsOpenDeleteCreditConditionModal) && <td>
                                    <div className='row gap-3 w-100'>
                                        {updatePermission && <Button
                                            onClick={() => setIsOpenCreditConditionModal({ type: CreditConditionModalType.Edit, selectedRow: item })}
                                            color='light-dark'
                                            className='col'
                                        >
                                            {t('edit')}
                                        </Button>}
                                        {deletePermission && <Button
                                            onClick={() => setIsOpenDeleteCreditConditionModal({ type: CreditConditionModalType.Delete, selectedRow: item })}
                                            color='light-dark'
                                            className='col'
                                        >
                                            {t('delete')}
                                        </Button>}
                                    </div>
                                </td>}
                            </tr>
                        )) : permission.creditCondition[PermissionType.Read] === PermissionValue.Unavailable ?
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

export default CreditConditionTable