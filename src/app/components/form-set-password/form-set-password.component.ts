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
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    password_confirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  hash: string = '';

  constructor(private proposerService: ProposerService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.hash = params['hash'];
      this.validateHash();
    });
  }

  setPassword() {
    const formData = this.loadFormData();
    this.proposerService.setPasswordProposer(formData, this.hash).subscribe();
  }

  loadFormData(): FormData {
    const formData = new FormData();
    formData.append('password', this.passwordForm.get('password')?.value);
    return formData;
  }

  validateHash() {
    this.proposerService.verifyHashPassword(this.hash).subscribe();
  }

  passwordMatchValidator() {
    const password = this.passwordForm.get('password')?.value;
    const confirmPassword = this.passwordForm.get('password_confirmation')?.value;
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }
}
