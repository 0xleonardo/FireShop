import userStore, {UserStore} from "./user.store";
import authStore, {AuthStore} from "./auth/auth.store";
import commonStore, {CommonStore} from "./common.store";
import cartStore, {CartStore} from "./cart.store";
import deliveryStore, {DeliveryStore} from "./delivery.store";

export type RootStore = {
    authStore: AuthStore;
    commonStore: CommonStore;
    userStore: UserStore;
    cartStore: CartStore;
    deliveryStore: DeliveryStore;
}

const rootStore: RootStore = {
    authStore,
    commonStore,
    userStore,
    cartStore,
    deliveryStore,
};

export default rootStore;