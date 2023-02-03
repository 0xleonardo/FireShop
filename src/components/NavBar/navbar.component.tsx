import {observer} from "mobx-react";
import {useStore} from "../../stores/utils/store-provider";

import "./style.css";
import {AccountBox, AdminPanelSettings, Logout, ShoppingCart} from '@mui/icons-material';
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
					<ul>
						<NavBarElement route={isUserLogged ? "/profile" : "/login"} icon={AccountBox} onHoverTitle={isUserLogged ? userStore.getUser!.name : "Login"}/>

						<NavBarElement route="/cart" icon={ShoppingCart} onHoverTitle="My Cart"/>

						{isUserAdmin && <NavBarElement route="/cms" icon={AdminPanelSettings} onHoverTitle="Admin Panel"/>}

						{isUserLogged && <NavBarElement route="/" icon={Logout} onHoverTitle="Logout" onClick={logout}/>}
					</ul>
				</div>
			</nav>
		</div>
	);
})
