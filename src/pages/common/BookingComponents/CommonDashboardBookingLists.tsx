import { useState } from 'react';
import Card, { CardActions, CardBody, CardHeader } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import CommonEmployeesList from './CommonEmployeesList';
import CommonServicesList from './CommonServicesList';
import CommonPackagesList from './CommonPackagesList';

interface ListTabInterface {
	EMPLOYEES: string
	SERVICE: string
	PACKAGE: string
}

const CommonDashboardBookingLists = () => {
	// BEGIN :: List Tab
	const LIST_TAB: ListTabInterface = {
		EMPLOYEES: 'Employees',
		SERVICE: 'Services',
		PACKAGE: 'Packages',
	};
	const [activeListTab, setActiveListTab] = useState(LIST_TAB.EMPLOYEES);
	const handleActiveListTab = (tabName: string) => {
		setActiveListTab(tabName);
	};
	const getStatusActiveListTabColor = (tabName: string): string => {
		if (activeListTab === tabName) return 'success';
		return 'light';
	};
	// END :: List Tab

	return (
		<Card>
			<CardHeader>
				<CardActions>
					<div className='bg-light p-2 rounded-3'>
						{Object.values(LIST_TAB).map((value: string) => (
							<Button
								key={value}
								color={getStatusActiveListTabColor(value)}
								onClick={() => handleActiveListTab(value)}>
								{value}
							</Button>
						))}
					</div>
				</CardActions>
			</CardHeader>
			<CardBody className='table-responsive'>
				{activeListTab === LIST_TAB.EMPLOYEES && <CommonEmployeesList />}
				{activeListTab === LIST_TAB.SERVICE && <CommonServicesList />}
				{activeListTab === LIST_TAB.PACKAGE && <CommonPackagesList />}
			</CardBody>
		</Card>
	);
};

export default CommonDashboardBookingLists;
