import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import Icon from 'components/icon/Icon'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'

interface DepositTableInterface {
    data: any
    setIsOpenDepositModal?: (value: { type: string, selectedRow: any }) => void
    disabledColumns?: string[]
    cardHeader?: ReactNode
}

const DepositTable = ({ data, setIsOpenDepositModal, disabledColumns, cardHeader }: DepositTableInterface) => {
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
                                onClick={() => requestSort('status')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.status')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('status')}
                                    icon='FilterList'
                                />
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
                            <th
                                onClick={() => requestSort('from')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.from')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('from')}
                                    icon='FilterList'
                                />
                            </th>
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
                            {!disabledColumns?.includes('mobile-number') && <th>{t('column.mobile.number')}</th>}
                            {!disabledColumns?.includes('notes') && <th>{t('column.notes')}</th>}
                            {setIsOpenDepositModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
                            <tr key={i.id}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>{getStatusText(i.status)}</div>
                                </td>
                                <td>
                                    <div>{i.date.format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {i.date.fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div>*{i.payerBankAccountNumber}</div>
                                </td>
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
                                {!disabledColumns?.includes('mobile-number') &&
                                    <td>
                                        <div>{i.mobileNumber}</div>
                                    </td>
                                }
                                {!disabledColumns?.includes('notes') &&
                                    <td className='w-25'>
                                        <div>{i.note}</div>
                                    </td>
                                }
                                {setIsOpenDepositModal && <td>
                                    {i.status === 'success' ? 
                                        <><Button
                                            onClick={() => setIsOpenDepositModal({ type: "refund", selectedRow: i})}
                                            className='p-0'
                                            isLight
                                        >
                                            {t('refund')}
                                        </Button> / </>
                                        : i.status === 'not-found' ? <><Button
                                            onClick={() => setIsOpenDepositModal({ type: "select-payer", selectedRow: i})}
                                            className='p-0'
                                            isLight
                                        >
                                            {t('select.payer')}
                                        </Button> / </> : <></>
                                    } <Button
                                            onClick={() => setIsOpenDepositModal({ type: "edit", selectedRow: i})}
                                            className='p-0'
                                            isLight
                                        >
                                        {t('edit')}
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

export default DepositTable