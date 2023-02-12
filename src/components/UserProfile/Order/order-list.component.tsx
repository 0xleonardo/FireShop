import "./style.css";
import {useState} from "react";
import {OrderTransaction} from "../../../modals/order.modal";
import {observer} from "mobx-react";
import {formatTimeStampToDate, moneyCurrency, parseJsonDeliveryDetails} from "../../../utils/simple.utils";
import {OrderModal} from "../OrderModal/order-modal.component";

interface OrderListComponentProps {
    order: OrderTransaction;
    color: string;
}

export const OrderListComponent = observer((props: OrderListComponentProps) => {

    const [isModalOpened, setModalOpenedState] = useState(false);

    return (
        <li>
            <OrderModal isOpened={isModalOpened} order={props.order} closeModal={()=>setModalOpenedState(false)}/>
            <button className="order_list_component" onClick={() => setModalOpenedState(!isModalOpened)}
                    style={{backgroundColor: props.color}}>
                {formatTimeStampToDate(props.order.orderTimestamp)} {parseJsonDeliveryDetails(props.order.delivery).email} - {props.order.total} {moneyCurrency}
            </button>
        </li>
    )
})