import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuctionComponent } from './pages/auction/auction.component';
import { DetailAuctionComponent } from './pages/detail-auction/detail-auction.component';
import { authGuard, noAuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'auction', component: AuctionComponent },
  { path: 'auction/:id_auction/detail', component: DetailAuctionComponent },
  //{ path: '**', component: Error404Component },
];
