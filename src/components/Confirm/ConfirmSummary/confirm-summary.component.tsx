import "./style.css"
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../../../stores/utils/store-provider";
import {moneyCurrency} from "../../../utils/simple.utils";
import {Button} from "primereact/button";
import {itemBought, makeOrder} from "../../../utils/api.utils";
import {useState} from "react";
import {Item} from "../../../modals/item.modal";
import {CartItem} from "../../../stores/cart.store";


const _ = require('lodash');

export const ConfirmSummary = observer(() => {
    const {cartStore, deliveryStore, userStore} = useStore();
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const navigate = useNavigate();

    const handleConfirm = () => {
        makeOrder({
            items: JSON.stringify(cartStore.getCartItems.map((cartItem) => {
                return {id: cartItem.item.id, amount: cartItem.amount}
            })),
            total: cartStore.getCartTotal,
            delivery: JSON.stringify(deliveryStore.getDeliveryInfo),
            idUser: userStore.getUser?.id ? userStore.getUser?.id : undefined
        }).then(() => {
            setSuccessMsg("Order successful");
            setTimeout(() => {
                deliveryStore.clearDeliveryInfo();
                itemBought(cartStore.getCartItems.map((cartItem:CartItem) => cartItem.item.id))
                cartStore.emptyCart();
                navigate("/")
            }, 3000);
        }).catch((err: any) => {
            setErrorMsg("Error occurred, try again!")
            setTimeout(() => {
                navigate("/")
            }, 3000);
        })
    }

    const canConfirmOrder = () => {
        return cartStore.getCartItemsNumber > 0
            && _.includes(Object.values(deliveryStore.getDeliveryInfo).map((value) => _.isEmpty(value)), true);
    }

    return (
        <div className="cart_summary">
            <h3>Summary</h3>
            <div className="cart_summary_box">
                <div>
                    <div style={{fontWeight: "bolder"}}>Person Info</div>
                    <div>{deliveryStore.getDeliveryInfo?.name} {deliveryStore.getDeliveryInfo?.surname}</div>
                    <div>{deliveryStore.getDeliveryInfo?.email}</div>
                    <div>{deliveryStore.getDeliveryInfo?.mobile}</div>
                </div>
                <div>
                    <div style={{fontWeight: "bolder"}}>Delivery Info</div>
                    <div>{deliveryStore.getDeliveryInfo?.country}</div>
                    <div>{deliveryStore.getDeliveryInfo?.place}</div>
                    <div>{deliveryStore.getDeliveryInfo?.address}</div>
                </div>
                <div>
                    <div style={{fontWeight: "bolder"}}>{deliveryStore.getDeliveryInfo?.paymentType}</div>
                    <div>{_.round(cartStore.getCartItemsPriceSum, 2)} {moneyCurrency}</div>
                </div>
            </div>
            <div hidden={!successMsg} className="cart_summary_box_success_msg"
                 style={{display: !successMsg ? "none" : "flex"}}>{successMsg}</div>
            <div hidden={!errorMsg} className="cart_summary_box_success_msg"
                 style={{display: !errorMsg ? "none" : "flex", backgroundColor: "red"}}>{errorMsg}</div>
            <div className="cart_summary_buttons">
                <Button onClick={() => navigate(-1)} className="p-button-secondary">GO BACK</Button>
                <Button onClick={() => handleConfirm()} disabled={canConfirmOrder()}>CONFIRM</Button>
            </div>
        </div>
    )

})