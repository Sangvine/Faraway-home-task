import { Provider, rootStore } from '../models/RootStore';
import './App.css';
import CharacterList from './character-list';

function App() {
    return (
        <Provider value={rootStore}>
            <CharacterList />
        </Provider>
    );
}

export default App;
