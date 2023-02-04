import {NavBar} from "./components/NavBar/navbar.component";
import {RoutesComponent} from "./routes/routes";
import {BrowserRouter} from "react-router-dom";
import {useEffect} from "react";
import {useStore} from "./stores/utils/store-provider";

import "./appstyle.css";

export const App = () => {
	const { commonStore, userStore } = useStore();

	useEffect(() => {
		if (commonStore.token) {
			userStore.pullUser()
				.finally(() => commonStore.setAppLoaded())
		}
	})

	return (
		<BrowserRouter>
			<NavBar />
			<div className="shopBody">
				<RoutesComponent />
			</div>
		</BrowserRouter>
	);
}