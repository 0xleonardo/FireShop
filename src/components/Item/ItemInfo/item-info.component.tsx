import "./style.css"
import {useNavigate, useParams} from "react-router-dom";
import {Item} from "../../../models/item.modal";
import {useEffect, useState} from "react";
import {getItem, getItemsForCategory, isCategoryValid} from "../../../stores/categories.store";
import {Category} from "../../../models/category.modal";
import {Loading} from "../../../routes/routes";

// interface CategoryCardProps {
//     item:Item
//     currentPath:string;
// }


export const ItemInfo = () => {

    const {itemId} = useParams();

    const [isValidUrl, setIsValidUrl] = useState(false);
    const [item, setItem] = useState<Item>({} as Item);

    useEffect(() => {
        getItem(itemId!)
            .then((res: {status:string, item?:Item}) => {
                console.log(res)
                if (res.status === "200") {
                    setIsValidUrl(true);
                    setItem(res.item!)
                }
            })
    }, []);

    if (isValidUrl) {
        return (
            <div>
                {item?.name}
            </div>
        )
    }

    return <Loading />

}