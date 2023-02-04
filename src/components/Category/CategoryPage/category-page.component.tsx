import "./style.css"
import {useParams} from "react-router-dom";
import {getItemsForCategory, isCategoryValid} from "../../../stores/categories.store";
import {useEffect, useState} from "react";
import {Loading} from "../../../routes/routes";
import {Category} from "../../../models/category.modal";
import {Item} from "../../../models/item.modal";
import {ItemCard} from "../../Item/ItemCard/item-card.component";

export const CategoryPage = () => {

    const {categoryName} = useParams();

    const [isValidUrl, setIsValidUrl] = useState(false);
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        isCategoryValid(categoryName!)
            .then((res: {msg:string, category?:Category}) => {
                if (res.msg === "Valid") {
                    setIsValidUrl(true);
                    getItemsForCategory(res.category!.id)
                        .then((res: Item[]) => {
                            setItems(res);
                        })
                }
            })
    }, []);


    if (isValidUrl) {
        return (
            <div>
                {categoryName}
                <ul>
                    {items.map((item:Item) => {
                        return (<li><ItemCard item={item}/></li>)
                    })}
                </ul>
            </div>
        )
    }

    return <Loading/>
}
