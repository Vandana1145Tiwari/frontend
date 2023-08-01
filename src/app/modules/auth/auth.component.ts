import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  @Input() showSidebar: boolean = false;

  public errorMessage: string = '';
  public message: string = '';
  public isLoginMode = true;
  public loginForm: FormGroup = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(): void {
    this.clearMessages();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (this.isLoginMode) {
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Successfully logged in!', response);
          this.router.navigate(['/books']);
        },
        error: (err) => {
          console.error('Unsuccessful', err.message);
          this.errorMessage = err.message;
        }
      });
    } else {
      this.authService.register(username, password).subscribe({
        next: (response) => {
          console.log('Successfully registered!', response);
          this.message = 'Successfully registered!';
          this.isLoginMode = true;
        },
        error: (err) => {
          console.error('Registration failed', err.message);
          this.errorMessage = err.message;
        }
      });
    }
  }

  private clearMessages(): void {
    this.message = '';
    this.errorMessage = '';
  }
}
