import {makeObservable, observable, reaction} from 'mobx';

const _ = require('lodash');

export interface DeliveryInfo {
    contactNumber: string;
    place: string;
    address: string;
}

export class DeliveryStore {

    @observable
    deliveryInfo?: DeliveryInfo;

    constructor() {
        makeObservable(this);

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

}

export default new DeliveryStore();