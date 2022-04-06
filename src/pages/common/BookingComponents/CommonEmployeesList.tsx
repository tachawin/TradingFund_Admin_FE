import { useState } from 'react';
import classNames from 'classnames';
import { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import Progress from '../../../components/bootstrap/Progress';
import useSortableData from '../../../hooks/useSortableData';
import USERS from '../../../common/data/userDummyData';

const CommonEmployeesList = () => {
	const dataEmployees = [
		{
			id: 1,
			name: `${USERS[0].name} ${USERS[0].surname}`,
			ofAppointments: 3,
			sumOfPayments: 48,
			ofHoursInAppointment: 4,
			ofLoad: 34,
			color: USERS[0].color,
			img: USERS[0].src,
			imgWebp: USERS[0].srcSet,
		},
		{
			id: 2,
			name: `${USERS[1].name} ${USERS[1].surname}`,
			ofAppointments: 3,
			sumOfPayments: 32,
			ofHoursInAppointment: 3,
			ofLoad: 23,
			color: USERS[1].color,
			img: USERS[1].src,
			imgWebp: USERS[1].srcSet,
		},
		{
			id: 3,
			name: `${USERS[2].name} ${USERS[2].surname}`,
			ofAppointments: 3,
			sumOfPayments: 56,
			ofHoursInAppointment: 5,
			ofLoad: 78,
			color: USERS[2].color,
			img: USERS[2].src,
			imgWebp: USERS[2].srcSet,
		},
		{
			id: 4,
			name: `${USERS[3].name} ${USERS[3].surname}`,
			ofAppointments: 3,
			sumOfPayments: 72,
			ofHoursInAppointment: 3,
			ofLoad: 56,
			color: USERS[3].color,
			img: USERS[3].src,
			imgWebp: USERS[3].srcSet,
		}
	];

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	const { items, requestSort, getClassNamesFor } = useSortableData(dataEmployees);

	return (
		<>
			<CardBody className='table-responsive'>
				<table className='table table-modern table-hover'>
					<thead>
						<tr>
							<th
								onClick={() => requestSort('name')}
								className='cursor-pointer text-decoration-underline'>
								Employee{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('name')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('ofAppointments')}
								className='cursor-pointer text-decoration-underline'>
								# of appointments{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('ofAppointments')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('sumOfPayments')}
								className='cursor-pointer text-decoration-underline'>
								Sum of payments{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('sumOfPayments')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('ofHoursInAppointment')}
								className='cursor-pointer text-decoration-underline'>
								# of Hours in appointment{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('ofHoursInAppointment')}
									icon='FilterList'
								/>
							</th>
							<th
								onClick={() => requestSort('ofLoad')}
								style={{
									minWidth: 100,
								}}
								className='cursor-pointer text-decoration-underline'>
								% of load{' '}
								<Icon
									size='lg'
									className={getClassNamesFor('ofLoad')}
									icon='FilterList'
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						{dataPagination(items, currentPage, perPage).map((item: any) => (
							<tr key={item.id}>
								<td>
									<div className='d-flex'>
										<div className='flex-shrink-0'>
											<img
												srcSet={item.imgWebp}
												src={item.img}
												alt={item.name}
												width='54'
												height='54'
												className={classNames(
													`bg-l25-${item.color}`,
													'rounded-circle',
												)}
											/>
										</div>
										<div className='flex-grow-1 ms-3 d-flex align-items-center'>
											{item.name}
										</div>
									</div>
								</td>
								<td>{item.ofAppointments}</td>
								<td>{item.sumOfPayments}</td>
								<td>{item.ofHoursInAppointment}</td>
								<td>
									<div className='d-flex align-items-center'>
										<div className='flex-shrink-0 me-3'>
											{`${item.ofLoad}%`}
										</div>
										<Progress
											className='flex-grow-1'
											isAutoColor
											value={item.ofLoad}
											customStyle={{
												height: 5,
											}}
										/>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</CardBody>
			<PaginationButtons
				data={items}
				label='items'
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				perPage={perPage}
				setPerPage={setPerPage}
			/>
		</>
	);
};

export default CommonEmployeesList;
