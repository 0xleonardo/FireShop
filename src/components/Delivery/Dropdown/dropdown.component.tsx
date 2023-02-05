import {useEffect, useState} from "react";
import "./style.css";
import {getCountries} from "../../../stores/categories.store";

const _ = require('lodash');

export const CountryDropDown = (props: any) => {
    const [countriesCount, setCountriesCount] = useState(0);
    const [countries, setCountries] = useState([]);
    const { label, errorMessage, onChange, id, ...inputProps } = props;

    useEffect(() =>{
        getCountries().then((res:any) => {
            const countriesFromApi = res.map((country:any) => _.get(country, "name.common"));
            setCountriesCount(countriesFromApi.length);
            setCountries(countriesFromApi);
        })
    }, [countriesCount]);

    return (
        <div className="delivery_form_dropdown">

            <select onChange={onChange} {...inputProps}>
                <option key={0} value="Not selected" disabled={true}>Select country</option>
                {countries.map((country:string, idx:number) => <option key={idx+1} value={country}>{country}</option>)}
            </select>
            <span>{errorMessage}</span>
        </div>
    );
};