import "./style.css";
import {Item} from "../../modals/item.modal";
import {useState} from "react";
import {FormInput} from "../../components/LoginRegistration/form-input/form-input.component";
import {Button} from "primereact/button";
import {deleteItem, editItem} from "../../utils/api.utils";

interface CmsEditModalProps {
    isOpened:boolean;
    item:Item;
    closeModal:()=>void;
    itemChanged:()=>void;
}

export const CmsEditModal = (props:CmsEditModalProps) => {

    const [itemDetails, setItemDetails] = useState<Item>({
        id:props.item.id,
        brand: props.item.brand,
        series: props.item.series,
        description: props.item.description,
        detailedDescription: props.item.detailedDescription,
        amount: props.item.amount,
        price: props.item.price,
        discount: props.item.discount,
        images: props.item.images,
        idCategory: props.item.idCategory,
    });

    const itemInputDetails = [
        {
            id: 1,
            name: "brand",
            type: "text",
            placeholder: "Brand",
            label: "Brand",
            value: itemDetails.brand,
            required: true,
        },
        {
            id: 2,
            name: "series",
            type: "text",
            placeholder: "Series",
            label: "Series",
            value: itemDetails.series,
            required: true,
        },
        {
            id: 3,
            name: "amount",
            type: "number",
            placeholder: "Amount",
            label: "Amount",
            value: itemDetails.amount,
            required: true,
        },
        {
            id: 4,
            name: "price",
            type: "number",
            placeholder: "Price",
            label: "Price",
            value: itemDetails.price,
            required: true,
        },
        {
            id: 5,
            name: "discount",
            type: "number",
            placeholder: "Discount",
            label: "Discount",
            value: itemDetails.discount,
            required: true,
        }
    ];

    const onItemDetailsChange = (e: any) => {
        setItemDetails({...itemDetails, [e.target.name]: e.target.value});
    };

    const saveItem = () => {
        editItem(itemDetails)
            .then((res:any) => {
                props.itemChanged();
            })
            .catch(() => {

            });
    }

    const deleteCurrentItem = () => {
        deleteItem(itemDetails.id)
            .then((res:any) => {
                props.itemChanged();
            })
            .catch(() => {

            });
    }

    if (!props.isOpened) {
        return <div/>;
    }

    return (
        <div className="cms_edit_modal">
            <div className="cms_edit_modal_trigger" onClick={props.closeModal}/>
            <div className="cms_edit_modal_modal">
                <h3>Edit item</h3>
                {itemInputDetails.map((input) => (
                    (<div>
                        <label>{input.placeholder}</label>
                        <FormInput key={input.id}{...input} onChange={onItemDetailsChange}/>
                    </div>)
                ))}
                <div className="cms_edit_modal_modal_actions">
                    <Button className="p-button-secondary" onClick={props.closeModal}>Cancel</Button>
                    <Button className="p-button-danger" onClick={deleteCurrentItem}>Delete</Button>
                    <Button className="p-button-success" onClick={saveItem}>Save</Button>
                </div>
            </div>
        </div>
    );
};