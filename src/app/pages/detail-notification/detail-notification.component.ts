import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../../components/breadcrumbs/breadcrumbs.component';
import { DetailNotificationsComponent } from '../../components/detail-notifications/detail-notifications.component';

@Component({
  selector: 'app-detail-notification',
  standalone: true,
  imports: [BreadcrumbsComponent, DetailNotificationsComponent],
  templateUrl: './detail-notification.component.html',
  styleUrl: './detail-notification.component.css'
})
export class DetailNotificationComponent {

}
