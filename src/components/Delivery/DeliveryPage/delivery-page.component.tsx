import "./style.css"
import {observer} from "mobx-react";
import {FormInput} from "../../LoginRegistration/form-input/form-input.component";
import {useState} from "react";
import {CountryDropDown} from "../Dropdown/dropdown.component";
import {countriesDropDown, deliveryAddress, personDetails} from "../Dropdown/country-dropdown.field";
import {SelectButton} from "primereact/selectbutton";
import {Button} from "primereact/button";

const _ = require('lodash');

export const DeliveryPage = observer(() => {
    const [deliveryDetails, setDeliveryDetails] = useState({
        name: "",
        surname: "",
        email: "",
        country: "",
        place: "",
        address: "",
        paymentType:"",
    });

    const onDeliveryDetailsChange = (e: any) => {
        setDeliveryDetails({ ...deliveryDetails, [e.target.name]: e.target.value });
    };

    const onDeliveryPaymentChange = (e: any) => {
        setDeliveryDetails({ ...deliveryDetails, ["paymentType"]: e.target.value });
    };

    return (
        <div className="delivery_page">
            <div className="delivery_page_info">
                <div className="delivery_page_heading">
                    <div>DELIVERY INFO</div>
                </div>
                <div className="delivery_page_overview">
                    <div className="delivery_page_overview_person">
                        {personDetails.map((input) => (
                            (<div>
                                <label>{input.placeholder}</label>
                                <FormInput key={input.id}{...input} onChange={onDeliveryDetailsChange}/>
                            </div>)
                        ))}
                    </div>
                    <div className="delivery_page_overview_address">
                        <div>
                            <label>Country</label>
                            <CountryDropDown {...countriesDropDown} onChange={onDeliveryDetailsChange}/>
                        </div>
                        {deliveryAddress.map((input) => (
                            (<div>
                                <label>{input.placeholder}</label>
                                <FormInput key={input.id}{...input} onChange={onDeliveryDetailsChange}/>
                            </div>)))
                        }
                    </div>
                </div>
            </div>
            <div className="delivery_page_payment">
                <div className="delivery_page_heading">
                    <div>DELIVERY PAYMENT</div>
                </div>
                <div className="delivery_page_overview">
                    <div className="delivery_page_overview_payment">
                        <SelectButton value={deliveryDetails.paymentType} onChange={(e) => onDeliveryPaymentChange(e)} options={["CASH", "CARD"]} />
                        <img src={"https://iili.io/H1LCmxe.webp"} alt="payment providers" hidden={deliveryDetails.paymentType !== "CARD"} />
                    </div>
                    <Button>PAY</Button>
                </div>
            </div>
        </div>
    )
})
