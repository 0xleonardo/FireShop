import agent from "./agent";
import {ResponseError} from "superagent";

export const getCategories = () => {
    return agent.Category.get()
        .catch((err: ResponseError) => {
            throw err;
        });
}
