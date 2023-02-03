import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {IconButton, Tooltip} from "@mui/material";
import {SvgIconComponent} from "@mui/icons-material";

interface NavBarElementProps {
    route:string,
    icon: SvgIconComponent
    onHoverTitle: string;
    onClick?: () => void;
}

export const NavBarElement = observer((props: NavBarElementProps) => {

    return (
        <li>
            <Link to={props.route}>
                <Tooltip title={props.onHoverTitle} onClick={props.onClick}>
                    <IconButton>
                        <props.icon/>
                    </IconButton>
                </Tooltip>
            </Link>
        </li>
    )

})