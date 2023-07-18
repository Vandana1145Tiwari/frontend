import { Component, Input, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  @Input() showSidebar: boolean = false;

  public error = false;
  public errorMessage: string = '';
  public isLoginMode = true;
  public loginForm: FormGroup = this.formBuilder.group({
    userName: [null, Validators.required],
    password: [null, Validators.required]
  });

  private closeSubscription: Subscription;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }

  public onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    this.handleError(null, false);

    const username = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;

    console.log('Username', username, 'Password', password);

    if (this.isLoginMode) {
      this.authService.login(username, password).subscribe({
        next: (response) => {
          console.log('Successfully logged in!', response);
          this.router.navigate(['/books']);
        },
        error: (errorMessage) => {
          console.error('Unsuccessful');
          this.handleError(errorMessage, true);
        }
      });
    } else {
      // TODO: To be completed
      this.authService.register(username, password).subscribe({
        next: (response) => {
          console.log('Successfully registered!', response);
          this.router.navigate(['/books']);
        },
        error: (errorMessage) => {
          console.error('Registration failed');
          this.handleError(errorMessage, true);
        }
      });
    }
  }

  private handleError(errorMessage: string, errorFlag: boolean) {
    this.errorMessage = errorMessage;
    this.error = errorFlag;
  }
}
