import "./style.css"
import {observer} from "mobx-react";
import {FormInput} from "../../LoginRegistration/form-input/form-input.component";
import {useEffect, useState} from "react";
import {CountryDropDown} from "../Dropdown/dropdown.component";
import {SelectButton} from "primereact/selectbutton";
import {Button} from "primereact/button";
import {useNavigate} from "react-router-dom";
import {useStore} from "../../../stores/utils/store-provider";
import {DeliveryInfo} from "../../../stores/delivery.store";

const _ = require('lodash');

export const DeliveryPage = observer(() => {
    const {deliveryStore} = useStore();
    const navigate = useNavigate();

    const [deliveryDetails, setDeliveryDetails] = useState<DeliveryInfo>({
        name: "",
        surname: "",
        email: "",
        country: "",
        place: "",
        address: "",
        mobile: "",
        paymentType: "",
    });

    const personDetails = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "Name",
            label: "Name",
            value: deliveryDetails.name,
            pattern: "^[A-Za-z0-9]{2,32}$",
            required: true,
        },
        {
            id: 2,
            name: "surname",
            type: "text",
            placeholder: "Surname",
            label: "Surname",
            value: deliveryDetails.surname,
            pattern: "^[A-Za-z0-9]{2,64}$",
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            placeholder: "Email",
            errorMessage: "It should be a valid email address!",
            label: "Email",
            value: deliveryDetails.email,
            required: true,
        },
        {
            id: 4,
            name: "mobile",
            type: "text",
            placeholder: "Number",
            errorMessage: "It should be a valid number!",
            label: "Number",
            value: deliveryDetails.mobile,
            pattern: "^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$",
            required: true,
        }
    ];

    const countriesDropDown = {
        id: 4,
        name: "country",
        placeholder: "Select country",
        label: "Country",
        value: deliveryDetails.country,
        required: true,
    }

    const deliveryAddress = [
        {
            id: 5,
            name: "place",
            type: "text",
            placeholder: "Place",
            label: "Place",
            value: deliveryDetails.place,
            required: true,
        },
        {
            id: 6,
            name: "address",
            type: "text",
            placeholder: "Address",
            label: "Address",
            value: deliveryDetails.address,
            required: true,
        },
    ];

    useEffect(() => {
        setDeliveryDetails(deliveryStore.getDeliveryInfo!);
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            deliveryStore.setDeliveryInfo(deliveryDetails);
        }, 1000);

        return () => clearTimeout(delayDebounceFn)
    }, [deliveryDetails])

    const onDeliveryDetailsChange = (e: any) => {
        setDeliveryDetails({...deliveryDetails, [e.target.name]: e.target.value});
    };

    const onDeliveryPaymentChange = (e: any) => {
        setDeliveryDetails({...deliveryDetails, ["paymentType"]: e.target.value});
    };

    const canProceedToPayment = !_.isEmpty(Object.values(deliveryDetails).filter((value) => value === '' || value == null));

    const handlePay = () => {
        deliveryStore.setDeliveryInfo(deliveryDetails as DeliveryInfo)
        navigate('/confirm');
    }

    return (
        <form className="delivery_page" onSubmit={handlePay}>
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
                        <SelectButton value={deliveryDetails.paymentType} onChange={(e) => onDeliveryPaymentChange(e)}
                                      options={["CASH", "CARD"]} required/>
                        <img src={"https://iili.io/H1LCmxe.webp"} alt="payment providers"
                             hidden={deliveryDetails.paymentType !== "CARD"}/>
                    </div>
                    <div className="delivery_page_overview_buttons">
                        <Button onClick={() => navigate(-1)} className="p-button-secondary">GO BACK</Button>
                        <Button type="submit" disabled={canProceedToPayment}>PAY</Button>
                    </div>
                </div>
            </div>
        </form>
    )
})
