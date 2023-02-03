import userStore, {UserStore} from "./user.store";
import authStore, {AuthStore} from "./auth/auth.store";
import commonStore, {CommonStore} from "./common.store";

export type RootStore = {
    authStore: AuthStore;
    commonStore: CommonStore;
    userStore: UserStore;
}

const rootStore: RootStore = {
    authStore,
    commonStore,
    userStore,
};

export default rootStore;