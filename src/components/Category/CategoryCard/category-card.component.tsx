import {Category} from "../../../models/category.modal";

import "./style.css"
import {useNavigate} from "react-router-dom";

interface CategoryCardProps {
    category:Category
}


export const CategoryCard = (props:CategoryCardProps) => {

    const icon = require(`../../../assets/category/${props.category.imageName}`);

    const navigate = useNavigate();

    return (
        <button className="category_card" onClick={() =>navigate(`/${props.category.name.toLowerCase()}`)}>
            <img src={icon} alt="Monitor"/>
            {props.category.name}
        </button>
    )

}