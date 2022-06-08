import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { CompanyBankInterface, CompanyBankStatus } from 'common/apis/companyBank'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { selectPermission } from 'redux/user/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { FilterList, LabelTwoTone } from '@mui/icons-material'

interface BankTableInterface {
    data: any
    setIsOpenBankModal?: (value: { type: string, selectedRow: any }) => void
    setIsOpenDeleteBankModal?: (value: { type: string, selectedRow: any }) => void
    columns?: any
    cardHeader?: ReactNode
}

const BankTable = ({ 
    data, 
    setIsOpenBankModal, 
    setIsOpenDeleteBankModal,
    columns, 
    cardHeader 
}: BankTableInterface) => {
    const { t } = useTranslation('common')
    const permission = useSelector(selectPermission)

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    return (
        <Card stretch>
            {cardHeader}
            <CardBody isScrollable className='table-responsive'>
                <table className='table table-modern table-hover'>
                    <thead>
                        <tr>
                            <th 
                                onClick={() => requestSort('no')}
                                className='cursor-pointer text-decoration-underline text-center'>
                                {t('column.no')}
                            </th>
                            <th
                                onClick={() => requestSort('bankAccount')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.bank.account')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('bankAccount')} />
                            </th>
                            <th
                                onClick={() => requestSort('bankAccountName')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.bank.account.name')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('bankAccountName')} />
                            </th>
                            <th
                                onClick={() => requestSort('paymentType')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.payment.type')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('paymentType')} />
                            </th>
                            <th
                                onClick={() => requestSort('addedAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.added.at')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('addedAt')} />
                            </th>
                            <th
                                onClick={() => requestSort('status')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.status')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('status')} />
                            </th>
                            {setIsOpenBankModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((companyBank: CompanyBankInterface, index: number) => (
                            <tr key={companyBank.bankId}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className='fs-6 fw-bold'>
                                                *{companyBank.bankAccountNumber.slice(-4)}
                                            </div>
                                            <div className='text-muted'>
                                                <LabelTwoTone fontSize='small' />{' '}
                                                <small>{companyBank.bank?.acronym.toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>{companyBank.bankAccountName}</div>
                                </td>
                                <td>
                                    <div>{companyBank.type}</div>
                                </td>
                                <td>
                                    <div>{moment(companyBank.createdAt)?.format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(companyBank.createdAt)?.fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        { companyBank.status === CompanyBankStatus.Active ?
                                            <>
                                                <span className='badge border border-2 border-light rounded-circle bg-success p-2 me-2'>
                                                    <span className='visually-hidden'>
                                                        Active status
                                                    </span>
                                                </span>
                                                <span>{t('active')}</span>
                                            </> : <>
                                                <span className='badge border border-2 border-light rounded-circle bg-l25-dark p-2 me-2'>
                                                    <span className='visually-hidden'>
                                                        Inactive status
                                                    </span>
                                                </span>
                                                <span>{t('inactive')}</span>
                                            </>
                                        }
                                    </div>
                                </td>
                                {(setIsOpenBankModal && setIsOpenDeleteBankModal) && <td>
                                    <div className='row gap-3 w-100'>
                                        {permission.bank[PermissionType.Update] === PermissionValue.Available && <Button
                                            onClick={() => setIsOpenBankModal({ type: "edit", selectedRow: companyBank })}
                                            className='col fit-content text-nowrap'
                                            color='light-dark'
                                        >
                                            {t('edit')}
                                        </Button>}
                                        {permission.bank[PermissionType.Delete] === PermissionValue.Available && <Button
                                            onClick={() => setIsOpenDeleteBankModal({ type: "delete", selectedRow: companyBank })}
                                            className='col fit-content text-nowrap'
                                            color='light-dark'
                                        >
                                            {t('delete')}
                                        </Button>}
                                    </div>
                                </td>}
                            </tr>
                        )) : permission.bank[PermissionType.Read] === PermissionValue.Unavailable ?
                        <tr>
                            <td colSpan={8} className='text-center'>ไม่มีสิทธิ์เข้าถึง</td>
                        </tr>
                        : <tr>
                            <td colSpan={8} className='text-center'>ไม่พบข้อมูล</td>
                        </tr>
                    }
                    </tbody>
                </table>
            </CardBody>
            <PaginationButtons
                data={data}
                label='customers'
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
            </Card>
    )
}

export default BankTable