import { types } from 'mobx-state-tree';

const Loader = types
    .model('LoaderModel', {
        loading: types.optional(types.boolean, false),
    })
    .actions(self => {
        const setLoading = (loading: boolean) => {
            self.loading = loading;
        };

        return { setLoading };
    });

export default Loader;
