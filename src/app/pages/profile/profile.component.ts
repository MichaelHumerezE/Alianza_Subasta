import { Component } from '@angular/core';
import { FormUpdateProfileComponent } from '../../components/form-update-profile/form-update-profile.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormUpdateProfileComponent, BreadcrumbsComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
