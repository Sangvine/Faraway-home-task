import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider, rootStore } from '../models/RootStore';

import CharacterInfo from './character-info';
import CharacterList from './character-list';

import './App.css';

function App() {
    return (
        <Provider value={rootStore}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<CharacterList />} />
                    <Route path=":characterId" element={<CharacterInfo />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
