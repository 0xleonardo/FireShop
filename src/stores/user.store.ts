import {action, computed, makeObservable, observable, runInAction} from 'mobx';
import {User} from '../modals/user.modal'
import agent from "./agent";

export class UserStore {

    @observable
    currentUser?: User;

    @observable
    loadingUser?: boolean;

    constructor() {
        makeObservable(this);
    }

    @computed
    get getUser() {
        return this.currentUser;
    }

    @action
    pullUser() {
        this.loadingUser = true;
        return agent.Auth.current()
            .then((res: any) => runInAction(() => {
                this.currentUser = res.user;
            }))
            .finally(action(() => {
                this.loadingUser = false;
            }))
    }

    @action
    forgetUser() {
        this.currentUser = undefined;
    }
}

export default new UserStore();