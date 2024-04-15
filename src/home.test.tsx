import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './app.component';
import SearchBar from './modules/header/components/header-search.component';
import ReduxProvider from './modules/shared/components/store/store.component';

function isExistInHomepage(testId: string) {
  render(<ReduxProvider><App /></ReduxProvider>);
  const element = screen.queryByTestId(testId);
  expect(element).toBeInTheDocument();
}

function notExistInHomepage(testId: string) {
  render(<ReduxProvider><App /></ReduxProvider>);
  const element = screen.queryByTestId(testId);
  expect(element).not.toBeInTheDocument();
}

// describe('Initial page', () => {
//   test('Header in page', () => {
//     isExistInHomepage('header')
//   });

//   test('Searchbar exist in page', () => {
//     isExistInHomepage('searchbar')
//   });

//   test('Title exist in page', () => {
//     isExistInHomepage('page-title')
//   });

//   test('Controls not exist in page', () => {
//     notExistInHomepage('repo-controls')
//   });

//   test('Board not exist in page', () => {
//     notExistInHomepage('repo-board')
//   });

//   test('Empty page not exist in page', () => {
//     notExistInHomepage('empty-page')
//   });

//   test('Error not exist in page', () => {
//     notExistInHomepage('error')
//   });
// });

describe('Initial page', () => {
  test('Header in page', async () => {
    render(<ReduxProvider><App/></ReduxProvider>);

    const button = screen.getByRole('button');
    const input = screen.queryByPlaceholderText('Enter repo URL');
    await fireEvent.click(button,);
    console.log('button :>> ', button);
    const newInput = screen.queryByPlaceholderText('This field is required');
    // const newInput = screen.queryByPlaceholderText('Enter repo URL');
    expect(newInput).toBeInTheDocument();
  });
});