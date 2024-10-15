import { Provider } from 'react-redux';
import HomePage from './pages/HomePage/HomePage.tsx';
import store from '../src/store';
import './css/index.scss';

function App() {
    return (
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
}

export default App;
