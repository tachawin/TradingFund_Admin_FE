import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { useSelector } from 'react-redux'
import { selectPermission } from 'redux/user/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { FilterList } from '@mui/icons-material'
import { LevelInterface } from 'common/apis/level'
import { LevelModalType } from './LevelModal'
import moment from 'moment'
import PlaceholderImage from 'components/extras/PlaceholderImage'

interface LevelTableInterface {
    data: LevelInterface[]
    setIsOpenLevelModal?: (value: { type: LevelModalType, selectedRow: LevelInterface }) => void
    setIsOpenDeleteLevelModal?: (value: { type: LevelModalType, selectedRow: LevelInterface }) => void
    columns?: any
    cardHeader?: ReactNode
}

const LevelTable = ({ 
    data, 
    setIsOpenLevelModal, 
    setIsOpenDeleteLevelModal,
    cardHeader 
}: LevelTableInterface) => {
    const { t } = useTranslation('common')

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)

    const permission = useSelector(selectPermission)

    return (
        <Card stretch className='mx-3' style={{ height: 500 }}>
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
                                onClick={() => requestSort('levelName')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.level.name')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('levelName')} />
                            </th>
                            <th
                                onClick={() => requestSort('minimumDeposit')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.minimum.deposit')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('minumumDeposit')} />
                            </th>
                            <th
                                onClick={() => requestSort('maximumDeposit')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.maximum.deposit')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('maximumDeposit')} />
                            </th>
                            <th
                                onClick={() => requestSort('investmentAmount')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.investment.amount')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('investmentAmount')} />
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
                                {t('column.created.at')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('createdAt')} />
                            </th>
                            <th
                                onClick={() => requestSort('updatedAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.updated.at')}{' '}
                                <FilterList fontSize='small' className={getClassNamesFor('updatedAt')} />
                            </th>
                            {setIsOpenLevelModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((item: LevelInterface, index: number) => (
                            <tr key={item.levelId}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>
                                        {item.imageURL ? 
                                            <img 
                                                src={item.imageURL} 
                                                alt={item.levelName} 
                                                width={40} 
                                                height={40} 
                                                style={{ objectFit: 'cover' }} 
                                                className='me-2 rounded-circle border border-2 border-light'
                                            /> : <PlaceholderImage
                                                width={40}
                                                height={40}
                                                className='me-2 rounded-circle border border-2 border-light'
                                            />
                                        }
                                        {' '}
                                        {item.levelName}
                                    </div>
                                </td>
                                <td>
                                    <div>{item.minimumDepositAmount.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{item.maximumDepositAmount.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{item.investmentAmount.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{item.cashback.toLocaleString()} %</div>
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
                                {(setIsOpenLevelModal && setIsOpenDeleteLevelModal) && <td>
                                    <div className='row gap-3 w-100'>
                                        <Button
                                            onClick={() => setIsOpenLevelModal({ type: LevelModalType.Edit, selectedRow: item })}
                                            color='light-dark'
                                            className='col'
                                        >
                                            {t('edit')}
                                        </Button>
                                        <Button
                                            onClick={() => setIsOpenDeleteLevelModal({ type: LevelModalType.Delete, selectedRow: item })}
                                            color='light-dark'
                                            className='col'
                                        >
                                            {t('delete')}
                                        </Button>
                                    </div>
                                </td>}
                            </tr>
                        )) : permission.level[PermissionType.Read] === PermissionValue.Unavailable ?
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

export default LevelTable