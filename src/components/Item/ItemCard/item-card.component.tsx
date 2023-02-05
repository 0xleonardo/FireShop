import "./style.css"
import {useNavigate} from "react-router-dom";
import {Item} from "../../../models/item.modal";
import {observer} from "mobx-react";
import {useStore} from "../../../stores/utils/store-provider";
import {moneyCurrency} from "../../../utils/simple.utils";

const _ = require('lodash');

interface ItemCardProps {
    item:Item
}

export const ItemCard = observer((props:ItemCardProps) => {
    const {cartStore} = useStore();
    const navigate = useNavigate();

    return (
        <div className="item_card" onClick={() => navigate(`/item/${props.item.id}`)}>
            <img src={JSON.parse(props.item.images)[0].url} alt="Monitor" onClick={() => navigate(`/item/${props.item.id}`)}/>
            <div className="item_card_info">
                <div className="item_card_brand">{props.item.brand}</div>
                <div className="item_card_series">{props.item.series}</div>
                <div className="item_card_desc">{props.item.description}</div>
                {props.item.discount === 0 ?
                    <div className="item_card_price">
                        <div className="item_card_price_real">{props.item.price} {moneyCurrency}</div>
                    </div> :
                    <div className="item_card_price_discounted">
                        <div className="item_card_price_real">{props.item.price} {moneyCurrency}</div>
                        <div className="item_card_price_discounted">{_.round(props.item.price * (100-props.item.discount)/100, 2)} {moneyCurrency}</div>
                    </div>
                }
            </div>
            <button onClick={() => navigate(`/item/${props.item.id}`)}>Buy now</button>
        </div>
    )

})