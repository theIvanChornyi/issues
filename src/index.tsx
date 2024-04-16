import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './app.component';
import reportWebVitals from './reportWebVitals';
import ReduxProvider from 'modules/shared/components/store/store.component';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ReduxProvider>
    <App />
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
