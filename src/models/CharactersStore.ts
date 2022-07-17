import { cast, flow, SnapshotOrInstance, types } from 'mobx-state-tree';
import { http } from '../http/http';
import Loader from './Loader';

export const Character = types.model('Character', {
    id: types.identifierNumber,
    name: types.string,
    height: types.string,
    mass: types.string,
    hair_color: types.string,
    skin_color: types.string,
    eye_color: types.string,
    birth_year: types.string,
    gender: types.string,
    url: types.string,
});

export type CharacterModel = SnapshotOrInstance<typeof Character>;

type CharacterResponse = {
    count: number;
} & CharacterModel;

type CharacterRequest = {
    page?: number;
    search?: string;
};

export const CharacterStore = Loader.named('IpPoolStore')
    .props({
        characters: types.optional(types.array(Character), []),
        count: types.maybeNull(types.number),
    })
    .actions(self => {
        const fetchCharacters = flow(function*({ search, page }: CharacterRequest) {
            self.setLoading(true);
            const response = yield http<CharacterResponse>(
                'https://swapi.dev/api/people/',
                search ? { search, page } : { page }
            );
            setCharacters(response.results);
            self.count = cast(response.count);
            self.setLoading(false);
        });

        const fetchCharacter = flow(function*(id: string) {
            const response = yield http<CharacterRequest>(`https://swapi.dev/api/people/${id}`);
            return response as CharacterModel;
        });

        const setCharacters = (characters: CharacterModel[]) => {
            self.characters = cast(characters.map(el => ({ ...el, id: Number(el.url.split('/').at(-2)) })));
        };
        return { fetchCharacter, fetchCharacters, setCharacters };
    });
