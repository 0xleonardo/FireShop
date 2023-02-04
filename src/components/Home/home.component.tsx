import {useEffect, useState} from "react";
import {Category} from "../../models/category.modal";
import {getCategories} from "../../stores/categories.store";
import {CategoryCard} from "../Category/CategoryCard/category-card.component";

export const HomeComponent = () => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then((res: Category[]) => {
            setCategories(res);
        })
    }, []);

    return (
        <div style={{color:"black"}}>
            {categories.map((category:Category) =>
                (
                    <CategoryCard
                        key={category.id}
                        category={category}/>
                )
            )}
        </div>
    )

}