import React from 'react';

import { RootInstance, RootStoreContext } from '../models/RootStore';

const useMst = (): RootInstance => {
    const store = React.useContext(RootStoreContext);

    if (store === null) {
        throw new Error('Store cannot be null, please add a context provider');
    }

    return store;
};

export default useMst;
