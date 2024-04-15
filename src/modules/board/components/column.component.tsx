import { Col } from 'antd';
import { FC } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import style from '../board.style.module.scss';
import Card from './card.component';
import { IIssue } from '../../../modules/shared/types/github-api.types';

interface IProps {
	title: string;
	items: Array<IIssue>;
}

const Column: FC<IProps> = ({ items, title }) => {
	const cards = items.map((card, index) => (
		<Card {...card} index={index} key={card.id} />
	));

	return (
		<Col span={8}>
			<h2 className={style.column__title}>{title}</h2>
			<Droppable droppableId={title}>
				{provided => (
					<ul
						className={style.column__list}
						ref={provided.innerRef}
						{...provided.droppableProps}
					>
						{cards}
						{provided.placeholder}
					</ul>
				)}
			</Droppable>
		</Col>
	);
};

export default Column;
