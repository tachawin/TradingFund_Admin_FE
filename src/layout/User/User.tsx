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

const User = () => {
	const { t } = useTranslation('common')
	const navigate = useNavigate()

	const [collapseStatus, setCollapseStatus] = useState(false)
	
	const logout = () => {
		didLogout()
		navigate(`/${pages.login.path}`)
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
						onClick={logout}
					>
						{t('logout')}
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</>
	)
}

export default User
