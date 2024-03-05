import { Component } from '@angular/core';
import { FormSetPasswordComponent } from '../../components/form-set-password/form-set-password.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-modify-password',
  standalone: true,
  imports: [FormSetPasswordComponent, BreadcrumbsComponent],
  templateUrl: './modify-password.component.html',
  styleUrl: './modify-password.component.css'
})
export class ModifyPasswordComponent {

}
