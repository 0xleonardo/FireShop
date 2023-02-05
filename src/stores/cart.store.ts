import {action, computed, makeObservable, observable} from 'mobx';
import {Item} from "../models/item.modal";

const _ = require('lodash');

export interface CartItem {
    item:Item,
    amount: number,
}

export class CartStore {

    @observable
    cartItems : CartItem[] = [];

    constructor() {
        makeObservable(this);
    }

    @action
    addItem(item: Item) {
        const cartItemExists = this.cartItems.find((cartItem:CartItem) => {
            return cartItem.item.id === item.id
        })

        if (cartItemExists) {
            this.cartItems.forEach((cartItem:CartItem) => {
                if (cartItem.item.id === cartItemExists.item.id) {
                    cartItem.amount = cartItem.amount+1;
                }
            })
        }
        else {
            this.cartItems.push({item:item, amount:1})
        }

        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    @action
    removeItem(idForRemoval: number) {
        const cartItemForRemoval = this.cartItems.find((cartItem:CartItem) => cartItem.item.id === idForRemoval)!;

        if(cartItemForRemoval.amount > 1) {
            this.cartItems.forEach((cartItem:CartItem) => {
                if (cartItem.item.id === idForRemoval) {
                    cartItem.amount = cartItem.amount-1;
                }
            });
        }
        else {
            _.remove(this.cartItems, cartItemForRemoval);
        }
        localStorage.setItem('cart', JSON.stringify(this.cartItems));
    }

    @action
    emptyCart() {
        this.cartItems = [];
        localStorage.removeItem('cart');
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
            .map((cartItem:CartItem) => cartItem.amount)
            .reduce((partialSum, amount) => partialSum + amount, 0)
    }

    @computed
    get getCartItemsPriceSum() {
        return this.cartItems
            .map((cartItem:CartItem) => {
                return {price: cartItem.item.price, amount: cartItem.amount}
            })
            .reduce((partialSum, cartItem) => partialSum + (cartItem.price*cartItem.amount), 0)
    }
}

export default new CartStore();