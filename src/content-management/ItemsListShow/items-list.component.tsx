import {Item} from "../../modals/item.modal";
import {CmsItemListElement} from "../CmsItemListElement/cms-item-list-element.component";
import {observer} from "mobx-react";

interface ItemsListShowProps {
    items: Item[];
    loading: boolean;
    itemChanged:()=>void;
}

export const ItemsListShow = observer((props:ItemsListShowProps) => {
    return (
        <ul className="cms_item_list">
            {
                props.items.map((item: Item, idx) => {
                    return (
                        <CmsItemListElement key={item.id} item={item} color={(idx+1)%2===0 ? "lightgray" : "white"} itemChanged={props.itemChanged}/>
                    )
                })
            }
        </ul>
    );
})