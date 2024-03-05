import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProposerService } from '../../services/proposer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form-set-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form-set-password.component.html',
  styleUrl: './form-set-password.component.css'
})
export class FormSetPasswordComponent {

  passwordForm: FormGroup = new FormGroup({
    password: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password_confirmation: new FormControl('123456', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  hash: string = '';

  constructor(private proposerService: ProposerService,
    private route: ActivatedRoute,
    ){}

  ngOnInit(){
    this.route.params.subscribe((params) => {
      this.hash = params['hash'];

    });
    console.log(this.hash);
  }

  setPassword(){
    console.log(this.hash);
    const formData = this.loadFormData();
    this.proposerService.setPasswordProposer(formData, this.hash).subscribe();
  }

  loadFormData(): FormData{
    const formData = new FormData();
    formData.append('password', this.passwordForm.get('password')?.value);
    return formData;
  }

}
