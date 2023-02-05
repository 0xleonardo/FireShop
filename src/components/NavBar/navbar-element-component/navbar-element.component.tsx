import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {IconButton, Tooltip} from "@mui/material";
import 'primeicons/primeicons.css';
import {useStore} from "../../../stores/utils/store-provider";

import ".././style.css";

interface NavBarElementProps {
    route:string,
    icon: string,
    onHoverTitle: string;
    color:string;
    onClick?: () => void;
}

export const NavBarElement = observer((props: NavBarElementProps) => {

    const {cartStore} = useStore();

    return (
        <Link to={props.route}>
            <Tooltip title={props.onHoverTitle} onClick={props.onClick}>
                <IconButton>
                    <i className={props.icon} style={{ fontSize: '1.5rem', color:props.color }}></i>
                    {props.onHoverTitle === "My Cart"
                    && <div className="nav_item_counter">{cartStore.getCartItemsNumber}</div>}
                </IconButton>
            </Tooltip>
        </Link>
    )

})