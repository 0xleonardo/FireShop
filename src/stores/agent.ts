import superagentPromise from 'superagent-promise';
import _superagent, {Request, Response, ResponseError} from 'superagent';
import commonStore from "./common.store";
import authStore from "./auth/auth.store";

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
    requests.get('/me'),
  login: (email: string, password: string) =>
    requests.post('/user/login', { email: email, password: password }),
  register: (name:string, surname:string, email: string, password: string) =>
    requests.post('/user/register', {name: name, surname: surname, email: email, password: password}),
};

const Category = {
  get: () =>
      requests.get('/categories'),
  isValid: (name:string) =>
      requests.post('/categories/isValid', {name:name}),
};

const Item = {
  getForCategory: (idCategory:number) =>
      requests.post('/category/items', {idCategory:idCategory}),
  getItem: (idItem:string) =>
      requests.get(`/item/${idItem}`),
};


const limit = (count: any, p: any) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = (article: any) => Object.assign({}, article, { slug: undefined })


const agent = {
  Auth,
  Category,
  Item
};

export default agent;
