import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { useSelector } from 'react-redux'
import { selectPermission } from 'redux/user/selector'
import { RedeemInterface, RedeemStatus } from 'common/apis/redeem'
import 'moment/locale/th'
import moment from 'moment'
import { CreditModalType } from './CreditModal'
import { FilterList } from '@mui/icons-material'

interface CreditTableInterface {
    data: RedeemInterface[]
    setIsOpenCreditModal?: (value: { type: CreditModalType, selectedRow: RedeemInterface }) => void
    columns?: any
    cardHeader?: ReactNode
}

const CreditTable = ({ 
    data, 
    setIsOpenCreditModal, 
    columns, 
    cardHeader 
}: CreditTableInterface) => {
    const { t } = useTranslation('common')

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    const permission = useSelector(selectPermission)

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
                                onClick={() => requestSort('credit')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.credit')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('credit')} />
                            </th>
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
                            {setIsOpenCreditModal && <td />}
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
                                <td>
                                    <div>{item.credit}</div>
                                </td>
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
                                {setIsOpenCreditModal && <td>
                                    {item.status === RedeemStatus.Request ?
                                        <div className='row gap-3'><Button
                                        onClick={() => setIsOpenCreditModal({ type: CreditModalType.Approve, selectedRow: item})}
                                            color='primary'
                                            className='col text-nowrap'
                                            isLight
                                        >
                                            {t('approve')}
                                        </Button>
                                        <Button
                                            onClick={() => setIsOpenCreditModal({ type: CreditModalType.Reject, selectedRow: item})}
                                            color='primary'
                                            className='col text-nowrap'
                                            isLight
                                        >
                                            {t('reject')}
                                        </Button></div> : <></>
                                    }
                                </td>}
                            </tr>
                        )) : permission.credit[PermissionType.Read] === PermissionValue.Unavailable ?
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

export default CreditTable