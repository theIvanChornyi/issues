import { FC } from 'react';
import { useSelector } from 'react-redux';
import Controls from './components/header-controls.component';
import SearchBar from './components/header-search.component';
import { selectCurrentRepoUrl } from '../redux/boards/boards.selectors';

const Header: FC = () => {
	const curRepo = useSelector(selectCurrentRepoUrl);
	return (
		<header data-testid="header">
			<SearchBar />
			{curRepo && <Controls />}
		</header>
	);
};

export default Header;
