import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

declare var $:any;
declare function initPage([]): any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Alianza_Subastas';

  constructor(){
    setTimeout(()=>{
      initPage($);
    }, 50);
  }
}
