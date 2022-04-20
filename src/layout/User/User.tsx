import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import USERS from '../../common/data/userDummyData'
import { pages } from '../../menu'
import { DropdownItem, DropdownMenu } from '../../components/bootstrap/Dropdown'
import Button from '../../components/bootstrap/Button'
import Icon from '../../components/icon/Icon'
import { useTranslation } from 'react-i18next'
import { didLogout } from 'common/utils/auth'
import { logout } from 'common/apis/auth'
import showNotification from 'components/extras/showNotification'

const User = () => {
	const { t } = useTranslation('login')
	const navigate = useNavigate()

	const [collapseStatus, setCollapseStatus] = useState(false)
	
	const handleLogout = () => {
		setCollapseStatus(false)
		didLogout()
		navigate(`/${pages.login.path}`)
		// logout().then(() => {
		// 	didLogout()
		// 	navigate(`/${pages.login.path}`)
		// }).catch(() => {
		// 	showNotification(
		// 		<span className='d-flex align-items-center'>
		// 			<Icon icon='Info' size='lg' className='me-1' />
		// 			<span>{t('logout.failed')}</span>
		// 		</span>,
		// 		t('please.try.again'),
		// 	)
		// }).finally(() => setCollapseStatus(false))
	}

	return (
		<>
			<div
				className={classNames('user', { open: collapseStatus })}
				role='presentation'
				onClick={() => setCollapseStatus(!collapseStatus)}>
				<div className='user-avatar'>
					<img
						srcSet={USERS[1].srcSet}
						src={USERS[1].src}
						alt='Avatar'
						width={128}
						height={128}
					/>
				</div>
				<div className='user-info'>
					<div className='user-name d-flex align-items-center'>
						{`${USERS[1].name} ${USERS[1].surname}`}
						<Icon icon='Verified' className='ms-1' color='info' />
					</div>
					<div className='user-sub-title'>{USERS[1].position}</div>
				</div>
			</div>
			<DropdownMenu isOpen={collapseStatus} setIsOpen={setCollapseStatus}>
				<DropdownItem>
					<Button
						icon='AccountBox'
						onClick={handleLogout}
					>
						{t('logout')}
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						icon='AccountBox'
						onClick={() => navigate('/settings')}
					>
						{t('settings')}
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</>
	)
}

export default User
