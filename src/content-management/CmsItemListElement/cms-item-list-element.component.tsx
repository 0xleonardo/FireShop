import "./style.css"
import {observer} from "mobx-react";
import {Item} from "../../modals/item.modal";
import {getItemPrice, moneyCurrency} from "../../utils/simple.utils";
import {useEffect, useState} from "react";
import {Category} from "../../modals/category.modal";
import {getItemCategory} from "../../utils/api.utils";
import {CmsEditModal} from "../CMS-Edit-Modal/cms-edit-modal.component";

const _ = require('lodash');

interface CmsItemListElementProps {
    item: Item;
    color:string;
    itemChanged:()=>void;
}

export const CmsItemListElement = observer((props: CmsItemListElementProps) => {

    const [itemCategory, setItemCategory] = useState<Category>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getItemCategory(props.item.idCategory)
            .then((res:Category) => {
                setItemCategory(res);
            })
    },[])

    return (
        <li className="cms_item_element">
            <CmsEditModal isOpened={isModalOpen} item={props.item} closeModal={()=>setIsModalOpen(false)} itemChanged={props.itemChanged}/>
            <button style={{backgroundColor:props.color}} onClick={() => setIsModalOpen(!isModalOpen)}>
                <div className="cms_item_element_info">
                    <div>
                        <div className="cms_item_card_categoryName">{itemCategory?.name}</div>
                        <div className="cms_item_card_brand">{props.item.brand}</div>
                        <div className="cms_item_card_series">{props.item.series}</div>
                        <div className="cms_item_card_desc">{props.item.description}</div>
                    </div>
                </div>
                <div className="cms_item_price_discounted">{getItemPrice(props.item)} {moneyCurrency}</div>
                <div className="cms_item_element_number">

                </div>
            </button>
        </li>
    )

})