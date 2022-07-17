import { useEffect } from 'react';
import { useState } from 'react';
import { getSnapshot } from 'mobx-state-tree';
import { observer } from 'mobx-react-lite';
import useMst from '../../hooks/useMst';
import { DependencyList, EffectCallback, useRef } from 'react';
import { CharacterModel } from '../../models/CharactersStore';

import './index.css';
import { Card } from 'antd';

const CharacterInfo: React.FC<CharacterModel> = observer(({ name, birth_year }) => {
    return (
        <Card title={name} className="character" extra={<a href="#">More</a>}>
            <p>{birth_year}</p>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    );
});

export default CharacterInfo;
