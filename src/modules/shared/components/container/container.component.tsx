import { FC, ReactElement, ReactFragment } from 'react';
import style from './container.style.module.scss';

interface IProps {
	children?:  ReactFragment | ReactElement  ;
}

const Container: FC<IProps> = ({ children }) => {
	return <div className={style.container}>{children}</div>;
};
export default Container;
