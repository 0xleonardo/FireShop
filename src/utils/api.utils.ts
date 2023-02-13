import agent from "../stores/agent";
import {ResponseError} from "superagent";
import countriesAgent from "../foreign-api/countries-api";
import {NewOrder, OrderTransaction} from "../modals/order.modal";
import {Item} from "../modals/item.modal";
import {CartItemWithOnlyId} from "../components/UserProfile/OrderModal/order-modal.component";

export const getCategories = () => {
    return agent.Category.get()
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getItemsForCategory = (idCategory: number) => {
    return agent.Item.getForCategory(idCategory)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getItem = (idItem: string) => {
    return agent.Item.getItem(idItem)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getAllItems = () => {
    return agent.Item.getAllItems()
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getItemCategory = (categoryId: number) => {
    return agent.Item.getItemCategory(categoryId)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const editItem = (item: Item) => {
    return agent.Item.editItem(item)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const addItem = (item: Item) => {
    return agent.Item.addItem(item)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const deleteItem = (id: number) => {
    return agent.Item.deleteItem(id)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const itemsBought = (ids: CartItemWithOnlyId[]) => {
    return agent.Item.itemBought(ids)
        .catch((err: ResponseError) => {
            throw err;
        });
}


export const getCountries = () => {
    return countriesAgent.Countries.getAll()
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const makeOrder = (order: NewOrder) => {
    return agent.Order.makeOrder(order)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getOrdersForUser = (userId: number) => {
    return agent.Order.getOrdersForUser(userId)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getOrderItems = (ids: number[]) => {
    return agent.Order.getOrderItems(ids)
        .catch((err: ResponseError) => {
            throw err;
        });
}

