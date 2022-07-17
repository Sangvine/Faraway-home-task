import { useEffect, useState } from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import { Card } from 'antd';
import { Link, useParams } from 'react-router-dom';

import useMst from '../../hooks/useMst';
import { CharacterModel } from '../../models/CharactersStore';

import './index.css';

const CharacterInfo: React.FC = observer(() => {
    const [characterInfo, setCharacterInfo] = useState<CharacterModel>();

    const { characterId } = useParams();

    const {
        charactersStore: { fetchCharacter, characters },
    } = useMst();

    useEffect(() => {
        if (!characterId) return;
        const storeCharacher = getSnapshot(characters).find(el => el.id === Number(characterId));

        if (storeCharacher) setCharacterInfo(storeCharacher);
        else {
            void fetchCharacter(characterId).then(character => setCharacterInfo(character));
        }
    }, []);

    return (
        <Card title={characterInfo?.name} className="character" extra={<Link to="/">Back</Link>}>
            <strong>Birth year</strong>
            <p>{characterInfo?.birth_year}</p>
            <strong>Height</strong>
            <p>{characterInfo?.height}</p>
            <strong>Eye color</strong>
            <p>{characterInfo?.eye_color}</p>
            <strong>Gender</strong>
            <p>{characterInfo?.gender}</p>
            <strong>Mass</strong>
            <p>{characterInfo?.mass}</p>
            <strong>Skin color</strong>
            <p>{characterInfo?.skin_color}</p>
        </Card>
    );
});

export default CharacterInfo;
