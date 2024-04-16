import { FC } from 'react';
import { StarFilled } from '@ant-design/icons';
import { kCaseTransform } from '../../shared/utils/number-k-case-transform.util';
import style from '../header.style.module.scss';

interface IProps {
  starsCount: number;
}

const Stars: FC<IProps> = ({ starsCount }) => {
  return (
    <div className={style.container}>
      <StarFilled style={{ color: 'gold' }} />
      <p className={style.text}>{kCaseTransform(starsCount ?? 0)}</p>
    </div>
  );
};
export default Stars;
