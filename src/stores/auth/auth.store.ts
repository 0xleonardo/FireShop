import {action, computed, makeObservable, observable, runInAction} from "mobx";
import {ResponseError} from "superagent";
import commonStore from "../common.store";
import userStore from "../user.store";
import cartStore from "../cart.store";
import agent from "../agent";

export class AuthStore {

    @observable
    inProgress = false;

    @observable
    errors = undefined;


    constructor() {
        makeObservable(this);
    }

    @computed
    get getErrors() {
        return this.errors;
    }


    @action
    login(email: string, password: string) {
        this.inProgress = true;
        this.errors = undefined;
        return agent.Auth.login(email, password)
            .then((req: any) => runInAction(() => {
                commonStore.setToken(req.token)
            }))
            .then(() => runInAction(() => userStore.pullUser()))
            .catch(action((err: ResponseError) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));
    }

    @action
    logout() {
        commonStore.setToken(null);
        userStore.forgetUser();
        cartStore.emptyCart();
        return Promise.resolve();
    }

    @action
    register(name: string, surname: string, email: string, password: string) {
        return agent.Auth.register(name, surname, email, password)
            .catch(action((err: ResponseError) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }));
    }
}

export default new AuthStore();