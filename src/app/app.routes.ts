import { Routes } from '@angular/router';

import { HomeComponent } from './pages/Home/home';

import {CreateAccountComponent  } from './pages/CreateAccount/createAccount';

import { LoginComponent } from './pages/Login/login';

import { FeedComponent } from './pages/Feed/showFeed';


export const routes: Routes = [

    { path: '', component: HomeComponent },

    { path: 'CreateAccount', component: CreateAccountComponent },

    { path: 'login', component: LoginComponent },

    { path: 'showFeed', component: FeedComponent },

];
