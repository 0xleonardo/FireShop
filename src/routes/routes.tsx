import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomeComponent} from "../components/Home/home.component";
import {UserComponent} from "../components/user.component";
import {observer} from "mobx-react";
import {LoginRegistrationComponent} from "../components/LoginRegistration/registration.component";
import {CategoryPage} from "../components/Category/CategoryPage/category-page.component";
import {ItemInfo} from "../components/Item/ItemInfo/item-info.component";
import {CartPage} from "../components/Cart/CartPage/cart-page.component";
import {DeliveryPage} from "../components/Delivery/DeliveryPage/delivery-page.component";

export const Loading = () =>{
    return (
        <div>Loading...</div>
    )
}

export const RoutesComponent = observer(() => {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                <Route path='/' element={<HomeComponent/>} />
                <Route path='/profile' element={<UserComponent/>} />
                <Route path='/cart' element={<CartPage/>} />
                <Route path='/delivery' element={<DeliveryPage/>}/>
                <Route path='/login' element={<LoginRegistrationComponent/>} />
                <Route path='/:categoryName' element={<CategoryPage/>}/>
                <Route path='/item/:itemId' element={<ItemInfo/>}/>
                <Route path='/*' element={<Loading />} />
            </Routes>
        </Suspense>
    );
})