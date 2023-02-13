import {Item} from "../../../modals/item.modal";
import {ItemCard} from "../../Item/ItemCard/item-card.component";
import {Category} from "../../../modals/category.modal";

interface ItemsShowProps {
    items: Item[];
    loading: boolean;
    category:Category;
}

export const ItemsShow = (props: ItemsShowProps) => {
    return (
        <div className="category_page_items">
            {props.items.map((item: Item) => {
                return (<ItemCard key={item.id} item={item} category={props.category}/>)
            })}
        </div>
    );
}