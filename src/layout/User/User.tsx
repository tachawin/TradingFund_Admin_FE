import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import { pages } from '../../menu'
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown'
import Button from '../../components/bootstrap/Button'
import { useTranslation } from 'react-i18next'
import { didLogout } from 'common/utils/auth'
import { logout } from 'common/apis/auth'
import showNotification from 'components/extras/showNotification'
import { ExitToAppTwoTone, InfoTwoTone, SettingsApplicationsTwoTone } from '@mui/icons-material'

const User = () => {
	const { t } = useTranslation(['common', 'login'])
	const navigate = useNavigate()

	const [collapseStatus, setCollapseStatus] = useState(false)
	const [user, setUser] = useState({
		name: '',
		role: ''
	})

	const roleToString: { [key: string]: string } = {
		admin: 'Admin',
		super_admin: 'Super Admin'
	}
	
	const handleLogout = () => {
		logout(() => {
			didLogout()
			setCollapseStatus(false)
			navigate(`/${pages.login.path}`)
		}, () => {
			showNotification(
				<span className='d-flex align-items-center'>
					<InfoTwoTone className='me-1' />
					<span>{t('login:logout.failed')}</span>
				</span>,
				t('please.try.again'),
			)
		}).finally(() => setCollapseStatus(false))
	}

	useEffect(() => {
		const name = localStorage.getItem('name') ?? ''
		const role = localStorage.getItem('role') ?? ''
		setUser({ name, role })
	}, [])

	return (
		<div>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-info'>
					<div className='user-name d-flex align-items-center'>
						{user.name}
					</div>
					<div className='user-sub-title'>{roleToString[user.role]}</div>
				</div>
			</div>
			<DropdownMenu isOpen={collapseStatus} setIsOpen={setCollapseStatus} isAlignmentEnd>
				<DropdownItem>
					<Button
						icon={SettingsApplicationsTwoTone}
						onClick={() => navigate('/settings')}
					>
						{t('settings')}
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						icon={ExitToAppTwoTone}
						onClick={handleLogout}
					>
						{t('login:logout')}
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</div>
	)
}

export default User
