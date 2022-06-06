import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { useSelector } from 'react-redux'
import { selectPermission } from 'redux/user/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { RedeemInterface, RedeemStatus } from 'common/apis/redeem'
import moment from 'moment'
import 'moment/locale/th'
import { RewardModalType } from './RewardModal'
import { FilterList } from '@mui/icons-material'

interface RewardTableInterface {
    data: RedeemInterface[]
    setIsOpenRewardModal?: (value: { type: RewardModalType, selectedRow: RedeemInterface }) => void
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

    const permission = useSelector(selectPermission)

    const getStatusText = (status: RedeemStatus): ReactNode => {
        if (status === RedeemStatus.Success) {
            return <div className='fw-bold text-success'>{t('success')}</div>
        } else if (status === RedeemStatus.Sending || status === RedeemStatus.Request) {
            return <div className='fw-bold text-warning'>{status === RedeemStatus.Sending ? t('sending') : t('request')}</div>
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
                                <FilterList fontSize='small' className={getClassNamesFor('timestamp')} />
                            </th>
                            {columns?.mobileNumber && <th>{t('column.mobile.number')}</th>}
                            <th
                                onClick={() => requestSort('points')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.points')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('points')} />
                            </th>
                            <th
                                onClick={() => requestSort('product')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.product')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('product')} />
                            </th>
                            <th style={{ width: '15%' }}>{t('column.address')}</th>
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
                            {setIsOpenRewardModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((item: RedeemInterface, index: number) => (
                            <tr key={item.redeemId}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>{moment(item.createdAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(item.createdAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                {columns?.mobileNumber &&
                                    <td>
                                        <div>{item.mobileNumber}</div>
                                    </td>
                                }
                                <td>
                                    <div>{item.point}</div>
                                </td>
                                <td style={{ maxWidth: '200px' }}>
                                    <div>{item.productName}</div>
                                </td>
                                <td>
                                    <div>{item.address}</div>
                                </td>
                                {columns?.notes &&
                                    <td>
                                        <div>{item.notes}</div>
                                    </td>
                                }
                                {columns?.status &&
                                    <td>
                                        <div>{getStatusText(item.status)}</div>
                                    </td>
                                }
                                {columns?.operator &&
                                    <td>
                                        <div>{item.adminName}</div>
                                    </td>
                                }
                                {setIsOpenRewardModal && <td>
                                    {item.status === RedeemStatus.Request || item.status === RedeemStatus.Sending ? 
                                        <div className='row gap-3'><Button
                                            onClick={() => setIsOpenRewardModal({ type: RewardModalType.Approve, selectedRow: item})}
                                            color='primary'
                                            className='col text-nowrap'
                                            isLight
                                        >
                                            {t('edit.status')}
                                        </Button>
                                        <Button
                                            onClick={() => setIsOpenRewardModal({ type: RewardModalType.Reject, selectedRow: item})}
                                            color='primary'
                                            className='col text-nowrap'
                                            isLight
                                        >
                                            {t('reject')}
                                        </Button></div> : <></>
                                    }
                                </td>}
                            </tr>
                        )) : permission.reward[PermissionType.Read] === PermissionValue.Unavailable ?
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