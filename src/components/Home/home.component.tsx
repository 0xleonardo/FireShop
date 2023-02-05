import {useEffect, useState} from "react";
import {Category} from "../../models/category.modal";
import {getCategories} from "../../stores/categories.store";
import {CategoryCard} from "../Category/CategoryCard/category-card.component";
import ImageSlider from "../../components-styled/ImageSlider/image-slider.component";
import "./style.css";
import {observer} from "mobx-react";
import {importAll} from "../../utils/simple.utils";

const images = importAll(require.context('../../assets/slider/'));

export const HomeComponent = observer(() => {

    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getCategories()
            .then((res: Category[]) => {
            setCategories(res);
        })
    }, []);

    const sliders = images.map((image:any) => {return {url: image}});

    return (
        <div className="homeWrapper">
            <ImageSlider slides={sliders}/>
            <div className="homeCategoryButtons">
                {categories.map((category:Category) =>
                    (
                        <CategoryCard
                            key={category.id}
                            category={category}/>
                    )
                )}
            </div>
        </div>
    )

})