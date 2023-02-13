import userStore, {UserStore} from "./user.store";
import authStore, {AuthStore} from "./auth/auth.store";
import commonStore, {CommonStore} from "./common.store";
import cartStore, {CartStore} from "./cart.store";
import deliveryStore, {DeliveryStore} from "./delivery.store";
import categoryStore, {CategoryStore} from "./category.store";

export type RootStore = {
    userStore: UserStore;
    commonStore: CommonStore;
    authStore: AuthStore;
    cartStore: CartStore;
    deliveryStore: DeliveryStore;
    categoryStore: CategoryStore;
}

const rootStore: RootStore = {
    authStore,
    commonStore,
    userStore,
    cartStore,
    deliveryStore,
    categoryStore
};

export default rootStore;