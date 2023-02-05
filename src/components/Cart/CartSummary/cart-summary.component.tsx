import "./style.css"
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";
import {useStore} from "../../../stores/utils/store-provider";
import {moneyCurrency} from "../../../utils/simple.utils";
import {Button} from "primereact/button";

const _ = require('lodash');

export const CartSummary = observer(() => {
    const {cartStore} = useStore();
    const navigate = useNavigate();

    return (
        <div className="cart_summary">
            <h3>Summary</h3>
            <div className="cart_summary_box">
                <div>When moving to the next step, we check the availability of the product in the basket.</div>
                <div>Sum: {_.round(cartStore.getCartItemsPriceSum,2)} {moneyCurrency}</div>
            </div>
            <div className="cart_summary_buttons">
                <Button onClick={() => navigate('/delivery')}>DELIVERY</Button>
            </div>
        </div>
    )

})