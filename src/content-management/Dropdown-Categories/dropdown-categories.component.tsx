import {useEffect, useState} from "react";
import "./style.css";
import {getCategories} from "../../utils/api.utils";
import {Category} from "../../modals/category.modal";

const _ = require('lodash');

export const CategoryDropDown = (props: any) => {
    const [categoriesCount, setCategoriesCount] = useState(0);
    const [categories, setCategories] = useState<Category[]>([]);
    const {label, errorMessage, onChange, id, ...inputProps} = props;

    useEffect(() => {
        getCategories()
            .then((res:Category[]) => {
                setCategoriesCount(res.length);
                setCategories(res);
            })
    }, [categoriesCount]);

    return (
        <div className="delivery_form_dropdown">

            <select onChange={onChange} {...inputProps} defaultValue={"Not selected"}>
                <option key={0} value="Not selected" disabled={true}>Select category</option>
                {categories.map((category: Category, idx: number) =>
                    <option key={idx + 1} value={category.id}>{category.name}</option>)}
            </select>
            <span>{errorMessage}</span>
        </div>
    );
};