import {Category} from "../../../modals/category.modal";

import "./style.css"
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react";

interface CategoryCardProps {
    category: Category
}


export const CategoryCard = observer((props: CategoryCardProps) => {

    const icon = require(`../../../assets/category/${props.category.imageName}`);

    const navigate = useNavigate();

    return (
        <button className="category_card" onClick={() => navigate(`/${props.category.name.toLowerCase()}`)}>
            <img src={icon} alt="Monitor"/>
            {props.category.name}
        </button>
    )

})