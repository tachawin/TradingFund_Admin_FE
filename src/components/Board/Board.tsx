import BoardGroup from './BoardGroup';

interface BoardInterface {
	data: any[]
	setData: any
}

const Board = ({ data, setData }: BoardInterface) => {
	return (
		<div className='board row mx-n4 pb-3 px-3'>
			{data.map((group) => (
				<BoardGroup key={group.id} groups={group} data={data} setData={setData} />
			))}
		</div>
	);
};

export default Board;
