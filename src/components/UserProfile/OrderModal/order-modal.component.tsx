import {OrderTransaction} from "../../../modals/order.modal";
import {useEffect, useState} from "react";
import {Item} from "../../../modals/item.modal";
import {getOrderItems} from "../../../utils/api.utils";

import "./style.css";
import {formatTimeStampToDate, getItemPrice, moneyCurrency} from "../../../utils/simple.utils";

interface OrderModalProps {
    isOpened:boolean;
    closeModal:()=>void;
    order:OrderTransaction;
}

interface CartItemWithOnlyId {
    id:number;
    amount:number;
}

export const OrderModal = (props:OrderModalProps) => {

    const [orderItems, setOrderItems] = useState<Item[]>([]);
    const [cartItemWithId, setCartItemWithId] = useState<CartItemWithOnlyId[]>(JSON.parse(props.order.items))

    useEffect(() => {
        getOrderItems(cartItemWithId.map((item:CartItemWithOnlyId) => item.id))
            .then((res:Item[]) => {
                setOrderItems(res);
            })
    }, [])

    if (!props.isOpened) {
        return <div/>;
    }

    const deliveryInfo = JSON.parse(props.order.delivery);

    return (
        <div className="order_modal">
            <div className="order_modal_trigger" onClick={props.closeModal}/>
            <div className="order_modal_modal">
                <div>
                    <h3>Order Info</h3>
                    <div>Order id {props.order.id}</div>
                    <div>Date {formatTimeStampToDate(props.order.orderTimestamp)}</div>
                </div>
                <hr/>
                <div>
                    <h3>Delivery Info</h3>
                    <div>
                        {Object.keys(deliveryInfo).map((key, idx) => {
                            return <div key={idx+1}>
                                <span style={{textTransform: "uppercase"}}>{key}</span> {deliveryInfo[key]}
                            </div>
                        })}
                    </div>
                </div>
                <hr/>
                <div>
                    <h3>Items Ordered</h3>
                    {orderItems.map((item, idx)=>
                        <div key={idx+1}>
                            <span>{getItemPrice(item)} {moneyCurrency} - {item.brand} - {item.series} - [Amount: {cartItemWithId.find((cartItem) => cartItem.id === item.id)!.amount}]</span>
                        </div>)}
                </div>
                <hr/>
                <div>Order total {props.order.total} {moneyCurrency}</div>
            </div>
        </div>
    );
};