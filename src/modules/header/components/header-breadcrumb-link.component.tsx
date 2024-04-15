import { FC } from 'react';
import { BASE_GITHUB_URL } from 'modules/shared/const/backend.const';
import { capitalize } from 'modules/shared/utils/capitalize.util';

interface IProps {
	link: string;
	title: string;
}

const BreadcrumbLink: FC<IProps> = ({ link, title }) => {
	return (
		<a target="_blank" rel="noreferrer" href={`${BASE_GITHUB_URL}${link}`}>
			{capitalize(title)}
		</a>
	);
};

export default BreadcrumbLink;
