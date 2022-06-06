import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import Checks from '../bootstrap/forms/Checks';
import Badge from '../bootstrap/Badge';
import Button from '../bootstrap/Button';
import Dropdown, { DropdownItem, DropdownMenu, DropdownToggle } from '../bootstrap/Dropdown';
import useDarkMode from '../../hooks/useDarkMode';
import { DeleteTwoTone, MoreHoriz } from '@mui/icons-material';

/**
 * Prop Types
 * @type {{list: Requireable<(InferPropsInner<Pick<{date: Requireable<object>, badge: Requireable<InferProps<{color: Requireable<string>, text: Requireable<string>}>>, id: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, title: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, status: Requireable<boolean>}, never>> & Partial<InferPropsInner<Pick<{date: Requireable<object>, badge: Requireable<InferProps<{color: Requireable<string>, text: Requireable<string>}>>, id: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, title: Requireable<NonNullable<InferType<Requireable<string>|Requireable<number>>>>, status: Requireable<boolean>}, "date" | "badge" | "id" | "title" | "status">>>)[]>}}
 */

interface ListInterface {
	id?: number
	status?: boolean
	title?: string | number
	date?: Date
	badge?: {
		text?: string
		color?: string
	}
}

interface TodoItemInterface {
	list: ListInterface[],
	setList: any,
	index: number,
}

export const TodoItem = forwardRef<HTMLDivElement, TodoItemInterface>(({ index, list, setList, ...props }, ref) => {
	const itemData = list[index];

	const handleChange = (_index: number) => {
		const newTodos = [...list];
		newTodos[_index].status = !newTodos[_index].status;
		setList(newTodos);
	};

	const removeTodo = (_index: number) => {
		const newTodos = [...list];
		newTodos.splice(_index, 1);
		setList(newTodos);
	};

	const { themeStatus } = useDarkMode();

	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('todo-item')} {...props}>
			<div className='todo-bar'>
				<div
					className={classNames('h-100 w-100', 'rounded', {
						[`bg-${itemData?.badge?.color}`]: itemData?.badge,
					})}
				/>
			</div>
			<div className='todo-check'>
				<Checks checked={list[index].status} onChange={() => handleChange(index)} />
			</div>
			<div className='todo-content'>
				<div
					className={classNames('todo-title', {
						'text-decoration-line-through': list[index].status,
					})}>
					{itemData.title}
				</div>
				{itemData.date && (
					<div className='todo-subtitle text-muted small'>
						{moment(itemData.date).fromNow()}
					</div>
				)}
			</div>
			<div className='todo-extras'>
				{itemData?.badge && (
					<span className='me-2'>
						<Badge isLight color={itemData.badge.color}>
							{itemData.badge.text}
						</Badge>
					</span>
				)}
				<span>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button color={themeStatus} icon={MoreHoriz} />
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button onClick={() => removeTodo(index)} icon={DeleteTwoTone}>
									Delete
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</span>
			</div>
		</div>
	);
});

interface TodoInterface {
	className?: string,
	list: ListInterface[],
	setList: any,
}

const Todo = forwardRef<HTMLDivElement, TodoInterface>(({ className, list, setList, ...props }, ref) => {
	return (
		// eslint-disable-next-line react/jsx-props-no-spreading
		<div ref={ref} className={classNames('todo', className)} {...props}>
			{list.map((i: ListInterface, index: number) => (
				<TodoItem key={i.id} index={index} list={list} setList={setList} />
			))}
		</div>
	);
});

export default Todo;
