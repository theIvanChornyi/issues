import { Controller } from 'react-hook-form';
import { Input, InputRef } from 'antd';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

import { selectState } from 'modules/redux/boards/boards.selectors';
import { STATE_MACHINE } from 'modules/redux/boards/boards.types';
import { useSearch } from '../useSearch.hook';
import { MESSAGES } from '../../shared/const/messages.const';

const SearchBar = () => {
	const state = useSelector(selectState);
	const ref = useRef<InputRef>(null);
	const { handleSubmit, control, errors, onSubmit, onBlur, contextHolder } =
		useSearch(ref);

	const onSearch = (
		_: string,
		e?:
			| React.ChangeEvent<HTMLInputElement>
			| React.MouseEvent<HTMLElement>
			| React.KeyboardEvent<HTMLInputElement>
	) => handleSubmit(onSubmit).apply(e);

	const placeholder = errors.request
		? MESSAGES.FIELD_IS_REQUIRED
		: MESSAGES.ENTER_URL;

	return (
		<div data-testid="searchbar">
			{contextHolder}
      <Controller
        name="request"
				control={control}
				rules={{
					required: true,
        }}
        
				render={({ field }) => (
					<Input.Search
            {...field}
             data-testid="searchbar-iput"
            ref={ref}
            enterButton="Load issues"
						autoComplete="on"
						onSearch={onSearch}
						onBlur={onBlur}
						loading={state === STATE_MACHINE.LOADING}
						placeholder={placeholder}
            status={errors.request && 'error'}
					/>
				)}
			/>
		</div>
	);
};

export default SearchBar;
