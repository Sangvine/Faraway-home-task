import React from 'react';
import { types, Instance } from 'mobx-state-tree';

import { CharacterStore } from './CharactersStore';

export const RootStore = types.model('RootStore', {
    charactersStore: types.optional(CharacterStore, {}),
});

export type RootInstance = Instance<typeof RootStore>;
export const RootStoreContext = React.createContext<null | RootInstance>(null);
export const Provider = RootStoreContext.Provider;
export const rootStore = RootStore.create({}, {});
