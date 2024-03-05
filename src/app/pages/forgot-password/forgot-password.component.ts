import { Component } from '@angular/core';
import { SendEmailComponent } from '../../components/send-email/send-email.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [SendEmailComponent, BreadcrumbsComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

}
