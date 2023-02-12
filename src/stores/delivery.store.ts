import {action, computed, makeObservable, observable, reaction} from 'mobx';

const _ = require('lodash');

export interface DeliveryInfo {
    name: string;
    surname: string;
    email: string;
    country: string;
    place: string;
    address: string;
    mobile: string;
    paymentType: string;
}

export class DeliveryStore {

    @observable
    deliveryInfo: DeliveryInfo;

    constructor() {
        makeObservable(this);

        if (window.localStorage.getItem('delivery')) {
            this.deliveryInfo = JSON.parse(window.localStorage.getItem('delivery')!)
        } else {
            this.deliveryInfo = {
                name: "",
                surname: "",
                email: "",
                country: "",
                place: "",
                address: "",
                mobile: "",
                paymentType: "",
            };
        }

        reaction(
            () => this.deliveryInfo,
            deliveryInfo => {
                if (deliveryInfo) {
                    window.localStorage.setItem('delivery', JSON.stringify(deliveryInfo));
                } else {
                    window.localStorage.removeItem('delivery');
                }
            }
        );
    }

    @computed
    get getDeliveryInfo() {
        return this.deliveryInfo;
    }

    @action
    setDeliveryInfo(deliveryInfo: DeliveryInfo) {
        this.deliveryInfo = deliveryInfo;
        window.localStorage.setItem('delivery', JSON.stringify(deliveryInfo));
    }

    @action
    clearDeliveryInfo() {
        this.deliveryInfo = {
            name: "",
            surname: "",
            email: "",
            country: "",
            place: "",
            address: "",
            mobile: "",
            paymentType: "",
        };
        localStorage.removeItem('delivery');
    }

}

export default new DeliveryStore();