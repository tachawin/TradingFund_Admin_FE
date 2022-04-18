import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import Icon from 'components/icon/Icon'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'

interface RewardTableInterface {
    data: any
    setIsOpenRewardModal?: (value: { type: string, selectedRow: any }) => void
    columns?: any
    cardHeader?: ReactNode
}

const RewardTable = ({ 
    data, 
    setIsOpenRewardModal, 
    columns, 
    cardHeader 
}: RewardTableInterface) => {
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
                            {columns?.mobileNumber && <th>{t('column.mobile.number')}</th>}
                            <th
                                onClick={() => requestSort('points')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.points')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('points')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('product')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.product')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('product')}
                                    icon='FilterList'
                                />
                            </th>
                            <th style={{ width: '15%' }}>{t('column.address')}</th>
                            {columns?.notes && <th style={{ width: '15%' }}>{t('column.notes')}</th>}
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
                            {setIsOpenRewardModal && <td />}
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
                                {columns?.mobileNumber &&
                                    <td>
                                        <div>{i.mobileNumber}</div>
                                    </td>
                                }
                                <td>
                                    <div>{i.points}</div>
                                </td>
                                <td>
                                    <div>{i.product}</div>
                                </td>
                                <td>
                                    <div>{i.address}</div>
                                </td>
                                {columns?.notes &&
                                    <td>
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
                                {setIsOpenRewardModal && <td>
                                    {i.status === 'request' || i.status === 'sending' ? 
                                        <><Button
                                            onClick={() => setIsOpenRewardModal({ type: "approve", selectedRow: i})}
                                            className='p-0'
                                            isLight
                                        >
                                            {t('edit.status')}
                                        </Button> / <Button
                                            onClick={() => setIsOpenRewardModal({ type: "reject", selectedRow: i})}
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

export default RewardTable