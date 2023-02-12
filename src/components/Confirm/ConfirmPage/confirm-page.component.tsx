import "./style.css"

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'primeflex/primeflex.css';
import {useStore} from "../../../stores/utils/store-provider";
import {observer} from "mobx-react";
import {CartItem} from "../../../stores/cart.store";
import {ConfirmItemListElement} from "../ConfirmItemListElement/confirm-item-list-element.component";
import {ConfirmSummary} from "../ConfirmSummary/confirm-summary.component";

const _ = require('lodash');

export const ConfirmPage = observer(() => {
    const {cartStore} = useStore();

    const isCartEmpty = _.isEmpty(cartStore.getCartItems);

    return (
        <div className="cart_page">
            <div className="cart_page_heading">
                <div>CONFIRM ORDER</div>
            </div>
            <div className="cart_page_overview">
                <div className="cart_page_overview_items">
                    {isCartEmpty ? <h3>Cart empty</h3> : <h3>Items for order ({cartStore.getCartItemsNumber})</h3>}
                    <hr style={{marginBottom: 10}} hidden={isCartEmpty}/>
                    <ul>
                        {
                            cartStore.getCartItems.map((cartItem: CartItem) => {
                                return (
                                    <ConfirmItemListElement key={cartItem.item.id} cartItem={cartItem}/>
                                )
                            })
                        }
                    </ul>
                </div>
                <hr hidden={isCartEmpty}/>
                <div className="cart_page_overview_summary" hidden={cartStore.getCartItems.length === 0}>
                    <ConfirmSummary/>
                </div>
            </div>
        </div>
    )
})
