import {action, makeObservable, observable, runInAction, computed} from 'mobx';
import {User} from '../models/user.modal'
import agent from "./agent";

export class UserStore {

    @observable
    currentUser?: User;

    @observable
    loadingUser?: boolean;

    @observable
    updatingUser?: boolean;

    @observable
    updatingUserErrors: any;

    constructor() {
        makeObservable(this);
    }

    @action
    pullUser() {
        this.loadingUser = true;
        return agent.Auth.current()
            .then(( res: any) => runInAction( ()=> {
                    this.currentUser = res.user;
                }))
            .finally(action(() => { this.loadingUser = false; }))
    }

    @action
    forgetUser() {
        this.currentUser = undefined;
    }

    @computed
    get getUser() {
        return this.currentUser;
    }
}

export default new UserStore();