import { Component } from '@angular/core';
import { FormLoginComponent } from '../../components/form-login/form-login.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLoginComponent, BreadcrumbsComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
}
