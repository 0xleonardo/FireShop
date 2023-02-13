import {computed, makeObservable, observable} from 'mobx';
import {Category} from "../modals/category.modal";
import {getCategories} from "../utils/api.utils";

const _ = require('lodash');

export class CategoryStore {

    @observable
    categories: Category[] = [];

    constructor() {
        makeObservable(this);

        getCategories().then((res: Category[]) => {
            this.categories = res;
        })
    }

    @computed
    get getCategories() {
        return this.categories;
    }

}

export default new CategoryStore();