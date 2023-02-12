import {observer} from "mobx-react";
import {useStore} from "../../stores/utils/store-provider";

import "./style.css";
import {NavBarElement} from "./navbar-element-component/navbar-element.component";
import {useNavigate} from "react-router-dom";

const logo = require("../../assets/images/fireshop_logo.png");

export const NavBar = observer(() => {
    const {userStore, authStore} = useStore();
    const navigate = useNavigate();

    const isUserLogged = !!userStore.getUser;

    const isUserAdmin = isUserLogged && (userStore.getUser?.email === 'admin');

    const logout = () => {
        authStore.logout();
    }

    return (
        <div className="navistyle">
            <nav className="wrapper">
                <div className="logo">
                    <img src={logo} alt="Logo" onClick={() => navigate("/")}/>
                </div>

                <div className="navi">
                    <NavBarElement route={isUserLogged ? "/profile" : "/login"} icon="pi pi-user" color="black"
                                   onHoverTitle={isUserLogged ? userStore.getUser!.name : "Login"}/>
                    <NavBarElement route="/cart" icon="pi pi-shopping-cart" color="black" onHoverTitle="My Cart"/>
                    {isUserAdmin &&
                        <NavBarElement route="/cms" icon="pi pi-database" color="black" onHoverTitle="Admin Panel"/>}
                    {isUserLogged && <NavBarElement route="/" icon="pi pi-sign-out" color="black" onHoverTitle="Logout"
                                                    onClick={logout}/>}
                </div>
            </nav>
        </div>
    );
})
