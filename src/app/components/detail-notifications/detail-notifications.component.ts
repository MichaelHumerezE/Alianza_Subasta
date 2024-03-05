import { Component } from '@angular/core';
import { ImgDropZoneComponent } from '../img-drop-zone/img-drop-zone.component';

@Component({
  selector: 'app-detail-notifications',
  standalone: true,
  imports: [ImgDropZoneComponent],
  templateUrl: './detail-notifications.component.html',
  styleUrl: './detail-notifications.component.css'
})
export class DetailNotificationsComponent {

  files: File[] =[];

  constructor(){}

  ngOnInit(){}

}
