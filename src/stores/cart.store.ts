import {action, computed, makeObservable, observable, reaction} from 'mobx';
import {Item} from "../modals/item.modal";
import {getItemPrice} from "../utils/simple.utils";

const _ = require('lodash');

export interface CartItem {
    item: Item,
    amount: number,
}

export class CartStore {

    @observable
    cartItems: CartItem[];

    @observable
    total: number;

    constructor() {
        makeObservable(this);

        if (window.localStorage.getItem('cart')) {
            this.cartItems = JSON.parse(window.localStorage.getItem('cart')!);
            this.total = this.getCartItemsPriceSum;
        } else {
            this.cartItems = [];
            this.total = 0;
        }
    }

    @computed
    get getCartItems() {
        const cartInLocalStorage = localStorage.getItem("cart");
        if (cartInLocalStorage) {
            this.cartItems = JSON.parse(cartInLocalStorage);
        }

        return this.cartItems;
    }

    @computed
    get getCartItemsNumber() {
        return this.cartItems
            .map((cartItem: CartItem) => cartItem.amount)
            .reduce((partialSum, amount) => partialSum + amount, 0)
    }

    @computed
    get getCartItemsPriceSum() {
        return this.cartItems
            .reduce((partialSum, cartItem) => {
                if (cartItem.item.discount > 0) {
                    return partialSum + ((100 - cartItem.item.discount) / 100 * cartItem.item.price * cartItem.amount)
                }
                return partialSum + (cartItem.item.price * cartItem.amount)
            }, 0)
    }

    @computed
    get getCartTotal() {
        return this.total;
    }

    @action
    addItem(item: Item) {
        const cartItemExists = this.cartItems.find((cartItem: CartItem) => {
            return cartItem.item.id === item.id
        })

        if (cartItemExists) {
            this.cartItems.forEach((cartItem: CartItem) => {
                if (cartItem.item.id === cartItemExists.item.id) {
                    cartItem.amount = cartItem.amount + 1;
                }
            })
        } else {
            this.cartItems.push({item: item, amount: 1})
        }

        if (item.discount > 0) {
            this.total += getItemPrice(item);
        } else {
            this.total += item.price;
        }

        window.localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    @action
    removeItem(idForRemoval: number) {
        const cartItemForRemoval = this.cartItems.find((cartItem: CartItem) => cartItem.item.id === idForRemoval)!;

        if (cartItemForRemoval.amount > 1) {
            this.cartItems.forEach((cartItem: CartItem) => {
                if (cartItem.item.id === idForRemoval) {
                    cartItem.amount = cartItem.amount - 1;
                }
            });
        } else {
            _.remove(this.cartItems, cartItemForRemoval);
        }

        if (cartItemForRemoval.item.discount > 0) {
            this.total -= getItemPrice(cartItemForRemoval.item);
        } else {
            this.total -= cartItemForRemoval.item.price;
        }

        window.localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    @action
    emptyCart() {
        this.total = 0;
        this.cartItems = [];
        localStorage.removeItem('cart');
    }
}

export default new CartStore();