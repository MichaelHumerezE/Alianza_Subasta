import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {

  @Input() data: any[] = [];
  @Input() title: string = 'Default:';
  @Output() valueChange = new EventEmitter<any>();

  valueData: any;

  constructor(){}

  ngOnInit(){
  }

  load(){
    this.valueChange.emit(this.valueData);
    console.log(this.valueData);
  }
}
