import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  failedToAuthenticate = false;
  loginForm: FormGroup = this.formBuilder.group({
    userName: [null, Validators.required],
    password: [null, Validators.required]
  })
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute, private router: Router) {
   }

  ngOnInit(): void {
  }

  onLogin(){
    this.loginForm.markAllAsTouched();
    if(this.loginForm.invalid) {
      return;
    }
    const userName = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authenticationService.login(userName, password).subscribe({
      next: (v) => {
        console.log('Successfully login');
        this.authenticationService.setAuthenticateStatus(true);
        this.router.navigate(['books'], {relativeTo: this.route})
      },
      error: (e) => {
        console.error('Failed to login')
        this.authenticationService.setAuthenticateStatus(false);
        this.failedToAuthenticate = true;
      },
    })
  }

}
