import "./style.css";
import {Item} from "../../modals/item.modal";
import {ChangeEvent, useState} from "react";
import {FormInput} from "../../components/LoginRegistration/form-input/form-input.component";
import {Button} from "primereact/button";
import FileUploadSingle from "../UploadFile/upload.file.component";
import {CategoryDropDown} from "../Dropdown-Categories/dropdown-categories.component";
import {addItem} from "../../utils/api.utils";
import {checkIfFieldEmpty} from "../../utils/simple.utils";

interface CmsAddItemModalProps {
    isOpened:boolean;
    closeModal:()=>void;
    itemChanged:()=>void;
}

export const CmsAddItemModal = (props:CmsAddItemModalProps) => {

    const [file, setFile] = useState<File>();
    const [errorMessage, setErrorMessage] = useState("");
    const [imageErrorMessage, setImageErrorMessage] = useState("");
    const [imageUploaded, setImageUploaded] = useState(false);

    const [itemDetails, setItemDetails] = useState<Item>({
        id: 0,
        brand: "",
        series: "",
        description: "",
        detailedDescription: "",
        amount: 0,
        price: 0,
        discount: 0,
        images: "[]",
        idCategory: 0,
    });

    const clearFields = () => {
        setErrorMessage("");
        setItemDetails({
            id: 0,
            brand: "",
            series: "",
            description: "",
            detailedDescription: "",
            amount: 0,
            price: 0,
            discount: 0,
            images: "[]",
            idCategory: 0,
        });
        handleFileClear();
    }

    const addItemInputDetails = [
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
            min:1,
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
            min:0,
            max:100,
            value: itemDetails.discount,
            required: true,
        }
    ];

    const categoryDropDown = {
        id: 6,
        name: "idCategory",
        placeholder: "Select Category",
        label: "Category",
        required: true,
    }

    const descriptionTextarea = {
        key: 7,
        name: "description",
        placeholder: "Enter item description",
        label: "Description",
        value: itemDetails.description,
        required: true,
    }

    const detailedDescriptionTextarea = {
        key: 8,
        name: "detailedDescription",
        placeholder: "Enter item detailed description",
        label: "Detailed Description",
        value: itemDetails.detailedDescription,
        required: true,
    }

    const onItemDetailsChange = (e: any) => {
        setItemDetails({...itemDetails, [e.target.name]: e.target.value});
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (!file) {
            return;
        }

        const formData = new FormData();
        formData.append("source", file);

        try {
            if(file.type !== "image/jpg" && file.type !== "image/png" && file.type !== "image/jpeg") {
                throw new Error("Image has wrong format");
            }
            else {
                fetch('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&action=upload&format=json', {
                    method: 'POST',
                    body: formData,
                })
                    .then((res) => res.json())
                    .then((data) => {
                        itemDetails.images = JSON.stringify([{url: data.image.display_url}]);
                        setImageUploaded(true);
                        setImageErrorMessage("");
                    })
                    .catch((err) => setImageErrorMessage(err.message));
            }
        } catch (err:any) {
            setImageErrorMessage(err.message);
        }
    };

    const handleFileClear = () =>{
        setFile(undefined)
        setImageUploaded(false);
    }

    const saveItem = () => {
        try {
            if (checkIfFieldEmpty(Object.values(itemDetails))) {
                throw new Error("All fields must be entered")
            }

            addItem(itemDetails)
                .then(() => {
                    props.itemChanged();
                    clearFields();
                    props.closeModal();
                })
                .catch((err:any) => {
                    console.log(err)
                })
        } catch (err:any) {
            setErrorMessage(err.message)
        }
    }

    if (!props.isOpened) {
        return <div/>;
    }

    return (
        <div className="cms_add_modal">
            <div className="cms_add_modal_trigger" onClick={props.closeModal}/>
            <div className="cms_add_modal_modal">
                <h3>Add new item</h3>
                <div className="cms_add_modal_modal_inputs">
                    <div>
                        {addItemInputDetails.map((input, idx) => (
                            (<div key={idx+1}>
                                <label>{input.placeholder}</label>
                                <FormInput key={input.id}{...input} onChange={onItemDetailsChange}/>
                            </div>)
                        ))}
                    </div>
                    <div>
                        <FileUploadSingle
                            handleUploadClick={handleUploadClick}
                            file={file}
                            handleFileChange={handleFileChange}
                            imageUploaded={imageUploaded}
                            handleFileClear={handleFileClear}
                            imageErrorMessage={imageErrorMessage}
                        />
                        <CategoryDropDown {...categoryDropDown} onChange={onItemDetailsChange}/>
                        <div className="cms_add_modal_modal_textarea">
                            <div>{descriptionTextarea.label}</div>
                            <textarea {...descriptionTextarea} onChange={onItemDetailsChange}/>
                        </div>
                        <div className="cms_add_modal_modal_textarea">
                            <div>{detailedDescriptionTextarea.label}</div>
                            <textarea {...detailedDescriptionTextarea} onChange={onItemDetailsChange}/>
                        </div>
                        <div style={{color:"red"}}>{errorMessage}</div>
                    </div>
                </div>
                <div className="cms_add_modal_modal_actions">
                    <Button className="p-button-secondary" onClick={props.closeModal}>Cancel</Button>
                    <Button onClick={clearFields}>Clear</Button>
                    <Button className="p-button-success" onClick={saveItem}>Save</Button>
                </div>
            </div>
        </div>
    );
};