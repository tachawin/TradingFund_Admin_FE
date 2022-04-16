import Card, {
	CardActions,
	CardBody,
	CardFooter,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card'
import Button from '../../components/bootstrap/Button'
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown'
import Badge from '../../components/bootstrap/Badge'
import showNotification from '../../components/extras/showNotification'
import Icon from '../../components/icon/Icon'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

interface CommonProductItemInterface {
	id: number | string,
	name: string,
	description: string,
	points: number,
	remaining: number
	img: string,
	editAction: any,
	deleteAction: any,
}

const CommonProductItem = ({
	name,
	img,
	description,
	points,
	remaining,
	editAction,
	deleteAction,
}: CommonProductItemInterface) => {
	const { t } = useTranslation('common')
	const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle>
						{name}{' '}
					</CardTitle>
					<CardSubTitle>
						{points && (
							<Badge color='success' isLight rounded={3} className='fs-6 fw-normal'>
								{t('redeem.points', { points })}
							</Badge>
						)}
					</CardSubTitle>
				</CardLabel>
				<CardActions>
					<Dropdown>
						<DropdownToggle 
							isOpen={Boolean(isOpenDropdown)} 
							setIsOpen={setIsOpenDropdown}						
							color='dark'
							isLight
							icon='MoreHoriz' 
							hasIcon={false} 
						/>
						<DropdownMenu
							isOpen={Boolean(isOpenDropdown)} 
							setIsOpen={setIsOpenDropdown}
							isAlignmentEnd
						>
							<DropdownItem>
								<Button icon='Edit' onClick={() => editAction()}>
									Edit
								</Button>
							</DropdownItem>
							<DropdownItem>
								<Button icon='Delete' onClick={() => deleteAction()}>
									Delete
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody>
				<img
					src={img}
					alt=''
					width={128}
					height={128}
					className='mx-auto d-block img-fluid mb-3'
				/>
				<div>{description}</div>
				<div className='row align-items-center'>
					<div className='col fw-bold'>{t('remaining')}</div>
					<div className='col fw-bold text-end'>{remaining}</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default CommonProductItem
