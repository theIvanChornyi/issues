import { DropResult } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import {
	reorderBetweenCol,
	reorderInsideCol,
} from 'modules/redux/boards/boards.slice';
import { IColumns } from 'modules/redux/boards/boards.types';
import { IIssue } from 'modules/shared/types/github-api.types';

export const useDnD = (boards: IColumns) => {
	const dispatch = useDispatch();
	const onDragEnd = ({ destination, source }: DropResult) => {
		if (!destination) {
			return;
		}
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return;
		}

		const startColumn = boards[source.droppableId];
		const finishColumn = boards[destination.droppableId];

		const newStartCardsArr: IIssue[] = Array.from(startColumn.issues);
		const deleted = newStartCardsArr.splice(source.index, 1);

		if (startColumn === finishColumn) {
			newStartCardsArr.splice(destination.index, 0, ...deleted);
			return dispatch(
				reorderInsideCol({ issues: newStartCardsArr, title: source.droppableId })
			);
		}

		const newFinishIds: IIssue[] = Array.from(finishColumn.issues);
		newFinishIds.splice(destination.index, 0, ...deleted);

		dispatch(
			reorderBetweenCol([
				{ title: source.droppableId, issues: newStartCardsArr },
				{ title: destination.droppableId, issues: newFinishIds },
			])
		);
	};

	return { onDragEnd };
};
