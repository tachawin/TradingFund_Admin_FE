import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import { useSelector } from 'react-redux'
import { selectPermission } from 'redux/user/selector'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { FilterList, StarRounded } from '@mui/icons-material'

interface LevelTableInterface {
    data: any
    setIsOpenLevelModal?: (value: { type: string, selectedRow: any }) => void
    setIsOpenDeleteLevelModal?: (value: { type: string, selectedRow: any }) => void
    columns?: any
    cardHeader?: ReactNode
}

enum Level {
    Platinum = 'platinum',
    Gold = 'gold',
    Silver = 'silver',
    Bronze = 'bronze',
    Standard = 'standard'
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
        <Card stretch className='mx-3'>
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
                        {items.length > 0 ? dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
                            <tr key={i.id}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>
                                        <StarRounded htmlColor={i.id === Level.Gold ? 'warning' 
                                            : i.id === Level.Silver ? 'light' 
                                            : i.id === Level.Platinum ? 'primary' 
                                            : i.id === Level.Bronze ? 'danger' : 'secondary' } />{' '}
                                        {i.levelName}
                                    </div>
                                </td>
                                <td>
                                    <div>{i.minimumDeposit.toLocaleString()}</div>
                                </td>
                                <td>
                                    <div>{i.createdAtDate.format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {i.createdAtDate.fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div>{i.updatedAtDate.format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {i.updatedAtDate.fromNow()}
                                        </small>
                                    </div>
                                </td>
                                {(setIsOpenLevelModal && setIsOpenDeleteLevelModal) && <td>
                                    <Button
                                        onClick={() => setIsOpenLevelModal({ type: "edit", selectedRow: i})}
                                        className='p-0'
                                        isLight
                                    >
                                        {t('edit')}
                                    </Button> / <Button
                                        onClick={() => setIsOpenDeleteLevelModal({ type: "delete", selectedRow: i })}
                                        className='p-0'
                                        isLight
                                    >
                                        {t('delete')}
                                    </Button>
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