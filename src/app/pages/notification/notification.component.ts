import { Component } from '@angular/core';
import { ListNotificationsComponent } from '../../components/list-notifications/list-notifications.component';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [ListNotificationsComponent, BreadcrumbsComponent],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

}
