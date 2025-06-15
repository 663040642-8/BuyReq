import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { NotFound } from './features/not-found/not-found';
import { authGuard } from './core/auth/auth-guard';
import { guestGuard } from './core/auth/guest-guard';
import { BuyRequestList } from './features/buy-request/buy-request-list/buy-request-list';
import { BuyRequestForm } from './features/buy-request/buy-request-form/buy-request-form';
import { BuyRequestDetail } from './features/buy-request/buy-request-detail/buy-request-detail';
import { Home } from './features/home/home';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
    { path: 'login', component: Login, canActivate: [guestGuard] },
    { path: 'register', component: Register, canActivate: [guestGuard] },
    { path: 'buy-request', component: BuyRequestList },
    { path: 'buy-request/create', component: BuyRequestForm, canActivate: [authGuard] },
    { path: 'buy-request/:id', component: BuyRequestDetail },
    { path: 'profile', component: Profile, canActivate: [authGuard] },
    { path: '', component: Home },
    { path: '**', component: NotFound },
];
