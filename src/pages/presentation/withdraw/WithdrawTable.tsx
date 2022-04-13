import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import Icon from 'components/icon/Icon'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'

interface WithdrawTableInterface {
    data: any
    setIsOpenWithdrawModal?: (value: { type: string, selectedRow: any }) => void
    columns?: any
    cardHeader?: ReactNode
}

const WithdrawTable = ({ 
    data, 
    setIsOpenWithdrawModal, 
    columns, 
    cardHeader 
}: WithdrawTableInterface) => {
    const { t } = useTranslation('common')

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

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
                            <th 
                                onClick={() => requestSort('no')}
                                className='cursor-pointer text-decoration-underline text-center'>
                                {t('column.no')}
                            </th>
                            <th
                                onClick={() => requestSort('timestamp')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.timestamp')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('timestamp')}
                                    icon='FilterList'
                                />
                            </th>
                            {columns?.name &&
                                <th
                                    onClick={() => requestSort('name')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.name')}{' '}
                                    <Icon
                                        size='lg'
                                        className={getClassNamesFor('name')}
                                        icon='FilterList'
                                    />
                                </th>
                            }
                            {columns?.mobileNumber && <th>{t('column.mobile.number')}</th>}
                            {columns?.from && <th
                                onClick={() => requestSort('from')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.from')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('from')}
                                    icon='FilterList'
                                />
                            </th>}
                            <th
                                onClick={() => requestSort('to')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.to')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('to')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('amount')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.amount')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('amount')}
                                    icon='FilterList'
                                />
                            </th>
                            {columns?.lastDepositAmount &&
                                <th
                                    onClick={() => requestSort('lastDepositAmount')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.last.deposit.amount')}{' '}
                                    <Icon
                                        size='lg'
                                        className={getClassNamesFor('lastDepositAmount')}
                                        icon='FilterList'
                                    />
                                </th>
                            }
                            {columns?.notes && <th>{t('column.notes')}</th>}
                            {columns?.status &&
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
                            }
                            {columns?.operator &&
                                <th
                                    onClick={() => requestSort('operator')}
                                    className='cursor-pointer text-decoration-underline'>
                                    {t('column.operator')}{' '}
                                    <Icon
                                        size='lg'
                                        className={getClassNamesFor('operator')}
                                        icon='FilterList'
                                    />
                                </th>
                            }
                            {setIsOpenWithdrawModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
                            <tr key={i.id}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>{i.date.format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {i.date.fromNow()}
                                        </small>
                                    </div>
                                </td>
                                {columns?.name &&
                                    <td>
                                        <div>{i.name}</div>
                                    </td>
                                }
                                {columns?.mobileNumber &&
                                    <td>
                                        <div>{i.mobileNumber}</div>
                                    </td>
                                }
                                {columns?.from && 
                                    <td>
                                        <div className='d-flex align-items-center'>
                                            <div className='flex-grow-1'>
                                                <div className='fs-6 fw-bold'>
                                                    *{i.payerBankAccountNumber}
                                                </div>
                                                <div className='text-muted'>
                                                    <Icon icon='Label' />{' '}
                                                    <small>{i.payerBankName.toUpperCase()}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                }
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className='fs-6 fw-bold'>
                                                *{i.recipientBankAccountNumber}
                                            </div>
                                            <div className='text-muted'>
                                                <Icon icon='Label' />{' '}
                                                <small>{i.recipientBankName.toUpperCase()}</small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>{i.amount.toLocaleString()}</div>
                                </td>
                                {columns?.lastDepositAmount &&
                                    <td>
                                        <div>{i.amount.toLocaleString()}</div>
                                    </td>
                                }
                                {columns?.notes &&
                                    <td style={{ width: '15%' }}>
                                        <div>{i.note}</div>
                                    </td>
                                }
                                {columns?.status &&
                                    <td>
                                        <div>{getStatusText(i.status)}</div>
                                    </td>
                                }
                                {columns?.operator &&
                                    <td>
                                        <div>{i.operator}</div>
                                    </td>
                                }
                                {setIsOpenWithdrawModal && <td>
                                    {i.status === 'request' ? 
                                        <><Button
                                            onClick={() => setIsOpenWithdrawModal({ type: "refund", selectedRow: i})}
                                            className='p-0'
                                            isLight
                                        >
                                            {t('withdraw')}
                                        </Button> / <Button
                                            onClick={() => setIsOpenWithdrawModal({ type: "select-payer", selectedRow: i})}
                                            className='p-0'
                                            isLight
                                        >
                                            {t('reject')}
                                        </Button></> : <></>
                                    }
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

export default WithdrawTable