import {Category} from "../../models/category.modal";

interface CategoryCardProps {
    category:Category
}

export const CategoryCard = (props:CategoryCardProps) => {


    return (
        <div>
            {props.category.name}
        </div>
    )

}