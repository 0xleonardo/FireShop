import "./style.css"
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../../../stores/utils/store-provider";
import {CartItem} from "../../../stores/cart.store";
import {moneyCurrency} from "../../../utils/simple.utils";

const _ = require('lodash');

interface ConfirmItemListElementProps {
    cartItem: CartItem
}

export const ConfirmItemListElement = observer((props: ConfirmItemListElementProps) => {
    const {cartStore} = useStore();
    const navigate = useNavigate();

    const amount = cartStore.getCartItems.find((cartItem: CartItem) => cartItem.item.id === props.cartItem.item.id)!.amount;

    return (
        <li className="cart_item_element">
            <div className="cart_item_element_info">
                <img src={JSON.parse(props.cartItem.item.images)[0].url} alt="Item Image"/>
                <div>
                    <div className="cart_item_card_brand">{props.cartItem.item.brand}</div>
                    <div className="cart_item_card_series">{props.cartItem.item.series}</div>
                    <div className="cart_item_card_desc">{props.cartItem.item.description}</div>
                </div>
            </div>
            <div
                className="cart_item_price_discounted">{_.round(props.cartItem.item.price * (100 - props.cartItem.item.discount) / 100, 2)} {moneyCurrency}</div>
            <div>Amount: {amount}</div>
        </li>
    )

})