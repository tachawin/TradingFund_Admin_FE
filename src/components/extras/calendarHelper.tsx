import { View, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/th'
import Button, { ButtonGroup } from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import { CalendarViewDayTwoTone, CalendarViewMonthTwoTone, CalendarViewWeekTwoTone, ChevronLeft, ChevronRight, ViewAgendaTwoTone, ViewWeekTwoTone } from '@mui/icons-material';

export const getUnitType = (viewMode: View) => {
	let unitType = null;
	switch (viewMode) {
		case Views.WEEK:
		case Views.WORK_WEEK:
			unitType = Views.WEEK;
			break;
		case Views.MONTH:
		case Views.AGENDA:
			unitType = Views.MONTH;
			break;
		default:
			unitType = Views.DAY;
	}
	return unitType;
};

export const getLabel = (date: Date, viewMode: View) => {
	if (viewMode === Views.MONTH) return moment(date).format('MMMM YYYY');
	if (viewMode === Views.WEEK)
		return `${moment(date).startOf('week').format('MMM D')} - ${moment(date)
			.endOf('week')
			.format('MMM D')}`;
	if (viewMode === Views.WORK_WEEK)
		return `${moment(date).startOf('week').add(1, 'day').format('MMM D')} - ${moment(date)
			.endOf('week')
			.add(-1, 'day')
			.format('MMM D')}`;
	if (viewMode === Views.AGENDA)
		return `${moment(date).format('L')} - ${moment(date).add(1, 'month').format('L')}`;
	return moment(date).locale('th').format('dddd, MMM D');
};

export const getTodayButtonLabel = (viewMode: View) => {
	if (viewMode === Views.MONTH || viewMode === Views.AGENDA) return 'This month';
	if (viewMode === Views.WEEK || viewMode === Views.WORK_WEEK) return 'This week';
	return 'Today';
};

export const getViews = () => {
	return Object.values(Views).map((view: View) => view);
};

interface CalendarTodayButtonInterface {
	setDate: any,
	date: Date,
	unitType: string,
	viewMode: View,
}

export const CalendarTodayButton = ({ setDate, date, unitType, viewMode }: CalendarTodayButtonInterface) => {
	return (
		<ButtonGroup>
			<Button
				color='info'
				isLight
				onClick={() => setDate(moment(date).subtract(1, 'day').toDate())}
				icon={ChevronLeft}
				aria-label='Prev'
			/>
			<Button color='info' isLight onClick={() => setDate(moment().toDate())}>
				{getTodayButtonLabel(viewMode)}
			</Button>
			<Button
				color='info'
				isLight
				onClick={() => setDate(moment(date).add(1, 'day').toDate())}
				icon={ChevronRight}
				aria-label='Next'
			/>
		</ButtonGroup>
	);
};

interface CalendarViewModeButtonsInterface {
	viewMode: string,
	setViewMode: any,
};

export const CalendarViewModeButtons = ({ viewMode, setViewMode }: CalendarViewModeButtonsInterface) => {
	return (
		<Dropdown>
			<DropdownToggle>
				<Button
					color='primary'
					isLight
					icon={
						(viewMode === Views.MONTH && CalendarViewMonthTwoTone) ||
						(viewMode === Views.WEEK && CalendarViewWeekTwoTone) ||
						(viewMode === Views.WORK_WEEK && ViewWeekTwoTone) ||
						(viewMode === Views.DAY && CalendarViewDayTwoTone) ||
						ViewAgendaTwoTone
					}>
					{(viewMode === Views.MONTH && 'Month') ||
						(viewMode === Views.WEEK && 'Week') ||
						(viewMode === Views.WORK_WEEK && 'Work Week') ||
						(viewMode === Views.DAY && 'Day') ||
						'Agenda'}
				</Button>
			</DropdownToggle>
			<DropdownMenu isAlignmentEnd>
				<DropdownItem>
					<Button
						color='link'
						icon={CalendarViewMonthTwoTone}
						isActive={viewMode === Views.MONTH}
						onClick={() => setViewMode(Views.MONTH)}>
						Month
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						color='link'
						icon={CalendarViewWeekTwoTone}
						isActive={viewMode === Views.WEEK}
						onClick={() => setViewMode(Views.WEEK)}>
						Week
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						color='link'
						icon={ViewWeekTwoTone}
						isActive={viewMode === Views.WORK_WEEK}
						onClick={() => setViewMode(Views.WORK_WEEK)}>
						Work Week
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						color='link'
						icon={CalendarViewDayTwoTone}
						isActive={viewMode === Views.DAY}
						onClick={() => setViewMode(Views.DAY)}>
						Day
					</Button>
				</DropdownItem>
				<DropdownItem>
					<Button
						color='link'
						icon={ViewAgendaTwoTone}
						isActive={viewMode === Views.AGENDA}
						onClick={() => setViewMode(Views.AGENDA)}>
						Agenda
					</Button>
				</DropdownItem>
			</DropdownMenu>
		</Dropdown>
	);
};
