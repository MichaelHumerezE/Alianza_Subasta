import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuctionComponent } from './pages/auction/auction.component';
import { DetailAuctionComponent } from './pages/detail-auction/detail-auction.component';
import { authGuard, noAuthGuard } from './services/auth.guard';
import { ParticipatedAuctionsComponent } from './pages/participated-auctions/participated-auctions.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { ModifyPasswordComponent } from './pages/modify-password/modify-password.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { DetailNotificationComponent } from './pages/detail-notification/detail-notification.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [noAuthGuard] },
  { path: 'forgot-password/send-email', component: ForgotPasswordComponent },
  { path: 'forgot-password/form-password/:hash', component: ModifyPasswordComponent },
  { path: 'register', component: RegisterComponent, canActivate: [noAuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
  { path: 'auction', component: AuctionComponent },
  { path: 'auction/category/:category', component: AuctionComponent },
  { path: 'auction/state/:state', component: AuctionComponent },
  { path: 'auction/:id_auction/detail', component: DetailAuctionComponent },
  { path: 'auction/proposer', component: ParticipatedAuctionsComponent },
  { path: 'notification', component: NotificationComponent },
  { path: 'notification/:id_notification/detail', component: DetailNotificationComponent },
  { path: '**', component: HomeComponent },
];
