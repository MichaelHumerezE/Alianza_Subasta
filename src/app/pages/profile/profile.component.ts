import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { FormProfileComponent } from '../../components/form-profile/form-profile.component';

declare var $: any;
declare function initPage([]): any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormProfileComponent, BreadcrumbsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  constructor() {
    setTimeout(() => {
      initPage($);
    }, 50);
  }

}
