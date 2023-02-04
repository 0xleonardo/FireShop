import agent from "./agent";
import {ResponseError} from "superagent";

export const getCategories = () => {
    return agent.Category.get()
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const isCategoryValid = (name:string) => {
    return agent.Category.isValid(name)
        .catch((err: ResponseError) => {
            throw err;
        });
}


export const getItemsForCategory = (idCategory:number) => {
    return agent.Item.getForCategory(idCategory)
        .catch((err: ResponseError) => {
            throw err;
        });
}

export const getItem = (idItem:string) => {
    return agent.Item.getItem(idItem)
        .catch((err: ResponseError) => {
            throw err;
        });
}

