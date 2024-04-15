import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from 'modules/redux/store.config';
interface IProps {
	children?: JSX.Element | string | JSX.Element[];
}

const ReduxProvider: FC<IProps> = ({ children }) => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
};

export default ReduxProvider;
