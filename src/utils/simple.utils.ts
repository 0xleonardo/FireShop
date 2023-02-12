import {Item} from "../modals/item.modal";
import {DeliveryInfo} from "../stores/delivery.store";

const _ = require('lodash');

export function importAll(r: any) {
    return r.keys().map(r);
}

export const moneyCurrency = "€";

export function getItemPrice(item: Item) {
    if (item.discount === 0) {
        return item.price;
    }
    return (100 - item.discount) / 100 * item.price;
}

export function formatTimeStampToDate(timeDate: string) {
    return new Intl.DateTimeFormat('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).format(new Date(timeDate))
}

export function parseJsonDeliveryDetails(deliveryDetails: string) {
    return JSON.parse(deliveryDetails) as DeliveryInfo;
}

export const checkIfFieldEmpty = <T>(fields:T[]) => {
    return _.includes(Object.values(fields).map((value) => {
        if (value === 0) {
            return false;
        }
        return _.isEmpty(value);
    }), true)
}