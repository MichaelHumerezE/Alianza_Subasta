import { Component } from '@angular/core';
import { FormRegisterComponent } from '../../components/form-register/form-register.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormRegisterComponent, BreadcrumbsComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  constructor() {
    setTimeout(() => {
      initPage($);
    }, 50);
  }

}
