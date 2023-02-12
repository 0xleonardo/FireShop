import {useStore} from "../../stores/utils/store-provider";
import {observer} from "mobx-react";
import "./style.css";
import {useEffect, useState} from "react";
import {SelectButton} from "primereact/selectbutton";
import {getOrdersForUser} from "../../utils/api.utils";
import {OrderTransaction} from "../../modals/order.modal";
import {OrderListComponent} from "./Order/order-list.component";

export const UserComponent = observer(() => {
    const {userStore} = useStore();
    const [pageActive, setPageActive] = useState("MY INFO");
    const [userTransactions, setUserTransactions] = useState<OrderTransaction[]>([])

    useEffect(() => {
        if (userStore.getUser) {
            userStore.pullUser().then(() => {
                getOrdersForUser(userStore.getUser!.id)
                    .then((orders: OrderTransaction[]) => {
                        setUserTransactions(orders.sort((a,b) => a.orderTimestamp<b.orderTimestamp ? 1 : -1));
                    }).catch((err: any) => {
                    console.log(err)
                })
            });
        }
    }, [])

    function changePage(e: any) {
        if (e.value === "MY INFO") {
            setPageActive("MY INFO");
        } else {
            setPageActive("ORDERS");
        }
    }

    return (
        <div className="user_profile_page">
            <div>
                <SelectButton value={pageActive} onChange={(e) => changePage(e)} options={["MY INFO", "ORDERS"]}/>
            </div>
            <div style={{display: pageActive != "MY INFO" ? "none" : ""}} className="user_profile_page_info">
                <div className="user_profile_page_info_user">
                    <div hidden={pageActive != "MY INFO"}>
                        <div className="info_label">Name</div>
                        <div>{userStore.getUser?.name}</div>
                    </div>
                    <div hidden={pageActive != "MY INFO"}>
                        <div className="info_label">Surname</div>
                        <div>{userStore.getUser?.surname}</div>
                    </div>
                    <div hidden={pageActive != "MY INFO"}>
                        <div className="info_label">Email</div>
                        <div>{userStore.getUser?.email}</div>
                    </div>
                </div>
            </div>
            <ul className="user_profile_page_transactions" style={{display: pageActive != "ORDERS" ? "none" : ""}}>
                {userTransactions.length > 0 ? userTransactions.map((order: OrderTransaction, idx) =>
                    <OrderListComponent key={idx + 1} order={order} color={(idx + 1) % 2 == 0 ? "#eeeeee" : "white"}/>)
                    : <h2>{userStore.getUser?.name} didn't make order</h2>
                }
            </ul>
        </div>
    )
})