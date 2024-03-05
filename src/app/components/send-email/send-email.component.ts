import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProposerService } from '../../services/proposer.service';

@Component({
  selector: 'app-send-email',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.css'
})
export class SendEmailComponent {

  emailForm: FormGroup = new FormGroup({
    email: new FormControl('default@gmail.com', [
      Validators.required,
      Validators.email,
    ]),
  });

  constructor(private proposerService: ProposerService){}

  ngOnInit(){}

  sendEmail(): void {
    const formData = this.loadFormData();
    this.proposerService.sendEmailPasswordProposer(formData).subscribe();
  }

  loadFormData(): FormData{
    const formData = new FormData();
    formData.append('email', this.emailForm.get('email')?.value);
    return formData;
  }
}
