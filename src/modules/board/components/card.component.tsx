import { FC } from 'react';
import { Badge, Card } from 'antd';
import { Draggable } from 'react-beautiful-dnd';
import style from '../board.style.module.scss';
import { dateTransform } from 'modules/shared/utils/date-transform.util';
import { IIssue } from 'modules/shared/types/github-api.types';

interface IProps extends IIssue {
  index: number;
}

const Cards: FC<IProps> = ({
  comments,
  created_at,
  id,
  number,
  title,
  user,
  index,
}) => {
  return (
    <Draggable draggableId={id.toString(10)} index={index}>
      {({ dragHandleProps, draggableProps, innerRef }) => (
        <li
          className={style.column__item}
          {...dragHandleProps}
          {...draggableProps}
          ref={innerRef}
        >
          <Badge.Ribbon text={user.type}>
            <Card title={title} bordered hoverable>
              <p>
                #{number} opened {dateTransform(created_at)}
              </p>
              <p>
                {user.type} | Comments: {comments}
              </p>
            </Card>
          </Badge.Ribbon>
        </li>
      )}
    </Draggable>
  );
};

export default Cards;
