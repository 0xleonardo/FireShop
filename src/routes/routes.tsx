import {Suspense} from 'react';
import {Route, Routes} from 'react-router-dom';
import {HomeComponent} from "../components/Home/home.component";
import {UserComponent} from "../components/user.component";
import {observer} from "mobx-react";
import {LoginRegistrationComponent} from "../components/LoginRegistration/registration.component";

const Loading = () =>{
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
                <Route path='/cart' element={<HomeComponent/>} />
                <Route path='/login' element={<LoginRegistrationComponent/>} />
                <Route path='/*' element={<Loading />} />
            </Routes>
        </Suspense>
    );
})