import "./style.css"
import {useParams} from "react-router-dom";
import {getItemsForCategory, isCategoryValid} from "../../../stores/categories.store";
import {useEffect, useState} from "react";
import {Loading} from "../../../routes/routes";
import {Category} from "../../../models/category.modal";
import {Item} from "../../../models/item.modal";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'primeflex/primeflex.css';
import {ItemCard} from "../../Item/ItemCard/item-card.component";
import {observer} from "mobx-react";

export const CategoryPage = observer(() => {

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
            <div className="category_page">
                <div className="category_page_heading">
                    <div>{categoryName}</div>
                </div>
                <div className="category_page_items">
                    {items.map((item:Item) => {
                        return (<ItemCard key={item.id} item={item}/>)
                    })}
                </div>
            </div>
        )
    }

    return <Loading/>
})
