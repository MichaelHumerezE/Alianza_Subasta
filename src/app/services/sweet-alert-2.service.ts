import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SweetAlert2Service {

  constructor() { }

  viewMessage(message: Message): void{
    Swal.fire({
      title: message.title,
      text: message.text,
      icon: message.icon,
      timer: 5000, // Tiempo en milisegundos (en este caso, 3 segundos)
      timerProgressBar: true, // Muestra una barra de progreso
      showConfirmButton: false, // Oculta el botón de confirmación
    });
  }
}
