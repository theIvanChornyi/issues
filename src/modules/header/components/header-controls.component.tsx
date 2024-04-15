import { FC } from 'react';
import { Breadcrumb, Button, Popconfirm } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import style from '../header.style.module.scss';
import Stars from './stars.component';
import { closeBoard, deleteBoard } from 'modules/redux/boards/boards.slice';
import GithubApi from 'modules/shared/services/github-api.service';
import {
	selectCurrentBoardStars,
	selectCurrentRepoUrl,
} from 'modules/redux/boards/boards.selectors';
import BreadcrumbLink from './header-breadcrumb-link.component';

const Controls: FC = () => {
	const curRepo = useSelector(selectCurrentRepoUrl);
  const stars = useSelector(selectCurrentBoardStars);
  
	const dispatch = useDispatch();
	const { owner, repoName } = GithubApi.parseRepoURI(curRepo);

	const onHandleClose = () => {
		dispatch(closeBoard());
	};

	const handleDelete = () => {
		dispatch(deleteBoard(curRepo));
	};

	const items = [
		{
			title: <BreadcrumbLink title={owner} link={owner} />,
		},
		{
			title: <BreadcrumbLink title={repoName} link={`${owner}/${repoName}`} />,
		},
	];

	return (
		<div className={style.controls} data-testid="repo-controls">
			<div className={style.wrapper}>
				<Breadcrumb separator=">" items={items}></Breadcrumb>
				<Stars starsCount={stars} />
			</div>
			<div className={style.buttons}>
				<Popconfirm
					title="Delete this repo from history"
					description="Are you sure to delete this repo from history?"
					onConfirm={handleDelete}
					okText="Yes"
					cancelText="No"
				>
					<Button type="primary">Delete</Button>
				</Popconfirm>
				<Popconfirm
					title="Close these issues"
					description="Are you sure to close these issues?"
					onConfirm={onHandleClose}
					okText="Yes"
					cancelText="No"
				>
					<Button type="primary">Close</Button>
				</Popconfirm>
			</div>
		</div>
	);
};

export default Controls;
