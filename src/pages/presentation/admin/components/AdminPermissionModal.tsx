import React, { ChangeEvent, useEffect, useState } from 'react'
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from 'components/bootstrap/Modal'
import showNotification from 'components/extras/showNotification'
import Button from 'components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import Checks from 'components/bootstrap/forms/Checks'
import { updatePermission } from 'common/apis/admin'
import Spinner from 'components/bootstrap/Spinner'
import { useDispatch } from 'react-redux'
import { updatePermissionById } from 'redux/admin/action'
import { InfoTwoTone } from '@mui/icons-material'

interface Permission {
    [key: string]: string
}

interface AdminPermissionModalInterface {
	id?: string
    name?: string
	permissions: Permission
    isOpen?: boolean
	setIsOpen: any
}

const AdminPermissionModal = ({ id, name, permissions, isOpen, setIsOpen }: AdminPermissionModalInterface) => {
    const { t } = useTranslation(['common', 'admin'])
    const dispatch = useDispatch()
    const [permissionsValue, setPermissionValue] = useState(permissions)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setPermissionValue(permissions)
    }, [permissions])

    const featureTitle: Permission = {
        report: t("report"),
        customer: t("customer"),
        deposit: t("deposit"),
        withdraw: t("withdraw"),
        bank: t("bank"),
        reward: t("reward"),
        credit: t("credit"),  
        chat: t("chat"),
        product: t("product"),
        adminManage: t('admin'),
        level: t('level'),
        systemSetting: t('system.setting'),
    }

    const onSelectCheckbox = (event: ChangeEvent<HTMLInputElement>) => {
        const [featureName, action] = (event.target.id).split('-')
        let permissionToChange = permissionsValue[featureName]
        let newPermissionValue = event.target.checked ? '1' : '0'
        let newPermissionCode = permissionToChange.substring(0, parseInt(action)) + newPermissionValue + permissionToChange.substring(parseInt(action) + 1)

        setPermissionValue({ ...permissionsValue, [featureName]: newPermissionCode })
    }

    const onSubmit = () => {
        id && updatePermission(id, permissionsValue, () => {
            dispatch(updatePermissionById(id, permissionsValue))
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('admin:save.successfully')}</span>
                </span>,
                t('admin:save.admin.successfully', { adminName: name }),
            )
        }, (error) => {
            const { response } = error
            const message = response?.data
            console.log(message)
            showNotification(
                <span className='d-flex align-items-center'>
                    <InfoTwoTone className='me-1' />
                    <span>{t('admin:save.failed')}</span>
                </span>,
                t('admin:save.admin.failed', { adminName: name }),
            )
        }).finally(() => {
            setIsLoading(false)
            setIsOpen(false)
        })
    }

    return (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} size='l' titleId={id} isCentered>
            <ModalHeader setIsOpen={setIsOpen} className='p-4 pb-0'>
                <ModalTitle id={id} className='fw-bolder'>{t('admin:edit.admin.permission', { adminName: name })}</ModalTitle>
            </ModalHeader>
            <ModalBody>
                <table className='table table-modern table-hover'>
                    <thead>
                        <tr>
                            <th className='fw-bold w-25'>{t('features')}</th>
                            <th className='fw-bold text-center'>{t('access')}</th>
                            <th className='fw-bold text-center'>{t('create')}</th>
                            <th className='fw-bold text-center'>{t('update')}</th>
                            <th className='fw-bold text-center'>{t('delete')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {permissionsValue && Object.entries(permissionsValue).map((permission: any, index: number) => {
                            const featureName = permission[0]
                            const permissionCode = permission[1]
                            const readAccess = permissionCode[0]
                            const createAccess = permissionCode[1]
                            const updateAccess = permissionCode[2]
                            const deleteAccess = permissionCode[3]

                            return (
                                <tr key={index}>
                                    <td>
                                        <div className='fw-bold'>{featureTitle[featureName]}</div>
                                    </td>
                                    <td>
                                        <Checks
                                            containerClassName='d-flex justify-content-center'
                                            id={`${featureName}-0`}
                                            onChange={onSelectCheckbox}
                                            checked={Boolean(parseInt(readAccess))}
                                        />
                                    </td>
                                    <td>
                                        <Checks
                                            containerClassName='d-flex justify-content-center'
                                            id={`${featureName}-1`}
                                            onChange={onSelectCheckbox}
                                            checked={Boolean(parseInt(createAccess))}
                                        />
                                    </td>
                                    <td>
                                        <Checks
                                            containerClassName='d-flex justify-content-center'
                                            id={`${featureName}-2`}
                                            onChange={onSelectCheckbox}
                                            checked={Boolean(parseInt(updateAccess))}
                                        />
                                    </td>
                                    <td>
                                        <Checks
                                            containerClassName='d-flex justify-content-center'
                                            id={`${featureName}-3`}
                                            onChange={onSelectCheckbox}
                                            checked={Boolean(parseInt(deleteAccess))}
                                        />
                                    </td>
                                </tr>
                                )
                            }
                        )}
                    </tbody>
                </table>
            </ModalBody>
            <ModalFooter className='pb-4 pt-0'>
                <Button color='info' onClick={onSubmit}>
                    {isLoading ? <Spinner size={16} /> : t('save')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}

export default AdminPermissionModal
