import React, { ReactNode, useState, useEffect } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import Icon from 'components/icon/Icon'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { CompanyBankInterface, CompanyBankStatus } from 'common/apis/companyBank'
import moment from 'moment'

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
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('bankAccount')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('bankAccountName')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.bank.account.name')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('bankAccountName')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('paymentType')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.payment.type')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('paymentType')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('addedAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.added.at')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('addedAt')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('status')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.status')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('status')}
                                    icon='FilterList'
                                />
                            </th>
                            {setIsOpenBankModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {dataPagination(items, currentPage, perPage).map((bank: CompanyBankInterface, index: number) => (
                            <tr key={bank.bankId}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className='fs-6 fw-bold'>
                                                *{bank.bankAccountNumber.slice(-4)}
                                            </div>
                                            <div className='text-muted'>
                                                <Icon icon='Label' />{' '}
                                                <small>{bank.bankName.toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>{bank.bankAccountName}</div>
                                </td>
                                <td>
                                    <div>{bank.type}</div>
                                </td>

                                <td>
                                    <div>{moment(bank.createdAt)?.format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(bank.createdAt)?.fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        { bank.status === CompanyBankStatus.Active ?
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
                                    <Button
                                        onClick={() => setIsOpenBankModal({ type: "edit", selectedRow: bank })}
                                        className='p-0'
                                        isLight
                                    >
                                        {t('edit')}
                                    </Button> / <Button
                                        onClick={() => setIsOpenDeleteBankModal({ type: "delete", selectedRow: bank })}
                                        className='p-0'
                                        isLight
                                    >
                                        {t('delete')}
                                    </Button>
                                </td>}
                            </tr>
                        ))}
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