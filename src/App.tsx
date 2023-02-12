import {NavBar} from "./components/NavBar/navbar.component";
import {RoutesComponent} from "./routes/routes";
import {BrowserRouter} from "react-router-dom";
import {useEffect} from "react";
import {useStore} from "./stores/utils/store-provider";

import "./appstyle.css";
import {observer} from "mobx-react";
import {Footer} from "./components/Footer/customfooter.component";

export const App = observer(() => {
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.pullUser()
                .finally(() => commonStore.setAppLoaded())
        }
    })

    return (
        <BrowserRouter>
            <div className="shopBody">
                <NavBar/>
                <RoutesComponent/>
                <Footer/>
            </div>
        </BrowserRouter>
    );
})
