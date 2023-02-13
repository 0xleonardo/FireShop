import superagentPromise from 'superagent-promise';
import _superagent, {Request, Response, ResponseError} from 'superagent';
import commonStore from "./common.store";
import authStore from "./auth/auth.store";
import {NewOrder, OrderTransaction} from "../modals/order.modal";
import {Item} from "../modals/item.modal";
import {CartItemWithOnlyId} from "../components/UserProfile/OrderModal/order-modal.component";

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8081/api';

const encode = encodeURIComponent;

const handleErrors = (err: ResponseError) => {
    if (err && err.response && err.response.status === 401) {
        authStore.logout();
    }
    return err;
};

const responseBody = (res: Response) => res.body;

const tokenPlugin = (req: Request) => {
    if (commonStore.token) {
        req.set('authorization', `${commonStore.token}`);
    }
};

const requests = {
    del: (url: string) =>
        superagent
            .del(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    get: (url: string) =>
        superagent
            .get(`${API_ROOT}${url}`)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    put: (url: string, body: any) =>
        superagent
            .put(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
    post: (url: string, body: any) =>
        superagent
            .post(`${API_ROOT}${url}`, body)
            .use(tokenPlugin)
            .end(handleErrors)
            .then(responseBody),
};

const Auth = {
    current: () =>
        requests.get('/user/me'),
    login: (email: string, password: string) =>
        requests.post('/user/login', {email: email, password: password}),
    register: (name: string, surname: string, email: string, password: string) =>
        requests.post('/user/register', {name: name, surname: surname, email: email, password: password}),
};

const Category = {
    get: () =>
        requests.get('/categories'),
    isValid: (name: string) =>
        requests.post('/categories/isValid', {name: name}),
};

const ItemAgent = {
    getForCategory: (idCategory: number) =>
        requests.post('/category/items', {idCategory: idCategory}),
    getItem: (idItem: string) =>
        requests.get(`/item/${idItem}`),
    getAllItems: () =>
        requests.get(`/admin/items`),
    getItemCategory: (categoryId:number) =>
        requests.post(`/admin/item/category`, {categoryId: categoryId}),
    editItem: (item:Item) =>
        requests.put(`/admin/item/edit`, {item}),
    addItem: (item:Item) =>
        requests.post(`/admin/item/add`, {item}),
    deleteItem: (id:number) =>
        requests.post(`/admin/item/delete`, {id:id}),
    itemBought: (ids:CartItemWithOnlyId[]) =>
        requests.put('/items/bought', ids)
};

const Order = {
    makeOrder: (order: NewOrder) =>
        requests.post('/order', {...order}),
    getOrdersForUser: (userId: number) =>
        requests.post('/user-orders', {userId: userId}),
    getOrderItems: (ids: number[]) =>
        requests.post('/order-items', {itemIds: ids}),
};

const limit = (count: any, p: any) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article: any) => Object.assign({}, article, {slug: undefined})


const agent = {
    Auth,
    Category,
    Item: ItemAgent,
    Order
};

export default agent;
