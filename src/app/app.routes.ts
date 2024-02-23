import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuctionComponent } from './pages/auction/auction.component';
import { DetailAuctionComponent } from './pages/detail-auction/detail-auction.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'auction', component: AuctionComponent },
  { path: 'auction/detail', component: DetailAuctionComponent },
  //{ path: '**', component: Error404Component },
];
