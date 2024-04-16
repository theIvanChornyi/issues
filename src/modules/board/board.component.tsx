import { Row } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import { useSelector } from 'react-redux';

import { selectCurrentBoard } from 'modules/redux/boards/boards.selectors';
import Column from './components/column.component';
import { useDnD } from './useDnD.hook';

const Board = () => {
	const board = useSelector(selectCurrentBoard);
  const { onDragEnd } = useDnD(board);
  
  console.log('board :>> ', board);

  const columns = Object.keys(board).map(key => {
		const { title, issues } = board[key];
		return <Column title={title} items={issues} key={title} />;
	});

	return (
		<Row data-testid="repo-board" justify="space-between" align="stretch" gutter={16}>
			<DragDropContext onDragEnd={onDragEnd}>{columns}</DragDropContext>
		</Row>
	);
};

export default Board;
