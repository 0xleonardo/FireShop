import "./style.css"
import {useNavigate, useParams} from "react-router-dom";
import {Item} from "../../../modals/item.modal";
import {useEffect, useState} from "react";
import {getItem} from "../../../utils/api.utils";
import {Loading} from "../../../routes/routes";
import ImageSlider from "../../../components-styled/ImageSlider/image-slider.component";
import {Button} from "primereact/button";
import 'primeicons/primeicons.css';
import {observer} from "mobx-react";
import {useStore} from "../../../stores/utils/store-provider";
import {Category} from "../../../modals/category.modal";

const _ = require('lodash');


export const ItemInfo = observer(() => {
    const {cartStore, categoryStore} = useStore();
    const navigate = useNavigate();
    const {itemId} = useParams();

    const [isValidUrl, setIsValidUrl] = useState(false);
    const [item, setItem] = useState<Item>({} as Item);
    const [category, setCategory] = useState<Category>();

    useEffect(() => {
        getItem(itemId!)
            .then((res: { status: string, item?: Item }) => {
                if (res.status === "200") {
                    setIsValidUrl(true);
                    setItem(res.item!);
                    setCategory(_.find(categoryStore.getCategories, (category:Category) => category.id === res.item!.idCategory));
                }
            })
    }, []);

    if (!isValidUrl) {
        return <Loading/>
    }

    return (
        <div className="item_info">
            <div className="item_info_summary">
                <Button className="p-button-secondary" onClick={() => navigate(-1)}><i className="pi pi-backward"
                                                                                       style={{fontSize: '1.8rem'}}/></Button>
                <div>
                    <div className="item_info_summary_brand">{item.brand} </div>
                    <div className="item_info_summary_series">{item.series}</div>
                    <div className="item_info_summary_desc">{item.description}</div>
                </div>
            </div>
            <div className="item_info_slider">
                <ImageSlider slides={JSON.parse(item.images)} arrowsColor="black"/>
            </div>
            <div className="item_info_description">
                {item.detailedDescription}
            </div>
            <div>
                <span style={{display: "flex", gap: 5}}>Currently {item.amount === 0 ?
                    <div style={{textTransform: "uppercase", color: "red"}}>unavailable</div> :
                    <div style={{textTransform: "uppercase", color: "green"}}>available {item.amount}</div>}</span>
            </div>
            <div>
                <Button disabled={item.amount === 0} className="p-button-danger"
                        onClick={() => cartStore.addItem(item)}>ADD TO CART</Button>
                <a href={`mailto:contact@fireshop.hr?subject=Inquiry&body=${item.series}`}>
                    <Button className="p-button-info">
                        INQUIRY
                    </Button>
                </a>
            </div>
        </div>
    )


})