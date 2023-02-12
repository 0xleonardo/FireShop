import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomeComponent} from "../components/Home/home.component";
import {UserComponent} from "../components/UserProfile/user.component";
import {observer} from "mobx-react";
import {LoginRegistrationComponent} from "../components/LoginRegistration/registration.component";
import {ItemInfo} from "../components/Item/ItemInfo/item-info.component";
import {CartPage} from "../components/Cart/CartPage/cart-page.component";
import {DeliveryPage} from "../components/Delivery/DeliveryPage/delivery-page.component";
import {ConfirmPage} from "../components/Confirm/ConfirmPage/confirm-page.component";
import {PageNotFound} from "../components/NavBar/page-not-found/page-not-found";
import {CategoryPagePagination} from "../components/Category/CategoryPageTestPagination/category-page2.component";
import {CmsComponent} from "../content-management/CMS-Page/cms-page.component";

export const Loading = () => {
    return (
        <div>Loading...</div>
    )
}

export const RoutesComponent = observer(() => {
    return (
        <Suspense fallback={<Loading/>}>
            <Routes>
                <Route path='/' element={<HomeComponent/>}/>
                <Route path='/profile' element={<UserComponent/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='/delivery' element={<DeliveryPage/>}/>
                <Route path='/confirm' element={<ConfirmPage/>}/>
                <Route path='/login' element={<LoginRegistrationComponent/>}/>
                <Route path='/cms' element={<CmsComponent/>}/>
                <Route path='/:categoryName' element={<CategoryPagePagination/>}/>
                <Route path='/item/:itemId' element={<ItemInfo/>}/>
                <Route path='/*' element={<PageNotFound/>}/>
            </Routes>
        </Suspense>
    );
})