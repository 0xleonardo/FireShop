import "./style.css"

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'primeflex/primeflex.css';
import {useStore} from "../../../stores/utils/store-provider";
import {observer} from "mobx-react";
import {CartItem} from "../../../stores/cart.store";
import {CartItemListElement} from "../CartItemListElement/cart-item-list-element.component";
import {Button} from "primereact/button";
import {CartSummary} from "../CartSummary/cart-summary.component";

const _ = require('lodash');

export const CartPage = observer(() => {
    const {cartStore} = useStore();

    const isCartEmpty = _.isEmpty(cartStore.getCartItems);

    const emptyCart = () => {
        cartStore.emptyCart();
    }

    return (
        <div className="cart_page">
            <div className="cart_page_heading">
                <div>CART</div>
                <Button style={{fontSize: "12px"}} className="p-button-secondary"
                        onClick={() => emptyCart()}>CLEAR</Button>
            </div>
            <div className="cart_page_overview">
                <div className="cart_page_overview_items">
                    {isCartEmpty ? <h3>Cart empty</h3> : <h3>Items in cart ({cartStore.getCartItemsNumber})</h3>}
                    <hr style={{marginBottom: 10}} hidden={isCartEmpty}/>
                    <ul>
                        {
                            cartStore.getCartItems.map((cartItem: CartItem) => {
                                return (
                                    <CartItemListElement key={cartItem.item.id} cartItem={cartItem}/>
                                )
                            })
                        }
                    </ul>
                </div>
                <hr hidden={isCartEmpty}/>
                <div className="cart_page_overview_summary" hidden={cartStore.getCartItems.length === 0}>
                    <CartSummary/>
                </div>
            </div>
        </div>
    )
})
