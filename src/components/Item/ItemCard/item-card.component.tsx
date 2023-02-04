import "./style.css"
import {useNavigate} from "react-router-dom";
import {Item} from "../../../models/item.modal";

interface CategoryCardProps {
    item:Item
}


export const ItemCard = (props:CategoryCardProps) => {

    const icon = require(`../../../assets/item/monitors/${props.item.imageName}`);

    const navigate = useNavigate();

    return (
        <div className="item_card">
            <img src={icon} alt="Monitor" onClick={() => navigate(`/item/${props.item.id}`)}/>
            {props.item.name}
            <button onClick={() => navigate(`/item/${props.item.id}`)}>Buy now</button>
        </div>
    )

}