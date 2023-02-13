import "./style.css"
import {useNavigate} from "react-router-dom";
import {Item} from "../../../modals/item.modal";
import {observer} from "mobx-react";
import {moneyCurrency} from "../../../utils/simple.utils";
import {Category} from "../../../modals/category.modal";
import cartStore from "../../../stores/cart.store";
import {Button} from "primereact/button";

const _ = require('lodash');

interface ItemCardProps {
    item: Item
    category?:Category;
}

export const ItemCard = observer((props: ItemCardProps) => {
    const navigate = useNavigate();

    const icon = require(`../../../assets/category/${props.category!.imageName}`);

    return (
        <div className="item_card">
            <div className="item_card_trigger" onClick={() => navigate(`/item/${props.item.id}`)}>
                <img src={JSON.parse(props.item.images)[0] ? JSON.parse(props.item.images)[0].url : icon} alt="Monitor"
                     onClick={() => navigate(`/item/${props.item.id}`)}
                     style={{backgroundColor: JSON.parse(props.item.images)[0] ? "white" : "gray",
                     padding: JSON.parse(props.item.images)[0] ? 0 : 10}}/>
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
                            <div
                                className="item_card_price_discounted">{_.round(props.item.price * (100 - props.item.discount) / 100, 2)} {moneyCurrency}</div>
                        </div>
                    }
                </div>
            </div>
            <Button onClick={() => cartStore.addItem(props.item)} disabled={props.item.amount===0}>Buy now</Button>
        </div>
    )

})