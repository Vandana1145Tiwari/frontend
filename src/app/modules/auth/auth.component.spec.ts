import { Router } from '@angular/router';
import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { AuthComponent } from './auth.component';
import { AuthService } from 'src/app/shared/services';
import { AuthResponseData } from 'src/app/shared/models';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let router: Router;

  let usernameFieldSetItem;
  let passwordFieldSetItem;
  let usernameInput;
  let passwordInput;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthComponent],
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule]
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // Fields are used quite frequently
    usernameFieldSetItem = fixture.nativeElement.querySelector('#username-fieldset');
    passwordFieldSetItem = fixture.nativeElement.querySelector('#password-fieldset');
    usernameInput = fixture.nativeElement.querySelector('#username');
    passwordInput = fixture.nativeElement.querySelector('#password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GIVEN - default providers - WHEN - initializing component - THEN - it should return initial form values for auth form', () => {
    // ARRANGE
    const expectedValues = {
      username: null,
      password: null
    };
    // ACT
    // ASSERT
    expect(component.loginForm.value).toEqual(expectedValues);
  });

  it('GIVEN - default providers - WHEN - initializing component - THEN - it should be true for isLoginMode', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(component.isLoginMode).toBeTruthy();
  });

  it('GIVEN - default providers - WHEN - clicking element with "data-test="auth.anchor.account" - THEN - it should be true for isLoginMode', () => {
    // ARRANGE
    const anchorElement = fixture.nativeElement.querySelector('[data-test="auth.anchor.account"]');
    // ACT
    anchorElement.click();
    // ASSERT
    expect(component.isLoginMode).toBeFalsy();
  });

  it('GIVEN - default providers - WHEN - entering values into username and password - THEN - it should contain the values', () => {
    // ARRANGE
    const expectedValue = { username: 'test', password: 'password' };
    // ACT
    usernameInput.value = expectedValue.username;
    passwordInput.value = expectedValue.password;
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    // ASSERT
    expect(component.loginForm.value).toEqual(expectedValue);
  });

  it('GIVEN - default providers - WHEN - touching username and password with no inputs - THEN - it should be reflected', () => {
    // ARRANGE
    // ACT
    usernameInput.dispatchEvent(new Event('touchEvent'));
    passwordInput.dispatchEvent(new Event('touchEvent'));
    // ASSERT
    expect(usernameFieldSetItem.attributes.getNamedItem('ng-reflect-ng-class')).toBeTruthy();
    expect(passwordFieldSetItem.attributes.getNamedItem('ng-reflect-ng-class')).toBeTruthy();
  });

  describe('WITH - a username and password details', () => {
    const someValues = { username: 'test', password: 'password' };

    it('GIVEN - pre-condition - WHEN - logging in with a valid user - THEN - the router should navigate the user', fakeAsync(() => {
      // ARRANGE
      const mockResponse: AuthResponseData = {
        id: '1',
        username: someValues.username,
        token: '123'
      };
      spyOn(authService, 'login').and.returnValue(of(mockResponse));
      const routerSpy = spyOn(router, 'navigate');

      usernameInput.value = someValues.username;
      passwordInput.value = someValues.password;
      // ACT
      dispatchUsernameAndPasswordInputEventAndSubmitForm();
      // ASSERT
      expect(routerSpy).toHaveBeenCalledOnceWith(['/books']);
    }));

    it('GIVEN - pre-condition - WHEN - logging in with an invalid user - THEN - it should display an error message', fakeAsync(() => {
      // ARRANGE
      const mockResponse = 'Wrong password';
      spyOn(authService, 'login').and.returnValue(throwError(() => mockResponse));

      usernameInput.value = someValues.username;
      passwordInput.value = someValues.password;
      // ACT
      dispatchUsernameAndPasswordInputEventAndSubmitForm();
      // ASSERT
      expect(component.errorMessage).toBe('Wrong password');
    }));

    it('GIVEN - pre-condition - WHEN - registering a user with valid username and password - THEN - it should return a success and message', fakeAsync(() => {
      // ARRANGE
      const mockResponse: string = 'Yay, we made an account';
      spyOn(authService, 'register').and.returnValue(of(mockResponse));

      usernameInput.value = someValues.username;
      passwordInput.value = someValues.password;
      // ACT
      component.isLoginMode = false;
      dispatchUsernameAndPasswordInputEventAndSubmitForm();
      // ASSERT
      expect(component.message).toEqual('Successfully registered!');
    }));

    it('GIVEN - pre-condition - WHEN - registering a user with an invalid username and password - THEN - it should display an error message', fakeAsync(() => {
      // ARRANGE
      const mockResponse = 'Oh no. World go boom.';
      spyOn(authService, 'register').and.returnValue(throwError(() => mockResponse));

      usernameInput.value = someValues.username;
      passwordInput.value = someValues.password;
      // ACT
      component.isLoginMode = false;
      dispatchUsernameAndPasswordInputEventAndSubmitForm();
      // ASSERT
      expect(component.errorMessage).toEqual(mockResponse);
    }));
  });

  // Utility Method to reduce code duplication but with clear intent
  function dispatchUsernameAndPasswordInputEventAndSubmitForm() {
    usernameInput.dispatchEvent(new Event('input'));
    passwordInput.dispatchEvent(new Event('input'));
    component.onSubmit();
  }
});
