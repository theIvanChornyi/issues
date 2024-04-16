import { useSelector } from 'react-redux';
import { Empty, Result } from 'antd';

import style from './app.style.module.scss';
import Container from 'modules/shared/components/container/container.component';
import Board from 'modules/board/board.component';
import Header from 'modules/header/header.component';

import {
  selectCurrentRepoUrl,
  selectError,
  selectState,
} from 'modules/redux/boards/boards.selectors';
import { STATE_MACHINE } from 'modules/redux/boards/boards.types';

const App = () => {
  const curRepo = useSelector(selectCurrentRepoUrl);
  const curError = useSelector(selectError);
  const curState = useSelector(selectState);
  return (
    <section className={style.section}>
      <Container>
        <Header />
        {curRepo && <Board />}
        {curState === STATE_MACHINE.IDLE && (
          <h1
            data-testid="page-title"
            className={`${style.title} + " demo-tbody"`}
          >
            Use GitHub repo link
          </h1>
        )}

        {curError.code === 400 && (
          <Empty
            data-testid="empty-page"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )}
        {curError.code === 404 && (
          <div data-testid="wrong-repo-page">
            <Result
              status={curError.code}
              title={curError.code}
              subTitle="Wrong repo URL"
            />
          </div>
        )}
      </Container>
    </section>
  );
};

export default App;
