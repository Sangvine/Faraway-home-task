import { cast, flow, getEnv, Instance, SnapshotOrInstance, getSnapshot, types } from 'mobx-state-tree';
import { nanoid } from 'nanoid';
import { http } from '../http/http';

export const Character = types
    .model('Character', {
        id: types.identifier,
        name: types.string,
        height: types.string,
        mass: types.string,
        hair_color: types.string,
        skin_color: types.string,
        eye_color: types.string,
        birth_year: types.string,
        gender: types.string,
    })
    .views(self => {
        return {};
    });

export type CharacterModel = SnapshotOrInstance<typeof Character>;

type CharacterRequest = {
    count: number;
} & CharacterModel;

export const CharacterStore = types
    .model('CharacterStore', {
        characters: types.array(Character),
        count: types.maybeNull(types.number),
    })
    .actions(self => {
        const fetchCharacters = flow(function*(params?: any) {
            const response = yield http<CharacterRequest>('https://swapi.dev/api/people/', params);
            setCharacters(response.results);
            self.count = cast(response.count);
        });

        const setCharacters = (characters: CharacterModel[]) => {
            self.characters = cast(characters.map(el => ({ ...el, id: nanoid() })));
        };
        return { fetchCharacters, setCharacters };
    });
