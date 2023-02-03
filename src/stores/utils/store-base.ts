import {RootStore} from "../root.store";

export class StoreBase {
    protected rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

}