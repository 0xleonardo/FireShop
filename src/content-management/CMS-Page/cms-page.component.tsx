import {observer} from "mobx-react";
import {useStore} from "../../stores/utils/store-provider";

import "./style.css";
import {PageNotFound} from "../../components/NavBar/page-not-found/page-not-found";
import {useEffect, useState} from "react";
import {Item} from "../../modals/item.modal";
import {getAllItems} from "../../utils/api.utils";
import {Pagination} from "../../components/Category/CategoryPageTestPagination/pagination.component";
import {ItemsListShow} from "../ItemsListShow/items-list.component";
import {Button} from "primereact/button";
import {CmsAddItemModal} from "../CMS-Add-Item-Modal/cms-add-modal.component";

const _ = require('lodash');

export const CmsComponent = observer(() => {
    const {userStore} = useStore();

    const [items, setItems] = useState<Item[]>([]);
    const [itemsToShow, setItemsToShow] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [itemChanged, setItemChanged] = useState(false);
    const [isAddItemModalOpened, setIsAddItemModalOpened] = useState(false);

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

    useEffect(() => {
        getAllItems()
            .then((res: Item[]) => {
                setItems(res);
                setItemsToShow(res);
                setLoading(false);
            })
        setItemChanged(false);
    }, [itemChanged]);

    if (!userStore.getUser?.name || userStore.getUser?.email !== "admin") {
        return <PageNotFound/>;
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
        <div className="cms_page">
            <CmsAddItemModal isOpened={isAddItemModalOpened} closeModal={()=>setIsAddItemModalOpened(!isAddItemModalOpened)} itemChanged={()=>setItemChanged(true)}/>
            <div className="cms_page_heading">
                <div>Content Management System</div>
            </div>
            <div className="cms_page_overview">
                <div className="cms_page_overview_buttons">
                    <input type={"text"} value={searchQuery} onChange={(e: any) => {
                        setSearchQuery(e.target.value)
                    }} placeholder="Search Items" style={{width:"auto"}}/>
                    <Button className="button-secondary" onClick={()=>setIsAddItemModalOpened(!isAddItemModalOpened)}>Add Item</Button>
                </div>
                <hr style={{marginBottom: 10}}/>
                <div >
                    <ItemsListShow items={currentItems} loading={loading} itemChanged={()=>setItemChanged(true)}/>
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={itemsToShow.length}
                        currentItems={currentItems.length}
                        paginate={paginate}
                        changeItemsPerPage={changeItemsPerPage}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        </div>)

})