import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Message } from '../../interfaces/message';
import { SweetAlert2Service } from '../../services/sweet-alert-2.service';

@Component({
  selector: 'app-img-drop-zone',
  standalone: true,
  imports: [NgxDropzoneModule, CommonModule],
  templateUrl: './img-drop-zone.component.html',
  styleUrl: './img-drop-zone.component.css'
})
export class ImgDropZoneComponent {

  @Output() fileChange = new EventEmitter<File[]>();
  
  files: File[] = [];

  message: Message = {
    title: '',
    text: '',
    icon: 'info',
  };

  constructor(private alert: SweetAlert2Service) {
  }

  onSelect(event: any) {
    if (this.files.length < 2 && event.addedFiles.length + this.files.length <= 2) {
      this.files.push(...event.addedFiles);
      this.fileChange.emit(this.files);
    } else {
      this.message.title = "¡Máximo 2 Imágenes!";
      this.message.text = "Solo se permite cargar un máximo de 2 imagenes, por favor vuelva a seleccionar sus imágenes";
      this.message.icon = "warning";
      this.alert.viewMessage(this.message);
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
