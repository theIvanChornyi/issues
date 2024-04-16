import { render, screen } from '@testing-library/react';
import App from './app.component';
import ReduxProvider from './modules/shared/components/store/store.component';
import {
  IBoardsState,
  STATE_MACHINE,
} from './modules/redux/boards/boards.types';
import TestStore from './modules/shared/components/store/tests-store.component';

function isExistInHomepage(testId: string) {
  render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
  const element = screen.queryByTestId(testId);
  expect(element).toBeInTheDocument();
}

function notExistInHomepage(testId: string) {
  render(
    <ReduxProvider>
      <App />
    </ReduxProvider>
  );
  const element = screen.queryByTestId(testId);
  expect(element).not.toBeInTheDocument();
}

describe('Initial page', () => {
  test('Header in page', () => {
    isExistInHomepage('header')
  });

  test('Searchbar exist in page', () => {
    isExistInHomepage('searchbar')
  });

  test('Title exist in page', () => {
    isExistInHomepage('page-title')
  });

  test('Controls not exist in page', () => {
    notExistInHomepage('repo-controls')
  });

  test('Board not exist in page', () => {
    notExistInHomepage('repo-board')
  });

  test('Empty page not exist in page', () => {
    notExistInHomepage('empty-page')
  });

  test('Error not exist in page', () => {
    notExistInHomepage('error')
  });
});

describe('Errors', () => {
  test('Show empty page', () => {
    const store: IBoardsState = {
      currentBoard: '',
      repos: {},
      state: STATE_MACHINE.REJECTED,
      error: { code: 400, message: '' },
    };
    render(
      <TestStore store={store}>
        <App />
      </TestStore>
    );
    expect(screen.getByTestId('empty-page')).toBeInTheDocument();
    expect(screen.queryByTestId('page-title')).not.toBeInTheDocument();
  });
  test('Show wrong repo page', () => {
    const store: IBoardsState = {
      currentBoard: '',
      repos: {},
      state: STATE_MACHINE.REJECTED,
      error: { code: 404, message: '' },
    };
    render(
      <TestStore store={store}>
        <App />
      </TestStore>
    );
    expect(screen.getByTestId('wrong-repo-page')).toBeInTheDocument();
    expect(screen.queryByTestId('empty-page')).not.toBeInTheDocument();
    expect(screen.queryByTestId('page-title')).not.toBeInTheDocument();
  });
});