import "./style.css"
import {useParams} from "react-router-dom";
import {getItemsForCategory} from "../../../utils/api.utils";
import {useEffect, useState} from "react";
import {Category} from "../../../modals/category.modal";
import {Item} from "../../../modals/item.modal";

import 'primereact/resources/themes/lara-light-indigo/theme.css'; // theme
import 'primereact/resources/primereact.css'; // core css
import 'primeicons/primeicons.css'; // icons
import 'primeflex/primeflex.css';
import {observer} from "mobx-react";
import {PageNotFound} from "../../NavBar/page-not-found/page-not-found";
import {ItemsShow} from "./items-show.component";
import {Pagination} from "./pagination.component";
import {useStore} from "../../../stores/utils/store-provider";

const _ = require('lodash');

export const CategoryPagePagination = observer(() => {

    const {categoryName} = useParams();
    const {categoryStore} = useStore();

    const [category, setCategory] = useState<Category>();
    const [isValidUrl, setIsValidUrl] = useState(false);
    const [items, setItems] = useState<Item[]>([]);
    const [itemsToShow, setItemsToShow] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        if (_.includes(categoryStore.getCategories.map((cat) => cat.name.toLowerCase()), categoryName)) {
            const foundCategory = _.find(categoryStore.getCategories, (cat:Category) => cat.name.toLowerCase() === categoryName);
            setIsValidUrl(true);
            setCategory(foundCategory);
            getItemsForCategory(foundCategory.id)
                .then((res: Item[]) => {
                    setItems(res);
                    setItemsToShow(res);
                    setLoading(false);
                })
        }
        else {
            setIsValidUrl(false);
        }

    }, []);

    useEffect(() => {

        setItemsToShow(items.filter((item) => {
            if (_.isEmpty(searchQuery)) {
                return true;
            }
            return item.brand.toLowerCase().includes(searchQuery.toLowerCase())
                || item.series.toLowerCase().includes(searchQuery.toLowerCase())
                || item.description.toLowerCase().includes(searchQuery.toLowerCase());
        }))
        setCurrentPage(1);

    }, [searchQuery])


    if (!isValidUrl) {
        return <PageNotFound/>
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = itemsToShow.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const changeItemsPerPage = (itemNumber: number) => {
        setCurrentPage(1);
        setItemsPerPage(itemNumber);
    };

    return (
        <div className="category_page">
            <div className="category_page_heading">
                <div>{categoryName}</div>
            </div>
            <div>
                <input type={"text"} value={searchQuery} onChange={(e: any) => {
                    setSearchQuery(e.target.value)
                }} placeholder="Search Items"/>
            </div>
            <ItemsShow items={currentItems} loading={loading} category={category!}/>
            <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={itemsToShow.length}
                currentItems={currentItems.length}
                paginate={paginate}
                changeItemsPerPage={changeItemsPerPage}
                currentPage={currentPage}
            />
        </div>
    );
})
