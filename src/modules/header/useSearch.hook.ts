import { InputRef, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { fetchIssues } from 'modules/redux/boards/boards.thunk';
import { AppDispatch } from 'modules/redux/redux.types';
import { setCurrentBoard } from 'modules/redux/boards/boards.slice';
import { selectBoards } from 'modules/redux/boards/boards.selectors';
import { IInputs } from './header.types';
import { BASE_GITHUB_URL } from '../shared/const/backend.const';

export const useSearch = (ref: React.RefObject<InputRef>) => {
  const [messageApi, contextHolder] = message.useMessage();
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector(selectBoards);

  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<IInputs>();

  const error = () => {
    messageApi.open({
      type: 'error',
      content: `Only "${BASE_GITHUB_URL}..." is allowed!`,
    });
  };

  const onSubmit: SubmitHandler<IInputs> = ({ request }) => {
    const url = request.trim();

    if (!url.includes(`${BASE_GITHUB_URL}`)) {
      return error();
    }

    if (url in boards) {
      dispatch(setCurrentBoard(url));
    } else {
      dispatch(fetchIssues(url));
    }
    reset();
    ref.current?.blur();
  };

  const onBlur = () => {
    clearErrors();
  };

  return {
    handleSubmit,
    contextHolder,
    control,
    errors,
    onSubmit,
    onBlur,
    ref,
  };
};
