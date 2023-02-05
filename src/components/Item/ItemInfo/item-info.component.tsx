import "./style.css"
import {useNavigate, useParams} from "react-router-dom";
import {Item} from "../../../models/item.modal";
import {useEffect, useState} from "react";
import {getItem} from "../../../stores/categories.store";
import {Loading} from "../../../routes/routes";
import ImageSlider from "../../../components-styled/ImageSlider/image-slider.component";
import {Button} from "primereact/button";
import 'primeicons/primeicons.css';
import {observer} from "mobx-react";
import {useStore} from "../../../stores/utils/store-provider";

const _ = require('lodash');


export const ItemInfo = observer(() => {
    const {cartStore} = useStore();
    const navigate = useNavigate();
    const {itemId} = useParams();

    const [isValidUrl, setIsValidUrl] = useState(false);
    const [item, setItem] = useState<Item>({} as Item);

    useEffect(() => {
        getItem(itemId!)
            .then((res: {status:string, item?:Item}) => {
                if (res.status === "200") {
                    setIsValidUrl(true);
                    setItem(res.item!)
                }
            })
    }, []);

    if (isValidUrl) {
        return (
            <div className="item_info">
                <div className="item_info_summary">
                    <Button className="p-button-secondary" onClick={() => navigate(-1)}><i className="pi pi-backward" style={{ fontSize: '1.8rem' }}/></Button>
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
                    <span style={{display:"flex", gap:5}}>Currently {item.amount===0 ? <div style={{textTransform:"uppercase", color:"red"}}>unavailable</div> : <div style={{textTransform:"uppercase", color:"green"}}>available</div>}</span>
                </div>
                <div>
                    <Button disabled={item.amount===0} className="p-button-danger" onClick={()=>cartStore.addItem(item)}>ADD TO CART</Button>
                    <Button className="p-button-info" onClick={() => navigate('/contact')}>INQUIRY</Button>
                </div>
            </div>
        )
    }

    return <Loading />

})