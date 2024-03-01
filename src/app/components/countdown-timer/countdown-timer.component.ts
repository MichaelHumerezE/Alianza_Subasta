import { Component, Input } from '@angular/core';
import { CdTimerModule } from 'angular-cd-timer';

@Component({
  selector: 'app-countdown-timer',
  standalone: true,
  imports: [CdTimerModule],
  templateUrl: './countdown-timer.component.html',
  styleUrl: './countdown-timer.component.css',
})
export class CountdownTimerComponent {
  @Input() endDate?: Date;
  @Input() textColor: string = 'text-danger';

  startTime?: number;
  endTime?: number;

  dateTimeFormat = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'UTC',
  });

  constructor() {}

  ngOnInit() {
    if (this.endDate) {
      const start = new Date();
      const end = new Date(this.endDate);
      const diferencia = end.getTime() / 1000 - start.getTime() / 1000;
      this.startTime = diferencia;
    } else {
      this.startTime = 0;
    }
  }
}
