import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import Icon from 'components/icon/Icon'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'

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
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('levelName')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('minimumDeposit')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.minimum.deposit')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('minimumDeposit')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('createdAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.created.at')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('createdAt')}
                                    icon='FilterList'
                                />
                            </th>
                            <th
                                onClick={() => requestSort('updatedAt')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.updated.at')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('updatedAt')}
                                    icon='FilterList'
                                />
                            </th>
                            {setIsOpenLevelModal && <td />}
                        </tr>
                    </thead>
                    <tbody>
                        {dataPagination(items, currentPage, perPage).map((i: any, index: number) => (
                            <tr key={i.id}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>
                                        <Icon icon='StarFill' color={i.id === Level.Gold ? 'warning' 
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

export default LevelTable