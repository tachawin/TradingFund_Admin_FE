import Card, {
	CardActions,
	CardBody,
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
	const { t } = useTranslation(['common', 'product'])
	const [isOpenDropdown, setIsOpenDropdown] = useState<boolean>(false)

	const handleEdit = () => {
		setIsOpenDropdown(false)
		editAction()
	}

	const handleDelete = () => {
		setIsOpenDropdown(false)
		deleteAction()
	}

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle>
						{name}{' '}
					</CardTitle>
					<CardSubTitle>
						{points && (
							<Badge color='success' isLight rounded={3} className='fs-6 fw-bold'>
								{t('product:redeem.points', { points: points.toLocaleString() })}
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
								<Button icon='Edit' onClick={handleEdit}>
								{t('edit')}
								</Button>
							</DropdownItem>
							<DropdownItem>
								<Button icon='Delete' onClick={handleDelete}>
									{t('delete')}
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
				<div className='card-description'>{description}</div>
				<div className='row align-items-center mt-2'>
					<div className='col fw-bold'>{t('product:remaining')}</div>
					<div className='col fw-bold text-end'>{remaining.toLocaleString()}</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default CommonProductItem
