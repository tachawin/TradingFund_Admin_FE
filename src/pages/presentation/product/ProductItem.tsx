import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from 'components/bootstrap/Card'
import Button from 'components/bootstrap/Button'
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from 'components/bootstrap/Dropdown'
import Badge from 'components/bootstrap/Badge'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import PlaceholderImage from 'components/extras/PlaceholderImage'
import { PermissionType, PermissionValue } from 'common/apis/user'
import { DeleteTwoTone, EditTwoTone, MoreHoriz } from '@mui/icons-material'

interface ProductItemInterface {
	id?: number | string,
	name: string,
	description?: string,
	points: number,
	remaining: number
	img?: string,
	editAction: any,
	deleteAction: any,
}

const ProductItem = ({
	name,
	img,
	description,
	points,
	remaining,
	editAction,
	deleteAction,
}: ProductItemInterface) => {
	const { t } = useTranslation(['common', 'product'])
	const permission = JSON.parse(localStorage.getItem('features') ?? '')
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
			<CardHeader className='pb-0'>
				<CardLabel style={{ width: '85%' }}>
					<CardTitle className='text-nowrap overflow-hidden text-overflow-ellipsis'>
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
					{(permission.product[PermissionType.Update] === PermissionValue.Available || permission.product[PermissionType.Delete] === PermissionValue.Available) && 
						<Dropdown>
							<DropdownToggle 
								isOpen={Boolean(isOpenDropdown)} 
								setIsOpen={setIsOpenDropdown}						
								color='dark'
								isLight
								icon={MoreHoriz}
								hasIcon={false} 
							/>
							<DropdownMenu
								isOpen={Boolean(isOpenDropdown)} 
								setIsOpen={setIsOpenDropdown}
								isAlignmentEnd
							>
								{permission.product[PermissionType.Update] === PermissionValue.Available && <DropdownItem>
									<Button icon={EditTwoTone} onClick={handleEdit}>
									{t('edit')}
									</Button>
								</DropdownItem>}
								{permission.product[PermissionType.Delete] === PermissionValue.Available && <DropdownItem>
									<Button icon={DeleteTwoTone} onClick={handleDelete}>
										{t('delete')}
									</Button>
								</DropdownItem>}
							</DropdownMenu>
						</Dropdown>
					}
				</CardActions>
			</CardHeader>
			<CardBody>
				<div className='w-100 d-flex align-items-center' style={{ height: 220 }}>{
					img ? <img
						src={img}
						alt=''
						style={{ width: 256, height: 220, objectFit: 'contain' }}
						className='mx-auto d-block img-fluid mb-3'
					/>
					: <PlaceholderImage
						width={256}
						height={220}
						className='mx-auto d-block img-fluid mb-3'
					/>
				}</div>
				<div className='card-description'>{description}</div>
				<div className='row align-items-center mt-2'>
					<div className='col fw-bold'>{t('product:remaining')}</div>
					<div className='col fw-bold text-end'>{remaining.toLocaleString()}</div>
				</div>
			</CardBody>
		</Card>
	)
}

export default ProductItem
