import React, { ReactNode, useState } from 'react'
import Card, { CardBody } from 'components/bootstrap/Card'
import useSortableData from 'hooks/useSortableData'
import { useTranslation } from 'react-i18next'
import Icon from 'components/icon/Icon'
import PaginationButtons, { dataPagination, PER_COUNT } from 'components/PaginationButtons'
import Button from 'components/bootstrap/Button'
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from 'components/bootstrap/Dropdown'
import { AdminModalType } from './AdminEditModal'
import { AdminInterface, AdminRole, AdminStatus } from 'common/apis/admin'
import moment from 'moment'

interface AdminTableInterface {
    data: AdminInterface[]
    setIsOpenAdminModal?: (value: { type: AdminModalType, selectedRow: AdminInterface }) => void
    setIsOpenDeleteModal?: (value: { selectedRow: AdminInterface }) => void
    setIsOpenPermissionModal?: (value: { selectedRow: AdminInterface }) => void
    columns?: any
    cardHeader?: ReactNode
}

interface AdminRowAction {
	icon: string,
	onClick: (row: any) => void,
	title: string
}

const AdminTable = ({ 
    data, 
    setIsOpenAdminModal, 
    setIsOpenDeleteModal,
    setIsOpenPermissionModal,
    cardHeader 
}: AdminTableInterface) => {
    const { t } = useTranslation('common')

    const [currentPage, setCurrentPage] = useState(1)
	const [perPage, setPerPage] = useState(PER_COUNT['10'])
    const { items, requestSort, getClassNamesFor } = useSortableData(data)
    const [isOpenDropdown, setIsOpenDropdown] = useState<number | null>(null)

    const ADMIN_ROW_ACTIONS: AdminRowAction[] = [
		{
			icon: 'Edit',
			onClick: (row: AdminInterface) => setIsOpenAdminModal && setIsOpenAdminModal({ 
                type: AdminModalType.Edit, 
                selectedRow: row
            }),
			title: t('edit')
		},
		{
			icon: 'Visibility',
			onClick: (row: AdminInterface) => setIsOpenPermissionModal && setIsOpenPermissionModal({ selectedRow: row }),
			title: t('admin:grant.permission')
		},
		{
			icon: 'Delete',
			onClick: (row: AdminInterface) => setIsOpenDeleteModal && setIsOpenDeleteModal({ selectedRow: row }),
			title: t('delete')
		}
	]


	const handleOnDropdownClick = (onClick: any, data: AdminInterface) => {
		setIsOpenDropdown(null)
		onClick(data)
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
                                onClick={() => requestSort('username')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.username')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('username')}
                                    icon='FilterList'
                                />
                            </th>
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
                            <th>{t('column.mobile.number')}</th>
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
                                onClick={() => requestSort('status')}
                                className='cursor-pointer text-decoration-underline'>
                                {t('column.status')}{' '}
                                <Icon
                                    size='lg'
                                    className={getClassNamesFor('status')}
                                    icon='FilterList'
                                />
                            </th>
                            <td />
                        </tr>
                    </thead>
                    <tbody>
                        {dataPagination(items, currentPage, perPage).map((admin: AdminInterface, index: number) => (
                            <tr key={admin.adminId}>
                                <td className='text-center'>
                                    <div>{index + 1}</div>
                                </td>
                                <td>
                                    <div>{admin.username}</div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        <div className='flex-grow-1'>
                                            <div className='fs-6 fw-bold'>
                                                {admin.name}
                                            </div>
                                            <div className='text-muted'>
                                                <Icon icon='Label' />{' '}
                                                <small>
                                                    {admin.role === AdminRole.SuperAdmin ? t('admin:super.admin') : t('admin:admin') }
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div>{admin.mobileNumber}</div>
                                </td>
                                <td>
                                    <div>{moment(admin.updatedAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(admin.updatedAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div>{moment(admin.createdAt).format('ll')}</div>
                                    <div>
                                        <small className='text-muted'>
                                            {moment(admin.createdAt).fromNow()}
                                        </small>
                                    </div>
                                </td>
                                <td>
                                    <div className='d-flex align-items-center'>
                                        { admin.status === AdminStatus.Active ?
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
                                <td>
                                    <Dropdown>
                                        <DropdownToggle 
                                            hasIcon={false} 
                                            isOpen={Boolean(isOpenDropdown)} 
                                            setIsOpen={setIsOpenDropdown}
                                            index={index}
                                            icon='MoreHoriz'
                                            color='dark'
                                            isLight
                                        />
                                        <DropdownMenu isAlignmentEnd isOpen={isOpenDropdown === index} setIsOpen={setIsOpenDropdown}>
                                            {ADMIN_ROW_ACTIONS.map((action: AdminRowAction, index: number) => 
                                                <DropdownItem key={index}>
                                                    <Button
                                                        icon={action.icon}
                                                        onClick={() => handleOnDropdownClick(action.onClick, admin)}
                                                    >
                                                        {action.title}
                                                    </Button>
                                                </DropdownItem>
                                            )}
                                            
                                        </DropdownMenu>
                                    </Dropdown>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
            <PaginationButtons
                data={data}
                label={t('admin')}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                perPage={perPage}
                setPerPage={setPerPage}
            />
        </Card>
    )
}

export default AdminTable